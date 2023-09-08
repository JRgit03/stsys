<template>
    <div class="container">
      <el-container>
        <el-header>
          <el-menu :default-active="this.$router.path" class="el-menu-demo" mode="horizontal" router active-text-color="#72b0fe">
            <el-menu-item index="/student">学生管理</el-menu-item>
            <el-menu-item index="/course">课程管理</el-menu-item>
            <el-menu-item index="/score">成绩管理</el-menu-item>
            <el-menu-item index="/studentHtml">Html版本</el-menu-item>
          </el-menu>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  created() {
    console.log(this.$router)
  }
}
</script>

<style>
  .container{
    width: 1800px;
    margin: 20px auto;
  }
</style>
