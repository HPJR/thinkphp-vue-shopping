import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router';
import Routers from './router';
import axios from 'axios';
import Cookies from 'js-cookie'
import VueLazyload from 'vue-lazyload'

//表单验证vuelidate
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate);

//图片懒加载
Vue.use(VueLazyload);

//iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

//网站css
import './assets/css/reset.css';
import './assets/css/style.css';
import './assets/css/fontStyle/iconfont.css';

//公用信息获取
import {getConfig,getCartAll,sessionLogin} from './service/index';

//过滤器全局注册
import * as filters from './filter'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

//axios全局注册
Vue.prototype.axios = axios;

Vue.use(Vuex);
Vue.use(VueRouter);


//使用html的history模式
const RounterConfig = {
    mode:'history',
    routes:Routers
};
const router = new VueRouter(RounterConfig);


//路由开始发生的事情
router.beforeEach((to,from,next)=>{
    window.document.title = to.meta.title;
    //登录判断
    if (to.meta.requireAuth) {
        if(store.state.token){
            next();
        }
        else {
            next({
                path: '/login'
            })
        }

    }else{
        next();
    }
});

//路由渲染结束发生的事情
router.afterEach(()=> {
    window.scrollTo(0,0);
});

//vuex 状态管理
const store = new Vuex.Store({
    state:{
        //全局公用的电话联系人之类的
        webLinks:{},
        //数据库购物车数量
        cartNum:0,
        //登陆状态
        token:Cookies.get('token'),
        user:Cookies.get('user')
    },
    getters:{},
    mutations:{
        //首页数据设置
        setPublic(state,data){
            state.webLinks = data;
        },
        //购物车数量设置
        setCartNum(state,data){
            state.cartNum = data;
        },
        //将token保存到Cookies里面,token表示登陆状态
        SET_TOKEN(state,data){
            state.token = data;
            Cookies.set('token', data, { expires: 7 });
        },
        //获取用户名
        GET_USER(state,data){
            state.user = data;
            Cookies.set('user', data, { expires: 7 });
        },
        //登出
        LOGOUT(state){
            state.token = null;
            state.user = null;
            Cookies.remove('token');
            Cookies.remove('user');
        }
    },
    actions:{
        //首页信息设置
        async getLinks(context) {
            let result = await getConfig();
            context.commit("setPublic",result);
        },
        //购物车数量获取
        async getCartNum(context){
            let result = await getCartAll();
            if(result === null){
                context.commit("setCartNum",0);
            }else {
                context.commit("setCartNum",result.length);
            }
        },
        //获取token（模拟）
        async checkLogin(context){
            let result = await sessionLogin();
            console.log(result);
            context.commit("SET_TOKEN",result.token);
        }
    }
});

Vue.config.productionTip = false;

new Vue({
    el:"#app",
    store: store,
    router:router,
    render: h => h(App)
});

export default store;
