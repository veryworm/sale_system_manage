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
        <div class="table1" v-if="searchOrderData.length==0">
            <el-table
                ref="multipleTable"
                :data="tableData"
                max-height="600px"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">

                <el-table-column
                prop="id"
                label="订单Id"
                show-overflow-tooltip>
                </el-table-column>

                <el-table-column
                prop="customerId"
                label="顾客Id"
                show-overflow-tooltip>
                </el-table-column>

                <el-table-column
                label="快递员Id"
                show-overflow-tooltip
                >
                <template slot-scope="scope">
                    <span>{{scope.row.waiterId}}</span>
                </template>
                </el-table-column>

                <el-table-column
                prop="addressId"
                label="地址Id"
                >
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
                <template v-if="searchOrderData.length==0" slot-scope="scope">
                    <el-button v-if="scope.row.status=='待派单'" @click="editData(scope.row)" type="warning" size="small">未派单</el-button>
                    <el-button disabled v-if="scope.row.status!=='待派单'" type="primary" size="small">已派单</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-if="searchOrderData.length!==0" class="table2">
            <el-table
            ref="multipleTable1"
            :data="searchOrderData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
                <el-table-column
                prop="id"
                label="产品编号"
                width="130">
                </el-table-column>

                <el-table-column
                prop="productId"
                label="产品Id"
                show-overflow-tooltip>
                </el-table-column>

                 <el-table-column
                prop="name"   
                label="商品名称"
                show-overflow-tooltip>
                </el-table-column>

                <el-table-column
                prop="orderId"
                label="订单Id"
                width="120" 
                show-overflow-tooltip>
                </el-table-column>

                 <el-table-column
                label=""
                width="120">
                </el-table-column>

                <el-table-column
                label="商品照片"
                width="120">
                <template slot-scope="scope">
                    <img style="width:40px;height:40px;border-radius:10px" :src="scope.row.proto" alt="">
                </template>
                </el-table-column>

                <el-table-column
                prop="number"   
                label="数量"
                show-overflow-tooltip>
                </el-table-column>

                <el-table-column
                prop="price"
                label="商品价格"
                show-overflow-tooltip>
                </el-table-column>

            </el-table>
        </div>
    </div>
    <!-- 派单 -->
    <el-dialog
    title="指定快递员派单"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-form :model="sendOrderForm" status-icon  ref="ruleForm3" label-width="100px" size="mini" class="demo-ruleForm">
        <el-form-item label="快递员">
            <el-select @change="selectWaiterId" clearable v-model="sendOrderForm.waiterId" placeholder="请选择快递员">
                <el-option 
                v-for="item in waiterData"
                :key="item.id"
                :label="item.username+':'+item.realname"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="订单" >
            <el-select @change="selectOrderId2" clearable v-model="sendOrderForm.orderId" placeholder="sendOrderForm.orderId">
                <el-option 
                :key="sendOrderForm.waiterId"
                :label="sendOrderForm.orderId"
                :value="sendOrderForm.orderId">
                </el-option>
            </el-select>
        </el-form-item>
        {{sendOrderForm}}
        <el-form-item>
            <el-button style="float:right" type="primary" @click="submitForm2(sendOrderForm)">提交</el-button>
        </el-form-item>
    </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'

export default {
    components:{
        // orderEdit
    },
    data(){
        return{
            visible1:false,
            dialogVisible: false,
            currentObj:[],
            query:{
                orderId:'',
                page: 1,
                pageSize: 3,
            },
            sendOrderForm:{
                waiterId:'',
                orderId:''
            },
            orderStatus:[
                {label:'全部订单',rank:'first'},
                {label:'待确认',rank:'second'},
                {label:'已完成',rank:'third'},
                {label:'待接单',rank:'fourth'},
                {label:'待派单',rank:'fifth'}
            ],
            activeName: 'first'
        }
    },
    computed:{
        ...mapState('order',['tableData','customerData','orderLength','searchOrderData','nosendData']),
        ...mapState('waiter',['waiterData']),
    },
    created(){
        this.findAllOrder()
        this.findAllWaiter()
    },
    methods:{
        ...mapActions('order',['findAllOrder','orderFindById','sendOrderHandler']),
        ...mapActions('waiter',['findAllWaiter']),
        handleSelectionChange(item){
            console.log(item)
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
            this.query.orderId = ""
            this.findAllOrder()
        },
        editData(row){
            this.dialogVisible = true
            this.sendOrderForm.orderId = row.id
        },
        // 派单模态框
        handleClose(done) {
            this.dialogVisible = false
        },
        submitForm2(sendOrderForm){
            if(this.sendOrderForm.waiterId!==""&&this.sendOrderForm.orderId!==""){
                this.sendOrderHandler(sendOrderForm)
                .then(()=>{
                    this.dialogVisible = false
                    this.$message({
                        message: '派单成功',
                        type: 'success'
                    });
                })
                .catch((res)=>{
                    console.log(res)
                })
            }
        },
        // 派单模态框选取waiter
        selectWaiterId(val){
            this.sendOrderForm.waiterId = val
        },
        // 派单模态框选取Order
        selectOrderId2(val){
            this.sendOrderForm.orderId = val
        }
    }
}
</script>
<style>
   .content{
       margin-left: 300px;
   }
</style>
