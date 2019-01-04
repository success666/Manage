<template>
  <div class="dep-bread">
    <span class="spanValue">当前位置:</span>
    <div class="router">
      <label
        class="routerList"
        v-for="(item,index) in routerData"
        @click="changeRouter(item,index)"
        :key="index" :title="item.name"
      >
        <span
          class="item-value"
          v-bind:class="{'breadcrumb__item':index>1&&routerData.length-1>index,'breadcrumb__item_last':index==routerData.length-1}"
        >{{item.name}}</span>
        <span v-if="index<routerData.length-1" class="breadcrumb__separator el-icon-arrow-right"></span>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    routerData: {
      type: Array,
      default: []
    }
  },
  methods: {
    changeRouter(item, index) {
      if (index < 2 || index == this.routerData.length - 1) {
        return;
      }
      let routerData = this.routerData.slice(0, index + 1);
      this.$emit("router-click", { routerData: routerData, index: index });
    }
  }
};
</script>
<style lang="scss" scoped>
.dep-bread {
  color: #606266;
  font-size: 0px;
  position: inherit;
  top: 60px;
  background: #f0f0f0;
  z-index: 1000;
  min-width: 1100px;
  width: 96%;
  .spanValue {
    font-size: 14px;
    display: inline-block;
    width: 67px;
    line-height: 50px;
    vertical-align: middle;
  }
  .router {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    vertical-align: middle;
    .routerList {
      font-size: 14px;
      .breadcrumb__separator {
        margin: 0 6px;
        font-weight: 400;
        vertical-align: middle;
      }
      .item-value {
        font-weight: initial;
        vertical-align: middle;
        max-width: 120px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .breadcrumb__item {
        color: #303133;
        font-weight: 700;
        cursor: pointer;
        &:hover {
          color: #1875f0;
        }
      }
      .breadcrumb__item_last {
        color: #1875f0 !important;
        cursor: no-drop;
      }
    }
  }
}
</style>


