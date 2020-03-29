<template>
  <div id="app">
      <span>主页/订单管理</span>
      <div class="content">
          <el-tabs v-model="activeName" @tab-click="handleClick">
                <!-- <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane> -->
                <el-tab-pane v-for="item in orderStatus" :key="item.rank" :label="item.label" :name="item.rank"><span style="font-weight:bolder;color:darkblue">{{item.label}}</span></el-tab-pane>
            </el-tabs>
          <el-row style="float:left; margin-top:20px">
            <el-form
            :inline="true"
            :model="query"
            class="demo-form-inline"
            style="border-bottom:1px solid #eee;margin-bottom:10px;"
            >
            <el-form-item>
                <el-select @change="selectOrderId" clearable v-model="query.orderId" placeholder="请选择顾客">
                    <el-option
                    v-for="item in tableData"
                    :key="item.orderTime"
                    :label="item.id"
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
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            prop="id"
            width="55">
            </el-table-column>
            <el-table-column width="200" label="订单时间">
                 <template slot-scope="scope">
                   {{scope.row.orderTime | datefmt}}
                </template>
            </el-table-column>
            <el-table-column
            prop="total"
            label="总价"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="status"
            label="状态"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
                <el-button @click="editData" type="text" size="small">新增</el-button>
                <el-button @click="editData(scope.row)" type="text" size="small">修改</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
    <!-- <orderEdit @closeDrawer="closeDrawer" :visible.sync="visible1" :currentObj="currentObj" :title="Istitle"></orderEdit> -->
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
// import orderEdit from './orderEdit'

export default {
    components:{
        // orderEdit
    },
    data(){
        return{
            // tableData:[]
            visible1:false,
            Istitle:'',
            currentObj:[],
            query:{
                orderId:'',
                page: 1,
                pageSize: 3,
            },
            orderStatus: ['全部订单','待确认','已完成','待派单'],
            orderStatus:[
                {label:'全部订单',rank:'first'},
                {label:'待确认',rank:'second'},
                {label:'已完成',rank:'third'},
                {label:'待派单',rank:'fourth'}
            ],
            activeName: 'first'
        }
    },
    computed:{
        ...mapState('order',['tableData','customerData','orderLength'])
    },
    created(){
        this.findAllOrder()
    },
    methods:{
        ...mapActions('order',['findAllOrder','orderFindById']),
        handleSelectionChange(item){
            console.log(item)
        },
        editData(row){
            this.visible1 = true
            if(row.province!==undefined){
                this.Istitle = '修改用户地址信息'
                this.currentObj = row
            }else{
                this.currentObj = []
                this.Istitle = '新增用户地址信息'
            }
        },
        // 根据顾客id查询
        selectOrderId(val){
            this.orderFindById(val)
        },
        handleClick(tab,event){
            if(tab.label=="全部订单"){
                this.findAllOrder()
            }else {
                this.findAllOrder(tab.label)
            }
        },
        // 重置
        resetForm(){
            this.findAllOrder()
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
