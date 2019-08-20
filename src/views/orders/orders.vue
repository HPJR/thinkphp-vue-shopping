<template>
    <div>
        <!--personal-->
        <div class="personal">
            <div class="wrapper">
                <sidebar></sidebar>
                <div class="personal_right">
                    <h3 class="personal-title">我的订单</h3>
                    <div class="personal-con">
                        <div class="personal-dd">
                            <div class="personal-dd-tit">
                                <ul>
                                    <li class="tit_active"><a href="">全部订单</a></li>
                                    <!--<li><a href="">待付款</a></li>-->
                                </ul>
                            </div>
                            <div class="relative">
                                <Spin size="large" fix v-if="loadingStates.loadOrder"></Spin>
                                <table class="tb-dd">
                                    <colgroup>
                                        <col class="img-col"/>
                                        <col class="link-col"/>
                                        <col class="num-col"/>
                                        <col class="status-col"/>
                                        <col class="operate-col"/>
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>订单详情</th>
                                        <th>收货人</th>
                                        <th>金额</th>
                                        <th>全部状态</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody v-for="(item,index) in list" :key="index">
                                    <tr class="sep-tit">
                                        <td colspan="5">
                                            <span>{{ item.time }}</span>
                                            <span>订单号： <b>{{ item.id }}</b></span>
                                        </td>
                                    </tr>
                                    <tr class="sep-img" v-for="vo in item.detail">
                                        <td class="sep-td">
                                            <img :src="vo.img | filterImg"
                                                 :alt="vo.title"/>
                                            <span>
                            			    <router-link :to="'/info/1/'+vo.gid">{{ vo.title }}</router-link>
                                        </span>
                                            <small>*{{vo.num}}</small>
                                        </td>
                                        <td><b>{{ item.name }}</b></td>
                                        <td><span>总额 ¥  {{ item.money }} </span><span>在线支付</span></td>
                                        <td>
                                        <span>
                                            <small v-if="item.state === '0'" @click="payNow(item.id)">未支付</small>
                                            <small v-if="item.state === '1'">待发货</small>
                                            <small v-if="item.state === '2'" @click="confirmorder(item.id)">待确认收货</small>
                                            <small v-if="item.state === '3'">已完成</small>
                                            <!--<eq name="vo.state" value="0"><a href="{:U('Pay/doalipay',array('id'=>$vo['id']))}">未支付</a></eq>-->
                                            <!--<eq name="vo.state" value="1">待发货</eq>-->
                                            <!--<eq name="vo.state" value="2"><a href="javaScript:void(0);" onclick="confirmorder({$vo.id})">待确认收货</a></eq>-->
                                            <!--<eq name="vo.state" value="3">已完成</eq>-->
										</span>
                                        </td>
                                        <td><span><router-link :to="'/info/2/'+vo.gid" class="a_ljgm">再次购买</router-link></span></td>
                                    </tr>
                                    <tr class="pay_money" style="position: relative;">
                                        <td></td>
                                        <td></td>
                                        <td style="font-size: 12px;color: #333" v-if="item.money < 10">总价格：{{ item.money }} ( 运费10元 )</td>
                                        <td style="font-size: 12px;color: #333" v-if="item.money > 10">总价格：{{ item.money }} ( 包邮 )</td>
                                        <td><a href="javaScript:void(0);" @click="delorder(index,item.id)" style="display: block;background: none;font-size: 13px;color: #333;">删除订单</a></td>
                                        <td>
                                            <a v-if="item.state === '0'" @click="payNow(item.id)">未支付</a>
                                        </td>
                                    </tr>
                                    <tr class="sep-row" style="height: 8px;"><td colspan="5"></td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <!--分页-->
                            <page v-if="list.length>1" :count="count" :listRows="listRows" @getPage="changePage"></page>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import sidebar from '../public/sidebar'
    import {getMyOrder,confirmSome,delNowOd,payOd} from '../../service/index';
    import page from '../../components/page';

    export default {
        components:{
            sidebar,
            page
        },
        data() {
            return {
                list:[],
                //分页总数
                count:0,
                //每页展示数
                listRows:0,
                //当前页
                pageNow:1,
                loadingStates:{
                    loadOrder:true
                }
            }
        },
        computed: {},
        methods: {
            //获取订单
            async getOrd(){
                let result = await getMyOrder(this.pageNow);
                console.log(result);
                if(result.order){
                    this.list = result.order;
                    this.count = Number(result.count);
                    this.listRows = Number(result.page.listRows);
                }
                this.loadingStates.loadOrder = false;
            },
            //页码更新
            changePage(value){
                this.loadingStates.loadOrder = true;
                this.pageNow = value;
                this.getOrd();
                window.scrollTo(0,500);
            },
            //支付( 接口有问题 )
            async payNow(id){
                let result = await payOd(id);
                console.log(result);
            },
            //删除订单
            async delorder(index,id){
                this.loadingStates.loadOrder = true;
                let result = await delNowOd(id);
                if(result.code === 0){
                    this.$Message.success(result.msg);
                    this.list.splice(index,1)
                }else {
                    this.$Message.error(result.msg);
                }
                this.loadingStates.loadOrder = false;
            },
            //确认收货
            async confirmorder(id){
                let result = await confirmSome(id);
                console.log(result);
            }
        },
        created() {
            this.getOrd();
            this.$store.dispatch('getCartNum');
        }
    }
</script>
<style scoped>
    tbody::before
    {
        content: '';
        display: block;
        height: 30px;

    }
    .page_iview{margin-top: 20px;}
</style>
