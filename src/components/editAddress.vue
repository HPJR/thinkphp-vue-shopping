<template>
    <div>
        <form method="post" class="form-mask registerform">
            <div class="input_dd">
                <span><b>*</b>收货人：</span>
                <input type="text" name="name" placeholder="收货人" v-model="name" required>
            </div>
            <div class="input_dd">
                <span><b>*</b>详细地址：</span>
                <input type="text" name="address" placeholder="地址" v-model="address">
            </div>
            <div class="input_dd">
                <span><b>*</b>联系方式：</span>
                <input type="text" name="tel" placeholder="联系电话" v-model.number="tel" @blur="checkNum" required>
            </div>
            <div class="input_dd">
                <span><b>*</b>邮编：</span>
                <input type="text" name="zip" placeholder="邮编" v-model.number="zip" required>
            </div>
            <div class="input_dd">
                <RadioGroup v-model="isDefault" @on-change="getDe">
                    <Radio label="1">
                        <span>默认</span>
                    </Radio>
                    <Radio label="0">
                        <span>非默认</span>
                    </Radio>
                </RadioGroup>
            </div>
        </form>
    </div>
</template>
<script>
    import area from '../chinaArea'

    export default {
        props:{
            currentData:{
                type:Object,
                default:{}
            }
        },
        computed:{
            //验证
            Verification(){
                if(this.name!==''&& this.address!==''&& this.tel!==''&& this.zip!==''){
                    return true
                }else {
                    return false
                }
            }
        },
        data(){
            return{
                name:this.currentData.currentName,
                address:this.currentData.currentAdd,
                tel:this.currentData.currentMob,
                zip:this.currentData.currentZip,
                isDefault:this.currentData.currentDefault,
            }
        },
        methods: {
            getDe(status){
                this.isDefault = status;
            },
            checkNum(){
                String(this.tel).length !==11 ? this.$Message.error('请输入正确的号码'):'';
            }
        },
        mounted(){

        }
    }
</script>
