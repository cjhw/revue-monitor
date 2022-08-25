/*
 * @Descripttion: 
 * @Author: Wang Dejiang(aei)
 * @Date: 2022-08-07 16:21:52
 * @LastEditors: arvin(王德江)
 * @LastEditTime: 2022-08-25 22:05:22
 */
import { timing, ComponentMount, ComponentBlank } from './comp/index' 
import jsError  from './comp/jsError'
import wsError from './comp/wsError'
import httpError, { injectFetch, injectXHR } from './comp/httpError'
import bussiness from './comp/bussiness'
import topic from './comp/topic'
function registLifecallBack(key, callBack) {
    topic.on(callBack, key)
}
export default {
    install(Vue, options) {
        Vue.prototype.$revue = {
          timing: timing.t,
          compnentMount: ComponentMount.m,
          blankScreen: ComponentBlank.b,
          wsError: wsError,
          injectFetch, 
          injectXHR,
          // bussiness
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
          // bussiness.bs()
          Vue.prototype.$revue = {
            timing: timing.t,
            compnentMount: ComponentMount.m,
            blankScreen: ComponentBlank.b,
            wsError: wsError,
            injectFetch, 
            injectXHR,
            bussiness
          }
        },
    },
    registLifecallBack
}

export {
    timing,
    ComponentMount,
    ComponentBlank,
    jsError,
    wsError,
    httpError,
    topic
}

