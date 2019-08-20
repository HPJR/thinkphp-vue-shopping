<template>
    <!--personal-->
    <div class="cart">
        <div class="location">
            <div class="wrapper">
                <p><router-link to="/index">首页</router-link>>购物车 </p>
            </div>
        </div>
        <div class="wrapper">

            <div class="catbox">

                <table id="cartTable">
                    <Spin fix v-if="loadingStates.cartList"></Spin>
                    <thead>
                    <tr>
                        <th><label><Checkbox v-model="checkAllFlag"
                                             @on-change="changeAll">
                            &nbsp;全选</Checkbox></label></th>
                        <th>商品</th>
                        <th>单价</th>
                        <th>数量</th>
                        <th>小计</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody style="position: relative;min-height: 50px;">
                    <tr v-for="(item,index) in list" :key="index">
                            <td class="checkbox">
                                <Checkbox v-model="item.checked"
                                          @on-change="selectedProduct(item)">
                                </Checkbox>
                            </td>

                            <td class="goods">
                                <img :src="item.pro.img | filterImg"
                                     :alt="item.pro.title"/>
                                <span>{{ item.pro.title }}</span>
                            </td>

                            <td class="price">{{item.pro.price}}</td>

                            <td class="count">
                                <InputNumber v-model.number="item.num"
                                             size="large"
                                             :min="1"
                                             @on-change="getCartNum(item.id,item.num)"
                                             @on-blur="changeNowNum(item.id,item.num)">
                                </InputNumber>
                            </td>
                            <td class="subtotal"> {{ item.pro.price*item.num | money}} </td>

                            <td class="operation"><span class="delete" @click="delNow(item.id,null,index)">删除</span></td>
                        </tr>
                    </tbody>
                    <Spin fix v-if="loadingStates.delNum"></Spin>
                </table>

                <div class="foot" id="foot">
                    <label class="fl select-all">
                        <Checkbox v-model="checkAllFlag"
                                  @on-change="changeAll">
                            &nbsp;全选</Checkbox>
                    </label>

                    <div class="fr closing"
                         @click='doorder'>
                        结 算</div>

                    <div class="fr total">合计：￥
                        <span id="priceTotal">{{ totalMoney | money }}</span>
                    </div>

                    <div class="fr selected" id="selected">已选商品<span id="selectedTotal">{{ totalNum }}</span>件
                        <span class="arrow up" v-if="!showState"
                              @click="changeState">︽</span>
                        <span class="arrow down" v-if="showState"
                              @click="changeState">︾</span>
                    </div>

                    <div class="selected-view" v-if="showState">
                        <div id="selectedViewList" class="clearfix">
                            <div v-for="(item,index) in checkList" :key="index">
                                <img :src="item.pro.img | filterImg"
                                     :alt="item.pro.title"/>

                                <span @click="cancelThis(item,index)">取消选择</span>
                            </div>
                        </div>
                        <span class="arrow">◆<span>◆</span></span>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>
<script>
    import {getCartAll,getCartNowNum,delCartNow,addCartOrder} from  '../../service/index';

    export default {
        data(){
            return{
                //购物车列表
                list:[],
                //总价
                totalMoney:0,
                //总数
                totalNum:0,
                //底部显示
                showState:false,
                //全选
                checkAllFlag:false,
                loadingStates:{
                    cartList:true,
                    delNum:false
                }
            }
        },
        computed:{
            //已选择列表
            checkList(){
                let ck = [];
                this.list.forEach((item)=>{
                    if(item.checked){
                        ck.push(item);
                    }
                });
                return ck;
            }
        },
        methods:{
            //获取购物车数据
            async getList(){
                let result = await getCartAll();
                if(result){
                    result.forEach((item)=>{
                        item.num = Number(item.num);
                    });
                }
                this.list = result;
                this.loadingStates.cartList = false;
            },
            //底部显示
            changeState(){
                this.showState = !this.showState;
            },
            //底部小的取消选择
            cancelThis(item,index){
                this.$set(item, "checked", false);
                this.checkList.splice(index,0);
                this.checkList.length === 0 ? this.showState = false : this.showState = true;
                this.selectedProduct();
            },

            //单个选择全部去掉时全选取消
            selectedProduct(){
                this.calcTotalPrice();
                let bool = this.list.every(function(item) {
                    return item.checked;
                });
                bool ? this.checkAllFlag = true : this.checkAllFlag = false;
            },
            //总价计算
            calcTotalPrice(){
                this.totalMoney = 0;
                this.totalNum = 0;
                this.list.forEach((item)=>{
                    if(item.checked){
                        this.totalMoney += item.pro.price*item.num;
                        this.totalNum += item.num;
                    }
                });
            },
            //监控单个数量变化并传入数据库
            async getCartNum(id,value){
                // if(value){
                //     let result = await getCartNowNum(id,value);
                //     console.log(result)
                // }
                this.calcTotalPrice();
            },

            //全选
            changeAll(){
                !this.checkAllFlag ? this.showState = false : '';
                this.list.forEach((item)=>{
                    this.checkAllFlag ? this.$set(item, "checked", true) : this.$set(item, "checked", false)
                });
                this.calcTotalPrice();
            },

            // 修改购物车数量传到数据库
            async changeNowNum(id,value){
                if(value === null){
                    value = 1;
                }
                if(value){
                    let result = await getCartNowNum(id,value);
                    console.log(result)
                }
            },

            //删除购物车
            async delNow(id,num,index){
                this.loadingStates.delNum = true;
                let result = await delCartNow(id,num);
                if(result.code === 0){
                    this.$Message.success(result.msg);
                    this.list.splice(index,1);
                    this.calcTotalPrice();
                    setTimeout(()=>{
                        this.$store.dispatch('getCartNum');
                    },1000);
                }else {
                    this.$Message.error(result.msg);
                }
                this.loadingStates.delNum = false;
            },

            //结算
            async doorder(){
                this.loadingStates.delNum = true;
                let idArr = '';
                this.checkList.forEach((item)=>{
                    idArr += item.id+','
                });

                if(idArr!==''){
                    let result = await addCartOrder(idArr);
                    if(result.code === 0){
                        this.$Message.success(result.msg);
                        setTimeout(()=>{
                            this.$router.push('/doorder');
                        },1200);
                    }else{
                        this.$Message.error(result.msg);
                    }
                }
                //未选中
                else {
                    this.$Message.error('未选中产品');
                }
                this.loadingStates.delNum = false;
            }
        },
        created(){
            this.getList();
        }
    }
</script>
