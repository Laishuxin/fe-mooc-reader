import { merge } from 'lodash-es'

export class Logger {
  constructor(options = {}) {
    this._init(options)
  }

  _init(options) {
    const normalizedOptions = merge(
      {
        prefix: 'mooc-reader',
        showDateTime: true,
      },
      options,
    )

    this._options = normalizedOptions
    this.print = this.print.bind(this)
    this.log = this.log.bind(this)
    this.info = this.info.bind(this)
    this.warn = this.warn.bind(this)
    this.error = this.error.bind(this)
  }

  print(type, ...messages) {
    const { log, info, warn, error } = console
    let printer = log
    if (type == 'info') {
      printer = info
    } else if (type == 'warn') {
      printer = warn
    } else if (type == 'error') {
      printer = error
    }

    const { prefix, showDateTime } = this._options

    printer(
      `[${
        showDateTime == true ? new Date().toLocaleString() + '  ' : ''
      }${prefix}]: \n`,
      ...messages,
    )
  }

  log(...messages) {
    this.print('log', ...messages)
  }
  info(...messages) {
    this.print('info', ...messages)
  }
  warn(...messages) {
    this.print('warn', ...messages)
  }
  error(...messages) {
    this.print('error', ...messages)
  }
}

export const defaultLogger = new Logger()
