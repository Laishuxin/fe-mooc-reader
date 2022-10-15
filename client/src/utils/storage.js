export class Storage {
  constructor(options = {}) {
    this._init(options)
  }

  _init(options) {
    const { type } = options

    this._storage =
      type == "session" ? window.sessionStorage : window.localStorage

    this.getItem = this.getItem.bind(this)
    this.setItem = this.setItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  /**
   * @param { string } key
   */
  getItem(key) {
    return this._storage.getItem(key)
  }

  setItem(key, value, options = {}) {
    return this._storage.setItem(key, value)
  }

  // clear() {
  //   this._storage.clear()
  // }

  removeItem(key) {
    return this._storage.removeItem(key)
  }
}

export const defaultStorage = new Storage()
