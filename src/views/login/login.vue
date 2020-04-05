<template>
  <div id="app">
    <div class="login-container">
        <div class="tot_img">
            <img style="width: 100%; height:100%;" src="/img/timg.jfif" alt="">
            <div class="form-container">
                <p class="title">零食客后台管理系统</p>
                <el-form :model="loginForm" ref="drawerform">
                    <el-form-item>
                        <el-input placeholder="用户名" v-model="loginForm.username" clearable></el-input>
                    </el-form-item>
                        <el-form-item>
                        <el-input placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
                    </el-form-item>
                    <button @click.prevent="submitform" class="btn">登 &nbsp;&nbsp; 录</button>
                </el-form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
export default {
    data(){
        return{
            loginForm:{
                type:"customer",
                username:"",
                password:""
            }
        }
    },
    computed:{
        ...mapState('user',['info'])
    },
    methods:{
        ...mapActions('user',['Login']),
        submitform(){
            this.Login(this.loginForm)
            .then(()=>{
                this.$router.push({path:'/address'})
            })
        }
    }
}
</script>

<style>
    #app{
        margin: -4px;
    }
    .login-container {
        width: 100%;
        position: absolute;
        bottom: 0;
        background-color:#0a1b39;
    }
    a[href]:hover {
        text-decoration:  underline;
        color: rgb(84, 127, 184);
        }
    .form-container {
        margin: 0px auto;
        width: 35%;
        text-align: center;
        box-shadow: 1px 2px 5px #d3d4e6;
        height: 300px;
        padding: 5px;
        position: absolute;
        top: 40%;
        left: 31%;
        border-radius: 10px;
        
    }

    .el-input__inner {
        margin-top: 10px;
        width: 350px;
        height: 30px;
        border-radius: 3px;
        border: none;
        opacity: 0.8;
        
    }
    .el-input{
        width: 350px;
    }
    .btn:hover{
        background-color: rgb(72, 148, 192);
    }
    .btn {
        width: 350px;
        height: 35px;
        line-height: 25px;
        cursor: pointer;
        margin-top: 20px;
        border-radius: 3px;
        background-color: #59dbee;
        color: white;
        border: none;
        font-size: 15px;
        opacity: 1.1
    }
    input::-webkit-input-placeholder { 
        font-weight: 1000;
        color: violet;
    }
    .title{
        margin-top: 5%;
        font-size: 18px;
        color: #ffffff;
        font-weight: 1000;
    }
    .el-icon-view{
        padding-top: .3rem;
    }
    .el-input__clear{
        padding-top: .3rem;
    }
    .zhuce_tot_one{
       position: relative;
       left: -15%; 
       display: inline;
    }
    .zhuce_tot_two{
        display: inline-block;
        position: relative;
        left: 15%;
    }
    .zhuce{
        color: white;
        font-weight: 550;
        text-decoration: none;
        font-size: 14px;
    }
</style>
