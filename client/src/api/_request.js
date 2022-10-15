import { BASE_URL } from '@/constant/env'
import { isFunction, merge } from 'lodash-es'
import axios from 'axios'
import { defaultStorage } from '@/utils/storage'
import { errorNo, JWT_TOKEN } from '@/constant/tokens'
import { Dialog, Notify, Toast } from 'vant'
import { shallowMerge } from '@/utils'

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
    const defaultOptions = {
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
      redirectToLoginWhenUnauthorized: true,
      showMessageWhenUnauthorized: true,
      logoutCleanup() {
        defaultStorage.removeItem(JWT_TOKEN)
      },
    }

    return merge({}, defaultOptions, options)
  }

  /**
   * @param { import('axios').AxiosRequestConfig } config
   * @returns { Promise<any> }
   */
  request(config) {
    return this.http.request(config).catch((err) => {
      if (err instanceof axios.AxiosError) {
        cleanup(err)
      }
      throw err
    })
  }

  /**
   * @param { import('axios').AxiosRequestConfig } config
   */
  get(url, config = {}) {
    const mergedConfig = shallowMerge(config, { url, method: 'get' })
    return this.request(mergedConfig)
  }

  /**
   * @param { import('axios').AxiosRequestConfig } config
   */
  post(url, config = {}) {
    const mergedConfig = shallowMerge(config, { url, method: 'post' })
    return this.request(mergedConfig)
  }

  /**
   * @param { import('axios').AxiosRequestConfig } config
   */
  put(url, config = {}) {
    const mergedConfig = shallowMerge({}, config, { url, method: 'put' })
    return this.request(mergedConfig)
  }

  /**
   * @param { import('axios').AxiosRequestConfig } config
   */
  patch(url, config = {}) {
    const mergedConfig = shallowMerge({}, config, { url, method: 'patch' })
    return this.request(mergedConfig)
  }

  /**
   * method = 'delete'
   * @param { import('axios').AxiosRequestConfig } config
   */
  remove(url, config = {}) {
    const mergedConfig = shallowMerge({}, config, { url, method: 'delete' })
    return this.request(mergedConfig)
  }
}

/**
 * @param { 'success' | 'error' } type
 * @param { object } messageConfig
 * @param { string } message
 */
function performMessage(type, messageConfig, message) {
  let { containerType = 'notify', ...config } = messageConfig

  containerType = containerType.toLowerCase()
  if (containerType == 'Dialog') {
    Dialog(merge({ message }, config))
  } else if (containerType == 'Toast') {
    const toastType = type == 'success' ? 'success' : 'fail'
    Toast(merge({ message, type: toastType }, config))
  } else {
    const notifyType = type == 'success' ? 'success' : 'danger'
    Notify(merge({ message, type: notifyType }, config))
  }
}

/**
 * 清理副作用
 */
function cleanup(resp) {
  const { config } = resp
  if (config._loadingInstance != null) {
    config._loadingInstance.clear()
    config._loadingInstance = null
  }
  if (config._timer != null) {
    clearTimeout(config._timer)
    config._timer = null
  }
}

function handleSuccess(resp) {
  const { data, config } = resp
  const { data: dataFromBackend, message } = data
  const { showMessageWhenSuccess, successMessageConfig = {} } = config
  if (showMessageWhenSuccess == true) {
    performMessage('success', successMessageConfig, message)
  }

  return dataFromBackend
}

function handleUnauthorized(resp) {
  const { data, config } = resp
  const { data: dataFromBackend } = data
  const { message } = dataFromBackend
  const {
    redirectToLoginWhenUnauthorized,
    logoutCleanup,
    showMessageWhenUnauthorized,
    catchException = true,
  } = config

  if (showMessageWhenUnauthorized == true) {
    Notify({ type: 'danger', message })
  }

  if (redirectToLoginWhenUnauthorized == true) {
    window.location.href = '/account/login'

    if (isFunction(logoutCleanup)) {
      logoutCleanup()
    }
  }

  if (catchException) {
    return Promise.resolve()
  }

  return Promise.reject(new Error(message))
}

function handleOtherException(resp) {
  const { data, config } = resp
  const { data: dataFromBackend } = data
  const { message } = dataFromBackend
  const {
    catchException,
    showMessageWhenError,
    errorMessageConfig = {},
  } = config

  if (showMessageWhenError) {
    performMessage('error', errorMessageConfig, message)
  }

  if (catchException == true) {
    return Promise.resolve()
  }

  return Promise.reject(new Error(message))
}

/**
 * @param { import('axios').AxiosRequestConfig } config
 */
const defaultRequestInterceptor = (config) => {
  const { headers = {}, loading } = config
  const token = defaultStorage.getItem(JWT_TOKEN)

  if (token != null) {
    headers['Authorization'] = token
  }

  if (loading == true) {
    config._timer = setTimeout(() => {
      config._loadingInstance = Toast({
        type: 'loading',
        duration: 35 * 1000,
        forbidClick: true,
      })
    }, 500)
  }

  return config
}

/**
 * @param { import('axios').AxiosResponse } resp
 */
const defaultResponseInterceptor = (resp) => {
  const { data: dataFromBackend } = resp
  const { code } = dataFromBackend
  cleanup(resp)

  if (code == errorNo.ok) {
    return handleSuccess(resp)
  } else if (code == errorNo.unauthorized) {
    return handleUnauthorized(resp)
  } else {
    return handleOtherException(resp)
  }
}

export const defaultHttp = new MyHttp()
