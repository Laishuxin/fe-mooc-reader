export * from "@vue/shared"

/**
 * @example shallowMerge({a: '1', b: '2'}, {b: '22', c: '3'}) == { a: '1', b: '22', c: '3' }
 * @param { object } obj1
 * @param { object } obj2
 * @returns { object }
 */
export function shallowMerge(obj1, obj2) {
  return Object.assign({}, obj1, obj2)
}
