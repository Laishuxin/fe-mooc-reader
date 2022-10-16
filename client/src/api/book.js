import { clearVoidKey } from '@/utils'
import { defaultHttp } from './_request'
const { get } = defaultHttp

export function getMeta(config = {}) {
  return get('/books/meta', config)
}

export function getCategories(config = {}) {
  return get('/books/categories', config)
}

/**
 * @param { { page: number, order_id?: number, category_id?: number } } params
 * @param {*} config
 * @returns
 */
export function getBooks(params, config = {}) {
  const { page, order_id, category_id } = params
  return defaultHttp.get('/books', {
    params: clearVoidKey({ page, order_id, category_id }),
    ...config,
  })
}
