<!--
 * @Author: arvin(王德江)
 * @Date: 2022-08-22 22:45:14
 * @LastEditors: arvin(王德江)
 * @LastEditTime: 2022-08-22 22:57:07
 * @Description: 
-->
# revue-monitor

### 介绍
专为vue开发的监测npm包


### 快速使用

安装revue-monitor
```bash
npm i --save revue-monitor

```
立刻使用监测功能（默认在全局开启检测）
```js
import revue-monitor from 'revue-monitor'
Vue.use(revue-monitor.immediate)
```

### 自定义插件
开发者可以自定义定制插件。我们会逐步开放各个监控，报错收集的生命周期hooks，提供开发者制定更加全面、个性化的前端监控插件


