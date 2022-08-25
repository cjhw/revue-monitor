/*
 * @Author: arvin(王德江)
 * @Date: 2022-08-25 20:15:04
 * @LastEditors: arvin(王德江)
 * @LastEditTime: 2022-08-25 20:39:41
 * @Description: 
 */
class Topic {
  eventList = {}
  on(callback, event) {
    ;(this.eventList[event] || (this.eventList[event] = [])).push(callback)
  }
  emit(event, ...arr) {
    this.eventList[event] && this.eventList[event].forEach(e => {
      e(...arr)
    });
  }
}

const topic = new Topic()

export default topic