<template>
  <div id="app">
    <el-drawer
    :title="title"
    :visible.sync="visible2"
    :direction="direction"
    :before-close="handleClose">
        <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" size="mini" class="demo-ruleForm">
            <el-form-item label="商品名称" prop="checkPass">
                <el-col :span="12">
                    <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="仓库数量" prop="age">
                <el-col :span="12">
                    <el-input v-model="ruleForm.num"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="上传图片" prop="age">
               <el-upload
                class="upload-demo"
                action="http://182.92.66.130:6677/file/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :on-change="changeImg"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="所属共同Id" prop="age">
                <el-col :span="12">
                    <el-select clearable v-model="ruleForm.parentId" placeholder="请选择">
                        <el-option
                        v-for="item in CategoryData"
                        :key="item.id"
                        :label="item.parentId"
                        :value="item.parentId">
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
                num: "",
                icon: "",
                parentId:""
            },
            fileList:[]
        }
    },
    computed:{
        ...mapState('category',['CategoryData']),
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
    },
    methods:{
        ...mapActions('category',['CategoryEdit']),
        handleClose(done) {
            this.$emit('closeDrawer',false)
       },
       selectItem(val){
           this.ruleForm.parentId =val
       },
       submitForm(ruleForm){
           if(this.title=='修改分类'){
               this.ruleForm.id = this.currentObj.id
               this.ruleForm.parentId = this.ruleForm.parentId
               this.CategoryEdit(ruleForm)
                .then(()=>{
                    this.handleClose()
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                })
                .catch((res)=>{
                    console.log(res)
                })
           }else {
               this.CategoryEdit(ruleForm)
                .then(()=>{
                    this.handleClose()
                    this.$message({
                        message: '增加成功',
                        type: 'success'
                    });
                })
                .catch((res)=>{
                    console.log(res)
                })
           }
       },
       isEditOrAdd(){
            if(this.title=='修改分类'){
                this.ruleForm.name = this.currentObj.name
                this.ruleForm.num = this.currentObj.num
                this.ruleForm.icon = this.currentObj.icon
                this.ruleForm.parentId = this.currentObj.parentId
            }else{
                this.ruleForm.name = ""
                this.ruleForm.num = ""
                this.ruleForm.icon = ""
                this.ruleForm.parentId = ""
            }
       },
    //    图片上传
        changeImg(file, fileList){
            let url = "http://182.92.66.130/fruits_image/"
            this.ruleForm.icon = url +file.name
        },
        handleRemove(file, fileList) {
            this.ruleForm.icon = ""
        },
        handlePreview(file) {
            console.log(file,'dianji');
        }
    }
}
</script>
<style>
   .content{
       margin-left: 300px;
   }
</style>
