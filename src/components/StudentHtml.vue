<template>
  <div>
    <div><button @click="addStu">添加学生</button></div>
    <table>
      <thead>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>性别</th>
          <th>出生日期</th>
          <th>专业</th>
          <th>班级</th>
          <th>绩点</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stu in tableData" :key="stu.sno">
          <td v-for="(attr,index) in stu" :key="index">
            {{attr}}
          </td>
          <button @click="updateStu(stu)">修改</button>
          <button @click="deleteStu(stu.sno)">删除</button>
        </tr>
      </tbody>
    </table>

    <form>
      <div>
        <label for="sno">学号</label>
        <input type="text" name="sno" id="sno" v-model="form.sno" required/>
      </div>
      <div>
        <label for="sname">姓名</label>
        <input type="text" name="sname" id="sname" v-model="form.sname"  required/>
      </div>
      <div>
        <label for="ssex">性别</label>
        <input type="text" name="ssex" id="ssex" v-model="form.ssex" required/>
      </div>
      <div>
        <label for="sbirthday">出生日期</label>
        <input type="text" name="sbirthday" id="sbirthday" v-model="form.sbirthday" required/>
      </div>
      <div>
        <label for="speciality">专业</label>
        <input type="text" name="speciality" id="speciality" v-model="form.speciality" required/>
      </div>
      <div>
        <label for="sclass">班级</label>
        <input type="text" name="sclass" id="sclass" v-model="form.sclass"  required/>
      </div>
      <div>
        <label for="tc">绩点</label>
        <input type="text" name="tc" id="tc" v-model="form.tc" required/>
      </div>
      <div>
        <button @click="submitForm">提交</button>
        <button @click="form = {}">取消</button>
      </div>
    </form>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentHtml",
  data(){
    return {
      tableData: [],
      formType: 1, // 1 编辑 0 添加
      form: {
        sno: '',
        sname: '',
        ssex: '',
        sbirthday: '',
        speciality: '',
        sclass: '',
        tc: ''
      },
    }
  },
  methods: {
    getAll(){
      axios
          .get("/api/student")
          .then(res => {
            this.tableData = res.data
          })
    },
    deleteStu(sno){
      console.log('delete:' + sno)
      axios
          .delete("/api/student/" + sno)
          .then(flag => {
            if(flag){
              alert('删除成功！')
            }else{
              alert('删除失败！')
            }
          })
          .finally(()=>{
            this.getAll()
          })
    },
    addStu(){
      this.formType = 0
      this.form = {}
    },
    submitForm(){
      if(this.formType === 1){
        axios
            .put("/api/student",this.form)
            .then(flag => {
              if(flag){
                alert('更新成功')
              }else{
                alert('更新失败')
              }
            })
            .finally(()=>{
              this.getAll()
            })
      }else if(this.formType === 0){
        axios
            .post("/api/student",this.form)
            .then(flag => {
              if(flag){
                alert('添加成功')
              }else{
                alert('添加失败')
              }
            })
            .finally(()=>{
              this.getAll()
            })
      }
    },
    updateStu(stu){
      this.formType = 1
      this.form = stu
    }
  },
  created() {
    this.getAll()
  }
}
</script>

<style scoped>

</style>