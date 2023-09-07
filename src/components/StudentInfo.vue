<template>
  <div style="{width:100%;position:relative}">
    <!-- 查询条件表单 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="学号">
        <el-input v-model="formInline.sno" placeholder="Id"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formInline.sname" placeholder="Name"></el-input>
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="formInline.speciality" placeholder="Speciality"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="formInline.sclass" placeholder="Class"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryStudent">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="openAddDialog">添加</el-button>
      </el-form-item>
    </el-form>
    <!--  学生列表  -->
    <el-table
        :data="tableData"
        row-key="sno"
        lazy
        style="width: 100%">
      <el-table-column
          prop="sno"
          label="学号"
          width="205"
          sortable>
      </el-table-column><!--学号-->
      <el-table-column
          prop="sname"
          label="姓名"
          width="205">
      </el-table-column><!--姓名-->
      <el-table-column
          label="性别"
          width="205">
        <template slot-scope="scope">
          <span>{{scope.row.ssex === '1' ? '男' : '女'}}</span>
        </template>
      </el-table-column><!--性别-->
      <el-table-column
          prop="sbirthday"
          label="出生日期"
          width="205">
      </el-table-column><!--出生日期-->
      <el-table-column
          prop="speciality"
          label="专业"
          width="205">
      </el-table-column><!--专业-->
      <el-table-column
          prop="sclass"
          label="班级"
          width="205"
          sortable>
      </el-table-column><!--班级-->
      <el-table-column
          prop="tc"
          label="绩点*100"
          width="300"
          sortable>
      </el-table-column><!--绩点-->

      <el-table-column
          label="操作"
          width="200">
        <template slot-scope="scope">
          <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button> <!--scope.row行数据-->
          <el-button @click="handleDelete(scope.row.sno)" type="text" style="color: #ec122a" size="small">删除
          </el-button>
        </template>
      </el-table-column><!--学生相关操作-->

      <template slot="empty">
        <!--  空状态 不存在任何数据  -->
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>

    <!--  学生信息对话框  -->
    <el-dialog
        title="学生信息"
        :visible.sync="studentInfoDialogVisible"
        width="40%"
        :before-close="handleCloseDialog"> <!--关闭之前调用方法-->
      <!--dialogBody-->
      <el-descriptions class="margin-top" title="展示" :column="3" :size="elDescriptionSize" border>
        <template slot="extra">
          <el-button type="primary" size="small" @click="updateStudent">编辑</el-button>
        </template>
        <el-descriptions-item label="学号" :span="3">{{ dialogFormDate.sno }}</el-descriptions-item>
        <el-descriptions-item label="姓名">{{ dialogFormDate.sname }}</el-descriptions-item>
        <el-descriptions-item label="性别" v-if="dialogFormDate.ssex === '1'">男</el-descriptions-item>
        <el-descriptions-item label="性别" v-else>女</el-descriptions-item>
        <el-descriptions-item label="出生日期">{{ dialogFormDate.sbirthday }}</el-descriptions-item>
        <el-descriptions-item label="专业">{{ dialogFormDate.speciality }}</el-descriptions-item>
        <el-descriptions-item label="班级">{{ dialogFormDate.sclass }}</el-descriptions-item>
        <el-descriptions-item label="绩点">{{ dialogFormDate.tc * 1.0 / 100 }}</el-descriptions-item>
      </el-descriptions>
      <!--dialogFooter-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="studentInfoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="studentInfoDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--  新增学生对话框  -->
    <el-dialog title="学生信息新增/编辑" :visible.sync="addDialogFormVisible" width="36%" style="justify-content: center">
      <el-form :model="form" label-width="120px" style="{text-align: center; width: 80%;}">
        <el-form-item label="学号" required>
          <el-col :span="22">
            <el-input v-model="form.sno"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="姓名" required>
          <el-col :span="22">
            <el-input v-model="form.sname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="性别" required>
          <el-select v-model="form.ssex" placeholder="性别">
            <el-option value="1" label="男"></el-option>
            <el-option value="0" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" required>
          <el-date-picker
              type="date"
              v-model="form.sbirthday"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="专业" required>
          <el-col :span="22">
            <el-input v-model="form.speciality"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="班级" required>
          <el-col :span="22">
            <el-input v-model="form.sclass"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="绩点" required>
          <el-tooltip class="item" effect="light" content="输入为整数~ 真实绩点的100倍!" placement="right">
            <el-col :span="22">
              <el-input v-model="form.tc"></el-input>
            </el-col>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog()">取 消</el-button>
        <el-button type="primary" @click="addStudent">确 定</el-button>
      </div>
    </el-dialog>
    <!--  分页功能  -->
    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.current"
          :page-sizes="[5,10,20,50]"
          :page-size="pageInfo.pageSize"
          layout="total,sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentInfo",
  data() {
    return {
      tableData: [],
      studentInfoDialogVisible: false,
      elDescriptionSize: 'medium',
      dialogFormDate: {},
      pageInfo: {
        size: 10,
        total: 0,
        current: 1
      },
      formInline: {
        sno: '',
        sname: '',
        speciality: '',
        sclass: ''
      },
      addDialogFormVisible: false,
      form: {
        sno: '',
        sname: '',
        ssex: '',
        sbirthday: '',
        speciality: '',
        sclass: '',
        tc: ''
      },
      dialogType: 1 // 1添加 0修改
    }
  },
  methods: {
    //查询符合条件的学生列表
    queryValidStudentInfo() {
      axios
          .post("/api/student/" + this.pageInfo.current + "/" + this.pageInfo.size, this.formInline)
          .then((res) => {
            // console.log(res)
            this.tableData = res.data.records
            // pageInfo
            this.pageInfo.size = res.data.size
            this.pageInfo.total = res.data.total
            this.pageInfo.current = res.data.current
          })
          .catch((err) => {
            console.log(err)
          })
    },
    //查看学生
    handleView(data) {
      console.log(data)
      //更新dialogFormDate数据
      this.dialogFormDate = data
      //更新编辑框的表单数据 新增与编辑共用一个对话框
      this.form = data
      //打开对话框
      this.studentInfoDialogVisible = true
    },
    //删除学生
    handleDelete(sno) {
      console.log('即将删除的学生Id：' + sno)
      this.$confirm('该操作将永久删除学生!---需保证不存在关联数据!', {
        title: '删除确认',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete("/api/student/" + sno).then((flag) => {
          if (flag) {
            this.$message.success('删除成功 >.<')
            this.queryValidStudentInfo()
          } else {
            this.$message.info('删除失败 T^T')
          }
        }).catch((err) => {
          this.$message.error('删除失败报错原因：' + err.message)
        })
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    //处理关闭对话框前的操作
    handleCloseDialog() {
      this.$confirm('确认关闭？')
          .then(msg => {
            console.log(msg)
            this.studentInfoDialogVisible = false
          })
          .catch(err => {
                console.log(err)
              }
          );
    },
    //pageSize改变
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageInfo.size = val
      // 设置current为1 防止切换size改变 current仍然不变产生的错误查询
      this.pageInfo.current = 1
      this.queryValidStudentInfo()
    },
    //页码切换
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageInfo.current = val
      this.queryValidStudentInfo()
    },
    //查询学生
    queryStudent(event) {
      console.log('submit!',event);
      this.queryValidStudentInfo()
    },
    //直接打开新增对话框前的处理
    openAddDialog(){
      this.form = {}
      this.dialogType = 1
      this.addDialogFormVisible = true
    },
    //关闭对话框前的操作
    closeAddDialog(){
      this.queryValidStudentInfo()
      this.addDialogFormVisible = false
    },
    //新增学生 or 操作学生
    addStudent(){
      if(this.dialogType === 1){
        //新增学生
        axios.post("/api/student",this.form)
            .then((flag)=>{
              if(flag){
                this.$message.success("添加成功Success!!!");
                this.queryValidStudentInfo()
              }else{
                this.$message.error("添加失败Fail!!!")
              }
            }).catch(()=>{
          this.$message.error("服务器异常!!!")
        }).finally(()=>{
          this.addDialogFormVisible = false
        })
      }else{
        //更新学生
        axios.put("/api/student",this.form)
            .then((flag)=>{
              if(flag){
                this.$message.success("更新成功Success!!!");
                this.queryValidStudentInfo()
              }else{
                this.$message.error("更新失败Fail!!!")
              }
            }).catch(()=>{
          this.$message.error("服务器异常!!!")
        }).finally(()=>{
          this.addDialogFormVisible = false
        })
      }
    },
    //编辑学生
    updateStudent(){
      console.log('更新')
      this.dialogType = 0
      //关闭学生信息对话框
      this.studentInfoDialogVisible = false
      //打开编辑对话框
      this.addDialogFormVisible = true
    }
  },
  //vue组件初始化
  created() {
    //初始化学生数据
    this.queryValidStudentInfo();
  }
}
</script>

<style scoped>
  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
</style>