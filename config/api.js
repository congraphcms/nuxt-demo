export default new Map([


  /*
  |--------------------------------------------------------------------------
  | Default entity status filter
  |--------------------------------------------------------------------------
  |
  | If there is more than one status defined in content model workflow
  | add statuses that you want included in API request or leave empty if all
  | statuses should be loaded
  |
  */
  ["default_status_filter", {"in": ["published", "public"]}],

  /*
  |--------------------------------------------------------------------------
  | Resources to include in API fetch
  |--------------------------------------------------------------------------
  |
  | If all resources are loaded on app init there is no need to load relations
  |
  | Add asset and relation fields that you want automatically loaded
  |
  */
  ["include", [
    'fields.cover_image',
    // meta
    'fields.og_image',
  ]]
])
