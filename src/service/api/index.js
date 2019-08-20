//api 方法，里面调用后端提供的接口，供接口方法调用
import Ax from '../axios';
import qs from 'qs';

export default {
    //首页数据获取
    getIndex (reqData) {
        return Ax.get('/',{params: reqData});
    },

    //公用数据获取
    getPulic (reqData) {
        return Ax.get('/index/indexConfig',{params: reqData});
    },

    //搜索数据获取
    getSearch(keywords,reqData){
        return Ax.get('/search?keyword='+keywords,{params: reqData});
    },

    //登录检测
    loginStates(reqData){
        return Ax.get("/user/checkLg",{params: reqData});
    },

    //登录
    getLogin (email,password,reqData){
        return Ax.post('/User/dologin',qs.stringify({
                email:email,
                password:password
            }),{params: reqData}
        )
    },

    //注册
    getReg (email,password,code,reqData){
        return Ax.post('/User/doreg',qs.stringify({
                email:email,
                password:password,
                code:code
            }),{params: reqData}
        )
    },

    //异步校验邮箱号是否注册
    getEmail(email,reqData){
        return Ax.post('/User/emailCheck',qs.stringify({
                email:email,
            }),{params: reqData}
        )
    },

    //退出
    lgOut (reqData) {
        return Ax.post('/user/logOut',{params: reqData});
    },

    //新品上架栏目内容 /new
    newPro(id,reqData){
        return Ax.get('/new/index/'+'p/'+id,{params: reqData});
    },

    //热卖推荐栏目内容 /hot
    hotPro(id,reqData){
        return Ax.get('/hot/index/'+'p/'+id,{params: reqData});
    },

    //产品分类列表页展示
    getTypePro(id,num,reqData){
        return Ax.get('/product/product_type/type/'+id+'/p/'+num,{params: reqData});
    },

    //加入收藏
    getFav(id,reqData){
      return Ax.post('/fav/addFav/',qs.stringify({id:id}),{params: reqData});
    },

    //取消收藏
    getCancel(id,reqData){
        return Ax.post('/fav/delFav/',qs.stringify({id:id}),{params: reqData});
    },

    //展示收藏夹
    getAllFav(reqData){
        return Ax.get('/fav/index/',{params: reqData});
    },

    // 加入购物车
    getCart(id,reqData){
        return Ax.post('/cart/addCart',qs.stringify({id:id}),{params: reqData});
    },

    //购物车获取
    getCartList(reqData){
        return Ax.get('/cart/index',{params: reqData});
    },

    //购物车单个数据数量操作
    getCartNow(id,num,reqData){
        return Ax.post('/Cart/changeCart',qs.stringify({
            id:id,
            num:num
        }),{params: reqData});
    },

    //购物车删除
    delCartList(id,num,reqData){
        return Ax.post('/Cart/delCart',qs.stringify({
            id:id,
            num:num
        }),{params: reqData});
    },

    //购物车提交订单
    getCartOrder(idStr,reqData){
        return Ax.post('/Orders/addOrder',qs.stringify({
            string: idStr
        }),{params: reqData});
    },

    //产品详情页获取
    getProInfo(pid,id,reqData){
        return Ax.get('/product/'+pid+'_'+id,{params: reqData});
    },

    //获取服务列表
    getServiceList(reqData){
        return Ax.get('/service/index',{params: reqData});
    },

    //获取服务内容
    getService(pid,id,reqData){
        return Ax.get('/service/'+pid+'_'+id,{params: reqData});
    },

    //获取用户信息
    getUser(reqData){
        return Ax.get('/User/index',{params: reqData});
    },

    //设置用户信息
    setUser(name,relname,qq,mobile,reqData){
        return Ax.post('/User/docinfo',qs.stringify({
            name:name,
            relname:relname,
            qq:qq,
            mobile:mobile
        }),{params: reqData});
    },

    //获取当前提交订单的信息
    getNowOrd(reqData){
        return Ax.get('/Orders/doorder',{params: reqData});
    },

    //获取所有订单信息
    getOrder(id,reqData){
        return Ax.get('/Orders/myorder/p/'+id,{params: reqData});
    },

    //获取所有地址信息
    getAdd(reqData){
        return Ax.get('/User/myaddress',{params: reqData});
    },

    //新增地址
    getNowAdd(name,address,tel,zip,isdefault,reqData){
        return Ax.post('/User/addaddress',qs.stringify({
            name:name,
            address:address,
            tel:tel,
            zip:zip,
            default:isdefault,
        }),{params: reqData});
    },

    //删除地址
    delAdd(id,reqData){
        return Ax.post('/User/delAddress',qs.stringify({
            id:id
        }),{params: reqData});
    },

    //修改地址
    ReAdd(id,name,address,tel,zip,isdefault,reqData){
        return Ax.post('/User/docaddress',qs.stringify({
            id:id,
            name:name,
            address:address,
            tel:tel,
            zip:zip,
            default:isdefault,
        }),{params: reqData});
    },

    //提交订单
    subOrder(id,con,reqData){
        return Ax.post('/Orders/confirm',qs.stringify({
            addid:id,
            remark:con
        }),{params: reqData});
    },

    //确认收货
    confirmOd(id,reqData){
        return Ax.post('/Orders/confirmOrder',qs.stringify({
            id:id
        }),{params: reqData});
    },

    //删除订单
    delOd(id,reqData){
        return Ax.post('/Orders/delOrder',qs.stringify({
            id:id
        }),{params: reqData});
    },

    //支付
    pay(id,reqData){
        return Ax.get('/Pay/doalipay',qs.stringify({
            id:id
        }),{params: reqData});
    },

    //密码修改
    regPass(password,reqData){
        return Ax.post('/User/docpwd',qs.stringify({
            password:password
        }),{params: reqData});
    }
};
