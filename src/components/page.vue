<template>
    <div class="page_iview">
        <Page size="small" show-elevator
              :total="total"
              :current="1"
              :page-size="pageSize"
              @on-change="getPage"
        >
        </Page>
    </div>
</template>
<script>
    export default {
        props:{
            count:{
                type:Number,
                default:0
            },
            listRows:{
                type:Number,
                default:0
            }
        },
        computed: {
            total(){
                return this.count
            },
            pageSize(){
                return this.listRows
            }
        },
        methods: {
            getPage(val){
                this.$emit("getPage",val);
            }
        }
    }
</script>
<style lang="less">
    .page_iview{text-align: center;margin-bottom: 50px;
        .ivu-page-item-active{background: #2d8cf0;
            a{color: #fff;}
        }
    }
</style>
