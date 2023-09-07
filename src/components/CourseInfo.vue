<template>
  <el-table
      :data="tableData"
      stripe
      style="width: 100%">
    <el-table-column
        prop="cno"
        label="课程号"
        width="180">
    </el-table-column>
    <el-table-column
        prop="cname"
        label="课程名"
        width="180">
    </el-table-column>
    <el-table-column
        prop="credit"
        label="学分"
        width="180">
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";

export default {
  name: "CourseInfo",
  data(){
    return {
      tableData: [],
    }
  },
  methods: {
    initCourseInfo(){
      axios.get("/api/course")
          .then((res) => {
            if (res.data != null) {
              this.tableData = res.data;
            }
          })
          .catch((err) => {
            console.log(err)
          })
    },
  },
  created() {
    this.initCourseInfo()
  }
}
</script>

<style scoped>

</style>