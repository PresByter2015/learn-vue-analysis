/**
*～╭════╮┌══════════════┐
* ╭╯开车║ ▁▂▃▅▆▇  |  ~~~
* ╰⊙═⊙╯╰══⊙══════⊙══╯
* @description:  
* @author: PresByter
* @date  : 2020/02/14 12:51:01
* @file  : index.js
*/
/**
 * setImmediate()、setTimeout(fn, 0) 与 process.nextTick()
两个都是传入一个回调函数，当同步事件执行完之后马上执行。

执行顺序依次是：

process.nextTick()
将回调函数加入到 当前执行栈的尾部，任务队列之前
setTimeout(fn, 0)
回调函数加入到 任务队列尾部。即使是0，也会又4ms的延时
setImmediate()
将回调函数插入到任务队列的最末尾，也不会造成阻塞，但不妨碍其他的异步事件
 */
setImmediate(() => {
  console.log('setImmediate');
})

setTimeout(() => {
  console.log('setTimeout');
}, 0)

process.nextTick(() => {
  console.log('next');
})