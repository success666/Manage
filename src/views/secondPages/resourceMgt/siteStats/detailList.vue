<template>
    <div class="detail_list">
        <h2>{{title}}</h2>
        <div class="detail_data">
            <el-table
            class="table_from"
                :data="detailListData"
                style="width: 100%">
                <el-table-column
                    align="center"
                    prop="fieldName"
                    label="场地类型"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="specifications"
                    label="规格型号功能"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="standardConfigQuantity "
                    label="达标值"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="actualConfigQuantity"
                    label="实际数量"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="isStandard"
                    label="是否达标"
                    min-width="180">
                </el-table-column>
            </el-table>
        </div>
        <!-- <div class="bottomC"> 
            <div class="print">
                <el-button type="primary" size="small">导出</el-button><el-button type="primary" size="small">打印</el-button>
            </div>
            <div class="data_detail_pagination">
                <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="prev, pager, next, sizes, jumper"
                :total="40">
                </el-pagination>
            </div>
        </div> -->
    </div>
</template>
<script>
import request from "@/utils/request";

export default {
  props: {
    searchData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      title:this.searchData.titleName,
      detailListData: [],
      selectData: this.searchData
    };
  },
  watch:{
      searchData(data){
          this.selectData=data;
          this.title=data.titleName;
          getFormData(this);
      }
  },
  mounted() {
      getFormData(this)
  }
};
function getFormData(vm) {
    let schoolYearStart=vm.selectData.schoolYear.split("-")[0];
    let schoolYearEnd=vm.selectData.schoolYear.split("-")[1];
  request
    .get("/api/auth/v1/field/statistics/detail", {
      params: {
        schoolYearStart: schoolYearStart,
        schoolYearEnd: schoolYearEnd,
        schoolId:  vm.selectData.schoolId
      }
    })
    .then(res => {
      vm.detailListData = res.data.schoolFieldDetailList;
    });
}
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
.table_from tr {
  cursor: auto;
}
</style>

