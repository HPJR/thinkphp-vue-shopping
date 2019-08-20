<template>
    <div>
        <!--顶部热卖-->
        <div class="relative">
            <hot :hPro="hotPro"></hot>
            <Spin size="large" fix v-if="loadingStates.loadList"></Spin>
        </div>
        <!--shop-type-->
        <div style="position: relative;">
            <div class="shop-type wrapper">
                <p>商品分类</p>
                <ul>
                    <li v-for="item in proType">
                        <router-link :to="'/product/' + item.id">{{ item.name }}</router-link>
                    </li>
                </ul>
            </div>
            <Spin size="large" fix v-if="loadingStates.loadList"></Spin>
        </div>

        <!--main-product-->
        <div class="main-product wrapper">
            <!--侧边栏-->
            <div class="sb_left">
                <proSidebar :sidebarList="hotPro"></proSidebar>
                <Spin size="large" fix v-if="loadingStates.loadList"></Spin>
            </div>
            <!--pro-list-list-->
            <div class="pro-list relative">
                <!--排序及产品-->
                <sortType :sortList="list"></sortType>
                <!--分页-->
                <page :count="count" :listRows="listRows" @getPage="changePage"></page>
                <Spin size="large" fix v-if="loadingStates.newList"></Spin>
            </div>

        </div>
    </div>
</template>
<script>
    import {getDate,getHotPro} from '../../service/index';
    import page from '../../components/page';
    import proSidebar from '../../components/proSidebar';
    import hot from '../../components/hotPro';
    import sortType from '../../components/sortType';

    export default {
        components:{
            page,
            proSidebar,
            hot,
            sortType
        },
        data(){
            return{
                //热卖
                hotPro:[],
                //分类
                proType:[],
                list:[],
                //分页总数
                count:0,
                //每页展示数
                listRows:0,
                //当前页
                pageNow:1,
                //loading状态
                loadingStates:{
                    loadList:true,
                    newList:true
                }
            };
        },
        methods:{
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
                this.loadingStates.loadList = false;
            },
            //新品列表及页码
            async getNewList(){
                let result = await getHotPro(this.pageNow);
                this.list = result.list;
                this.count = Number(result.count);
                this.listRows = Number(result.page.listRows);
                this.loadingStates.newList = false;
            },
            //页码更新
            changePage(value){
                this.list = [];
                this.loadingStates.newList = true;
                this.pageNow = value;
                this.getNewList();
                window.scrollTo(0,500);
            },
        },
        created(){
            this.getList();
            this.getNewList();
        }
    };
</script>
