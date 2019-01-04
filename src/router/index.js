import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/

Vue.use(Router)

import Login from '../views/login/index'
import NotFound from '../views/404'
import Home from '../views/home/index'

import Index from '../views/secondPages/index'

// 学校统计
import SchoolStats from '../views/secondPages/resourceMgt/schoolStats/schoolStats'
import RmDetailList from '../views/secondPages/resourceMgt/schoolStats/detailList'
import RmTeacherDetail from '../views/secondPages/resourceMgt/schoolStats/teacherDetail'
// 学校统计

// 学生统计
import StudentStats from '../views/secondPages/resourceMgt/studentStats/studentStats'
import StudentStatsDetailList from '../views/secondPages/resourceMgt/studentStats/detailList'
import StudentStatsDetail from '../views/secondPages/resourceMgt/studentStats/studentDetail'
// 学生统计

// 师资统计
import TeacherStats from '../views/secondPages/resourceMgt/teacherStats/teacherStats'
import TeacherDetailList from '../views/secondPages/resourceMgt/teacherStats/detailList'
import TeacherTeacherDetail from '../views/secondPages/resourceMgt/teacherStats/teacherDetail'
// 师资统计

// 体测统计
import CervixStats from '../views/secondPages/healthAnalysis/cervixStats'
import CvDataStats from '../views/secondPages/healthAnalysis/cervixDataStats'
import StudentDetail from '../views/secondPages/healthAnalysis/studentDetail'
// 体测统计

// 器材统计
import EquipmentStats from '../views/secondPages/resourceMgt/equipmentStats/equipmentStats'
import EquipmentStatsDetail from '../views/secondPages/resourceMgt/equipmentStats/detail'
// 器材统计

// 作业统计
import HomeWorkStats from '../views/secondPages/educationalMgt/homeWorkStats/homeWorkStats'
import HomeWorkDetail from '../views/secondPages/educationalMgt/homeWorkStats/homeWorkDetail'
import HwStudentList from '../views/secondPages/educationalMgt/homeWorkStats/studentList'
import StudentHomeWork from '../views/secondPages/educationalMgt/homeWorkStats/studentHomeWork'
// 作业统计

// 场地统计
import SiteStats from '../views/secondPages/resourceMgt/siteStats/siteStats'
import SiteDetailList from '../views/secondPages/resourceMgt/siteStats/detailList'
// 场地统计

// 智慧课堂统计
import WisdomStats from '../views/secondPages/educationalMgt/wisdomStats/wisdomStats'
import WisdomDetailList from '../views/secondPages/educationalMgt/wisdomStats/detailList'
import WisdomDetail from '../views/secondPages/educationalMgt/wisdomStats/detail'
// 智慧课堂统计

// import PeStats from '../views/secondPages/educationalMgt/peStats'
// import SportsStats from '../views/secondPages/educationalMgt/sportsStats'

// 账号管理
import AccountList from '../views/accountMgmt/accountList'
import AccountAdd from '../views/accountMgmt/accountAdd'
import AccountEdit from '../views/accountMgmt/accountEdit'
import RoleList from '../views/accountMgmt/roleList'
import RoleAdd from '../views/accountMgmt/roleAdd'
import RoleEdit from '../views/accountMgmt/roleEdit'
// 账号管理
import ModifyPwd from '../views/login/modifyPwd'
import ForgetPwd from '../views/login/forgetPwd'

