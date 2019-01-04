<template>
  <div class="detail_list">
    <h2>{{ title }}</h2>
    <div class="detail_data" ref="detail_data">
      <el-table :data="detailListData" style="width: 100%">
        <el-table-column align="center" prop="name" label="姓名" min-width="180"></el-table-column>
        <el-table-column
          align="center"
          prop="sex"
          :formatter="formatSex"
          label="性别"
          min-width="180"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="teacherProfessionalTitleName"
          label="职称"
          min-width="180"
        ></el-table-column>
        <el-table-column align="center" prop="classNames" label="任教班级" min-width="180"></el-table-column>
        <el-table-column label="操作" align="center" test="date">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottomC">
      <div class="print">
        <el-button type="primary" size="small" @click="exportFun">导出</el-button>
        <el-button type="primary" size="small" @click="print('detail_data')">打印</el-button>
      </div>
      <div class="data_detail_pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="size"
          layout="prev, pager, next, sizes, jumper"
          :total="total"
        ></el-pagination>
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
      total: 1,
      current: 1,
      size: 10,
      formData: this.searchData
    };
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
      this.current = 1;
      this.getData();
    },
    formatSex: function(row, column, cellValue) {
      if (cellValue == 2) {
        return "女";
      } else if (cellValue == 1) {
        return "男";
      }
    },
    handleCurrentChange(val) {
      this.current = val;
      this.getData();
    },
    handleEdit(index, data) {
      this.$emit("to-detail", { rowData: data, index: index });
    },
    getData() {
      this.$ajax
        .get("/api/auth/v1/resourceMgmt/teacher/stats/list", {
          params: {
            schoolId: this.formData.schoolId,
            schoolYear: this.formData.schoolYear,
            pageNum: this.current,
            pageSize: this.size
          }
        })
        .then(res => {
          this.total = res.data.total;
          this.detailListData = res.data.list;
        });
    },

    exportFun() {
      let api = "api/auth/v1/resourceMgmt/teacher/stats/listExport";
      let params = {
        schoolId: this.formData.schoolId,
        schoolYear: this.formData.schoolYear,
        pageNum: this.current,
        pageSize: this.size
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
      this.getData();
    }
  },
  mounted() {
    this.title = this.formData.titleName;
    this.getData();
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
  line-height: 56px;
  text-align: center;
  background-color: #fff;
  margin: 0;
  /* padding: 39px 0 68px; */
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

