<template>
  <div v-if="isShow" class="breadCrumbtitle">
    <span class="el-breadcrumb__item firstN">
      <span class="el-breadcrumb__inner">当前位置： </span>
    </span>
    <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
      <template v-for="(item, index) in routeList">
        <template v-if="item.parent">
          <el-breadcrumb-item :key="item.parent">
            {{item.parent}}
          </el-breadcrumb-item>
          <el-breadcrumb-item :key="index">
            {{item.name}}
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="item.parent" :key="item.name" :to="{ path: item.path }" :class="{lastItem: (index==routeList.length-1)}">
            <span @click="itemClick(99)">全国</span>
          </el-breadcrumb-item>
        </template>

        <el-breadcrumb-item :key="item.parent" v-else :to="{ path: item.path }" :class="{lastItem: (index==routeList.length-1)}">
          <span  @click="itemClick(index)">{{item.name}}</span>
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  created(){
    //this.getRoutePath();
    //console.log(this.routeList)
  },
  data() {
    return {
      //realList: []
      isShow:false
    }
  },
  computed: {
    ...mapGetters([
      'routeList',
    ])
  },
  methods:{
    itemClick(index) {
      //console.log('点击面包屑');
      if(index==99){
        this.$store.dispatch('DeleteRouteList', 1)
      }
      if(index<this.routeList.length){
        this.$store.dispatch('DeleteRouteList', index+1);
      }
      this.$store.dispatch('setNeedRefresh', false)
    },
    getRoutePath() {
      this.realList = this.$route.meta.routeList;
    },
    breadcrumbShow() {
      console.log(this.$route.name);
      if(this.$route.name == 'index' || this.$route.name.indexOf('role') !== -1 || this.$route.name.indexOf('account') !== -1) {
          this.isShow = false;
        }else {
          this.isShow = true;
        };
    },
  },
  mounted() {
    //console.log(1)
    this.breadcrumbShow()
  },
  watch: {
      'wisdomIndicators'() {
        this.setDefaultIndicators();
      },
      '$route' (to, from){
            this.breadcrumbShow()
            //console.log('------------------------------路由变化');
            if(to.meta.flag != from.meta.flag){
              // 跨页面 需要清空
              this.$store.dispatch('DeleteRouteList', 1)
            }else if(to.query.index < from.query.index){

                // if(to.query.NposProvinceIdName&&!from.query.NposProvinceIdName||!to.query.NposProvinceIdName&&from.query.NposProvinceIdName && to.query.index!=1){
                //     this.$store.dispatch('AddRouteList', {
                //         path: to.fullPath,
                //         name: this.$route.query.name,
                //     })
                // }else{
                //     // 截取到第一个子页
                //     this.$store.dispatch('DeleteRouteList', to.query.index);
                // }

                // 往前跳
                this.$store.dispatch('DeleteRouteList', to.query.index);
            }else if(to.query.index == from.query.index){
                this.$store.dispatch('AddRouteList', {
                    path: to.fullPath,
                    name: this.$route.query.name,
                })
            }else{
                // 新增路由
                this.$store.dispatch('AddRouteList', {
                    path: to.fullPath,
                    name: this.$route.query.name,
                })
            }
      },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
  .firstN{
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
  }
  .breadCrumbtitle{
    height: 53px;
  }
</style>
