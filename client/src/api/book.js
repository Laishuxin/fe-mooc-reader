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

/**
 * @param { { book_id: number | string } } params
 * @param {*} config
 */
export function getBookById(params, config = {}) {
  const { book_id } = params
  return defaultHttp.get(`/books/${book_id}`, config)
}

/**
 * @param { { book_id: number | string } } params
 * @param {*} config
 */
export function getBookReadState(params, config = {}) {
  return defaultHttp.get(`/books/read_state`, {
    params,
    ...config,
  })
}
