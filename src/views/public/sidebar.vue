<template>
    <div class="personal_left">
        <dl>
            <dt>订单中心</dt>
            <dd><router-link to="/myorder">我的商城订单</router-link></dd>
        </dl>
        <dl>
            <dt>关注中心</dt>
            <dd><router-link to="/fav">关注的商品</router-link></dd>
            <dd><router-link to="/cart">我的购物车</router-link></dd>
        </dl>
        <dl style="height: 244px;position: relative;">
            <dt>客户服务</dt>
            <dd v-for="item in serList">
                <router-link :to="/service/+item.pid+'/'+item.id">
                    {{item.title}}
                </router-link>
            </dd>
            <dd><a href="http://www.kuaidi100.com/" target="_blank">配送查询</a></dd>
            <dd><a href="tencent://message/?Menu=yes&uin={$config.qq}& Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45">在线客服</a></dd>
        </dl>
        <dl>
            <dt>设置</dt>
            <dd><router-link to="/user">个人信息</router-link></dd>
            <dd><router-link to="/myaddress">收货地址</router-link></dd>
            <dd><router-link to="/password">密码修改</router-link></dd>
        </dl>
    </div>
</template>
<script>
    import {serviceList} from '../../service/index';

    export default {
        data() {
            return {
                serList:[]
            }
        },
        methods: {
            async getList(){
                let result = await serviceList();
                this.serList = result;
            }
        },
        created() {
            this.getList();
        }
    }
</script>
<style>
    .sidebar .ivu-spin-fix{background: rgba(245, 245, 245, 0.91) !important;}
</style>
