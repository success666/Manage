<template>
  <div class="schoolStats">

    <breadCrumb :router-data="routerData" class="routerData" v-on:router-click="routerClick"></breadCrumb>
    <div class="showCharts" v-show="showCharts">
      <div class="searchTitle">
        <searchCondition ref="searchAll"></searchCondition>
        <div class="rowStyle">
          <span class="titleSpan">学年度：</span>
          <el-select class="searchValue" v-model="searchData.schoolYear" size="mini" placeholder="请选择">
            <el-option v-for="item in schoolYearArr" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
          <span class="titleSpan">指标：</span>
          <el-select class="searchValue" v-model="searchData.fieldIds" size="mini" placeholder="请选择" @visible-change="getFieldIdsArr">
            <el-option v-for="item in fieldIdsArr" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          <div class="searchClick">
            <el-button type="primary" size="mini" @click="selectData">查询</el-button>
            <el-button type="primary" size="mini" @click="clearData">重置</el-button>
          </div>
        </div>
      </div>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div class="charts">
        <div class="charts_title">{{ title }}
          <el-popover class="titlemessage" placement="right" width="300" trigger="click">
            <div class="titlemessage">
              <div>根据《国家学校体育卫生条件试行基本标准》进行统计</div>
            </div>
            <span slot="reference" class="shuoming" v-if="routerData.length<9">?</span>
          </el-popover>
        </div>
        <div class="charts_detail" v-show="isStats==1">
          <div id="leftCharts"></div>
          <div id="rightCharts"></div>
          <el-popover placement="right" width="561" trigger="click">
            <el-checkbox v-for="(item,index) in screen" :key="index" v-model="item.check" true-label="true" false-label="false" @change="screenChange(index)">{{ item.name }}</el-checkbox>
            <el-button slot="reference" class="screening">筛选</el-button>
          </el-popover>
        </div>
        <div class="data_detail" v-show="isStats==0">
          <div class="data_detail_body">
            <el-popover placement="right" width="561" trigger="click">
              <el-checkbox v-for="(item,index) in screen" :key="index" v-model="item.check" true-label="true" false-label="false" @change="screenChange(index)">{{ item.name }}</el-checkbox>
              <el-button slot="reference" class="screening" size="mini">筛选</el-button>
            </el-popover>
            <el-table :data="tableData" @row-click="rowClick" max-height="400" style="width: 100%" class="table_from">
              <el-table-column align="center" label="区域" prop="name" min-width="180">
              </el-table-column>
              <el-table-column align="center" label="体育师资配置达标率" min-width="180" prop="standardRate">
              </el-table-column>
              <el-table-column align="center" label="已达标学校数" min-width="180" prop="standardSchoolCount">
              </el-table-column>
              <el-table-column align="center" label="未达标学校数" min-width="180" prop="nonStandardSchoolCount">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="change_type tj">
          <el-button :type="btnStyT" size="small" @click="dataShow(1)">统计详情</el-button>
        </div>
        <div class="change_type sj">
          <el-button :type="btnStyD" size="small" @click="dataShow(0)">数据详情</el-button>
        </div>
      </div>
    </div>
    <div v-if="!showCharts">
      <detailList :search-data="detailObj"></detailList>
    </div>
  </div>
