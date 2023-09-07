//引入Vue
import Vue from 'vue';
//引入App
import App from './App.vue';
//引入ElementUI组件库
import ElementUI from 'element-ui';
//引入ElementUI全局样式
import 'element-ui/lib/theme-chalk/index.css';
//引入router
import router from "@/router";
import VueRouter from "vue-router";
//使用路由
Vue.use(VueRouter)

//关闭Vue的生产提示
Vue.config.productionTip = false
//应用插件
Vue.use(ElementUI)


new Vue({
  el: '#app',
  render: h => h(App),
  router,
});