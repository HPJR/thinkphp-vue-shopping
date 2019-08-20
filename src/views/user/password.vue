<template>
    <div>
        <!--personal-->
        <div class="personal">
            <div class="wrapper">
                <sidebar></sidebar>
                <div class="personal_right">
                    <h3 class="personal-title">密码修改</h3>
                    <div class="personal-con">
                        <h3 class="gz-tit"><span>更改密码</span></h3>
                        <form method="post" class="person_xin registerform form-edit-password">
                            <input type="password"  v-model="password" placeholder="新密码" @blur="checkNum"/>
                            <input type="password"  v-model="password2" placeholder="再次输入密码" @blur="checkInp"/>
                            <input type="button" value="提交" @click="subPassword">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import sidebar from '../public/sidebar'
    import {changePass,loginOut} from '../../service/index';


    export default {
        components:{
            sidebar
        },
        data() {
            return {
                password:'',
                password2:''
            }
        },
        computed: {},
        methods: {
            checkNum(){
                if(this.password.length<6){
                    this.$Message.error('密码不足6位');
                    return false;
                }else {
                    return true;
                }
            },
            checkInp(){
                if(this.password !== this.password2){
                    this.$Message.error('密码不一致');
                    return false;
                }else {
                    return true;
                }
            },
            //修改密码
            async subPassword(){
                console.log(this.checkNum());
                console.log(this.checkInp());
                if(this.checkNum() && this.checkInp()){
                    let result = await changePass(this.password);
                    console.log(result);
                    if(result.code === 2){
                        this.$Message.success(result.msg);
                        this.Out();
                    }
                    else {
                        this.$Message.error(result.msg);
                    }
                }
            },
            //退出登录
            async Out(){
                let result = await loginOut();
                console.log(result);
                if(result.code === '01'){
                    this.$Message.success('退出成功');
                    this.$store.commit('LOGOUT');
                    setTimeout(()=>{
                        this.$router.push('/index');
                    },1500)
                }else{
                    this.$Message.warning('稍后再试');
                }
            },
        },
        created() {

        }
    }
</script>
