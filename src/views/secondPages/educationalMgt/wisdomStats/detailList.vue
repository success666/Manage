<template>
  <div class="detail_list">
    <h2>{{ title }}</h2>
    <div class="detail_data" ref="detail_data">
      <el-table :data="detailListData" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="180"></el-table-column>
        <el-table-column align="center" prop="name" label="姓名" min-width="180"></el-table-column>
        <el-table-column
          align="center"
          prop="sex"
          :formatter="formatSex"
          label="性别"
          min-width="180"
        ></el-table-column>
        <template v-if="formData.target==0">
          <el-table-column align="center" prop="sportTime" label="平均运动时长（min）" min-width="180"></el-table-column>
        </template>
        <template v-else>
          <el-table-column
            align="center"
            prop="dataCalorieExpendValue"
            label="平均运动消耗（大卡）"
            min-width="180"
          ></el-table-column>
        </template>
        <el-table-column align="center" prop="courseCount" label="参加体育课堂数" min-width="180"></el-table-column>
        <el-table-column label="操作" align="center" test="date" min-width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">查看</el-button>
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
    formatSex: function(row, column, cellValue) {
      if (cellValue == 2) {
        return "女";
      } else if (cellValue == 1) {
        return "男";
      }
    },
    handleEdit(row) {
      let data = JSON.parse(JSON.stringify(row));
      data.startTime = this.formData.startTime;
      data.endTime = this.formData.endTime;
      data.schoolClassId = this.formData.schoolClassId;
      data.target = this.formData.target;

      this.$emit("to-form", JSON.stringify(data));
    },
    getFormData() {
      if (this.formData.target == 0) {
        this.$ajax
          .get("/api/auth/v1/course/statistics/sportTimeSchoolClassDetailed", {
            params: {
              schoolClassId: this.formData.schoolClassId,
              startTime: this.formData.startTime,
              endTime: this.formData.endTime
            }
          })
          .then(res => {
            this.detailListData = res.data;
          });
      } else {
        this.$ajax
          .get(
            "/api/auth/v1/course/statistics/calorieExpendSchoolClassDetailed",
            {
              params: {
                schoolClassId: this.formData.schoolClassId,
                startTime: this.formData.startTime,
                endTime: this.formData.endTime
              }
            }
          )
          .then(res => {
            this.detailListData = res.data;
          });
      }
    },
    exportFun() {
      let api = "";
      if (this.formData.target == 0) {
        api = "api/auth/v1/course/statistics/class/sportTime/export";
      } else {
        api = "api/auth/v1/course/statistics/class/calorieExpend/export";
      }
      let params = {
        schoolClassId: this.formData.schoolClassId,
        startTime: this.formData.startTime,
        endTime: this.formData.endTime
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
  height: 652px;
  padding: 20px 0;
  background-color: #fff;
}
h2 {
  line-height: 40px;
  text-align: center;
  background-color: #fff;
  margin: 0;
  padding: 39px 0 68px;
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

