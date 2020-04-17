<template>
  <div id="app">
      <span>主页/顾客管理</span>
      <div class="content">
        <el-table
            ref="multipleTable"
            :data="customerData"
            max-height="600px"
            tooltip-effect="dark"
            style="width: 95%"
            @selection-change="handleSelectionChange">
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
            prop="姓名"
            label="城市"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="telephone"
            label="电话号"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="qq"
            label="qq"
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
            // tableData:[]
            visible1:false,
            Istitle:'',
            currentObj:[],
            query:{
                id:""
            }
        }
    },
    computed:{
        ...mapState('address',['customerData'])
    },
    created(){
        this.customerFindAll()
    },
    methods:{
        ...mapActions('address',['customerFindAll','customerFindById']),
        handleSelectionChange(item){
            console.log(item)
        },
        editData(row){
            this.Istitle = '新增用户地址信息'
        },
        // 重置
        resetForm(){
            this.customerFindAll()
        },
        closeDrawer(val){
            this.visible1 = val
        },
        submitForm(){

        }
        
    }
}
</script>
<style>
   .content{
       margin-left: 300px;
   }
</style>
