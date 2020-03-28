<template>
  <div id="app">
    <span>主页/顾客管理</span>
    <div class="content">
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            width="120">
            </el-table-column>
            <el-table-column
            prop="address"
            label="地址"
            show-overflow-tooltip>
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            tableData:[]
        }
    },
    methods:{
        handleSelectionChange(){
            
        }
    }
}
</script>

<style>
</style>
