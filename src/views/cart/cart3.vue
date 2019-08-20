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
                    <thead>
                    <tr>
                        <th><label><Checkbox v-model="checkAllFlag"
                                             @on-change="changeAll">
                            &nbsp;全选</Checkbox></label></th>
                        <th>商品1</th>
                        <th>单价</th>
                        <th>数量</th>
                        <th>小计</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in list" :key="index">
                            <td class="checkbox">
                                <Checkbox v-model="item.checked"
                                          @on-change="selectedProduct(item,index)">
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

                            <td class="operation"><span class="delete"
                                                        onclick="del_cart(item.id, null)">
                                删除</span>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="foot" id="foot">
                    <label class="fl select-all">
                        <Checkbox v-model="checkAllFlag"
                                  @on-change="changeAll">
                            &nbsp;全选</Checkbox>
                    </label>

                    <div class="fr closing"
                         onclick="doorder()">
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
                            <div v-for="(item,index) in checkList" :key="index"
                                 v-if="item.checked">

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
    import {getCartAll,getCartNowNum} from  '../../service/index';
    export default {
        data(){
            return{
                //购物车列表
                list:[],
                //已选择列表
                checkList:[],
                //总价
                totalMoney:0,
                //总数
                totalNum:0,
                //底部显示
                showState:false,
                //全选
                checkAllFlag:false
            }
        },
        methods:{
            //获取购物车数据
            async getList(){
                let result = await getCartAll();
                result.forEach((item)=>{
                    item.num = Number(item.num);
                });
                this.list = result;
            },
            //底部显示
            changeState(){
                this.checkList = [];
                this.showState = !this.showState;
                this.list.forEach((item)=>{
                    if(item.checked){
                        this.checkList.push(item);
                    }
                });
            },
            //底部小的取消选择
            cancelThis(item,index){
                this.$set(item, "checked", false);
                this.checkList.splice(index,1);
                this.checkList.length === 0 ? this.showState = false : this.showState = true;
                this.selectedProduct();
            },

            //单个选择全部去掉时全选取消
            selectedProduct(item,index){
                if(item.checked){
                    this.checkList.push(item);
                }else{
                    this.checkList.splice(index,1);
                }
                this.checkList.length === 0 ? this.checkAllFlag = true : this.checkAllFlag = false;
                this.calcTotalPrice();
                console.log(this.list);
                console.log(this.checkList);
            },
            //总价计算
            calcTotalPrice(){
                this.totalMoney = 0;
                this.totalNum = 0;
                this.checkList.forEach((item)=>{
                    this.totalMoney += item.pro.price*item.num;
                    this.totalNum += item.num;
                });
            },
            //监控单个数量变化并传入数据库
            async getCartNum(id,value){
                this.calcTotalPrice();
            },

            //全选
            changeAll(){
                !this.checkAllFlag ? this.showState = false : '';
                this.list.forEach((item)=>{
                    this.checkAllFlag ? this.$set(item, "checked", true) : this.$set(item, "checked", false)
                });
                this.checkList = this.list;
                this.calcTotalPrice();
            },

            // 修改购物车数量传到数据库
            async changeNowNum(id,value){
                //有问题
                if(value === null){
                    value = 1;
                }
                if(value){
                    let result = await getCartNowNum(id,value);
                    console.log(result)
                }
            }
        },
        created(){
            this.getList();
        }
    }
</script>
