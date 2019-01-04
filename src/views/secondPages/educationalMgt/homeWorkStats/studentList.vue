<template>
  <div class="detail_list">
    <h2>{{title}}</h2>
    <div class="detail_data" ref="detail_data">
      <el-table :data="detailListData" style="width: 100%" max-height="450">
        <el-table-column align="center" prop="studentNo" label="学号" min-width="180"></el-table-column>
        <el-table-column align="center" prop="studentName" label="姓名" min-width="180"></el-table-column>
        <el-table-column align="center" prop="sex" label="性别" min-width="180"></el-table-column>
        <el-table-column align="center" prop="disease" label="疾病" min-width="180"></el-table-column>
        <el-table-column align="center" prop="finishCount" label="完成作业（份）" min-width="180"></el-table-column>
        <el-table-column
          align="center"
          prop="finishRate"
          label="作业完成率"
          min-width="180"
          :formatter="formatter"
        ></el-table-column>
        <el-table-column label="操作" align="center" test="date">
          <template slot-scope="scope">
            <el-button min-width="180" size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottomC">
      <div class="print">
        <el-button type="primary" size="small" @click="exportFun">导出</el-button>
        <el-button type="primary" size="small" @click="print('detail_data')">打印</el-button>
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
      formData: this.searchData
    };
  },
  methods: {
    handleEdit(index, row) {
      this.$emit("to-form", JSON.stringify(row));
    },
    getFormData() {
      this.$ajax
        .get("/api/auth/v1/homework/statistics/class", {
          params: {
            startDateStr: this.formData.startDateStr,
            schoolClassId: this.formData.schoolClassId,
            endDateStr: this.formData.endDateStr
          }
        })
        .then(res => {
          this.detailListData = res.data;
        });
    },
    formatter(row, column, cellValue, index) {
      if (cellValue > 0) {
        return cellValue.toFixed(2) + "%";
      } else {
        return cellValue + "%";
      }
    },
    exportFun() {
      let api = "api/auth/v1/homework/statistics/class/export";
      let params = {
            startDateStr: this.formData.startDateStr,
            schoolClassId: this.formData.schoolClassId,
            endDateStr: this.formData.endDateStr
      };
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
  margin-bottom: 30px;
  min-height: 500px;
  padding: 20px 0;
  background-color: #fff;
}
h2 {
  line-height: 46px;
  text-align: center;
  background-color: #fff;
  margin: 0;
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

