<template>
  <div id="app">
    <el-drawer
    :title="title"
    :visible.sync="visible2"
    :direction="direction"
    :before-close="handleClose">
        <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" size="mini" class="demo-ruleForm">
            <el-form-item label="省份城市区域" prop="pass">
                <el-cascader
                :options="options"
                @change="selectItem"
                size="mini"
                :props="{ checkStrictly: true,label:'label' }"
                clearable></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="checkPass">
                <el-col :span="12">
                    <el-input type="text" v-model="ruleForm.address" autocomplete="off"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="电话" prop="age">
                <el-col :span="12">
                    <el-input v-model="ruleForm.telephone"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="顾客" prop="age">
                <el-col :span="12">
                    <el-select clearable v-model="ruleForm.customerId" placeholder="请选择">
                        <el-option
                        v-for="item in customerData"
                        :key="item.id"
                        :label="item.realname"
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
                province: "",
                city: "",
                area: "",
                address: "",
                telephone: ''
            }
        }
    },
    computed:{
        ...mapState('address',['customerData']),
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
        ...mapActions('address',['addressEdit']),
        handleClose(done) {
            // this.visible=false
            this.$emit('closeDrawer',false)
       },
       selectItem(val){
        //    console.log(val)
        let arr = new Map()
            this.options.forEach((item1)=>{
                if(val[0]==item1.value){
                    arr.set(item1.value,item1.label)
                    item1.children.forEach((item2)=>{
                        if(val[1]==item2.value){
                            arr.set(item2.value,item2.label)
                            item2.children.forEach((item3)=>{
                                if(val[2]==item3.value){
                                    arr.set(item3.value,item3.label)
                                }
                            })
                        }
                    })
                }
            })
        // 
        let arr1 = []
        for (let value of arr.values()) {
            arr1.push(value)
        }
        this.ruleForm.province = arr1[0]
        this.ruleForm.city = arr1[1]
        this.ruleForm.area = arr1[2]
       },
       submitForm(ruleForm){
           if(this.title=='修改用户地址信息'){
               this.ruleForm.id = this.currentObj.id
               if(this.currentObj.customerId!==null){
                   this.ruleForm.customerId = this.currentObj.customerId
               }
               this.addressEdit(ruleForm)
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
               this.addressEdit(ruleForm)
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
            if(this.title=='修改用户地址信息'){
                this.ruleForm.province = this.currentObj.province
                this.ruleForm.city = this.currentObj.city
                this.ruleForm.area = this.currentObj.area
                this.ruleForm.address = this.currentObj.address
                this.ruleForm.telephone = this.currentObj.telephone
            }else{
                this.ruleForm.province = ""
                this.ruleForm.city = ""
                this.ruleForm.area = ""
                this.ruleForm.address = ""
                this.ruleForm.telephone = ""
            }
       }
    }
}
</script>
<style>
   .content{
       margin-left: 300px;
   }
</style>
