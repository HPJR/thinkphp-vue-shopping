<template>
    <div>
        <!--personal-->
        <div class="personal">
            <div class="wrapper">
                <sidebar></sidebar>
                <div class="personal_right">
                    <h3 class="personal-title">收货地址管理</h3>
                    <div class="personal-con">
                        <h3 class="gz-tit add-tit"><span @click="showAdd">新增收获地址</span><small>您已创建{{ num }} 个收货地址，最多可创建20个</small></h3>

                        <div class="relative">
                            <div class="add-con" v-for="(item,index) in addList" :key="index">
                                <h4>
                                    <span>{{ item.name }}</span>
                                    <small style="display: inline-block;" v-if="item.default === '1'">默认地址</small>
                                </h4>
                                <ul>
                                    <li><span>收货人：</span><small>{{ item.name }}</small></li>
                                    <li><span>地址：</span><small>{{ item.address }}</small></li>
                                    <li><span>联系方式：</span><small>{{ item.tel }}</small></li>
                                    <li><span>邮编：</span><small>{{ item.zip }}</small></li>
                                </ul>
                                <p>
                                    <!--<a href="">设为默认</a>-->
                                    <a class="add-edit" @click="revise_add(index,item.id)">编辑</a>
                                </p>
                                <i class="iconfont icon-shanchu2 del_add"  @click="deladdress(index,item.id)"></i>
                            </div>
                            <Spin size="large" fix v-if="loadingStates.loadCart"></Spin>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {getAddress,addNow,delNowAdd,GetReAdd} from  '../../service/index';
    import sidebar from '../public/sidebar'
    import addAddress from '../../components/addAddress'
    import editAddress from '../../components/editAddress'


    export default {
        components:{
            sidebar
        },
        data() {
            return{
                num:0,
                addList:[],
                loadingStates:{
                    loadCart:true
                }
            }
        },
        computed:{

        },
        methods:{
            //展示地址
            async address(){
                this.loadingStates.loadCart = true;
                let result = await getAddress();
                this.num = result.addnum;
                this.addList = result.address;
                this.loadingStates.loadCart = false;
            },
            //新增地址
            showAdd(){
                var _this = this;
                this.$Modal.confirm({
                    title: '新增地址',
                    render: (h) => {
                        return h(addAddress, {//在此处使用引入的组件
                            ref:'comData',
                            slot: 'footer'
                        })
                    },
                    width: 600,
                    closable: false,
                    okText: "确定",
                    loading:true,
                    cancelText: "取消",
                    async onOk() {
                        let modal = this;
                        //表单验证
                        let vc = this.$refs.comData.Verification;
                        let name = this.$refs.comData.name;
                        let address = this.$refs.comData.address;
                        let tel = this.$refs.comData.tel;
                        let zip = this.$refs.comData.zip;
                        let isdefault = this.$refs.comData.default;

                        //验证成功
                        if(vc){
                            let result = await addNow(name,address,tel,zip,isdefault);
                            //添加成功
                            if(result.code === '05'){
                                this.$Message.success(result.msg);
                                this.$Modal.remove();
                                setTimeout(()=>{
                                    _this.address();
                                },1000);
                            }
                            //添加失败
                            else {
                                this.$Message.error(result.msg);
                            }
                        }
                        //验证失败
                        else{
                            this.$Message.error('请填写正确的信息');
                            modal.$data.buttonLoading = false;
                        }

                    }
                });
            },
            //修改地址
            revise_add(index,id){
                var _this = this;
                this.$Modal.confirm({
                    title: '修改地址',
                    render: (h) => {
                        return h(editAddress, {//在此处使用引入的组件
                            ref:'comData',
                            props: {
                                currentData:{
                                    currentName: this.addList[index].name,
                                    currentAdd: this.addList[index].address,
                                    currentMob: this.addList[index].tel,
                                    currentZip: this.addList[index].zip,
                                    currentDefault: this.addList[index].default,
                                }
                            },
                        })
                    },
                    width: 600,
                    closable: false,
                    okText: "确定",
                    cancelText: "取消",
                    loading: true,
                    async onOk() {
                        let modal = this;
                        let vc = this.$refs.comData.Verification;
                        let name = this.$refs.comData.name;
                        let address = this.$refs.comData.address;
                        let tel = this.$refs.comData.tel;
                        let zip = this.$refs.comData.zip;
                        let isdefault = this.$refs.comData.isDefault;

                        //验证成功
                        if(vc){
                            let result = await GetReAdd(id,name,address,tel,zip,isdefault);
                            //修改成功
                            if(result.code === '06'){
                                this.$Message.success(result.msg);
                                this.$Modal.remove();
                                setTimeout(()=>{
                                    _this.address();
                                },1000);
                            }
                            //修改失败
                            else {
                                this.$Message.error(result.msg);
                            }
                        }
                        //验证失败
                        else{
                            this.$Message.error('请填写正确的信息');
                            modal.$data.buttonLoading = false;
                        }

                    }
                });
            },
            //删除地址
            async deladdress(index,id){
                this.loadingStates.loadCart = true;

                let result = await delNowAdd(id);
                //删除成功
                if(result.code === 0){
                    this.$Message.success(result.msg);
                    this.addList.splice(index,1);
                    this.num -=1;
                }
                //删除失败
                else{
                    this.$Message.error(result.msg);
                }
                this.loadingStates.loadCart = false;

            }
        },
        created(){
            this.address();
        }
    }
</script>
