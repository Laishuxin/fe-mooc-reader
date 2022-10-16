import { merge } from 'lodash-es'
/**
 * @example shallowMerge({a: '1', b: '2'}, {b: '22', c: '3'}) == { a: '1', b: '22', c: '3' }
 * @param { object } obj1
 * @returns { object }
 */
export function shallowMerge(obj1, ...objs) {
  return Object.assign({}, obj1, ...objs)
}

export function deepMerge(obj1, ...objs) {
  return merge({}, obj1, ...objs)
}

export function delay(timeout = 16) {
  const _timeout = timeout >= 16 ? timeout : 16
  return new Promise((resolve) => {
    setTimeout(resolve, _timeout)
  })
}

/**
 * 规范化 jwt token
 * @param { string } token
 */
export function normalizeJwtToken(token) {
  const prefix = 'Bearer '
  if (token.startsWith(prefix)) return token
  return `${prefix}${token}`
}
