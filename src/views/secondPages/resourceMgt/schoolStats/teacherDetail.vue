<template>
  <div class="teacher_detail">
    <section class="s_1">
      <div class="s_1_head">学校详情
        <div>
          <el-button type="primary" size="small" @click="exportFun">导出</el-button>
          <el-button type="primary" size="small" @click="print('detail_data')">打印</el-button>
        </div>
      </div>
    </section>
    <section class="s_2" ref="detail_data">
      <div>
        <p>学校名称： {{detailListData.name}}</p>
        <p class="s_1_m">
          <span>学校类型： {{detailListData.schoolType}}</span>
          <span>归属教育机构： {{detailListData.mgmtDeptName}}</span>
        </p>
      </div>
      <p class="s_2_m1">
        <span>地区： {{detailListData.posProvinceName+detailListData.posCityName+detailListData.posDistrictName+detailListData.posDetail}}</span>
      </p>
      <p class="s_2_m2">
        <span>学校地理位置经度: E116°23′20″</span>
        <span>学校地理位置经度: N39°54′37″</span>
        <span>管理端显示经纬坐标点: 是</span>
      </p>
      <p>状态： {{detailListData.status==1?'启用':'停用'}}</p>
    </section>
  </div>
</template>
<script>
import { exportXml, printPdf } from "@/utils/export";
export default {
  props: {
    teacherData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      detailListData: ""
    };
  },
  methods: {
    getFormData(data) {
      this.$ajax
        .get("/api/auth/v1/resourceMgmt/school/" + data.id)
        .then(res => {
          this.detailListData = res.data;
        });
    },
    exportFun() {
      let api = "api/auth/v1/resourceMgmt/school/export/"+this.teacherData.id;
      exportXml(api, {}, this);
    },
    print(name) {
      printPdf(name, this);
    }
  },
  watch: {
    teacherData(data) {
      this.getFormData(data);
    }
  },
  mounted() {
    this.getFormData(this.teacherData);
  }
};
</script>
<style scoped>
.teacher_detail {
  padding: 0 28px;
  height: 757px;
  background-color: #fff;
  font-size: 14px;
  color: #6b6b6b;
  line-height: 30px;
  border-radius: 10px;
}
.s_1_head {
  line-height: 80px;
  font-size: 16px;
  color: #525252;
  font-weight: 600;
}
.s_1_head > div {
  float: right;
}
.s_1,
.s_2 {
  border-bottom: 1px solid #e7f3ff;
}
.s_1_m > span:nth-of-type(2) {
  margin: 0 169px 0 214px;
}
.s_2_m1 > span:first-of-type {
  margin-right: 51px;
}
.s_2_m2 > span:nth-of-type(2) {
  margin: 0 109px 0 104px;
}
.s_3 a {
  color: #1875f0;
}
</style>