export const constantRouterMap = [
  { path: '/login', name: 'login', component: Login },
  { path: '/notfound', name: 'notfound', component: NotFound },
  { path: '*', redirect: '/notfound' },
  { path: '/modifypwd', name: 'modifypwd', component: ModifyPwd },
  { path: '/forgetpwd', name: 'forgetpwd', component: ForgetPwd },
  { path: '/', component: Home,
    children: [
      {
        path: '',
        redirect: 'index'
      },
      {
        path: 'index',
        name: 'index',
        component: Index,
        meta: {
          title: '首页',
          flag: 0
        }
      },
      // 智慧课堂统计
      {
        path: 'wisdomDetail',
        name: 'wisdomDetail',
        component: WisdomDetail,
        meta: {
          title: '详情',
          flag: 'wisdomStats'
        }
      },
      {
        path: 'wisdomDetailList',
        name: 'wisdomDetailList',
        component: WisdomDetailList,
        meta: {
          title: '详情列表',
          flag: 'wisdomStats'
        }
      },
      {
        path: 'wisdomStats/all',
        component: WisdomStats,
        name: 'wisdomStats',
        meta: {
          title: '智慧课堂统计',
          parent: '体育资源管理',
          flag: 'wisdomStats'
        }
      },
      // 智慧课堂统计
      // 场地统计
      {
        path: 'siteDetailList',
        name: 'siteDetailList',
        component: SiteDetailList,
        meta: {
          title: '详情列表',
          flag: 'siteStats'
        }
      },
      {
        path: 'siteStats/all',
        component: SiteStats,
        name: 'siteStats',
        meta: {
          title: '场地统计',
          parent: '体育教务管理',
          flag: 'siteStats'
        }
      },
      // 场地统计
      // 作业统计
      {
        path: 'studentHomeWork',
        name: 'studentHomeWork',
        component: StudentHomeWork,
        meta: {
          title: '学生作业列表',
          flag: 'homeWorkStats'
        }
      },
      {
        path: 'hwStudentList',
        name: 'hwStudentList',
        component: HwStudentList,
        meta: {
          title: '学生列表',
          flag: 'homeWorkStats'
        }
      },
      {
        path: 'homeWorkDetail',
        name: 'homeWorkDetail',
        component: HomeWorkDetail,
        meta: {
          title: '作业详情',
          flag: 'homeWorkStats'
        }
      },
      {
        path: 'homeWorkStats/all',
        component: HomeWorkStats,
        name: 'homeWorkStats',
        meta: {
          title: '作业统计',
          parent: '体育教务管理',
          flag: 'homeWorkStats'
        }
      },
      // 作业统计
      // 器材统计
      {
        path: 'equipmentStatsDetail',
        name: 'equipmentStatsDetail',
        component: EquipmentStatsDetail,
        meta: {
          title: '详情列表',
          flag: 'equipmentStats'
        }
      },
      {
        path: 'equipmentStats/all',
        component: EquipmentStats,
        name: 'equipmentStats',
        meta: {
          title: '器材统计',
          parent: '体育资源管理',
          flag: 'equipmentStats'
        }
      },
      // 器材统计
      // 体测统计
      {
        path: 'cvDetailList',
        name: 'cvDetailList',
        component: CvDataStats,
        meta: {
          title: '详情列表',
          flag: 'cervixStats'
        }
      },
      {
        path: 'studentDetail',
        name: 'studentDetail',
        component: StudentDetail,
        meta: {
          title: '于伟通',
          flag: 'cervixStats'
        }
      },
      {
        path: 'cervixStats/all',
        component: CervixStats,
        name: 'cervixStats',
        meta: {
          title: '体测数据统计',
          parent: '体质健康分析',
          flag: 'cervixStats'
        }
      },
      // 体测统计

      // 学校统计
      {
        path: 'rmDetailList',
        name: 'rmDetailList',
        component: RmDetailList,
        meta: {
          title: '详情列表',
          flag: 'schoolStats'
        }
      },
      {
        path: 'rmTeacherDetail',
        name: 'rmTeacherDetail',
        component: RmTeacherDetail,
        meta: {
          title: '师资详情',
          flag: 'schoolStats'
        }
      },
      {
        path: 'schoolStats/all',
        component: SchoolStats,
        name: 'schoolStats',
        meta: {
          title: '学校统计',
          parent: '体育资源管理',
          flag: 'schoolStats'
        }
      },
      // 学校统计

      // 学生统计
      {
        path: 'studentStats/all',
        component: StudentStats,
        name: 'studentStats',
        meta: {
          title: '学生统计',
          parent: '体育资源管理',
          flag: 'studentStats'
        }
      },
      {
        path: 'studentStatsProvince',
        name: 'studentStatsProvince',
        component: StudentStats,
        meta: {
          title: '省',
          flag: 'studentStats'
        }
      },
      {
        path: 'studentStatsCity',
        name: 'studentStatsCity',
        component: StudentStats,
        meta: {
          title: '市',
          flag: 'studentStats'
        }
      },
      {
        path: 'studentStatsStreet',
        name: 'studentStatsStreet',
        component: StudentStats,
        meta: {
          title: '区',
          flag: 'studentStats'
        }
      },
      {
        path: 'studentStatsDetailList',
        component: StudentStatsDetailList,
        name: 'studentStatsDetailList',
        meta: {
          title: '详情列表',
          flag: 'studentStats'
        }
      },
      {
        path: 'studentStatsDetail',
        component: StudentStatsDetail,
        name: 'studentStatsDetail',
        meta: {
          title: '小明',
          flag: 'studentStats'
        }
      },
      // 学生统计
      // 师资统计
      {
        path: 'teacherStats/all',
        component: TeacherStats,
        name: 'teacherStats',
        meta: {
          title: '师资统计',
          parent: '体育资源管理',
          flag: 'teacherStats'
        }
      },
      {
        path: 'teacherProvince',
        name: 'teacherProvince',
        component: TeacherStats,
        meta: {
          title: '省',
          flag: 'teacherStats'
        }
      },
      {
        path: 'teacherCity',
        name: 'teacherCity',
        component: TeacherStats,
        meta: {
          title: '市',
          flag: 'teacherStats'
        }
      },
      {
        path: 'teacherStreet',
        name: 'teacherStreet',
        component: TeacherStats,
        meta: {
          title: '区',
          flag: 'teacherStats'
        }
      },
      {
        path: 'teacherDetailList',
        name: 'teacherDetailList',
        component: TeacherDetailList,
        meta: {
          title: '详情列表',
          flag: 'teacherStats'
        }
      },
      {
        path: 'teacherTeacherDetail',
        name: 'teacherTeacherDetail',
        component: TeacherTeacherDetail,
        meta: {
          title: '师资详情',
          flag: 'teacherStats'
        }
      },
      // 师资统计
      // 账号管理
      {
        path: 'accountlist',
        name: 'accountlist',
        component: AccountList,
        meta: {
          title: '账号管理',
          flag: 'teacherStats'
        }
      },
      {
        path: 'accountadd',
        name: 'accountadd',
        component: AccountAdd,
        meta: {
          title: '账号新增',
          flag: 'teacherStats'
        }
      },
      {
        path: 'accountedit',
        name: 'accountedit',
        component: AccountEdit,
        meta: {
          title: '账号编辑',
          flag: 'teacherStats'
        }
      },
      {
        path: 'rolelist',
        name: 'rolelist',
        component: RoleList,
        meta: {
          title: '角色列表',
          flag: 'teacherStats'
        }
      },
      {
        path: 'roleadd',
        name: 'roleadd',
        component: RoleAdd,
        meta: {
          title: '角色新增',
          flag: 'teacherStats'
        }
      },
      {
        path: 'roleedit',
        name: 'roleedit',
        component: RoleEdit,
        meta: {
          title: '角色编辑',
          flag: 'teacherStats'
        }
      }
      // 账号管理
    ]
  }
]

const router = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default router

var routeList = [];
router.beforeEach((to, from, next) => {
  var index = -1
  for (var i = 0; i < routeList.length; i++) {
    if (routeList[i].name === to.name) {
      index = i;
      break
    }
  }
  if (index !== -1) { // 如果存在路由列表，则把之后的路由都删掉
    routeList.splice(index + 1, routeList.length - index - 1)
  } else if (to.meta.flag !== from.meta.flag) {
    // 不同栏目下的跳转 先清空原来的 数据
    routeList = [];
    routeList.push({ 'name': to.name, 'path': to.fullPath, title: to.meta.title })
  } else if (to.name !== 'login') {
    routeList.push({ 'name': to.name, 'path': to.fullPath, title: to.meta.title })
  }
  if (to.meta.parent) {
    if (!routeList[0].first) {
      routeList.unshift({ 'name': 'first', 'path': to.fullPath, title: to.meta.parent, first: 1 })
    }
  }
  to.meta.routeList = routeList;
  next()
})
