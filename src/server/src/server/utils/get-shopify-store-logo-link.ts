import axios from 'axios'
import * as cheerio from 'cheerio'

export default async function getShopifyLogoLink(storeLink: string){

  try{
    const storeResponse = await axios.get(storeLink)
    const $ = cheerio.load(storeResponse.data);

    const logoImage = $('img.header__logo-image'); // #navbar-brand > img
    const imageLink = logoImage.attr('src')

    return imageLink ? `https:${imageLink}` : ""
  } catch(e){
    console.log(e.message)
    return ""
  }

}
