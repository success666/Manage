<template>
  <div class="detail_list" ref="detail_list">
    <h2>{{title}}</h2>
    <div class="detail_data">
      <el-table :data="detailListData" style="width: 100%" :max-height="maxHeight">
        <el-table-column align="center" prop="equipmentName" label="名称" min-width="180"></el-table-column>
        <el-table-column align="center" prop="unit" label="单位" min-width="180"></el-table-column>
        <el-table-column align="center" prop="standardConfigQuantity" label="达标值" min-width="180"></el-table-column>
        <el-table-column align="center" prop="actualConfigQuantity" label="实际数量" min-width="180"></el-table-column>
        <el-table-column align="center" prop="isStandard" label="是否达标" min-width="180"></el-table-column>
      </el-table>
      <div class="bottomC">
        <div class="print">
          <el-button type="primary" size="small" @click="exportFun">导出</el-button>
          <el-button type="primary" size="small" @click="print('detail_list')">打印</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { exportXml, printPdf } from "@/utils/export";
export default {
  props: {
    searchData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      title: "",
      detailListData: [],
      formData: this.searchData,
      maxHeight: 600
    };
  },
  methods: {
    getFormData() {
      this.$ajax
        .get("/api/auth/v1/equipment/statistics/detail", {
          params: {
            schoolYearStart: this.formData.schoolYearStart,
            schoolYearEnd: this.formData.schoolYearEnd,
            schoolId: this.formData.schoolId
          }
        })
        .then(res => {
          this.detailListData = res.data.schoolEquipmentDetailList;
        });
    },
    exportFun() {
      let api = "api/auth/v1/equipment/statistics/detail/export";
      let params = {
        schoolYearStart: this.formData.schoolYearStart,
        schoolYearEnd: this.formData.schoolYearEnd,
        schoolId: this.formData.schoolId
      };
      exportXml(api, params, this);
    },
    print(name) {
      printPdf(name, this);
    }
  },
  watch: {
    searchData(data) {
      this.titleName = data.titleName;
      this.formData = data;
      this.getFormData();
    }
  },
  mounted() {
    this.title = this.formData.titleName;
    this.getFormData();
    this.maxHeight = document.documentElement.clientHeight - 220;
  }
};
</script>
<style scoped>
.detail_data {
  overflow: auto;
  background-color: #fff;
  width: 1000px;
  margin: auto;
}
.detail_list {
  border-radius: 10px;
  position: relative;
  height: 652px;
  padding: 20px 0;
  background-color: #fff;
  margin-bottom: 20px;
}
h2 {
  line-height: 40px;
  text-align: center;
  background-color: #fff;
  margin: 0;
  padding-bottom: 20px;
}
.bottomC {
  position: static;
  background-color: #fff;
  padding: 20px 0;
}
.print {
  text-align: right;
  padding-right: 28px;
  margin-bottom: 20px;
}
.data_detail_pagination {
  text-align: right;
  padding-right: 28px;
}
.el-table::before {
  display: none;
}
</style>

