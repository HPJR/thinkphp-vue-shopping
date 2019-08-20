<template>
    <div>
        <div class="header_banner" style="position: relative;min-height: 300px;">
            <template>
                <Carousel>
                    <Carousel-item  v-for="item in flash">
                        <div class="demo-carousel">
                            <img :src="item.img | filterImg"
                                 :alt="item.title"/>
                        </div>
                    </Carousel-item>
                </Carousel>
            </template>
            <Spin size="large" fix v-if="load"></Spin>
        </div>
        <div class="home-wrap">
            <div class="wrapper">
                <div class="hot-sale">
                    <h3>热销品牌<small>Popular brand</small></h3>
                    <div>
                        <ul style="position: relative;">
                            <li v-for="item in brand">
                                <img :src="item.img | filterImg"
                                     :alt="item.title"/>
                            </li>
                        </ul>
                        <Spin size="large" fix v-if="load"></Spin>
                    </div>
                </div>
                <div class="hot-rm">
                    <h3>热卖推荐<small>Hot & recommended</small></h3>
                    <div class="relative">
                        <ul>
                            <li class="hot-li" v-for="item in hot">
                                <router-link :to="'/info/' + item.pid +'/'+ item.id">
                                    <img :src="item.img | filterImg"
                                         :alt="item.title"/>
                                    <span>{{ item.title | filterDate(26) }}</span>
                                    <b>￥{{ item.price }}</b>
                                </router-link>
                                <i class="iconfont icon-gouwuche" @click="pop_cart(item,item.id)"></i>
                                <Spin size="small" fix v-if="item.loadCart"></Spin>
                            </li>
                        </ul>
                        <img src="../../assets/images/rm.png" alt="热门" style="display: block;"/>
                        <Spin size="large" fix v-if="load"></Spin>
                    </div>
                </div>

                <div class="home-pro relative"
                     v-for="(item,index) in proType"
                     :key="index"
                     v-if="index<3" style="position: relative">
                    <div class="home-pro-t">
                        <h3>{{ item.name }}<small>{{ item.keywords }}</small></h3>
                    </div>
                    <router-link :to="'/product/'+ item.id">
                        <img :src="item.img | filterImg"
                             :alt="item.title"/>
                    </router-link>
                    <ul>
                        <li class="hot-li"
                            v-for="(ele,index) in item.pro"
                            :key="index"
                            v-if="index<2">
                            <router-link :to="'/info/' + ele.pid +'/'+ ele.id">
                                <img :src="ele.img | filterImg"
                                     :alt="ele.title"/>
                                <span>{{ ele.title | filterDate(26) }} </span>
                                <b>￥{{ ele.price }}</b>
                            </router-link>
                        </li>
                    </ul>
                    <ul>
                        <li class="hot-li"
                            v-for="(ele,index) in item.pro"
                            :key="index"
                            v-if="index>1 && index<6">
                            <router-link :to="'/info/' + ele.pid +'/'+ ele.id">
                                <img :src="ele.img | filterImg"
                                     :alt="ele.title"/>
                                <span>{{ ele.title | filterDate(26) }} 26</span>
                                <b>￥{{ ele.price }}</b>
                            </router-link>
                        </li>
                    </ul>
                    <Spin size="large" fix v-if="load"></Spin>
                </div>

            </div>
        </div>

    </div>

</template>
<script>
    import {getDate,addCartList} from '../../service/index';

    export default {
        data(){
            return{
                flash:[],
                brand:[],
                hot:[],
                proType:[],
                load:true
            }
        },
        methods: {
            //首页信息设置
            async getList() {
                let result = await getDate();
                this.load = false;
                this.flash = result.flash;
                this.brand = result.brand;
                this.hot = result.hot;
                this.proType = result.proType;
            },
            //加入购物车
            async pop_cart(item,id) {
                this.$set(item,'loadCart',true);
                this.cartLoad = true;
                let result = await addCartList(id);
                if(result.code === 0){
                    this.$store.dispatch('getCartNum');
                    this.$Message.success('加入成功');
                    this.$set(item,'loadCart',false);
                } else {
                    this.$Message.error(result.msg);
                }
            },
        },
        created(){
            this.getList();
        }
    }
</script>
<style>
    .demo-carousel img{max-width: 100%;}
</style>
