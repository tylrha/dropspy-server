// MIDDLEWARES =================================================================
import authenticationMiddlewate from '../middlewares/auth-middleware'

// AUTH ROUTES =================================================================
import authenticateUser from './auth/authenticate-user-controller'

// CATEGORY ROUTES =============================================================
import addCategoryController from './categories/add-category-controller'
import getAllCategoriesController from './categories/get-all-categories-controller'
import getAllCategoryProductsController from './categories/get-all-category-products-controller'

// USER ROUTES =================================================================
import createNewUser from './users/create-new-user-controller'
import getUserFavorites from './users/get-user-favorites'
import getUserInformation from './users/get-user-information-controller'
import handleUserFavoriteStores from './users/handle-user-favorite-stores'
import handleUserFavoriteProducts from './users/handle-user-favorite-products'

// DATE ROUTES =================================================================
import getAllDatesController from './dates/get-all-dates-controller'
import getDateController from './dates/get-date-controller'

// LABEL ROUTES ================================================================
import addLabelController from './labels/add-label-controller'
import getAllLabelsController from './labels/get-all-labels-controller'
import getAllLabeledProductsController from './labels/get-all-labeled-products-controller'
import updateLabelsInAllProductsController from './labels/update-labels-in-all-products-controller'
import getLabelController from './labels/get-label-controller'
import editLabelController from './labels/edit-label-controller'
import deleteLabelController from './labels/delete-label-controller'

// PRODUCTS ROUTES =============================================================
import getAllProductsController from './products/get-all-products-controller'
import getProductController from './products/get-product-controller'
import getRecentSoldProductsController from './products/get-recent-sold-products'
import getTopNProductsController from './products/get-top-n-products-controller'

// STORES ROUTES ===============================================================
import getAllStoresController from './stores/get-all-stores-controller'
import getStoreController from './stores/get-store-controller'
import editStoreController from './stores/edit-store-controller'
import getTopNStoresController from './stores/get-top-n-stores-controller'

// ADMIN ROUTES ================================================================
import getAdminInfoController from './admin/get-admin-info-controller'
import editAdminController from './admin/edit-admin-info-controller'
import addStoreController from './stores/add-store-controller'
import handleUserRegisteredStores from './users/handle-user-registered-store'
import getAllBotsController from './bots/get-all-bots-controller'
import getAllUsersController from './users/get-all-users-controller'


// #############################################################################

export default function getDropspyRoutes(baseUrl: string){

  let dropspyRoutes = []

  dropspyRoutes.push(...[

    ["post", "/api/auth/authenticate", [authenticateUser]],

    ["post", "/api/users/create", [createNewUser]],
    ["get", "/api/users/user", [getUserInformation]],
    ["get", "/api/users/userfavorites", [getUserFavorites]],
    ["get", "/api/users/favoriteproducts", [handleUserFavoriteProducts]],
    ["get", "/api/users/favoritestores", [handleUserFavoriteStores]],
    ["get", "/api/users/registeredstores", [handleUserRegisteredStores]],
    ["get", "/api/users/getallusers", [getAllUsersController]],

    ["get", "/api/categories/getallcategories", [getAllCategoriesController]],
    ["get", "/api/categories/addcategory", [addCategoryController]],
    ["get", "/api/categories/getcategoryproducts", [getAllCategoryProductsController]],

    ["get", "/api/dates/getalldates", [getAllDatesController]],
    ["get", "/api/dates/getdate", [getDateController]],

    ["get", "/api/labels/getlabeledproducts", [getAllLabeledProductsController]],
    ["get", "/api/labels/getalllabels", [getAllLabelsController]],
    ["get", "/api/labels/getlabel", [getLabelController]],
    ["get", "/api/labels/deletelabel", [deleteLabelController]],
    ["get", "/api/labels/editlabel", [editLabelController]],
    ["get", "/api/labels/addlabel", [addLabelController]],
    ["get", "/api/labels/addlabelstoallproducts", [updateLabelsInAllProductsController]],

    ["get", "/api/products/getallproducts", [getAllProductsController]],
    ["get", "/api/products/getproduct", [getProductController]],
    ["get", "/api/products/getrecentsales", [getRecentSoldProductsController]],
    ["get", "/api/products/gettopproducts", [getTopNProductsController]],

    ["post", "/api/stores/addstore", [addStoreController]],
    ["post", "/api/stores/editstore", [editStoreController]],
    ["get", "/api/stores/getallstores", [getAllStoresController]],
    ["get", "/api/stores/getstore", [getStoreController]],
    ["get", "/api/stores/gettopstores", [getTopNStoresController]],

    ["get", "/api/admin/getadmininfo", [getAdminInfoController]],
    ["post", "/api/admin/editadmininfo", [editAdminController]],

    ["get", "/api/bots/getallbots", [getAllBotsController]],


  ])

  dropspyRoutes = dropspyRoutes.map(route => {

    if (route[1].search('/api/auth') > -1){
      return [route[0], `${baseUrl}${route[1]}`, [route[2]]]
    } else {
      return [route[0], `${baseUrl}${route[1]}`, [route[2], authenticationMiddlewate]]
    }

  })

  return dropspyRoutes
}
