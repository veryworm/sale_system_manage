<template>
  <div id="app">
      <span>主页/分类管理</span>
      <div class="content">
        <div style="float:left; margin-top:10px">
            <el-button @click="editData" type="primary">新增</el-button>
        </div>
        <el-table
            ref="multipleTable"
            :data="products"
            max-height="600px"
            tooltip-effect="dark"
            style="width: 95%"
            >
            <el-table-column
            type="selection"
            prop="id"
            width="55">
            </el-table-column>

            <el-table-column
            prop="name"
            label="产品名称"
            width="120">
            </el-table-column>

            <el-table-column
            prop="description"
            label="产品描述"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column
            prop="price"
            label="产品价格"
            show-overflow-tooltip>
            </el-table-column>

            <el-table-column label="产品图片">
                 <template slot-scope="scope">
                    <img style="width:50px;height:50px;border-radius:10px" :src="scope.row.photo" alt="">
                </template>
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
                <el-button @click="editData(scope.row)" type="text" size="small">修改</el-button>
                <el-button @click="deleteId(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
    <ProductEdit @closeDrawer="closeDrawer" :visible.sync="visible1" :currentObj="currentObj" :title="Istitle"></ProductEdit>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
import ProductEdit from './ProductEdit'

export default {
    components:{
        ProductEdit
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
        ...mapState('product',['products']),
        
    },
    created(){
        this.ProductFindAll()
    },
    methods:{
        ...mapActions('product',['ProductFindAll','deleteIdHandler']),
        editData(row){
            this.visible1 = true
            if(row.name!==undefined){
                this.Istitle = '修改产品'
                this.currentObj = row
            }else{
                this.currentObj = []
                this.Istitle = '新增产品'
            }
        },
        // 删除
        deleteId(id){
            this.deleteIdHandler(id)
            .then(()=>{
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            })
            .catch((res)=>{
                console.log(res)
            })
        },
        closeDrawer(val){
            this.visible1 = val
        }
        
    }
}
</script>
<style>
   .content{
       margin-left: 300px;
   }
</style>
