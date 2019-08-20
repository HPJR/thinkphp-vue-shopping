<template>
    <div id="vue_reg">
        <div class="lg-header reg-header">
            <div class="wrapper">
                <h1><router-link to="/index">{$config.web_name}</router-link></h1>
                <p>欢迎注册</p>
                <span>已有账号？<router-link to="/login">请登录</router-link></span>
            </div>
        </div>
        <div class="reg-con">
            <div class="wrapper">
                <div class="reg-con-txt">
                    <p>新会员注册</p>
                    <b>温馨提示，注册成为会员之后您可以：</b>
                    <ul>
                        <li><i class="iconfont icon-sanjiao3"></i>在这里购买商品</li>
                        <li><i class="iconfont icon-sanjiao3"></i>保存您的个人资料</li>
                        <li><i class="iconfont icon-sanjiao3"></i>收藏您关注的商品</li>
                        <li><i class="iconfont icon-sanjiao3"></i>享受会员积分制度</li>
                        <li><i class="iconfont icon-sanjiao3"></i>订阅商品及促销信息</li>
                    </ul>
                </div>
                <div class="reg-con-form">
                    <form>
                        <div class="reg-input" :class="{ 'form-group--error': $v.email.$error }">
                            <label for="email">邮箱</label>
                            <input  placeholder="您的邮箱"
                                    :value="email"
                                    @blur="setEmail($event.target.value)"
                                    class="input-line"
                                    name="email"
                                    type="text"/>
                            <div class="error" v-if="!$v.email.email">请输入正确的邮箱</div>
                            <div class="yep" v-if="$v.email.required && $v.email.email && $v.email.isUnique">可以使用</div>
                            <div class="error" v-if="!$v.email.isUnique">已被注册</div>
                        </div>

                        <div class="reg-input" :class="{ 'form-group--error': $v.password.$error }">
                            <label for="password">设置密码</label>
                            <input name="password" placeholder="建议至少使用两种字符组合"
                                   v-model.trim="$v.password.$model"
                                   @blur="$v.password.$touch()"
                                   class="input-line"
                                   type="password"/>
                            <div class="error" v-if="!$v.password.required">不能为空</div>
                            <div class="error" v-if="!$v.password.minLength">不能低于 {{$v.password.$params.minLength.min}} 位数</div>
                        </div>

                        <div class="reg-input" :class="{ 'form-group--error': $v.confirmPassword.$error }">
                            <label for="password">确认密码</label>
                            <input  placeholder="确认密码"
                                   v-model.trim="$v.confirmPassword.$model"
                                   @blur="$v.confirmPassword.$touch()" class="input-line"
                                   type="password"/>
                            <div class="error" v-if="!$v.confirmPassword.sameAsPassword">两次输入的密码不一致</div>
                        </div>

                        <div class="reg-input" :class="{ 'form-group--error': $v.code.$error }">
                            <label for="code">验证码</label>
                            <input name="code"
                                   placeholder="验证码"
                                   v-model.trim="$v.code.$model"
                                   @blur="$v.code.$touch()" class="input-line"
                                   type="text"/>
                            <div class="error" v-if="!$v.code.required">不能为空</div>
                            <div class="error" v-if="!$v.code.maxLength">不能大于 {{$v.code.$params.maxLength.max}} 位数</div>
                            <div class="error" v-if="!$v.code.minLength">不能小于 {{$v.code.$params.minLength.min}} 位数</div>
                            <img src="http://test2.jianfly.com/Base/verify" alt="" title="点击更换验证码" onclick="this.src='http://test2.jianfly.com/Base/verify?t='+Math.random();">
                        </div>

                        <div class="reg-checkbox">
                            <Checkbox v-model="single"></Checkbox>
                            <p>我已看过并接受<a>《注册用户协议》</a></p>
                        </div>

                        <input type="button" value="立即注册" @click="reg"/>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //1. 先引入需要用到的验证规则
    import { required, maxLength,minLength, sameAs ,email ,numeric} from 'vuelidate/lib/validators'

    import {regUser,checkEmail} from '../../service/index';


    export default {
        data(){
            return{
                email: '',
                password: '',
                code: '',
                confirmPassword:'',
                single:true,
                submitStatus:false
            }
        },
        // 定义验证字段的规则
        validations: {
            email: {
                required,
                email,
                async isUnique (value) {
                    // 异步校验用户名是否已注册
                    const response = await checkEmail(value);
                    return Boolean(response);
                }
            },
            password: {
                required,
                minLength:minLength(6),
            },
            confirmPassword: {
                sameAsPassword: sameAs('password') // 校验密码是否一致
            },
            code: {
                required,
                numeric,
                maxLength:maxLength(4),
                minLength:minLength(4)
            }
        },
        methods:{
            //验证表单
            async submitReg() {
                this.$v.$touch();
                if (this.$v.$invalid || !this.single) {
                    //验证失败
                    this.submitStatus = false
                }else{
                    //验证成功
                    this.submitStatus = true;
                }
            },
            //提交注册
            async reg() {
                await this.submitReg();
                if(this.submitStatus){
                    let result = await regUser(
                        this.email,
                        this.password,
                        this.code
                    );
                    if(result.code === '03'){
                        this.$Message.success(result.msg);
                        setTimeout(()=>{
                            this.$router.push('/login');
                        },1600);
                    }else {
                        this.$Message.error(result.msg);
                    }
                }
            },
            //验证用户名是否存在
            setEmail(value) {
                this.email = value;
                this.$v.email.$touch();
            }
        },
    }
</script>

<style lang="less" scoped>
    .reg-checkbox label{float: left;}
    .error{
        display: none;
        font-size: 12px;
        color: #CC3333;
        position: absolute;
        left: 0;
        bottom: -40px;
    }
    .form-group--error > input + .error {
        display: block;
        color: #CC3333;
    }
</style>
