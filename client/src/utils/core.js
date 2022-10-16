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

export function append(arr1, ...arrs) {
  let res = [...arr1]
  for (let i = 0; i < arrs.length; i++) {
    const arr = arrs[i]
    res = res.concat(arr)
  }

  return res
}

export function isVoid(v) {
  return v === null || v === undefined || v === ''
}

export function clearVoidKey(obj) {
  const keys = Object.keys(obj)
  const res = {}
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = obj[key]
    if (!isVoid(value)) {
      res[key] = value
    }
  }
  return res
}
