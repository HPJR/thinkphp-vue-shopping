const routers = [
    {
        path:'/index',
        meta:{
            title:'网站首页'
        },
        components:{
            default:(resolve) => require(['./views/index/index.vue'],resolve),
            header:(resolve) => require(['./views/public/shopHeader'],resolve),
        },
    },
    {
        path:'/search',
        meta:{
            title:'搜索'
        },
        components:{
            default:(resolve) => require(['./views/search/search.vue'],resolve),
            header:(resolve) => require(['./views/public/shopHeader'],resolve),
        },
    },
    {
        path:'/new',
        meta:{
            title:'新品推荐'
        },
        components:{
            default:(resolve) => require(['./views/new/new.vue'],resolve),
            header:(resolve) => require(['./views/public/shopHeader'],resolve),
        },
    },
    {
        path:'/hot',
        meta:{
            title:'热卖推荐'
        },
        components:{
            default:(resolve) => require(['./views/hot/hot.vue'],resolve),
            header:(resolve) => require(['./views/public/shopHeader'],resolve),
        },
    },
    {
      path:'/product/:id',
      meta:{
        title:'产品中心'
      },
      components:{
        default:(resolve) => require(['./views/product/product.vue'],resolve),
        header:(resolve) => require(['./views/public/shopHeader'],resolve),
      },
    },
    {
        path:'/info/:pid/:id',
        meta:{
            title:'产品详情页'
        },
        components:{
            default:(resolve) => require(['./views/info/product_info.vue'],resolve),
            header:(resolve) => require(['./views/public/shopHeader'],resolve),
        },
    },
    {
        path:'/service/:pid/:id',
        meta:{
            title:'购物流程'
        },
        components:{
            default:(resolve) => require(['./views/service/info.vue'],resolve),
            header:(resolve) => require(['./views/public/shopHeader'],resolve),
        },
    },
    {
        path:'/contact',
        meta:{
            title:'联系我们'
        },
        components:{
            default:(resolve) => require(['./views/contact/contact.vue'],resolve),
            header:(resolve) => require(['./views/public/shopHeader'],resolve),
        },
    },
    {
        path:'/user',
        meta:{
            title:'个人中心',
            requireAuth:true
        },
        components:{
            default:(resolve) => require(['./views/user/user.vue'],resolve),
            header:(resolve) => require(['./views/public/shopHeader'],resolve),
        },
    },
    {
        path:'/login',
        meta:{
            title:'用户登录'
        },
        component:(resolve) => require(['./views/login/login.vue'],resolve),
    },
    {
        path:'/reg',
        meta:{
            title:'用户注册'
        },
        component:(resolve) => require(['./views/login/reg.vue'],resolve)
    },
    {
        path:'/cart',
        meta:{
            title:'购物车',
            requireAuth:true
        },
        components:{
            default:(resolve) => require(['./views/cart/cart.vue'],resolve),
            header:(resolve) => require(['./views/public/shopHeader'],resolve),
        },
    },
    {
        path:'/orders',
        meta:{
            title:'订单列表页',
            requireAuth:true
        },
        components:{
            default:(resolve) => require(['./views/orders/orders.vue'],resolve),
            header:(resolve) => require(['./views/public/shopHeader'],resolve),
        },
    },
    {
        path:'/doorder',
        meta:{
            title:'提交订单页',
            requireAuth:true
        },
        components:{
            default:(resolve) => require(['./views/orders/doorder.vue'],resolve),
            header:(resolve) => require(['./views/public/shopHeader'],resolve),
        },
    },
    {
        path:'/myaddress',
        meta:{
            title:'地址修改',
            requireAuth:true
        },
        components:{
            default:(resolve) => require(['./views/address/myaddress.vue'],resolve),
            header:(resolve) => require(['./views/public/shopHeader'],resolve),
        },
    },
    {
        path:'/fav',
        meta:{
            title:'我的收藏',
            requireAuth:true
        },
        components:{
            default:(resolve) => require(['./views/user/fav.vue'],resolve),
            header:(resolve) => require(['./views/public/shopHeader'],resolve),
        },
    },
    {
        path:'/password',
        meta:{
            title:'修改密码',
            requireAuth:true
        },
        components:{
            default:(resolve) => require(['./views/user/password.vue'],resolve),
            header:(resolve) => require(['./views/public/shopHeader'],resolve),
        },
    },
    {
        path:'*',
        redirect:'/index'
    }
];
export default routers;
