<template>
  <div id="app">
      <span>主页/地址管理</span>
      <div class="content">
          <el-row style="float:left; margin-top:20px">
              <el-form
            :inline="true"
            :model="query"
            class="demo-form-inline"
            style="border-bottom:1px solid #eee;margin-bottom:10px;"
            >
            <el-form-item>
                <el-select @change="selectCustomer" clearable v-model="query.id" placeholder="请选择顾客">
                    <el-option
                    v-for="item in customerData"
                    :key="item.id"
                    :label="item.realname"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-refresh" plain @click="resetForm">重置</el-button>
            </el-form-item>
            </el-form>
          </el-row>
        <el-table
            ref="multipleTable"
            :data="tableData"
            max-height="600px"
            tooltip-effect="dark"
            style="width: 80%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            prop="id"
            width="55">
            </el-table-column>
            <el-table-column
            prop="province"
            label="省份"
            width="120">
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
             <el-table-column
            prop="address"
            label="具体位置"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="telephone"
            label="电话号"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
                <!-- <el-button @click="editData" type="text" size="small">新增</el-button> -->
                <el-button @click="editData(scope.row)" type="text" size="small">修改</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
            layout="prev, pager, next"
            :total="Number(AddressLength)"
            :current-page="query.page"
            :pageSize="query.pageSize"
            style="float:right;margin-right:300px"
            @current-change="handleCurrentChange"
            >
        </el-pagination>
    </div>
    <addressEdit @closeDrawer="closeDrawer" :visible.sync="visible1" :currentObj="currentObj" :title="Istitle"></addressEdit>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
import addressEdit from './addressEdit'

export default {
    components:{
        addressEdit
    },
    data(){
        return{
            // tableData:[]
            visible1:false,
            Istitle:'',
            currentObj:[],
            query:{
                id:'',
                page: 1,
                pageSize: 3,
            }
        }
    },
    computed:{
        ...mapState('address',['tableData','customerData','AddressLength'])
    },
    created(){
        this.AddressFindQuery(this.query)
    },
    methods:{
        ...mapActions('address',['addressFindAll','AddressFindById','AddressFindQuery']),
        handleSelectionChange(item){
            console.log(item)
        },
        editData(row){
            this.visible1 = true
            this.Istitle = '修改用户地址信息'
            this.currentObj = row
        },
        // 根据顾客id查询
        selectCustomer(val){
            this.AddressFindById(val)
        },
        // 重置
        resetForm(){
            this.AddressFindQuery(this.query)
        },
        // 分页
        handleCurrentChange(val){
            this.query.page = val
            this.AddressFindQuery(this.query)
            // console.log(this.query)
        },
        closeDrawer(val){
            console.log(val,'aval')
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
