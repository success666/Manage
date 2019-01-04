  <template>
  <div class="root">
    <!-- 导航栏-->
    <el-menu :default-active="$route.path" unique-opened="true" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#2E89E6" text-color="rgb(255, 255, 255)" router>
      <el-menu-item index="0" disabled class="ydl_icon_box"><img class="ydl_icon" src="../../assets/imgs/logo.png"></el-menu-item>
      <el-menu-item id="my_title" index="/index" v-bind:class="{menuItem_active:menuItem==1}">
        <div class="menuItem_a1">首页</div>
      </el-menu-item>
      <el-submenu index="2" class="menuItem_a" v-bind:class="{menuItem_active:menuItem==2}">
        <template slot="title">体质健康分析</template>
        <el-menu-item index="/cervixStats/all?index=1" >体测数据统计</el-menu-item>
      </el-submenu>
      <el-submenu index="3" class="menuItem_a" v-bind:class="{menuItem_active:menuItem==3}">
        <template slot="title">体育资源管理</template>
        <el-menu-item index="/teacherStats/all?index=1">师资统计</el-menu-item>
        <el-menu-item index="/equipmentStats/all?index=1" >器材统计</el-menu-item>
        <el-menu-item index="/siteStats/all?index=1" >场地统计</el-menu-item>
        <el-menu-item index="/studentStats/all?index=1" >学生统计</el-menu-item>
        <el-menu-item index="/schoolStats/all?index=1">学校统计</el-menu-item>
      </el-submenu>
      <el-submenu index="4" class="menuItem_a" v-bind:class="{menuItem_active:menuItem==4}">
        <template slot="title">体育教务管理</template>
        <el-menu-item index="/homeWorkStats/all?index=1">作业统计</el-menu-item>
        <el-menu-item index="/wisdomStats/all?index=1" >智慧课堂统计</el-menu-item>
      </el-submenu>
      <el-submenu index="5" class="menuItem_a" v-bind:class="{menuItem_active:menuItem==5}">
        <template slot="title"><span class="p" style="width:84px;display:inline-block;text-align:center;">账号管理</span></template>
        <el-menu-item index="/accountlist" class="account">账号管理</el-menu-item>
        <el-menu-item index="/rolelist" class="account">角色管理</el-menu-item>
      </el-submenu>
      <el-submenu index="6" class="admin">
        <template slot="title"><span class="iconImg"></span>{{userName}}</template>
        <el-menu-item index="/modifypwd" >修改密码</el-menu-item>
        <el-menu-item @click="logout" index="/">退出</el-menu-item>
      </el-submenu>
    </el-menu>
    <!-- 导航栏-->

    <div class="my_body" :class="{ my_body1: isShow }">
      <!-- 动态面包屑-->

      <router-view></router-view>
    </div>
  </div>
</template>

  <script>
import request from "@/utils/request";

export default {
  name: "",
  data() {
    return {
      flag: "index", // 默认首页
      isShow: false,
      userName: "",
      menuItem: 1
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      //console.log(key, keyPath);
    },
    logout() {
      request.get("/api/auth/v1/mgmt/logout").then(res => {
        localStorage.clear();
        sessionStorage.clear();
        this.$router.push({ path: "/login" });
      });
    },
    setActive(name) {
      this.isShow = false;
      switch (name) {
        case "index":
          this.isShow = true;
          this.menuItem = 1;
          break;
        case "cervixStats":
          this.menuItem = 2;
          break;
        case "teacherStats":
        case "equipmentStats":
        case "siteStats":
        case "studentStats":
        case "schoolStats":
          this.menuItem = 3;
          break;
        case "homeWorkStats":
        case "wisdomStats":
          this.menuItem = 4;
          break;
        case "accountlist":
        case "rolelist":
          this.menuItem = 5;
          break;
      }
    }
  },
  mounted() {
    document
      .getElementById("my_title")
      .addEventListener("mouseenter", function() {});
    if (this.$route.name == "index") {
      // 如果是首页，宽度100%
      this.isShow = true;
    } else {
      this.isShow = false;
    }
    const user = JSON.parse(window.localStorage.getItem("ydl_user"));
    this.userName = user.username;
    this.setActive(this.$route.name);
  },
  watch: {
    // 监听路由变化，如果是首页，宽度100%
    $route(to, from) {
      // console.log('route',to.path); 
      this.setActive(to.name);
    }
  }
};
</script>

  <style scoped>
