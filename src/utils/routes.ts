export enum STATIC_ROUTES {
  DASHBOARD = '/',
  ERROR = '/error',
  PRESCRIPTION_SEARCH = '/prescription/search',
  ARCHIVE_EXPLORATION = '/archive-exploration',
  VARIANT_EXPLORATION = '/variant-exploration',
}

export enum DYNAMIC_ROUTES {
  ERROR = '/error/:status?',
  VARIANT_ENTITY = '/variant/entity/:hash/:tabid?',
  PRESCRIPTION_ENTITY = '/prescription/entity/:id',
}