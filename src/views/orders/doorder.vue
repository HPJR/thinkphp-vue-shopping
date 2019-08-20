<template>
    <div>
        <div class="step">
            <div class="location">
                <div class="wrapper">
                    <p>{$location}</p>
                </div>
            </div>
            <h3 class="wrapper"><span>填写并核对订单信息</span></h3>
            <div class="wrapper step-con">
                <div class="step-add">
                    <h4>收货人信息</h4>
                    <div class="relative">
                        <ul v-if="address.length>0">
                            <RadioGroup v-model="selectId">
                                <li v-for="item in address">
                                    <Radio :label="item.id">{{''}}</Radio>
                                    <b class="step-active">{{item.name}}</b>
                                    <span>{{item.name}}</span>
                                    <span>{{ item.address }}</span>
                                    <span>{{item.tel}}</span>
                                </li>
                            </RadioGroup>
                        </ul>
                        <small v-if="address.length === 0" style="display:block;margin: 5px 0 6px 19px;">暂无地址信息</small>
                        <span v-if="address.length === 0" class="add_now" @click="showAdd">增加地址</span>
                        <Spin size="large" fix v-if="loadingStates.add"></Spin>
                    </div>
                </div>
                <div class="step-zf">
                    <h4>支付方式</h4>
                    <p class="step-active">在线支付</p>
                </div>
                <div class="step-list">
                    <h4>购物清单</h4>
                    <div class="relative">
                        <table class="tb-dd">
                            <colgroup>
                                <col class="img-col"/>
                                <col class="link-col"/>
                                <col class="num-col"/>
                                <col class="status-col"/>
                                <col class="operate-col"/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th>商品</th>
                                <th>单价</th>
                                <th>数量</th>
                                <th>总金额</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="sep-img"
                                v-for="item in list">
                                <td class="sep-td">
                                    <img :src="item.pro.img | filterImg"
                                         :alt="item.pro.title"/>
                                    <span>
                	                    <router-link :to="'/info/' + item.pro.pid +'/'+item.pro.id">{{ item.pro.title }}</router-link>
                                    </span>
                                    <small></small></td>
                                <td><b class="sep-price">{{ item.pro.price }}</b></td>
                                <td><b class="sep-num">{{ item.num }}</b></td>
                                <td><b class="sep-priceAll">{{ item.pro.price*item.num | money }} </b></td>
                            </tr>
                            <tr>
                                <td  style="padding: 5px;" class="tdYun" v-if="money<50">运费：10元</td>
                                <td  style="padding: 5px;" class="tdYun" v-if="money>50">满50包邮</td>
                            </tr>
                            </tbody>
                        </table>
                        <Spin size="large" fix v-if="loadingStates.add"></Spin>
                    </div>
                </div>
                <div class="step-list">
                    <h4>备注</h4>
                    <textarea name="remark" id="" cols="30" rows="10" v-model="remark"></textarea>
                </div>
            </div>

            <div class="wrapper step-fk">
                <div class="step-fk-con">
                        <p  v-if="money<50"><span>应付总额：</span><b>￥{{ money+10 }}</b></p>
                        <p  v-if="money>50"><span>应付总额：</span><b>￥{{ money }}</b></p>
                    <div>
                        <p>
                            <span>{{ nowAdd.address }}</span><br />
                            <span>收货人：{{ nowAdd.name }}  {{ nowAdd.tel }}</span>
                        </p>
                    </div>
                </div>
                <button @click="addOrder">提交订单</button>
            </div>

        </div>

    </div>
</template>
<script>
    import {getOd,addNow,getSubOrder} from '../../service/index';
    import addAddress from '../../components/addAddress'

    export default {
        components:{
            addAddress
        },
        data() {
            return {
                list:[],
                address:[],
                money:0,
                selectId:'',
                remark:'',
                loadingStates:{
                    add:true
                }
            }
        },
        computed:{
            //当前选中值
            nowAdd(){
                let arr = {};
                this.address.forEach((item)=>{
                    if(item.id === this.selectId){
                        arr = item;
                    }
                });
                return arr;
            }
        },
        methods:{
            //默认选中值
            async checkDefault(){
                await this.getNoW();
                this.address.forEach((item)=>{
                    if(Number(item.default) === 1){
                        this.selectId = item.id;
                    }
                })
            },
            //获取订单地址列表
            async getNoW(){
                let result = await getOd();
                this.list = result.order;
                if(result.address){
                    this.address = result.address;
                }
                this.money = result.money;
                this.loadingStates.add = false;
            },
            //增加地址
            showAdd(){
                var _this = this;
                this.$Modal.confirm({
                    title: '新增地址',
                    render: (h) => {
                        return h(addAddress, {//在此处使用引入的组件
                            ref:'comData'
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
                        //验证结束

                        let name = this.$refs.comData.name;
                        let address = this.$refs.comData.address;
                        let tel = this.$refs.comData.tel;
                        let zip = this.$refs.comData.zip;
                        let isdefault = this.$refs.comData.default;

                        //验证成功
                        if(vc){
                            console.log(1);
                            let result = await addNow(name,address,tel,zip,isdefault);
                            //添加成功
                            if(result.code === '05'){
                                this.$Message.success(result.msg);
                                this.$Modal.remove();
                                setTimeout(()=>{
                                    _this.getNoW();
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
            //提交订单
            async addOrder(){
                this.loadingStates.add = true;
                if(this.selectId){
                    let result = await getSubOrder(this.selectId,this.remark);
                    if(result.code === 5){
                        this.$Message.success(result.msg);
                        setTimeout(()=>{
                            this.$router.push('/orders');
                        },1200)
                    }else{
                        this.$Message.error(result.msg);
                    }
                 }
                 else {
                     this.$Message.error('请选择地址');
                 }
                this.loadingStates.add = false;
            }
        },
        created() {
            this.getNoW();
            this.checkDefault();

        }
    }
</script>
<style>
    .add_now{
        padding: 3px 0;
        width: 120px;
        text-align: center;
        border: 2px solid #d40202;
        color: #d40202;
        font-weight: 500;
        margin-left: 20px;
        display: inline-block;
        margin-right: 10px;
        cursor: pointer;
    }
</style>
