import {initMixin} from './init';
import {stateMixin} from './state';
import {renderMixin} from './render';
import {eventsMixin} from './events';
import {lifecycleMixin} from './lifecycle';
import {warn} from '../util/index';
// 这里是Vue的定义；也就是一个function函数。
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    // 这里是ES5 Vue；必须通过new 关键字实现实例化。
    warn ('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init (options);
}

initMixin (Vue); //在vue的prototype上挂载了一个_init方法
stateMixin (Vue); //在vue的prototype上挂载了$set、$delete、$watch方法
// 剩下的也是类型，往Vue的prototype上挂载一些方法。
eventsMixin (Vue);
lifecycleMixin (Vue);
renderMixin (Vue);
/**
 * 这里 根据不同的文件定义不同的方法；然后挂载到Vue的prototype上
 */
export default Vue;
