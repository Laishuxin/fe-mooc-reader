import { BASE_URL } from '@/constant/env'
import { merge } from 'lodash-es'
import axios from 'axios'
import { defaultStorage } from '@/utils/storage'
import { JWT_TOKEN } from '@/constant/tokens'

class MyHttp {
  constructor(options = {}) {
    this._init(options)
  }

  _init(options) {
    this._options = this._getNormalizeOptions(options)
    const { interceptor, ...config } = this._options
    this._config = config

    this.http = axios.create(config)
    this.http.interceptors.request.use(interceptor.request)
    this.http.interceptors.response.use(interceptor.response)

    this.request = this.request.bind(this)
    this.get = this.get.bind(this)
    this.post = this.post.bind(this)
    this.put = this.put.bind(this)
    this.patch = this.patch.bind(this)
    this.remove = this.remove.bind(this)
  }

  _getNormalizeOptions(options) {
    return merge(
      {},
      {
        baseURL: BASE_URL,
        withCredentials: false,
        timeout: 30 * 1000,
        validateStatus: function (status) {
          return status >= 200 && status < 400
        },
        interceptor: {
          request: defaultRequestInterceptor,
          response: defaultResponseInterceptor,
        },
        timeoutErrorMessage: 'timeout',
      },
      options,
    )
  }

  /**
   * @param { import('axios').AxiosRequestConfig } config
   * @returns { Promise<any> }
   */
  request(config) {
    return this.http.request(config)
  }

  /**
   * @param { import('axios').AxiosRequestConfig } config
   */
  get(url, config = {}) {
    const mergedConfig = merge({}, config, { url, method: 'get' })
    return this.request(mergedConfig)
  }

  /**
   * @param { import('axios').AxiosRequestConfig } config
   */
  post(url, config = {}) {
    const mergedConfig = merge({}, config, { url, method: 'post' })
    return this.request(mergedConfig)
  }

  /**
   * @param { import('axios').AxiosRequestConfig } config
   */
  put(url, config = {}) {
    const mergedConfig = merge({}, config, { url, method: 'put' })
    return this.request(mergedConfig)
  }

  /**
   * @param { import('axios').AxiosRequestConfig } config
   */
  patch(url, config = {}) {
    const mergedConfig = merge({}, config, { url, method: 'patch' })
    return this.request(mergedConfig)
  }

  /**
   * method = 'delete'
   * @param { import('axios').AxiosRequestConfig } config
   */
  remove(url, config = {}) {
    const mergedConfig = merge({}, config, { url, method: 'delete' })
    return this.request(mergedConfig)
  }
}

/**
 * @param { import('axios').AxiosRequestConfig } config
 */
const defaultRequestInterceptor = (config) => {
  const { headers = {} } = config
  const token = defaultStorage.getItem(JWT_TOKEN)

  if (token != null) {
    headers['Authorization'] = token
  }

  return config
}

/**
 * @param { import('axios').AxiosResponse } resp
 */
const defaultResponseInterceptor = (resp) => {
  const { data, config } = resp
  console.log('config: ', config)

  const { code, data: dataFromBackend, message } = data

  return dataFromBackend
}

export const defaultHttp = new MyHttp()
