<template>
  <div id="app">
    <el-drawer
    :title="title"
    :visible.sync="visible2"
    :direction="direction"
    :before-close="handleClose">
        <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px"  class="demo-ruleForm">
            <el-form-item label="产品名称" prop="checkPass">
                <el-col :span="12">
                    <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="产品描述" prop="age">
                <el-col :span="12">
                    <el-input v-model="ruleForm.description"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="产品价格" prop="age">
                <el-col :span="12">
                    <el-input v-model="ruleForm.price"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="上传图片" prop="age">
               <el-upload
                class="upload-demo"
                action="http://182.92.66.130:6677/file/upload"
                :on-remove="handleRemove"
                :file-list="fileList"
                :on-change="changeImg"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="所属分类Id">
                <el-col :span="12">
                    <el-select clearable v-model="ruleForm.categoryId" placeholder="请选择">
                        <el-option
                        v-for="item in tableData"
                        :key="item.id"
                        :label="item.id"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button style="float:right" type="primary" @click="submitForm(ruleForm)">提交</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>

  </div>
</template>

<script>
import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
import { mixStatus } from '../../store/modules/mix.js'
export default {
    mixins:[mixStatus],
    data(){
        return{
            direction:'rtl',
            ruleForm: {
                name: "",
                description: "",
                price:"",
                status:"",
                photo: "",
                categoryId:""
            },
            fileList:[]
        }
    },
    computed:{
        ...mapState('Product',['ProductData']),
        ...mapState('category',['tableData']),
        visible2(){
            return this.visible
        }
    },
    watch:{
        currentObj:{
             immediate:true,
             handler:'isEditOrAdd'
        }
    },
    props:['visible','title','currentObj'],
    created(){
        this.isEditOrAdd()
        this.CategoryFindAll()
    },
    methods:{
        ...mapActions('product',['ProductEdit']),
        ...mapActions('category',['CategoryFindAll']),

        handleClose(done) {
            this.$emit('closeDrawer',false)
       },
       selectItem(val){
           this.ruleForm.parentId =val
       },
       submitForm(ruleForm){
<<<<<<< HEAD
        
=======
            this.ruleForm.status = '100'
>>>>>>> ee4da26af3c7f6f123ca1ab03df881ba6ca80cc9
           if(this.title=='修改产品'){
               this.ruleForm.id = this.currentObj.id
               this.ProductEdit(ruleForm)
                .then(()=>{
                    this.handleClose()
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                })
                .catch((res)=>{
                    // console.log(res)
                })
           }else {
<<<<<<< HEAD
               ruleForm.status = '100'
               this.ProductEdit(ruleForm)
                .then(()=>{
                    this.handleClose()
                    this.$message({     
=======
               console.log(this.ruleForm,'增加')
               this.ProductEdit(ruleForm)
                .then(()=>{
                    this.handleClose()
                    this.$message({
>>>>>>> ee4da26af3c7f6f123ca1ab03df881ba6ca80cc9
                        message: '增加成功',
                        type: 'success'
                    });
                })
                .catch((res)=>{
                    // console.log(res)
                })
           }
       },
       isEditOrAdd(){
            if(this.title=='修改产品'){
                this.ruleForm.name = this.currentObj.name
                this.ruleForm.description = this.currentObj.description
                this.ruleForm.price = this.currentObj.price
                this.ruleForm.status = this.currentObj.status
                this.ruleForm.photo = this.currentObj.photo
                this.ruleForm.categoryId = this.currentObj.categoryId
            }else{
                for(let key in this.ruleForm){
                    if(key == 'status'){
                        this.ruleForm[key] == '100'
                    }else{
                        this.ruleForm[key] = ""
                    }
                }

            }
       },
    //    图片上传
        changeImg(file, fileList){
            let url = "http://182.92.66.130/fruits_image/"
            this.ruleForm.photo = url +file.name
        },
        handleRemove(file, fileList) {
            this.ruleForm.photo = ""
        }

    }
}
</script>
<style>
   .content{
       margin-left: 300px;
   }
</style>
