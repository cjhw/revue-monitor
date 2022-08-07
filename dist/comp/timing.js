/*
 * @Descripttion: 
 * @Author: Wang Dejiang(aei)
 * @Date: 2022-08-07 12:43:36
 * @LastEditors: Wang Dejiang(aei)
 * @LastEditTime: 2022-08-07 20:40:38
 */
import onload from '../utils/onload'
import http from '../utils/request'

let timing = () => {
  let FMP, LCP
  if (PerformanceObserver) {
    // 增加一个性能条目的观察者
    new PerformanceObserver((entryList, observer) => {
      let perfEntries = entryList.getEntries()
      FMP = perfEntries[0] //startTime 2000以后
      observer.disconnect() //不再观察了
    }).observe({ entryTypes: ['element'] }) //观察页面中的意义的元素

    new PerformanceObserver((entryList, observer) => {
      let perfEntries = entryList.getEntries()
      LCP = perfEntries[0]
      observer.disconnect() //不再观察了
    }).observe({ entryTypes: ['largest-contentful-paint'] }) //观察页面中的意义的元素
  }

  //用户的第一次交互 点击页面
  onload(function () {
    setTimeout(() => {
      const { fetchStart, loadEventStart } = performance.timing

      let FP = performance.getEntriesByName('first-paint')[0]
      let FCP = performance.getEntriesByName('first-contentful-paint')[0]
      let loadTime = loadEventStart - fetchStart
      //开始发送性能指标
      //console.log('FP', FP)
      //console.log('FCP', FCP)
      //console.log('FMP', FMP)
      //console.log('LCP', LCP)
      http.post('/plugin/paint', {
        kind: 'experience', //用户体验指标
        type: 'paint', //统计每个阶段的时间
        firstPaint: FP.startTime,
        firstContentfulPaint: FCP.startTime,
        firstMeaningfulPaint: FMP?.startTime || -1,
        largestContentfulPaint: LCP?.startTime || -1,
        timeStamp: Date.now(),
      })
      http.post('/plugin/load', {
        kind: 'experience', //用户体验指标
        type: 'load', //统计每个阶段的时间
        loadTime,
        timeStamp: Date.now(),
      })
    }, 3000)
  })
}

export default {
  install(Vue, options) {
    const oldRevue = Vue.prototype.$revue
    Vue.prototype.$revue = Object.assign({}, oldRevue, {
      timing
    })
  },
  immediate: {
    install(Vue, options) {
      timing(Vue, options)
      const oldRevue = Vue.prototype.$revue
      Vue.prototype.$revue = Object.assign({}, oldRevue, {
        timing
      })
    },
  },
  t: timing
}
