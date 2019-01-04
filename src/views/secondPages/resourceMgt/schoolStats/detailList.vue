<template>
  <div class="detail_list">
    <h2>{{ title }}</h2>
    <div class="detail_data" ref="detail_data">
      <el-table :data="detailListData" max-height="500" style="width: 100%">
        <el-table-column align="center" prop="id" label="序号" min-width="180"></el-table-column>
        <el-table-column align="center" prop="name" label="学校名称" min-width="180"></el-table-column>
        <el-table-column align="center" prop="schoolType" label="学校类型" min-width="180"></el-table-column>
        <el-table-column align="center" prop="statsName" label="学校状态" min-width="180"></el-table-column>
        <el-table-column align="center" prop="mgmtDeptName" label="归属教育机构" min-width="180"></el-table-column>
        <el-table-column label="操作" align="center" test="date" min-width="180">
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
      title: this.searchData.titleName,
      detailListData: [],
      formData: this.searchData
    };
  },
  methods: {
    handleEdit(index, data) {
      this.$emit("to-form", { rowData: data, index: index });
    },
    getData() {
      console.log(this.formData.schoolTypeId);
      this.$ajax
        .get("/api/auth/v1/resourceMgmt/school/stats/district", {
          params: {
            posProvinceId: this.formData.posProvinceId,
            posCityId: this.formData.posCityId,
            posDistrictId: this.formData.posDistrictId,
            schoolTypeId: this.formData.schoolTypeId
          }
        })
        .then(res => {
          res.data.forEach(item => {
            item.statsName = item.status == 1 ? "启用" : "停用";
          });
          this.detailListData = res.data;
        });
    },
    exportFun() {
      let api = "api/auth/v1/resourceMgmt/school/stats/district/export";
      let params = {
        posProvinceId: this.formData.posProvinceId,
        posCityId: this.formData.posCityId,
        posDistrictId: this.formData.posDistrictId,
        schoolTypeId: this.formData.schoolTypeId
      };
      params.posProvinceName=this.$parent.routerData[3].name;
      params.posCityName=this.$parent.routerData[4].name;
      params.posDistrictName=this.$parent.routerData[5].name;
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
    this.getData();
  }
};
</script>
<style scoped>
.detail_data {
  overflow: auto;
  background-color: #fff;
  border-radius: 10px;
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

