<template>
    <footer>
        <div class="f-int">
            <ul class="wrapper">
                <li> <i class="iconfont icon-servicezhengpinbaozhang"></i> <p><b>正品低价</b><small>正品行货 品质保障</small></p> </li>
                <li> <i class="iconfont icon-serviceanshidaohuo"></i> <p><b>品类齐全</b><small>品类齐全 选择丰富</small></p> </li>
                <li> <i class="iconfont icon-servicerushimiaoshu"></i> <p><b>诚信卖家</b><small>全程监管 安全诚信</small></p> </li>
                <li> <i class="iconfont icon-serviceshandianfahuo"></i> <p><b>快速配送</b><small>多仓直发 极速配送</small></p> </li>
                <li> <i class="iconfont icon-31pinpai"></i> <p><b>售后无忧</b><small>品质售后 购物无忧</small></p> </li>
            </ul>
        </div>
        <div class="f-cen">
            <div class="wrapper">
                <dl>
                    <dt>
                        购物指南
                    </dt>
                    <dd>
                        <router-link to="/reg">新用户注册</router-link>
                    </dd>
                    <dd>
                        <router-link to="/service/15/3">购物流程</router-link>
                    </dd>
                </dl>
                <dl>
                    <dt>
                        支付方式
                    </dt>
                    <dd>
                        <a>货到付款</a>
                    </dd>
                    <dd>
                        <a>银联卡支付</a>
                    </dd>
                    <dd>
                        <a>支付宝</a>
                    </dd>
                    <dd>
                        <a>财付通</a>
                    </dd>
                    <dd>
                        <a>优惠卡券</a>
                    </dd>
                </dl>
                <dl>
                    <dt>
                        配送服务
                    </dt>
                    <dd>
                        <router-link to="/service/15/4">配送方式</router-link>
                    </dd>
                    <dd>
                        <router-link to="/service/15/6">便利店自提</router-link>
                    </dd>
                </dl>
                <dl>
                    <dt>
                        售后服务
                    </dt>
                    <dd>
                        <router-link to="/service/15/7">退货说明</router-link>
                    </dd>
                </dl>
                <dl>
                    <dt>
                        常见问题
                    </dt>
                    <dd>
                        <router-link to="/service/15/9">账户问题</router-link>
                    </dd>
                    <dd>
                        <router-link to="/service/15/10">发票问题</router-link>
                    </dd>
                    <dd>
                        <router-link to="/service/15/11">订单问题</router-link>
                    </dd>
                    <dd v-if="config">
                        <a :href="'tencent://message/?Menu=yes&amp;uin='+ config.qq +'&amp; Service=300&amp;sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45'">在线客服</a>
                    </dd>
                </dl>
                <div class="f-cen-ewm">
                    <img src="../../assets/images/ewm.jpg" alt="扫一扫" />扫一扫
                </div>
                <div class="f-cen-tel">
                    <p><i class="icon iconfont icon-31dianhua"></i><span>客服热线：</span></p>
                    <b v-if="config">{{config.tel}}</b>
                    <small>周一至周五 8:30-18:00</small>
                </div>
            </div>
        </div>
        <div class="f-bottom"  v-if="config">
            {{config.web_name}} 地址：{{config.address}} 手机：{{config.mobile}} QQ：{{config.qq}} 网址：{{config.web_url}}
            <span> Copyright &copy; {{config.web_name}} All rights reserved
            </span>
        </div>
    </footer>
</template>

<script>
    export default {
        computed:{
            //网站基本信息
            config(){
                return this.$store.state.webLinks.config;
            },
        },
        methods: {

        },
        created(){
            this.$store.dispatch('getLinks');
        }
    }
</script>
