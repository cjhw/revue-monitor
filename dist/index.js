/*
 * @Descripttion: 
 * @Author: Wang Dejiang(aei)
 * @Date: 2022-08-07 16:21:52
 * @LastEditors: Wang Dejiang(aei)
 * @LastEditTime: 2022-08-07 21:40:44
 */
import { timing, ComponentMount, ComponentBlank } from './comp/index' 
import jsError  from './comp/jsError'
import wsError from './comp/wsError'
import httpError, { injectFetch, injectXHR } from './comp/httpError'

export default {
    install(Vue, options) {
        Vue.prototype.$revue = {
          timing: timing.t,
          compnentMount: ComponentMount.m,
          blankScreen: ComponentBlank.b,
          wsError: wsError,
          injectFetch, 
          injectXHR
        }
    },
    immediate: {
        install(Vue, options) {
          ComponentBlank.b() 
          timing.t(Vue, options)
          Vue.mixin(ComponentMount.m)
          jsError.install(Vue)
          wsError()
          injectFetch()
          injectXHR()
          Vue.prototype.$revue = {
            timing: timing.t,
            compnentMount: ComponentMount.m,
            blankScreen: ComponentBlank.b,
            wsError: wsError,
            injectFetch, 
            injectXHR
          }
        },
    },
}

export {
    timing,
    ComponentMount,
    ComponentBlank,
    jsError,
    wsError,
    httpError
}

