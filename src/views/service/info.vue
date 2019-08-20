<template>
    <!--personal-->
    <div class="personal">
        <div class="wrapper">
            <sidebar></sidebar>
            <div class="personal_right">
                <h3 class="personal-title">购物流程</h3>
                <div class="personal-con">
                    <div class="p_content">
                        <p v-html=" news['content']">{{ news['content'] }}</p>
                    </div>
                    <Spin fix v-if="loadingStates.newInfo"></Spin>
                </div>

            </div>
        </div>
    </div>

</template>
<script>
    import sidebar from '../public/sidebar'
    import {getServiceInfo} from '../../service/index';
    export default {
        components:{
            sidebar
        },
        data() {
            return {
                news:{},
                //loading状态
                loadingStates:{
                    newInfo:true
                }
            }
        },
        methods: {
            async getInfo(){
                let result = await getServiceInfo(this.$route.params.pid,this.$route.params.id);
                this.news = result;
                this.loadingStates.newInfo = false;
            }
        },
        created(){
            this.getInfo();
        }
    }
</script>
