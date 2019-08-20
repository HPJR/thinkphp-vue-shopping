<template>
    <!--personal-->
    <div class="personal">
        <div class="wrapper">
            <sidebar></sidebar>
            <div class="personal_right">
                <h3 class="personal-title">基本信息</h3>
                <div class="personal-con">
                    <h3 class="gz-tit"><span>个人信息</span></h3>
                    <div style="position: relative;height: 259px;">
                        <form class="person_xin registerform" method="post">
                            <div>
                                <span>用户名：</span>
                                <input type="text" placeholder="用户名" name="name" v-model="name"/>
                                <div class="error" v-if="!$v.name.required">不能为空</div>
                            </div>
                            <div>
                                <span>真实姓名：</span>
                                <input type="text" placeholder="真实姓名" name="relname" v-model="relname"/>
                            </div>
                            <div :class="{ 'form-group--error': $v.mobile.$error }">
                                <span>手机：</span>
                                <input type="text" placeholder="手机" name="mobile"
                                       v-model="$v.mobile.$model"
                                       @blur="$v.mobile.$touch()"/>
                                <div class="error" v-if="!$v.mobile.maxLength">不能大于 {{$v.mobile.$params.maxLength.max}} 位数</div>
                                <div class="error" v-if="!$v.mobile.minLength">不能下于 {{$v.mobile.$params.minLength.min}} 位数</div>
                            </div>
                            <div>
                                <span>QQ：</span>
                                <input type="text" placeholder="QQ" name="qq"  v-model="qq"/>
                            </div>
                            <div>
                                <span>积分：</span>
                                <small>{{ vnum }}</small>
                            </div>
                            <div>
                                <span>E-mail：</span>
                                <small>{{ email }}</small>
                            </div>
                            <input type="button" @click="setUserMsg" value="提交"/>
                        </form>
                        <Spin size="large" fix v-if="loadingStates.spinShow"></Spin>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import sidebar from '../public/sidebar'
    import {getUserInfo,setUserInfo} from '../../service/index';
    import { required, maxLength,minLength, sameAs ,email ,numeric} from 'vuelidate/lib/validators'
    import Cookies from 'js-cookie'

    export default {
        components:{
            sidebar
        },
        data(){
            return{
                id:'',
                name:'',
                relname:'',
                qq:'',
                mobile:'',
                vnum:0,
                email:'',
                loadingStates:{
                    spinShow:true
                }
            }
        }, // 定义验证字段的规则
        validations: {
            mobile: {
                required,
                maxLength:maxLength(11),
                minLength:minLength(11),
            },
            name:{
                required
            }
        },
        methods:{
            //获取用户信息
            async getUserMsg(){
                let result = await getUserInfo();
                console.log(result);
                this.id = result.id;
                this.name = result.name;
                this.relname = result.relname;
                this.qq = result.qq;
                this.mobile = result.mobile;
                this.vnum = result.vnum;
                this.email = result.email;
                this.loadingStates.spinShow = false;
            },
            //设置用户信息
            async setUserMsg(){
                this.loadingStates.spinShow = true;
                //表单验证
                this.$v.$touch();
                if (!this.$v.$invalid){
                    let result = await setUserInfo(
                        this.name,
                        this.relname,
                        this.qq,
                        this.mobile
                    );
                    if(result.code === '0'){
                        this.$store.commit('GET_USER',this.name);

                        this.$Message.success(result.msg);
                    }else{
                        this.$Message.error(result.msg);
                    }
                }
                this.loadingStates.spinShow = false;
            }
        },
        created(){
            this.getUserMsg();
        }
    }
</script>
<style>
    .person_xin div.error{
        position: absolute;
        left: 263px;
        top: 5px;
    }
    .person_xin div{position: relative;}
    .form-group--error > input + .error {
        display: block;
        color: #CC3333;
    }
</style>
