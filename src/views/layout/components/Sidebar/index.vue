<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <div class="logo">
      <img :src="ydl_icon" alt="">
    </div>
    <el-menu class="el-menu-vertical-demo" :collapse="isCollapse"
             background-color="#2E89E6" text-color="#fff"
             :router="true"
    >
      <template v-for="(item, key) in menus">
        <el-submenu :key="key" :index="key" v-if="item.children.length > 0">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title" v-text="item.name"></span>
          </template>
          <el-menu-item v-for="(child, cKey) in item.children" :key="cKey" :index="'/' + child.code">
            {{child.name}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="item.code" :key="key">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import ydl_icon from '@/assets/imgs/ydl_icon.png'

export default {
  created() {
    this.menus = JSON.parse(window.localStorage.getItem('menuData'))
  },
  data() {
    return {
      ydl_icon
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-submenu .el-menu-item.is-active {
    color: #409EFF!important;
    background: #fff!important;
    margin-left: 25px;
    padding-left: 15px !important;
    border-radius: 25px 0 0 25px;
  }
  .el-submenu .el-menu-item {
    height: 35px;
    line-height: 35px;
  }
  .el-submenu .el-menu-item {
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
  }
  .logo {
    width: 100%;
    background: #2E89E6;

  > img {
    width: 67%;
    padding: 15px 0;
    display: block;
    margin: 0 auto;
  }
  }
</style>
