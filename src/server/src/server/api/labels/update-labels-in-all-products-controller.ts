import { Request, Response } from 'express'
import { getLabelsFromDatabase, ILabelMongo } from '../../../models/Label'
import { getProductsFromDatabase, IProductMongo, Product } from '../../../models/Product'

export default async function updateLabelsInAllProductsController(request: Request, response: Response) {

  try{

    const { limit, skip } = request.query
    const allLabels: ILabelMongo[] = await getLabelsFromDatabase({})

    let addedLabels = 0
    let allProducts: IProductMongo[] = []

    if (limit && !skip){
      allProducts = await getProductsFromDatabase({}, Number(limit))
    } else if (limit && skip){
      allProducts = await getProductsFromDatabase({}, Number(limit), Number(skip))
    } else {
      allProducts = await getProductsFromDatabase({})
    }

    const totalProducts = await Product.countDocuments({})

    for(let x = 0; x < allProducts.length; x++){
      const curProduct = allProducts[x]
      const productLabelsCount = await updateProductLabels(curProduct, allLabels)
      addedLabels += productLabelsCount
      console.log(`${Number(skip || 0) + x}/${Number(skip || 0) + allProducts.length}/${totalProducts} - ${curProduct.productName} - ${productLabelsCount} - ${addedLabels}`)
    }

    response.json({allProducts})

  }catch(e){
    response.json({ error: e.message })
  }

}

async function updateProductLabels(productObj: IProductMongo, allLabels: ILabelMongo[]){

  const newProductLabels = allLabels.filter((label) => {

    let hasLabel = false;

    if (label.compare === 'default'){
      Array.from(label.synonyms).forEach(synonym => {if (productObj.productName.toLowerCase().search(synonym) > -1){hasLabel = true}})
    } else if (label.compare === 'exact'){
      Array.from(label.synonyms).forEach(synonym => {if (productObj.productName.toLowerCase().search(`${synonym} `) > -1){hasLabel = true}})
    } else if (label.compare === 'regex'){
      Array.from(label.synonyms).forEach(synonym => {if (productObj.productName.search(new RegExp(synonym.toString(), 'g'))> -1){hasLabel = true}})
    }

    return hasLabel

  })

  if (productObj.labels.length > 0 || newProductLabels.length > 0){
    productObj.labels = newProductLabels.map((label) => ({
      name: label.name,
      type: label.type,
    }))

    productObj.totalLabels = newProductLabels.length
    await productObj.save()
  }

  return newProductLabels.length

}
