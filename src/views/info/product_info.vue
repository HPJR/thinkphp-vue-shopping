<template>
    <!--pro_info-->
    <div class="pro_info">
        <div class="location">
            <div class="wrapper">
                <p>产品中心</p>
            </div>
        </div>
        <div class="wrapper">
            <div class="pro-img">
                <Carousel v-model="value1" loop>
                    <CarouselItem v-if="list.img1">
                        <div class="demo-carousel">
                            <img :src="list.img1 | filterImg"
                                 :alt="list.title"/>
                        </div>
                    </CarouselItem>
                    <CarouselItem v-if="list.img2">
                        <div class="demo-carousel">
                            <img :src="list.img2 | filterImg"
                                 :alt="list.title"/>
                        </div>
                    </CarouselItem>
                    <CarouselItem v-if="list.img3">
                        <div class="demo-carousel">
                            <img :src="list.img3 | filterImg"
                                 :alt="list.title"/>
                        </div>
                    </CarouselItem>
                    <CarouselItem v-if="list.img4">
                        <div class="demo-carousel">
                            <img :src="list.img4 | filterImg"
                                 :alt="list.title"/>
                        </div>
                    </CarouselItem>
                </Carousel>
                <Spin size="small" fix v-if="loadingStates.loadList"></Spin>
            </div>
            <div class="pro-con">
                <h3>{{ list.title }}</h3>
                <ul>
                    <li class="pro-price"><small>价格：</small><span>{{ list.price }}</span></li>
                    <li class="pro-price-old"><small>市场价：</small><span>{{ list.prices }}</span></li>
                    <li><small>库存：</small><span>有货</span></li>
                </ul>
                <div class="pdc_can_bottom">
                    <span>数量：</span>
                    <InputNumber v-model="value2" :min="1"></InputNumber>
                </div>
                <div class="pro-btn">
                    <div class="pro-btn-s">
                        <a @click="buyNow(list.id)">立即购买</a>
                        <Spin size="small" fix v-if="loadingStates.loadBuy"></Spin>
                    </div>
                    <div class="pro-btn-s">
                        <a href="javaScript:void(0);"  @click="pop_cart(list.id)"><i class="iconfont icon-31gouwuche"></i>加入购物车</a>
                        <Spin size="small" fix v-if="loadingStates.loadCart"></Spin>
                    </div>
                </div>
                <div class="pro-sc">
                    <a href="javaScript:void(0);" @click="pop_fav(list.id)">加入收藏</a>
                    <Spin size="small" fix v-if="loadingStates.loadFav"></Spin>
                </div>
                <Spin fix v-if="loadingStates.loadList"></Spin>
            </div>
            <div class="pro-always">
                <h3>看了又看</h3>
                <ul>
                    <li v-for="(item,index) in hotPro" v-if="index<2" :key="index">
                        <router-link :to="'/info/' + item.pid +'/'+ item.id">
                            <img :src="item.img | filterImg"
                                 :alt="item.title"/>
                            <span>{{ item.title | filterDate(10) }}</span>
                        </router-link>
                    </li>
                </ul>
                <Spin size="small" fix v-if="loadingStates.loadHost"></Spin>
            </div>
            <div class="pro-bot">
                <!--new-pro-->
                <div class="new-pro">
                    <h4>新品推荐</h4>
                    <ul>
                        <li v-for="(item,index) in hotPro" v-if="index>2&&index<7" :key="index">
                            <router-link :to="'/info/' + item.pid +'/'+ item.id">
                                <img :src="item.img | filterImg"
                                     :alt="item.title"/>
                                <b>￥{{ item.price }}</b>
                                <span>{{ item.title | filterDate(10) }}</span>
                            </router-link>
                        </li>
                    </ul>
                    <Spin size="small" fix v-if="loadingStates.loadHost"></Spin>
                </div>
                <div class="pro-bot-right">
                    <ul class="pro-ito">
                        <li>商品介绍</li>
                    </ul>
                    <div class="relative">
                        <div class="p_content" v-html="conImg(list.content)">
                            {{ list.content }}
                        </div>
                        <Spin fix v-if="loadingStates.loadList"></Spin>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    import {getDate,getProduct,addCartList,Fav} from '../../service/index';
    export default {
        data(){
            return{
                list:{},
                catname:'',
                value1: 0,
                value2:1,
                hotPro:[],
                proType:[],
                //loading状态
                loadingStates:{
                    loadList:true,
                    loadHost:true,
                    loadFav:false,
                    loadCart:false,
                    loadBuy:false
                }
            }
        },
        methods:{
            //图片路径过滤
            conImg(value){
                if(value){
                    if(process.env.NODE_ENV === 'development'){
                        value = value.replace(/\/Uploads\//g, "http://www.ff.tt/Uploads/");
                    }
                    else {
                        value = value.replace(/\/Uploads\//g, "http://test2.jianfly.com/Uploads/");
                    }
                }
                return value;
            },
            //热卖（每个前两条）
            async getList() {
                let result = await getDate();
                this.proType = result.proType;
                result.proType.forEach((item)=>{
                    if(item.pro){
                        item.pro.forEach((item2,index2)=>{
                            if(index2<2){
                                this.hotPro.push(item2);
                            }
                        });
                    }
                });
                this.loadingStates.loadHost = false;
            },
            //详情页内容
            async getInfo(){
                let result = await getProduct(this.$route.params.pid,this.$route.params.id);
                this.list = result.list;
                this.catname = result.catname;
                this.loadingStates.loadList = false;
            },
            //立即购买
            async buyNow(id){
                this.loadingStates.loadBuy = true;
                this.loadingStates.loadCart = false;
                let res = await this.pop_cart(id);
                if(res){
                    this.$router.push('/cart');
                }
                this.loadingStates.loadCart = false;
                this.loadingStates.loadBuy = false;
            },
            //加入购物车
            async pop_cart(id) {
                let bool = false;
                if (!this.$store.state.user) {
                    this.$Message.error('请先登录');
                    setTimeout(()=>{
                        this.$router.push('/login');
                    },1500);
                }else{
                    this.loadingStates.loadCart = true;
                    let result = await addCartList(id);
                    if(result.code === 0){
                        this.$store.dispatch('getCartNum');
                        this.$Message.success('加入成功');
                        bool = true;
                    } else {
                        this.$Message.error(result.msg);
                    }
                    this.loadingStates.loadCart = false;
                }
                return bool;
            },
            //加入收藏
            async pop_fav(id,index) {
                //检测是否登录
                if (!this.$store.state.user) {
                    this.$Message.error('请先登录');
                    setTimeout(()=>{
                        this.$router.push('/login');
                    },1500);
                }
                //检测收藏是否成功
                else {
                    this.loadingStates.loadFav = true;
                    let result = await Fav(id);
                    //收藏成功
                    if (result.state === true) {
                        this.$Message.success('收藏成功');
                    }
                    //收藏失败
                    else {
                        this.$Message.error(result.msg);
                    }
                    this.loadingStates.loadFav = false;
                }
            }
        },
        mounted(){
            this.getInfo();
            this.getList();
        }
    }
</script>
