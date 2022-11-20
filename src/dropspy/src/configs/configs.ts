import APP_CONFIGS from './app-configs.json'

/* ENVIRONMENT ============================================================== */
const NODE_ENV = import.meta.env['MODE'] === "development" ? "development" : "production"

/* PROJECT CONFIGS ========================================================== */

const SERVER_BASE = NODE_ENV === "development" ? APP_CONFIGS.project_configs.dev_server : APP_CONFIGS.project_configs.prod_server
const API_LINK = `${SERVER_BASE}`
const DROPSPY_BASE_ROUTE = APP_CONFIGS.project_configs.base_route

/* LAYOUT CONFIGS =========================================================== */

const LAYOUT_DEFAULT_SORTBY = APP_CONFIGS.layout_configs.initial_sortby_field
const ADD_UNUSED_CATEGORIES = APP_CONFIGS.layout_configs.add_unused_labels_to_all_labels
const ADD_UNUSED_LABELS = APP_CONFIGS.layout_configs.add_unused_categories_to_all_categories
const INITIAL_DISPLAY_VIEW = APP_CONFIGS.layout_configs.initial_display_view

/* EXPORT =================================================================== */

export {
  APP_CONFIGS,
  NODE_ENV,

  DROPSPY_BASE_ROUTE,

  LAYOUT_DEFAULT_SORTBY,
  ADD_UNUSED_CATEGORIES,
  ADD_UNUSED_LABELS,
  INITIAL_DISPLAY_VIEW,
  SERVER_BASE,
  API_LINK
}
