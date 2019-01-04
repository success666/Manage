import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import Print from "@/utils/print";

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import Axios from 'axios';
Vue.prototype.$axios = Axios;

import request from '@/utils/request'
Vue.prototype.$ajax = request

Vue.use(ElementUI)
Vue.use(Print) // 注册

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
Vue.filter('sex', function(value) {
    if (value === 1) {
        return '男'
    } else if (value === 2) {
        return '女'
    }
})

// 日期格式转换
Date.prototype.format = function(fmt) {
    var weekday = ['日', '一', '二', '三', '四', '五', '六'];
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds(), // 毫秒
        "w": weekday[this.getDay()], // 星期
        "I": this.getDay(), // 星期下标
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    };
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        };
    };
    return fmt;
};

Vue.filter("dateFormat", function(value, fmt) {
    if (value) {
        var date = value.replace(/-/g, '/')
        return new Date(date).format(fmt);
    }
});



//比例转换  proportionTransformation(50,100)返回 1:2
window.proportionTransformation = function(a, b) {
    if (a == 0 || b == 0) {
        return a + ':' + b
    };

    function getBigFactor(a, b) {
        if (b == 0) {
            return a;
        }
        return getBigFactor(b, a % b)
    };
    var commonDivisor = getBigFactor(a, b);

    return a / commonDivisor + ':' + b / commonDivisor;
}