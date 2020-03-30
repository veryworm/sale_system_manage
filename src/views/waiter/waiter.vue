<template>
  <div id="app">
      <span>主页/快递员管理</span>
      <div class="content">
        <el-table
            ref="multipleTable"
            :data="waiterData"
            max-height="600px"
            tooltip-effect="dark"
            style="width: 100%"
           >

            <el-table-column
            type="selection"
            prop="id"
            width="55">
            </el-table-column>

            <el-table-column
            prop="username"
            label="用户名"
            width="120">
            </el-table-column>

            <el-table-column
            prop="realname"
            label="姓名"
            show-overflow-tooltip>
            </el-table-column>

             <el-table-column
            prop="telephone"
            label="电话号"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="city"
            label="城市"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="qq"
            label="qq"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="type"
            label="身份类型"
            show-overflow-tooltip>
            </el-table-column>

             <el-table-column
            prop="gender"
            label="性别"
            show-overflow-tooltip>
            </el-table-column>

             <el-table-column
            prop="province"
            label="省份"
            show-overflow-tooltip>
            </el-table-column>
            
             <el-table-column
            prop="city"
            label="城市"
            show-overflow-tooltip>
            </el-table-column>

             <el-table-column
            prop="area"
            label="地区"
            show-overflow-tooltip>
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'

export default {
    components:{
    },
    data(){
        return{
        }
    },
    computed:{
        ...mapState('waiter',['waiterData'])
    },
    created(){
        this.findAllWaiter()
    },
    methods:{
        ...mapActions('waiter',['findAllWaiter','waiterFindById'])
    }
}
</script>
<style>
   .content{
       margin-left: 300px;
   }
</style>
