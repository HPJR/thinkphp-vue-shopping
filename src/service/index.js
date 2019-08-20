//接口方法，里面调用 api 方法，供页面级调用
import Api from './api';
import Ax from "./axios";

//首页
export async function getDate(reqData) {
    let res = await Api.getIndex(reqData);
    return res;
}

//公共信息获取
export async function getConfig(reqData) {
    let res = await Api.getPulic(reqData);
    return res;
}

//搜索数据获取
export async function searchSome(keywords,reqData){
    let res = await Api.getSearch(keywords,reqData);
    return res;
}

//登录检测
export async function sessionLogin(reqData){
    let res = await Api.loginStates(reqData);
    return res;
}

//登录
export async function loginIn(email,password,reqData) {
    let res = await Api.getLogin(email,password,reqData);
    return res;
}

//注册
export async function regUser(email,password,code,reqData) {
    let res = await Api.getReg(email,password,code,reqData);
    return res;
}

//异步校验邮箱号是否注册
export async function checkEmail(email,reqData){
    let res = await Api.getEmail(email,reqData);
    return res;
}

//退出登录
export async function loginOut(reqData) {
    let res = await Api.lgOut(reqData);
    return res;
}

//新品上架栏目内容
export async function getNewPro(id,reqData) {
    let res = await Api.newPro(id,reqData);
    return res;
}

//热卖推荐栏目内容
export async function getHotPro(id,reqData) {
    let res = await Api.hotPro(id,reqData);
    return res;
}

//产品分类列表页展示
export async function getProList(id,num,reqData){
    let res = await Api.getTypePro(id,num,reqData);
    return res;
}

//收藏
export async function Fav(id,reqData) {
  let res = await Api.getFav(id,reqData);
  return res;
}

//取消收藏
export async function cancelFav(id,reqData) {
    let res = await Api.getCancel(id,reqData);
    return res;
}

//展示收藏夹
export async function showFav(reqData) {
    let res = await Api.getAllFav(reqData);
    return res;
}

// 加入购物车
export async function addCartList(id,reqData){
    let res = await Api.getCart(id,reqData);
    return res;
}

// 获取购物车
export async function getCartAll(reqData){
    let res = await Api.getCartList(reqData);
    return res;
}

//购物车单个数据数量操作
export async function getCartNowNum(id,num,reqData) {
    let res = await Api.getCartNow(id,num,reqData);
    return res;
}

//购物车删除
export async function delCartNow(id,num,reqData){
    let res = await Api.delCartList(id,num,reqData);
    return res;
}


//购物车提交订单结算
export async function addCartOrder(idStr,reqData){
    let res = await Api.getCartOrder(idStr,reqData);
    return res;
}

// 产品详情页
export async function getProduct(pid,id,reqData){
    let res = await Api.getProInfo(pid,id,reqData);
    return res;
}

//获取服务列表
export async function serviceList(reqData){
    let res = await Api.getServiceList(reqData);
    return res;
}

//获取服务内容
export async function getServiceInfo(pid,id,reqData){
    let res = await Api.getService(pid,id,reqData);
    return res;
}

//获取用户信息
export async function getUserInfo(reqData){
    let res = await Api.getUser(reqData);
    return res;
}

// 设置用户信息
export async function setUserInfo(name,relname,qq,mobile,reqData) {
    let res = await Api.setUser(name,relname,qq,mobile,reqData);
    return res;
}

//获取当前提交订单的信息
export async function getOd(reqData){
    let res = await Api.getNowOrd(reqData);
    return res;
}

//获取订单信息
export async function getMyOrder(id,reqData){
    let res = await Api.getOrder(id,reqData);
    return res;
}

//获取所有地址信息
export async function getAddress(reqData){
    let res = await Api.getAdd(reqData);
    return res;
}

//新增地址
export async function addNow(name,address,tel,zip,isdefault,reqData){
    let res = await Api.getNowAdd(name,address,tel,zip,isdefault,reqData);
    return res;
}

//删除地址
export async function delNowAdd(id,reqData){
    let res = await Api.delAdd(id,reqData);
    return res;
}

//修改地址
export async function GetReAdd(id,name,address,tel,zip,isdefault,reqData){
    let res = await Api.ReAdd(id,name,address,tel,zip,isdefault,reqData);
    return res;
}

//提交订单
export async function getSubOrder(id,con,reqData){
    let res = await Api.subOrder(id,con,reqData);
    return res;
}

//确认收货
export async function confirmSome(id,reqData){
    let res = await Api.confirmOd(id,reqData);
    return res;
}

//删除订单
export async function delNowOd(id,reqData){
    let res = await Api.delOd(id,reqData);
    return res;
}

//支付
export async function payOd(id,reqData){
    let res = await Api.pay(id,reqData);
    return res;
}

//密码修改
export async function changePass(password,reqData){
    let res = await Api.regPass(password,reqData);
    return res;
}
