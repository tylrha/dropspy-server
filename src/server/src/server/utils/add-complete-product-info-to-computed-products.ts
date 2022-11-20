import { getProductsFromDatabase } from "../../models/Product"

export default async function addCompleteProductInfoToComputedProducts(computedProducts: any){

  const completProductDocs = await getProductsFromDatabase({productLink: {$in: computedProducts.map((product: any) => product.productLink)}})

  const completeProducts = computedProducts.map((product: any) => {

    const completeProduct = completProductDocs.find(prod => prod.productLink === product.productLink)

    return {
      ...product,
      productName: completeProduct.productName,
      productImage: completeProduct.productImage,
      productPrice: completeProduct.productPrice,
      storeName: completeProduct.storeName,
      storeLink: completeProduct.storeLink,
      totalLabels: completeProduct.totalLabels,
      labels: completeProduct.labels
    }

  })

  return completeProducts.sort((a: any, b: any) => (a.totalRevenue > b.totalRevenue ? -1 : 1))

}
