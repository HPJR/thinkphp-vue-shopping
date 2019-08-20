<template>
    <div>
        <Form  class="form-mask registerform">
            <div class="input_dd">
                <span><b>*</b>收货人：</span>
                <input type="text" name="name" placeholder="收货人" v-model="name" required @blur="checkNull(name)">
            </div>
            <div class="input_dd">
                <span><b>*</b>所在地区：</span>
                <Cascader :data="chinaArea" @on-change="getNowC"></Cascader>
            </div>
            <div class="input_dd">
                <span><b>*</b>详细地址：</span>
                <input type="text" name="address" placeholder="地址" v-model="xaddress" @blur="changeAdd(xaddress)">
            </div>
            <div class="input_dd">
                <span><b>*</b>联系方式：</span>
                <input type="text" name="tel" placeholder="联系电话" v-model.number="tel" @blur="checkNum" required>
            </div>
            <div class="input_dd">
                <span><b>*</b>邮编：</span>
                <input type="text" name="zip" placeholder="邮编" v-model.number="zip" @blur="checkNull(name)" required>
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
        data () {
            return {
                chinaArea:area,
                name:'',
                xaddress:'',
                tel:'',
                zip:'',
                default:0,
                address:'',
                isDefault:'0'
            }
        },
        computed:{
            //验证
            Verification(){
                if(this.name!==''&& this.address!==''&& String(this.tel).length ===11 && this.zip!==''){
                    return true
                }else {
                    return false
                }
            }
        },
        methods: {
            getNowC(value,selectedData){
                this.address = '';
                selectedData.forEach((item)=>{
                    this.address += item.label;
                });
            },
            changeAdd(val){
                this.address += this.xaddress;
                this.checkNull(val);
            },
            getDe(status){
                this.default = status;
                console.log(this.Verification);
            },
            checkNull(val){
                val === '' ? this.$Message.error('不能为空'):'';
            },
            checkNum(){
                String(this.tel).length !==11 ? this.$Message.error('请输入正确的号码'):'';
            }
        }
    }
</script>
