<template>
    <!--new-pro-->
    <div class="new-pro">
        <h4>新品推荐</h4>
        <ul>
            <li v-for="(item,index) in hotPro" v-if="index<6" :key="index">
                <router-link :to="'/info/' + item.pid +'/'+ item.id">
                    <img :src="item.img | filterImg"
                         :alt="item.title"/>
                    <b>￥{{ item.price }}</b>
                    <span>{{ item.title | filterDate(10) }}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props:{
            sidebarList:{
                type:Array,
                default:[]
            }
        },
        computed: {
            hotPro(){
                return this.sidebarList
            }
        },
        methods: {

        },
        created() {

        }
    }
</script>
