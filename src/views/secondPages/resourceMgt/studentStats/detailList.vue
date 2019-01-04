<template>
  <div class="detail_list" ref="detail_list">
    <h2>{{ title }}</h2>
    <div class="detail_data">
      <el-table :data="detailListData" style="width: 100%" :max-height="maxHeight">
        <el-table-column align="center" prop="studentNo" label="学号" min-width="180"></el-table-column>
        <el-table-column align="center" prop="name" label="姓名" min-width="180"></el-table-column>
        <el-table-column
          align="center"
          prop="sex"
          label="性别"
          :formatter="formatSex"
          min-width="180"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="status"
          :formatter="formatStatus"
          label="学籍状态"
          min-width="180"
        ></el-table-column>
        <el-table-column label="操作" align="center" test="date">
          <template slot-scope="scope">
            <el-button min-width="180" size="mini" @click="handleEdit(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottomC">
      <div class="print">
        <el-button type="primary" size="small" @click="exportFun">导出</el-button>
        <el-button type="primary" size="small" @click="print('detail_list')">打印</el-button>
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
    formatSex: function(row, column, cellValue) {
      if (cellValue == 2) {
        return "女";
      } else if (cellValue == 1) {
        return "男";
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleEdit(row, index) {
      console.log(row);
      this.$emit("to-detail", row);
    },
    formatStatus: function(row, column, cellValue) {
      if (cellValue == 0) {
        return "不在本班";
      } else if (cellValue == 1) {
        return "在读";
      }
    },
    getFormData() {
      this.$ajax
        .get("/api/auth/v1/resourceMgmt/student/stats/class", {
          params: {
            classId: this.formData.id,
            gradeId: this.formData.gradeId,
            schoolId: this.formData.schoolId,
            schoolYear: this.formData.schoolYear
          }
        })
        .then(res => {
          this.detailListData = res.data;
        });
    },
    exportFun() {
      let api = "api/auth/v1/resourceMgmt/student/stats/class/export";
      let params = {
        classId: this.formData.id,
        gradeId: this.formData.gradeId,
        schoolId: this.formData.schoolId,
        schoolYear: this.formData.schoolYear
      };
      params.posProvinceName=this.$parent.routerData[3].name;
      params.posCityName=this.$parent.routerData[4].name;
      params.posDistrictName=this.$parent.routerData[5].name;
      params.schoolName=this.$parent.routerData[6].name;
      params.gradeName=this.$parent.routerData[7].name;
      params.className=this.$parent.routerData[8].name;
      exportXml(api, params, this);
    },
    print(name) {
      printPdf(name, this);
    }
  },
  watch: {
    searchData(data) {
      this.formData = data;
      this.title = data.titleName;
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
}
.detail_list {
  position: relative;
  height: 652px;
  padding: 20px 0;
  background-color: #fff;
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
</style>