.iconImg {
  display: inline-block;
  width: 28px;
  height: 28px;
  vertical-align: middle;
  margin-right: 10px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(../../assets/imgs/icon10.png);
}
.my_body {
  padding: 0 19px;
  /*width: 1440px;*/
  min-width: 1200px;
  margin: 0 auto;
}
.my_body1 {
  padding: 0;
  width: 100%;
}
.ydl_icon_box {
  margin: 0 40px 0 0;
  padding: 0;
}
.ydl_icon {
  height: 60px;
  float: left;
  cursor: auto;
}
.admin {
  float: right;
}
.el-menu-item.ydl_icon_box.is-disabled {
  opacity: 0.95;
}
</style>
  <style lang="scss">
#app {
  min-width: 1200px;
}
/* .el-menu--horizontal>.el-menu-item.is-active, .el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
    border: 0;
    background-color: #fff !important;
    border-radius: 20px
  }
  .el-menu--horizontal>.el-submenu .el-submenu__icon-arrow{
    display: none;
  } */
/* .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
    background-color: #fff !important;
    border-radius: 20px;
    color: #3C91E8 !important
  }
  .el-menu--horizontal>.el-submenu .el-submenu__title{
    height: 30px;
    line-height: 30px;
    margin: 24px 20px;
  }
  #my_title{
    height: 30px !important;
    line-height: 30px !important;
    margin: 24px 25px !important;
  }
  .el-menu--horizontal>.el-menu-item{
    height: 77px;
    line-height: 77px
  } */
#my_title{
  padding:0;
}
.el-menu-demo {
  .el-menu-item {
    border: 0px !important;
  }
  .is-active {
    border: 0px !important;
    .el-submenu__title {
      color: white !important;
    }
  }
}
.menuItem_a:hover{
  background-color: rgb(37, 110, 184)!important;
}
.el-submenu__title{
  background-color:transparent!important;
}
.el-menu--horizontal {
  border: 0px;
  .el-menu {
    background-color: white !important;
    text-align: center;
    border: 1px solid rgb(46, 137, 230);
    border-radius: 10px;
    .el-menu-item.is-active {
      color: #2e89e6 !important;
    }
    .el-menu-item {
      background-color: white !important;
      color: #6b6b6b !important;
      &:hover {
        color: #2e89e6 !important;
      }
    }
  }
  .menuItem_a {
    height: 60px;
    vertical-align: middle;
    .el-submenu__title {
      height: 40px !important;
      line-height: 40px !important;
      margin-top: 10px !important;
    }
   
   
  }
    
  .el-menu--popup{
    min-width: 100px!important;
    width: 144px!important;
  }
  .el-menu--horizontal:first-child{
    min-width: 100px!important;
    width: 116px!important;
  }
  
  
  .el-menu--horizontal{
    width: 116px!important;
  }
      
  .menuItem_a1 {
    width: 144px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
  }
  .menuItem_active {
    margin:0 5px;
    .el-submenu__title {
      border-bottom: 0px !important;
    
      background-color: white !important;
      color: rgb(46, 137, 230) !important;
      border-radius: 26px !important;
      .el-icon-arrow-down{
        color: rgb(46, 137, 230) !important;
      }
    }
    .menuItem_a1{
      background-color: white !important;
      color: rgb(46, 137, 230) !important;
      border-radius: 26px !important;
      
    }
  }
}
</style>

