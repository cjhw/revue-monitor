import StackTracey from 'stacktracey'
import axios from "../utils/request"

const jsError = {
  install: (Vue) => {
    const oldErrorHandler = Vue.config.errorHandler
    Vue.config.errorHandler = (error, vm, info) => {
      if (oldErrorHandler) oldErrorHandler.call(this, err, vm, info)
      const stack = new StackTracey(error)
      const log = {
        kind: "stability",
        errorType: "jsError",   //jsError
        simpleUrl: window.location.href.split('?')[0].replace('/#/', '/'),   // 页面的url
        timeStamp: new Date().getTime(),   // 日志发生时间
        position: `${stack.items[0].column}:${stack.items[0].line}`,  // 需要处理掉无效的前缀信息
        fileName: stack.items[0].fileName,  //错误文件名
        message: stack.items[0].callee,  //错误信息
        detail: `${error.toString()}`,
        isYibu: false,  //是否是异步
      }
      //console.error(error)
      axios.post('/plugin/postErrorMessage', log)
    }
    window.addEventListener("error", function (event) {
      // //console.log(event)
      let log = {
        kind: "stability", //稳定性指标
        errorType: "jsError", //jsError
        simpleUrl: window.location.href.split('?')[0].replace('/#/', '/'), // 页面的url
        timeStamp: new Date().getTime(), // 日志发生时间
        position: (event.lineno || 0) + ":" + (event.colno || 0), //行列号
        fileName: event.filename, //报错链接
        message: event.message, //报错信息
        detail: "null",
        isYibu: true
      };
      axios.post('/plugin/postErrorMessage', log)
    },
      true
    ); // true代表在捕获阶段调用,false代表在冒泡阶段捕获,使用true或false都可以
    window.addEventListener("unhandledrejection", function (event) {
      // //console.log(event)
      let log = {
        kind: "stability", //稳定性指标
        errorType: "jsError", //jsError
        simpleUrl: window.location.href.split('?')[0].replace('/#/', '/'), // 页面的url
        timeStamp: new Date().getTime(), // 日志发生时间
        message: event.reason, //报错信息
        fileName: "null", //报错链接
        position: (event.lineno || 0) + ":" + (event.colno || 0), //行列号
        detail: "null",
        isYibu: true
      };
      axios.post('/plugin/postErrorMessage', log)
    },
      true
    ); // true代表在捕获阶段调用,false代表在冒泡阶段捕获,使用true或false都可以
  }
}

export default jsError