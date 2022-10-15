import { defaultHttp } from './_request'

export function getBooks(params, config) {
  return defaultHttp.get('/book', params, config)
}
