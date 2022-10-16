import { defaultHttp } from './_request'

/**
 * @param { { username: string, password: string } } params
 */
export function login(params, config = {}) {
  return defaultHttp.post('/auth/login', {
    data: params,
    ...config,
  })
}

export function register(params, config = {}) {
  return defaultHttp.post('/auth/register', {
    data: params,
    ...config,
  })
}
