/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'//创建注册方法；e.g. components、directives 等。
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'//合并一些方法
import builtInComponents from '../components/index'//内置组件 KeepAlive
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config //往Vue上 挂载config 内容
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on 这些不是公共API的一部分-避免依赖
  // them unless you are aware of the risk.
  Vue.util = {//定义Vue的方法；不建议外部使用
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 2.6 explicit observable API
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }

  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue
  //通过extend方法，把内置组件builtInComponents放入到components
  extend(Vue.options.components, builtInComponents)

  initUse(Vue) //创建Vue.use方法
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
}