</template>
<script>
import searchCondition from "@/components/conditions/searchCondition";
import detailList from "./detailList";
import Echarts from "echarts";
import breadCrumb from "@/components/Breadcrumb/indexBread";
import { GETYEARLIST } from "@/utils/comData";
import request from "@/utils/request";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    searchCondition,
    breadCrumb,
    detailList
  },
  data() {
    return {
      title: "",
      screen: [],
      isStats: 1,
      showCharts: true,
      detailObj: {},
      btnStyT: "primary",
      formData: [],
      btnStyD: "",
      tableData: [],
      searchData: {
        schoolYear: "",
        fieldIds: ""
      },
      schoolYearArr: GETYEARLIST.getYear(),
      fieldIdsArr: [],
      routerData: [
        {
          name: "体育资源管理",
          isClick: false
        },
        {
          name: "场地统计 ",
          isClick: false
        },
        {
          name: "全国",
          value: "001",
          isClick: true
        }
      ],
      type: {
        name: "全国",
        url: "/api/auth/v1/field/statistics/nationwide",
        dataName: "nationwideSchoolFieldList",
        fieldName: "provinceName",
        fieldId: "provinceId"
      }
    };
  },
  methods: {
    getTitle() {
      let name = "";
      name = this.searchData.schoolYear + "学年";
      switch (this.routerData.length) {
        case 3:
          name += "全国";
          break;
        case 4:
          name += this.routerData[3].name;
          break;
        case 5:
          name += this.routerData[4].name;
          break;
        case 6:
          name += this.routerData[5].name;
          break;
      }
      name += "学校体育场地达标统计";
      this.title = name;
    },
    print() {
      window.print();
    },
    dataShow(flag) {
      this.isStats = flag;
      if (flag == 1) {
        this.btnStyT = "primary";
        this.btnStyD = "";
      } else {
        this.btnStyT = "";
        this.btnStyD = "primary";
      }
    },
    screenChange: function(index) {
      this.dataInit(this.formData);
    },
    getFieldIdsArr(value) {
      let allData = this.$refs.searchAll.getData();
      if (allData.NschoolId && value) {
        request
          .get("/api/auth/v1/field/statistics/dropdown", {
            params: { schoolTypeId: allData.NschoolId.schoolTypeId }
          })
          .then(res => {
            this.fieldIdsArr = res.data;
          });
      }
    },
    rowClick(row, event, column) {
      //table 第一个总数据没有点击事件
      if (row.preventEvent) {
        return false;
      }
      let vm = this;
      let routerDataLength = vm.routerData.length;
      switch (routerDataLength) {
        case 3:
          vm.$refs.searchAll.setData({
            NposProvinceId: row.provinceId
          });
          vm.$refs.searchAll.getCity(row.provinceId);
          break;
        case 4:
          vm.$refs.searchAll.setData({ NposCityId: row.cityId });
          vm.$refs.searchAll.getStreet(row.cityId);
          break;
        case 5:
          vm.$refs.searchAll.setData({
            NposDistrictId: row.districtId
          });
          vm.$refs.searchAll.getSchool(row.districtId);
          break;
        case 6:
          let titleName =
            this.searchData.schoolYear +
            "学年" +
            this.routerData[3].name +
            this.routerData[4].name +
            this.routerData[5].name +
            row.name +
            "体育场地达标统计";
          vm.detailObj = {
            schoolId: row.schoolId,
            schoolYear: vm.searchData.schoolYear,
            titleName: titleName
          };
          this.routerData.push({ id: row.schoolId, name: row.name });
          vm.showCharts = false;
          return;
      }
      vm.selectData();
    },
    routerClick(data) {
      let routerData = data.routerData;
      this.showCharts = true;
      let vm = this;
      switch (routerData.length) {
        case 3:
          vm.$refs.searchAll.setData({
            NposProvinceId: "001",
            NposCityId: "",
            NposDistrictId: "",
            NschoolTypeId: "",
            NschoolId: ""
          });
          break;
        case 4:
          vm.$refs.searchAll.setData({
            NposCityId: "",
            NposDistrictId: "",
            NschoolTypeId: "",
            NschoolId: ""
          });
          break;
        case 5:
          vm.$refs.searchAll.setData({
            NposDistrictId: "",
            NschoolTypeId: "",
            NschoolId: ""
          });
          break;
        case 6:
          vm.$refs.searchAll.setData({
            NschoolTypeId: "",
            NschoolId: ""
          });
          break;
      }
      vm.selectData();
    },
    selectData: selectData,
    clearData() {
      this.$refs.searchAll.clearData();
      for (name in this.searchData) {
        this.searchData[name] = "";
      }
      this.searchData.schoolYear = this.schoolYearArr[0].value;
    },
    getData: getData,
    dataInit(data) {
      let formData = parseData(
        data,
        this.type.fieldId,
        this.type.fieldName,
        this.screen
      );
      this.tableData = formData.tableData;

      let leftOption = {
        value: formData.totalTeacherConfRate,
        standardSchoolCount: formData.total.standardSchoolCount,
        nonStandardSchoolCount: formData.total.nonStandardSchoolCount
      };
      createdLeftChart(leftOption, this);
      createdRightChart(formData.xData, formData.rightData, this);
      this.tableData.unshift({
        name:  this.routerData[this.routerData.length - 1].name,
        standardRate: formData.totalTeacherConfRate,
        preventEvent: true,
        standardSchoolCount: formData.total.standardSchoolCount,
        nonStandardSchoolCount: formData.total.nonStandardSchoolCount
      });
    }
  },
  mounted() {
    this.searchData.schoolYear = this.schoolYearArr[0].value;
    this.getData({});
  }
};
function selectData() {
  let allData = this.$refs.searchAll.getData();
  let params = {};
  if (allData.NschoolTypeId) {
    params.schoolTypeId = allData.NschoolTypeId.value;
  }
  let routerData = [
    {
      name: "体育资源管理",
      isClick: false
    },
    {
      name: "场地统计 ",
      isClick: false
    },
    {
      name: "全国",
      value: "001",
      isClick: true
    }
  ];
  if (allData.NposProvinceId.value != "001") {
    routerData.push(allData.NposProvinceId);
    params.posProvinceId = allData.NposProvinceId.id;
    this.type = {
      name: "省",
      url: "/api/auth/v1/field/statistics/province",
      dataName: "provinceSchoolFieldList",
      fieldName: "cityName",
      fieldId: "cityId"
    };
  } else {
    this.type = {
      name: "全国",
      url: "/api/auth/v1/field/statistics/nationwide",
      dataName: "nationwideSchoolFieldList",
      fieldName: "provinceName",
      fieldId: "provinceId"
    };
  }
  if (allData.NposCityId) {
    routerData.push(allData.NposCityId);
    params.posCityId = allData.NposCityId.id;
    this.type = {
      name: "市",
      url: "/api/auth/v1/field/statistics/city",
      dataName: "citySchoolFieldList",
      fieldName: "districtName",
      fieldId: "districtId"
    };
  }
  if (allData.NposDistrictId) {
    routerData.push(allData.NposDistrictId);
    params.posDistrictId = allData.NposDistrictId.id;
    this.type = {
      name: "区",
      url: "/api/auth/v1/field/statistics/district",
      dataName: "districtSchoolFieldList",
      fieldName: "schoolName",
      fieldId: "schoolId"
    };
  }
  if (allData.NschoolId) {
    let titleName =
      this.searchData.schoolYear +
      "学年" +
      routerData[3].name +
      routerData[4].name +
      routerData[5].name +
      allData.NschoolId.name +
      "体育场地达标统计";
    this.detailObj = {
      schoolId: allData.NschoolId.id,
      schoolYear: this.searchData.schoolYear,
      titleName: titleName
    };
    routerData.push({
      id: allData.NschoolId.id,
      name: allData.NschoolId.name
    });
    this.showCharts = false;
    this.routerData = JSON.parse(JSON.stringify(routerData));
    return;
  }
  this.getData(params, routerData);
}
function getData(params, routerData) {
  let vm = this;
  params.schoolYearStart = this.searchData.schoolYear.split("-")[0];
  params.schoolYearEnd = this.searchData.schoolYear.split("-")[1];
  if (this.searchData.fieldIds) {
    params.fieldIds = this.searchData.fieldIds;
  }
  let type = vm.type;
  request
    .get(vm.type.url, {
      params
    })
    .then(res => {
      if (routerData) {
        vm.routerData = JSON.parse(JSON.stringify(routerData));
      }
      vm.formData = res.data[vm.type.dataName];
      vm.screen = parseScreen(res.data[vm.type.dataName], vm.type.name);
      vm.dataInit(res.data[vm.type.dataName]);
      vm.getTitle();
    });
}
function parseScreen(data, name) {
  if (data) {
    let screen = [];
    data.forEach((item, index) => {
      let chartsName = "",
        screenObj = {};
      if (name == "全国") {
        chartsName = item.provinceName;
      } else if (name == "省") {
        chartsName = item.cityName;
      } else if (name == "市") {
        chartsName = item.districtName;
      } else if (name == "区") {
        chartsName = item.schoolName;
      }
      screenObj.name = chartsName;
      let standardRate = item.standardRate ? item.standardRate : 0;
      if (standardRate > 0) {
        screenObj.check = "true";
      } else {
        screenObj.check = "false";
      }
      screen.push(screenObj);
    });
    return screen;
  }
}
function parseData(data, fieldId, fieldName, screen) {
  let tableData = [],
    xData = [],
    rightData = [];
  var total = {
    //总计  左侧图表
    standardSchoolCount: 0, //已达标
    nonStandardSchoolCount: 0 //未达标
  };
  if (data) {
    for (let i = 0; i < data.length; i++) {
      //已达标
      data[i].standardSchoolCount = data[i].standardSchoolCount
        ? data[i].standardSchoolCount
        : 0;
      //未达标
      data[i].nonStandardSchoolCount = data[i].nonStandardSchoolCount
        ? data[i].nonStandardSchoolCount
        : 0;

      //达标率
      let standardRate = data[i].standardRate
        ? (Number(data[i].standardRate) * 100).toFixed(0)
        : 0;

      if (standardRate > 0) {
        total.standardSchoolCount += data[i].standardSchoolCount;
        total.nonStandardSchoolCount += data[i].nonStandardSchoolCount;
      }
      let tableDataObj = {},
        id = data[i][fieldId],
        chartsName = data[i][fieldName];
      tableDataObj.name = chartsName;
      tableDataObj.id = id;
      //达标率
      tableDataObj.standardRate = standardRate;
      //已达标
      tableDataObj.standardSchoolCount = data[i].standardSchoolCount;
      //未达标
      tableDataObj.nonStandardSchoolCount = data[i].nonStandardSchoolCount;

      //筛选那里选中了的
      if (screen[i].check == "true") {
        xData.push(chartsName);
        rightData.push(
          Object.assign({}, data[i], tableDataObj, {
            value: standardRate,
            id: id
          })
        );
        tableData.push(Object.assign({}, data[i], tableDataObj));
      }
    }
  }
  // 使用刚指定的配置项和数据显示图表。
  var totalTeacherConfRate = 0;
  if (total.standardSchoolCount + total.nonStandardSchoolCount > 0) {
    totalTeacherConfRate = (
      (total.standardSchoolCount /
        (total.standardSchoolCount + total.nonStandardSchoolCount)) *
      100
    ).toFixed(0);
  }
  return {
    totalTeacherConfRate: totalTeacherConfRate,
    tableData: tableData,
    total: total,
    xData: xData,
    rightData: rightData
  };
}
function createdLeftChart(data, vm) {
  let leftCharts = Echarts.init(document.getElementById("leftCharts"));
  let name = vm.routerData[vm.routerData.length - 1].name;
  // 指定图表的配置项和数据
  var leftOption = {
    color: ["#2E89E6"],
    title: {
      text: ""
    },
    tooltip: {
      formatter: function(params) {
        //修改鼠标移上去显示的文字

        return (
          "已达标：" +
          params.data.standardSchoolCount +
          "<br />未达标：" +
          params.data.nonStandardSchoolCount
        );
      }
    },
    legend: {
      data: ["达标率"]
    },
    xAxis: {
      data: [name]
    },
    grid: {
      left: "30%"
    },
    yAxis: {
      type: "value",
      name: "达标率",
      min: 0,
      max: 100,
      axisLabel: {
        show: true,
        interval: "auto",
        formatter: "{value} %"
      },
      show: true
    },
    series: {
      name: "",
      type: "bar",
      data: [data],
      barWidth: 20,
      label: {
        normal: {
          show: true,
          position: "top",
          formatter: "{c}%"
        }
      }
    }
  };
  leftCharts.setOption(leftOption);
}
function createdRightChart(xdata, data, vm) {
  let rightCharts = Echarts.init(document.getElementById("rightCharts"));
  let rightOption = {
    color: ["#2E89E6"],
    title: {
      text: ""
    },
    tooltip: {
      formatter: function(params) {
        //修改鼠标移上去显示的文字

        return (
          "已达标：" +
          params.data.standardSchoolCount +
          "<br />未达标：" +
          params.data.nonStandardSchoolCount
        );
      }
    },
    legend: {
      data: ["达标率"]
    },
    xAxis: {
      data: xdata
    },
    yAxis: {
      name: "达标率",
      min: 0,
      max: 100,
      axisLabel: {
        show: true,
        interval: "auto",
        formatter: "{value} %"
      }
    },
    series: {
      name: "",
      type: "bar",
      data: data,
      barWidth: 20,
      label: {
        normal: {
          show: true,
          position: "top",
          formatter: "{c}%"
        }
      }
    }
  };
  let screenChecked = 0;
  for (let i = 0; i < vm.screen.length; i++) {
    if (vm.screen[i].check == "true") {
      screenChecked++;
    }
  }
  if (screenChecked > 8) {
    rightOption.dataZoom = [
      {
        show: true,
        height: 10,
        type: "slider",
        top: "95%",
        xAxisIndex: [0],
        start: 0,
        end: 50,
        zoomLock: true,
        backgroundColor: "#EEEEEE",
        fillerColor: "#84BEF9",
        borderColor: "#fff",
        showDetail: false,
        showDataShadow: false
      }
    ];
  }

  rightCharts.setOption(rightOption);

  rightCharts.off("click"); // 防止重复绑定
  rightCharts.on("click", function(params) {
    let routerDataLength = vm.routerData.length;
    switch (routerDataLength) {
      case 3:
        vm.$refs.searchAll.setData({
          NposProvinceId: params.data.provinceId
        });
        vm.$refs.searchAll.getCity(params.data.provinceId);
        vm.selectData();
        break;
      case 4:
        vm.$refs.searchAll.setData({ NposCityId: params.data.cityId });
        vm.$refs.searchAll.getStreet(params.data.cityId);
        vm.selectData();
        break;
      case 5:
        vm.$refs.searchAll.setData({
          NposDistrictId: params.data.districtId
        });
        vm.$refs.searchAll.getSchool(params.data.districtId);
        vm.selectData();
        break;
      case 6:
        let titleName =
          vm.searchData.schoolYear +
          "学年" +
          vm.routerData[3].name +
          vm.routerData[4].name +
          vm.routerData[5].name +
          params.data.name +
          "体育场地达标统计";
        vm.detailObj = {
          schoolId: params.data.schoolId,
          schoolYear: vm.searchData.schoolYear,
          titleName: titleName
        };
        vm.routerData.push({
          id: params.data.schoolId,
          name: params.data.name
        });
        vm.showCharts = false;
        break;
    }
  });
}
</script>
<style scoped lang="scss">
.searchTitle {
  margin: auto;
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 10px;
  .rowStyle {
    margin-bottom: 10px;
    font-size: 0px;
  }
  .titleSpan {
    font-size: 14px;
    margin-right: 10px;
    display: inline-block;
    height: 28px;
    vertical-align: middle;
    line-height: 28px;
  }
  .searchValue {
    vertical-align: middle;
    margin-right: 15px;
  }
  .searchClick {
    float: right;
    margin-right: 20px;
  }
}
.routerData {
  width: 96% !important;
}
.charts {
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  padding: 20px 0;
  /*overflow: hidden;*/
  height: 662px;
}
.charts_title {
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  color: #333;
  font-weight: 600;
  margin: 20px 0 50px;
}
#leftCharts,
#rightCharts {
  float: left;
}
.charts_detail {
  position: relative;
  height: 400px;
}
.charts_detail .screening {
  position: absolute;
  bottom: 30px;
  right: 30px;
  padding: 0;
}
#leftCharts {
  width: 150px;
  height: 400px;
  margin-left: 20px;
}
#rightCharts {
  width: 955px;
  height: 400px;
  margin-left: 20px;
}
.change_type.tj {
  position: absolute;
  right: 28px;
  top: 30px;
}
.change_type.sj {
  position: absolute;
  right: 28px;
  top: 70px;
}

/* 数据统计 */
.data_detail_body {
  position: relative;
  line-height: 35px;
  width: 1000px;
  height: 450px;
  margin: 0 auto;
  padding: 15px 15px;
  overflow: auto;
}
.data_detail_body > div > span:last-of-type {
  float: right;
  color: #525252;
}
.data_detail_default {
  font-size: 14px;
}
.data_detail_body > div > span:first-of-type {
  color: #1875f0;
  font-size: 14px;
}
.data_detail_default:first-of-type {
  border-bottom: 1px solid #e7f3ff;
}
.data_detail_body > div:nth-of-type(1) span,
.data_detail_body > div:nth-of-type(2) span {
  color: #525252;
}
.data_detail_body .screening {
  position: absolute;
  top: 33px;
  left: 165px;
  line-height: 10px;
  background-color: #84bef9;
  color: #fff !important;
  width: 69px;
  border-radius: 13px;
  text-align: center;
  z-index: 1;
}
.screening {
  display: inline-block;
  line-height: 26px;
  background-color: #84bef9;
  color: #fff !important;
  width: 69px;
  border-radius: 13px;
  text-align: center;
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
