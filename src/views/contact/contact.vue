<template>
    <div>
        <!--personal-->
        <div class="personal">
            <div class="wrapper">
                <sidebar></sidebar>
                <div class="personal_right">
                    <h3 class="personal-title">联系我们</h3>
                    <div class="personal-con">
                        <div id="allmap">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import sidebar from '../public/sidebar'
    export default {
        components:{
            sidebar
        },
        computed:{
            //网站基本信息
            config(){
                return this.$store.state.webLinks.config;
            },
        },
        methods: {

        },
        mounted(){
            var map = new BMap.Map("allmap");            // 创建Map实例
            var point = new BMap.Point(116.718173,40.040774); // 创建点坐标
            map.centerAndZoom(point,15);                 // 初始化地图,设置中心点坐标和地图级别。
            map.enableScrollWheelZoom();                 //启用滚轮放大缩小

            map.addControl(new BMap.NavigationControl());
            map.addControl(new BMap.ScaleControl());
            map.addControl(new BMap.OverviewMapControl());
            var marker = new BMap.Marker(point);
            map.addOverlay(marker);
            var infoWinOpts = {};
        },
        created() {
            //公用信息获取
            this.$store.dispatch('getLinks');
        }
    }
</script>
<style>
    #allmap{width:95%;height:460px;overflow:hidden;margin:20px;border:1px solid black;font-size: 14px;}
</style>
