<template>
  <div>
    <el-form inline>
      <el-form-item label="查询学号">
        <el-input v-model.trim="querySno" placeholder="学号必须为10位">
        </el-input>
      </el-form-item>
      <el-form-item label="查询课程">
        <el-input v-model.trim="queryCno" placeholder="课程号">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryValidScore">
          查询
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="clearQueryInfo">
          清空查询
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="showTableData"
        stripe
        style="width: 100%"
        row-key="id">
      <el-table-column
          prop="sno"
          label="学号"
          width="230px">
      </el-table-column>
      <el-table-column
          prop="sname"
          label="姓名"
          width="230px">
      </el-table-column>
      <el-table-column
          prop="cno"
          label="课程号"
          width="230px">
      </el-table-column>
      <el-table-column
          prop="cname"
          label="课程名"
          width="230px">
      </el-table-column>
      <el-table-column
          prop="credit"
          label="学分"
          width="230px">
      </el-table-column>
      <el-table-column
          prop="grade"
          label="分数"
          width="230px"
          sortable>
      </el-table-column>
      <template slot="empty">
        <!--  空状态 不存在任何数据  -->
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ScoreInfo",
  data() {
    return {
      tableData: [],
      showTableData: [],
      querySno: '',
      queryCno: ''
    }
  },
  methods: {
    initScoreInfo() {
      axios.get("/api/score")
          .then((res) => {
            if (res.data != null) {
              this.tableData = res.data
              this.showTableData = this.tableData
            }
          })
          .catch((err) => {
            console.log(err)
          })
    },
    queryValidScore(){
      if(this.querySno.length !== 10 && this.queryCno === ''){
        this.$message.warning('查询条件不合法!')
        this.showTableData = this.tableData
        this.querySno = ''
        return
      }
      if(this.querySno !== '' && this.querySno.length !== 10){
        this.$message.info('查询学号不合法')
        this.querySno = ''
      }
      this.showTableData = this.tableData.filter(scoreVO => {
        return (this.querySno.length === 10 ? scoreVO.sno === this.querySno : true) && (this.queryCno !== '' ? scoreVO.cno === this.queryCno : true);
      })
      setTimeout(()=>{
        this.$message.success('查询成功 ^.^')
      },10)
    },
    clearQueryInfo(){
      this.querySno = ''
      this.queryCno = ''
      this.showTableData = this.tableData
    }
  },
  created() {
    this.initScoreInfo()
  }
}
</script>

<style scoped>

</style>