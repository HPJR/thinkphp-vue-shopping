<template>
    <div>
        <!-- header -->
        <header>
            <!-- header-top -->
            <div class="header-top">
                <div class="wrapper">
                    <p>
                        <span>您好，欢迎来到香哆哆休闲食品</span>
                        <span>
                            <small v-if="userName">
                                <router-link to="/user">{{ userName }}</router-link>
                                <router-link to="/login" v-if="!token">请登录</router-link>
                                <a href="javascript:void(0)" @click="Out" v-if="token">退出</a>
                            </small>
                            <small v-else>
                                <router-link to="/login">请登录</router-link>
                                <router-link to="/reg">免费注册</router-link>
                            </small>
				        </span>
                    </p>
                    <ul>
                        <li><router-link to="/user">会员中心</router-link></li>
                        <li><router-link to="/orders">我的订单</router-link></li>
                        <li><router-link to="/fav">我的收藏</router-link></li>
                    </ul>
                </div>
            </div>
            <!--header-logo-->
            <div class="header-logo wrapper">
                <h1><router-link to="/index">香哆哆休闲食品</router-link></h1>
                <div class="header-logo-search">
                    <form method="get" class="registerform">
                        <i class="iconfont icon-sousuo"></i>
                        <input name="keyword" type="text" v-model="val" class="inputxt" @keyup.enter="searchNow" onkeypress="if(event.keyCode == 13) return false;">
                        <input type="button" @click="searchNow" value="搜索"/>
                    </form>
                    <p>
                        <router-link :to="'/product/'+ item.id"
                                     v-for="(item,index) in proType"
                                     :key="index"
                                     v-if="index<4">
                            {{ item.name }}
                        </router-link>
                    </p>
                </div>
                <div class="header-logo-cart">
                    <p>
                        <router-link to="/cart">
                            <i class="iconfont icon-31gouwuchexuanzhong"></i>
                            <span>购物车</span>
                        </router-link>
                    </p>
                    <b>{{ cartNum }}</b>
                </div>
            </div>
            <!--nav-->
            <nav>
                <div class="wrapper">
                    <div class="nav-all" @mouseenter='enterNav' @mouseleave="enterNav">
                        <p>
                            <i class="iconfont icon-fenlei"></i>
                            <span>所有食品分类</span>
                        </p>
                        <ul class="nav-all-ul" v-if="navShow">
                            <li v-for="item in proType">
                                <router-link :to="'/product/'+item.id">
                                    <i class="iconfont icon-hanbao"></i>
                                    <span>{{ item.name }}</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <ul class="nav-other">
                        <li><router-link to="/index">首页</router-link></li>
                        <li><router-link to="/new">新品上架</router-link></li>
                        <li><router-link to="/hot">热卖推荐</router-link></li>
                        <li><router-link to="/service/15/3">购物流程</router-link></li>
                        <li><router-link to="/contact">联系我们</router-link></li>
                    </ul>
                </div>
            </nav>
        </header>
    </div>
</template>

<script>
    import {loginOut} from '../../service/index';

    export default {
        data(){
          return{
              //导航显示/隐藏
              navShow:false,
              val:''
          }
        },
        computed:{
            //网站基本信息
            config(){
                return this.$store.state.webLinks.config;
            },
            // 分类信息
            proType(){
                return this.$store.state.webLinks.proType;
            },
            userName(){
                return this.$store.state.user;
            },
            //token
            token(){
                return this.$store.state.token;
            },
            cartNum(){
                if(this.$store.state.cartNum && this.$store.state.user){
                    return this.$store.state.cartNum
                }else {
                    return 0;
                }
            }
        },
        methods: {
            //导航切换
            enterNav(){
              this.navShow = !this.navShow;
            },
            //退出登录
            async Out(){
                let result = await loginOut();
                console.log(result);
                if(result.code === '01'){
                     this.$Message.success('退出成功');
                     this.$store.commit('LOGOUT');
                     setTimeout(()=>{
                         this.$router.push('/index');
                     },1500)
                }else{
                     this.$Message.warning('稍后再试');
                }
            },
            //搜索
            searchNow(){
                if(this.val !==''){
                    this.$router.push({path: '/search',query:{val: this.val}});
                    console.log(1);
                    this.val = '';
                    window.scrollTo(0,600);
                }
            }
        },
        created(){
            //公用信息获取
            this.$store.dispatch('getLinks');
            //购物车数量获取
            this.$store.dispatch('getCartNum');
            //登陆状态获取
            this.$store.dispatch('checkLogin');
        }
    }
</script>
