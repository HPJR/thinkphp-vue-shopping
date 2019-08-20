<template>
    <!--type-hot-->
    <div class="type-hot wrapper">
        <p><span>热卖推荐</span></p>
        <ul>
            <li v-for="item in hotPro">
                <router-link :to="'/info/' + item.pid +'/'+ item.id">
                    <img :src="item.img | filterImg"
                         :alt="item.title"/>
                    <div>
                        <span>{{ item.title | filterDate(10) }}</span>
                        <b>￥{{ item.price }}</b>
                        <small>立即抢购</small>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props:{
            hPro:{
                type:Array,
                default:[]
            }
        },
        computed: {
            hotPro(){
                return this.hPro
            }
        },
        methods: {},
        created() {

        }
    }
</script>
