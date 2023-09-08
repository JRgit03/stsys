//专门用于创建整个应用路由器
import VueRouter from "vue-router";
import StudentInfo from "@/components/StudentInfo";
import CourseInfo from "@/components/CourseInfo";
import ScoreInfo from "@/components/ScoreInfo";
import StudentHtml from "@/components/StudentHtml";

//创建并暴露路由器
export default new VueRouter({
  routes: [
    {
      path: '/student',
      component: StudentInfo
    },
    {
      path: '/course',
      component: CourseInfo
    },
    {
      path: '/score',
      component: ScoreInfo
    },
    {
      path: '/studentHtml',
      component: StudentHtml
    }
  ]
})