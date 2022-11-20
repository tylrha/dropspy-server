import mongoose, { Schema, Document } from 'mongoose'
import { DATABASE_COLLECTION_CATEGORIES, LOGGER} from '../../configs/configs'

/* -------------------------------------------------------------------------- */

interface ICategoryMongo extends Document{
  name: string
}

type ICategory = Omit<ICategoryMongo, '_id' | '__v'>
type ICategoryUnion = ICategory | ICategoryMongo

const categorySchema: Schema = new Schema(
  {
    name: String
  },
  {
    versionKey: false
  }
)

const Category = mongoose.model<ICategoryMongo>(DATABASE_COLLECTION_CATEGORIES, categorySchema)

/* -------------------------------------------------------------------------- */

function generateNewCategory(categoryName: string): ICategoryMongo{

  LOGGER(`Gerando objeto de categoria [${categoryName}]`, {from: "DTBASE", pid: true})

  const tmpcategoryObj = {
    name: categoryName
  }

  return new Category(tmpcategoryObj)
}


async function getCategoriesFromDatabase(categoriesQuery: any): Promise<ICategoryMongo[]>{

  LOGGER(`Obtendo categorias`, {from: "DTBASE", pid: true})

  try{
    const categoriesObj = await Category.find(categoriesQuery)
    return categoriesObj
  } catch(e){
    LOGGER(`ERRO: ${e.message}`, {from: "DTBASE", pid: true})
    return null
  }
}

async function getCategoryFromDatabase(categoryQuery: string): Promise<ICategoryMongo>{

  LOGGER(`Obtendo categoria: [${categoryQuery}]`, {from: "DTBASE", pid: true})

  try{
    const categoryObj = await Category.findOne({name: categoryQuery})
    return categoryObj
  } catch(e){
    LOGGER(`ERRO: ${e.message}`, {from: "DTBASE", pid: true})
    return null
  }
}

/* -------------------------------------------------------------------------- */

export {
  ICategoryMongo,
  ICategory,
  ICategoryUnion,
  categorySchema,
  Category,

  generateNewCategory,
  getCategoriesFromDatabase,
  getCategoryFromDatabase
}
