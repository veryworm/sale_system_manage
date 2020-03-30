<template>
  <div id="app">
      <span>主页/分类管理</span>
      <div class="content">
        <div style="float:left; margin-top:10px">
            <el-button @click="editData" type="primary">新增</el-button>
        </div>
        <el-table
            ref="multipleTable"
            :data="tableData"
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
            prop="name"
            label="分类名称"
            width="120">
            </el-table-column>
            <el-table-column
            prop="num"
            label="数量"
            show-overflow-tooltip>
            </el-table-column>
             
            <el-table-column label="图片">
                 <template slot-scope="scope">
                    <img style="width:50px;height:50px;border-radius:10px" :src="scope.row.icon" alt="">
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
    <CategoryEdit @closeDrawer="closeDrawer" :visible.sync="visible1" :currentObj="currentObj" :title="Istitle"></CategoryEdit>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
import CategoryEdit from './CategoryEdit'

export default {
    components:{
        CategoryEdit
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
        ...mapState('category',['tableData','CategoryLength'])
    },
    created(){
        this.CategoryFindAll()
    },
    methods:{
        ...mapActions('category',['CategoryFindAll','deleteIdHandler']),
        editData(row){
            this.visible1 = true
            if(row.name!==undefined){
                this.Istitle = '修改分类'
                this.currentObj = row
            }else{
                this.currentObj = []
                this.Istitle = '新增分类'
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
