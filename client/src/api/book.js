import { defaultHttp } from './_request'

export function getBooks() {
  return defaultHttp.get('/book', {
    showMessage: true,
  })
}
