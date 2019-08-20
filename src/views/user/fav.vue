<template>
    <!--personal-->
    <div class="personal">
        <div class="wrapper">
            <sidebar></sidebar>
            <div class="personal_right">
                <h3 class="personal-title">关注的商品</h3>
                <div class="personal-con">
                    <h3 class="gz-tit"><span>所有商品</span></h3>
                    <div class="relative">
                        <ul class="pro-list-li">
                            <li v-for="(item,index) in listFav" :key="index">
                                <div class="p-img">
                                    <router-link :to="'/info/2/'+item.pro.id">
                                        <img :src="item.pro.img | filterImg"
                                             :alt="item.pro.title"/>
                                    </router-link>
                                </div>
                                <div class="p-price"><em>￥</em><i>{{ item.pro.price }}</i></div>
                                <div class="p-title">
                                    <a href="">{{ item.pro.title }}</a>
                                </div>
                                <div class="p-ito">
                                    <i class="iconfont icon-shouhouwuyou"></i>
                                    <i class="iconfont icon-pinpaizhuanxiang1"></i>
                                    <i class="iconfont icon-servicequanguolianbao"></i>
                                    <i class="iconfont icon-servicerushimiaoshu"></i>
                                </div>
                                <div class="p-cz">
                                    <div class="p-cz-d">
                                        <a href="javaScript:void(0);" @click="del_fav(item,index,item.id)" class="p-sc">
                                            <em>
                                                <i class="iconfont icon-zan"></i>
                                                <i class="iconfont icon-zanxuanzhong"></i>
                                            </em>
                                            <span>关注</span>
                                        </a>
                                        <Spin size="small" fix v-if="item.delFav"></Spin>
                                    </div>
                                    <div class="p-cz-d">
                                        <a  href="javaScript:void(0);"  @click="pop_cart(item,item.gid)">
                                            <i class="iconfont icon-31gouwuche"></i>
                                            <span>加入购物车</span>
                                        </a>
                                        <Spin size="small" fix v-if="item.loadCart"></Spin>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <Spin size="small" fix v-if="loadingStates.loadFav"></Spin>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import sidebar from '../public/sidebar'
    import proList from '../../components/proList'
    import {showFav,addCartList,cancelFav} from '../../service/index';

    export default {
        components:{
            sidebar,
            proList
        },
        data(){
            return{
                listFav:[],
                loadingStates:{
                    loadFav:true
                }
            }
        },
        methods:{
            //获取收藏
            async getFav(){
                let result = await showFav();
                this.listFav = result.fav;
                this.loadingStates.loadFav = false;
                console.log(result);
            },
            //加入购物车
            async pop_cart(item,id) {
                this.$set(item,'loadCart',true);
                let result = await addCartList(id);
                if(result.code === 0){
                    this.$store.dispatch('getCartNum');
                    this.$Message.success('加入成功');
                } else {
                    this.$Message.error(result.msg);
                }
                this.$set(item,'loadCart',false);
            },
            //取消收藏
            async del_fav(item,index,id){
                this.$set(item,'delFav',true);
                let result = await cancelFav(id);
                if(result.code === 0){
                    this.$Message.success(result.msg);
                    this.listFav.splice(index,1);
                }
                else{
                    this.$Message.error(result.msg);
                }
            }
        },
        created(){
            this.getFav();
        }
    }
</script>

<style scoped>

</style>
