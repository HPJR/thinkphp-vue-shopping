<template>
    <div id="vue_login">
        <div class="lg-header wrapper">
            <h1 v-if="config"><router-link to="/index">{{config.web_name}}</router-link></h1>
            <p>欢迎登录</p>
        </div>
        <div class="lg-banner">
            <div class="wrapper">
                <div class="lg-con">
                    <h4>欢迎登录</h4>
                    <div class="lg-con-form">
                        <form method="post" class="registerform">
                            <div class="lg-input" :class="{ 'form-group--error': $v.email.$error }">
                                <span><i class="iconfont icon-kefuyouxian"></i></span>
                                <input type="text"
                                       name="email"
                                       placeholder="邮箱"
                                       class="inputxt"
                                       v-model.trim="$v.email.$model"
                                       @blur="$v.email.$touch()"/>
                                <div class="error" v-if="!$v.email.email">请输入正确的邮箱</div>
                            </div>
                            <div class="lg-input" :class="{ 'form-group--error': $v.password.$error }">
                                <span><i class="iconfont icon-mima"></i></span>
                                <input name="password"
                                       placeholder="密码"
                                       v-model.trim="$v.password.$model"
                                       @blur="$v.password.$touch()"
                                       class="input-line"
                                       type="password"/>
                                <div class="error" v-if="!$v.password.minLength">不能低于 {{$v.password.$params.minLength.min}} 位数</div>
                            </div>
                            <div class="lg-radio">
                                <p>
                                    <input type="checkbox" v-model="check"/>
                                    <span>自动登录</span>
                                </p>
                            </div>
                            <input type="button" value="登  录" @click="login"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { required, maxLength,minLength, sameAs ,email ,numeric} from 'vuelidate/lib/validators'
    import {loginIn} from '../../service/index';
    import Cookies from 'js-cookie'
    import {Encrypt,Decrypt} from '../../secret'

    export default {
        data(){
            return {
                check:false,
                email:'',
                password:'',
                submitStatus:false
            }
        },
        computed:{
            //网站基本信息
            config(){
                return this.$store.state.webLinks.config;
            }
        },
        // 定义验证字段的规则
        validations: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength:minLength(6),
            }
        },
        methods:{
            //验证表单
            async submitReg() {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    //验证失败
                    this.submitStatus = false
                }else{
                    //验证成功
                    this.submitStatus = true;
                }
            },
            async login(){
                let _this = this;
                await this.submitReg();
                if(this.submitStatus){
                    let result = await loginIn(this.email,this.password);
                    console.log(result);
                    //登录成功
                    if(result.code === '04'){
                        //是否记住密码
                        if(_this.check === true){
                            Cookies.set('email', _this.email,{ expires: 3 });
                            Cookies.set('password',Encrypt(_this.password) ,{ expires: 3 });
                        }
                        else{
                            Cookies.remove('email');
                            Cookies.remove('password');
                        }
                        //设置token
                        this.$store.commit('SET_TOKEN',result.token);

                        //如果用户名存在读取用户名，否则用户名为邮箱号
                        if(result.member.name){
                            this.$store.commit('GET_USER', result.member.name);
                        }else {
                            this.$store.commit('GET_USER', result.member.email);
                        }
                        this.$Message.success(result.msg);
                        setTimeout(()=>{
                            this.$router.push('/user');
                        },1500);
                    }
                    //登录失败
                    else {
                        this.$Message.error(result.msg);
                    }
                }
            },
            //检测cokkie用户名是否存在
            getUser(){
                if( Cookies.get('email') && Cookies.get('password')){
                    this.email = Cookies.get('email');
                    this.password = Decrypt(Cookies.get('password'));
                    this.check = true;
                }
            }
        },
        created(){
            this.$store.dispatch('getLinks');
            this.getUser();
        }
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
        bottom: -32px;
    }
    .form-group--error{position: relative;}
    .form-group--error > input + .error {
        display: block;
        color: #CC3333;
    }
</style>
