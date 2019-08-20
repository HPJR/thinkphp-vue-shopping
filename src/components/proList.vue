<template>
    <div class="relative">
        <ul class="pro-list-li">
            <!--产品列表-->
            <li v-for="(item,index) in list" :key="index">
                <div class="p-img">
                    <router-link :to="'/info/' + item.pid +'/'+ item.id">
                        <img v-lazy ="'http://test2.jianfly.com/Uploads/'+item.img"
                             :alt="item.title"
                             data-src="item.img"
                        />
                    </router-link>
                </div>
                <div class="p-price"><em>￥</em><i>{{item.price}}</i></div>
                <div class="p-title">
                    <router-link :to="'/info/' + item.pid +'_'+ item.id">
                        {{ item.title | filterDate(35) }}
                    </router-link>
                </div>
                <div class="p-ito">
                    <i class="iconfont icon-shouhouwuyou"></i>
                    <i class="iconfont icon-pinpaizhuanxiang1"></i>
                    <i class="iconfont icon-servicequanguolianbao"></i>
                    <i class="iconfont icon-servicerushimiaoshu"></i>
                </div>
                <div class="p-cz">
                    <div class="p-cz-d">
                        <a @click="pop_fav(item.id,item)"  :class="{favAct:item.checked}">
                            <em>
                                <i class="iconfont icon-zan"></i>
                                <i class="iconfont icon-zanxuanzhong"></i>
                            </em>
                            <span>关注</span>
                        </a>
                        <Spin size="small" fix v-if="item.loadFav"></Spin>
                    </div>
                    <div class="p-cz-d">
                        <a @click="pop_cart(item,item.id)">
                            <i class="iconfont icon-31gouwuche"></i>
                            <span>加入购物车</span>
                        </a>
                        <Spin size="small" fix v-if="item.loadCart"></Spin>
                    </div>

                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import {Fav,showFav,cancelFav,addCartList} from '../service/index'

    export default {
        props: {
            pList: {
                type: Array,
                default: []
            }

        },
        computed: {
            list() {
                return this.pList
            },
            //token
            token(){
                return this.$store.state.token;
            }
        },
        data(){
            return{
                filterFav:[],
                loadingStates:{
                    loadFav:false,
                    loadCart:false
                }
            }
        },
        methods: {
            //存入数据库，多端访问
            //收藏
            async pop_fav(id,item) {
                //检测是否登录
                if (!this.$store.state.token) {
                    this.$Message.error('请先登录');
                    setTimeout(()=>{
                        this.$router.push('/login');
                    },1500);
                }
                //收藏或取消收藏
                else {
                    this.$set(item, "loadFav", true);
                    //检测是否已经收藏，ture=>取消收藏，false=>加入收藏
                    //取消收藏
                    if(item.checked){
                        console.log(item.checked);
                        console.log(item.gid);

                        let result = await cancelFav(item.gid);
                        if(result.code === 0){
                            item.checked = false;
                            this.$Message.success(result.msg);
                        }
                        else{
                            this.$Message.error(result.msg);
                        }
                        this.$set(item, "loadFav", false);
                    }
                    //加入收藏
                    else {
                        console.log(item.checked);
                        this.$set(item, "loadFav", true);
                        let result = await Fav(id);
                        //收藏成功
                        if (result.state === true) {
                            this.$Message.success('收藏成功');
                            this.$set(item, "checked", true);
                        }
                        //收藏失败
                        else {
                            this.$Message.error(result.msg);
                        }
                        await this.showAllFav();
                        this.$set(item, "loadFav", false);
                        console.log(item.gid);
                    }

                }
            },
            //显示收藏夹所有产品
            async showAllFav(){
                //是否登录
                if(this.token){
                    let result = await showFav();
                    if(result.fav){
                        this.list.forEach(item=>{
                            result.fav.forEach((item2)=>{
                                if(item2.gid === item.id){
                                    this.$set(item, "checked", true);
                                    this.$set(item, "gid", item2.id);
                                }
                            });
                        });
                    }
                }
            },
            //加入购物车
            async pop_cart(item,id) {
                //检测是否登录
                if (!this.$store.state.token) {
                    this.$Message.error('请先登录');
                    setTimeout(()=>{
                        this.$router.push('/login');
                    },1500);
                }
                else{
                    this.$set(item, "loadCart", true);
                    let result = await addCartList(id);
                    if(result.code === 0){
                        this.$Message.success('加入成功');
                        this.$store.dispatch('getCartNum');
                    } else {
                        this.$Message.error(result.msg);
                    }
                    this.$set(item, "loadCart", false);
                }
            }
        },
        created(){
            this.showAllFav();
        }
    }
</script>
