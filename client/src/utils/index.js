import { merge } from 'lodash-es'

export {
  isFunction,
  isArray,
  isDate,
  isObject,
  isPlainObject,
} from '@vue/shared'
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
