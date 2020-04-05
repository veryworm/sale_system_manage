<template>
  <div id="app">
    <div :style="{display:info.id == undefined?'none':'block'}">
      <el-row class="home_header">
        <el-col :span="4">
          <div class="header_img">
            <!-- <img style="border-radius:20px" src="../assets/logo.png" alt=""> -->
          </div>
        </el-col>
        <el-col :span="14 ">
          <div class="header_title">
              <span>零食客后台管理系统</span>
          </div>
        </el-col>
        <el-col :offset="2" :span="4">
          <div class="header_title">
              <img style="width: 30px; margin-top:10px; height:30px ; border-radius: 50%;" :src="info.avatar" alt="">
              <span style="font-size:20px">{{info.name}}</span>
              <span class="hover_logout" @click="logoutAdmin" style="font-size:14px;color:blue">退出</span>
          </div>
        </el-col>
      </el-row>
      <el-col :span="4">
        <el-menu class="el-menu-vertical-demo">
          <router-link to="/address">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>地址管理</span>
              </template>
            </el-submenu>
          </router-link>

          <router-link to="/category">
            <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">分类管理</span>
          </el-menu-item>
          </router-link>

          <router-link to="/customer">
            <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">顾客管理</span>
          </el-menu-item>
          </router-link>

          <router-link to="/order">
            <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          </router-link>

          <router-link to="/waiter">
            <el-menu-item index="5">
            <i class="el-icon-menu"></i>
            <span slot="title">快递员管理</span>
          </el-menu-item>
          </router-link>

        </el-menu>
      </el-col>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {mixStatus} from './store/modules/mix.js'
export default {
  mixins:[mixStatus],
  data(){
    return{

    }
  },
  computed:{
    ...mapState('user',['info'])
  },
  created(){
    this.allrefreshtoken()
  },
  methods:{
    ...mapActions('user',['logout']),
    logoutAdmin(){
      this.logout()
      .then(()=>{
         this.$message({
           message:'退出成功',
           type: 'success'
         });
         this.$router.push('/login')
      })
    }
  }
}
</script>

<style>
#nav a.router-link-exact-active {
  color: #42b983;
}
.home_header{
    margin: -7px;
    padding: 0px;
    /* line-height: 40px; */
    background-color: rgb(195, 216, 223);
  }
  .header_img{
    /* width:180px; */
    height:30px;
  }

  .header_title {
    color: #333;
    text-align: center;
    line-height: 50px;
    font-weight: bolder;
    font-size: 32px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

   .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .info_img{
    float: right;;
  }
  .hover_logout:hover{
    cursor: pointer;
  }
</style>
