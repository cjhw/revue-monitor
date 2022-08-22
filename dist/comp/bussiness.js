import http from '../utils/request'
import onload from '../utils/onload'

function business() {
  let connection = navigator.connection
  onload(function () {
    http.post('/plugin/business', {
      kind: 'business',
      type: 'pv+uv',
      origin: window.location.origin, // 域名
      effectiveType: connection.effectiveType, //网络环境
      timeStamp: Date.now(),
    })
  })
}

export default {
  install(Vue, options) {
    const oldRevue = Vue.prototype.$revue
    Vue.prototype.$revue = Object.assign({}, oldRevue, {
      business,
    })
  },
  immediate: {
    install(Vue, options) {
      business()
      const oldRevue = Vue.prototype.$revue
      Vue.prototype.$revue = Object.assign({}, oldRevue, {
        business,
      })
    },
  },
  bs: business,
}
