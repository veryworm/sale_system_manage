<template>
  <div id="app">
    <el-row class="home_header">
      <el-col :span="4">
        <div class="header_img">
          <!-- <img style="border-radius:20px" src="../assets/logo.png" alt=""> -->
        </div>
      </el-col>
      <el-col :span="18">
        <div class="header_title">
            <span>零食客后台管理系统</span>
        </div>
      </el-col>
    </el-row>
      <el-col :span="4">
        <el-menu
          class="el-menu-vertical-demo"
          >
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
    <router-view/>
  </div>
</template>

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
</style>
