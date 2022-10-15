import { snakeCase } from 'lodash';

export function snakeCaseKeys(obj: object) {
  const res = {};
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    res[snakeCase(key)] = obj[key];
  }
  return res;
}
