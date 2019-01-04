<template>
  <div class="schoolStats">
    <breadCrumb :router-data="routerData" class="routerData" v-on:router-click="routerClick"></breadCrumb>
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div class="showCharts" v-show="formType=='showCharts'">
      <div class="searchTitle">
        <searchCondition ref="searchAll"></searchCondition>
        <div class="rowStyle">
          <span class="titleSpan">学年度：</span>
          <el-select
            class="searchValue"
            v-model="searchData.schoolYear"
            size="mini"
            placeholder="请选择"
          >
            <el-option
              v-for="item in schoolYearArr"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
          <span class="titleSpan">指标：</span>
          <el-select
            class="searchValue1"
            v-model="searchData.equipmentIds"
            size="mini"
            multiple
            placeholder="请选择"
            style="width:500px;"
          >
            <el-option
              v-for="item in fieldIdsArr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <div class="searchClick">
            <el-button type="primary" size="mini" @click="selectData">查询</el-button>
            <el-button type="primary" size="mini" @click="clearData">重置</el-button>
          </div>
        </div>
      </div>
      <div class="charts">
        <div class="charts_title">
          {{title}}
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
            <template v-for="(n) in screen">
              <!-- `checked` 为 true 或 false -->
              <el-checkbox
                :key="n.name"
                v-model="n.isSelect"
                true-label="true"
                false-label="false"
                @change="screenChange( n.name)"
              >{{ n.name }}</el-checkbox>
            </template>
            <el-button slot="reference" class="screening">
              <span class="screeningImg iconImg"></span>筛选
            </el-button>
          </el-popover>
        </div>
        <div class="data_detail" v-show="isStats==0" ref="data_detail">
          <div class="data_detail_body">
            <el-popover placement="right" width="561" trigger="click">
              <template v-for="(n) in screen">
                <!-- `checked` 为 true 或 false -->
                <el-checkbox
                  :key="n.name"
                  v-model="n.isSelect"
                  true-label="true"
                  false-label="false"
                  @change="screenChange( n.name)"
                >{{ n.name }}</el-checkbox>
              </template>
              <el-button slot="reference" class="screening" size="mini">
                <span class="screeningImg iconImg"></span>筛选
              </el-button>
            </el-popover>
            <!-- <div class="data_detail_default"><span>区域 <span class="screening">筛选</span></span>  <span>学校(所)</span></div>
            <div class="data_detail_default"><span>全国</span><span>2457</span></div>-->
            <el-table
              :data="detailArr"
              @row-click="rowClick"
              max-height="385"
              style="width: 100%"
              class="table_from"
            >
              <el-table-column align="center" label="区域" prop="name" min-width="180"></el-table-column>
              <el-table-column
                align="center"
                label="体育器材配置达标率"
                min-width="180"
                prop="standardRate2"
              ></el-table-column>
              <el-table-column
                align="center"
                label="已达标学校数"
                min-width="180"
                prop="standardSchoolCount"
              ></el-table-column>
              <el-table-column
                align="center"
                label="未达标学校数"
                min-width="180"
                prop="nonStandardSchoolCount"
              ></el-table-column>
            </el-table>
          </div>
          <div class="bottomC">
            <div class="print">
              <el-button type="primary" size="small" @click="exportFun">导出</el-button>
              <el-button type="primary" size="small" @click="print('data_detail')">打印</el-button>
            </div>
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
    <div class="showList" v-if="formType=='showList'">
      <detailList :search-data="searchList"></detailList>
    </div>
  </div>
</template>
<script>
import searchCondition from "@/components/conditions/searchCondition";
import Echarts from "echarts";
import breadCrumb from "@/components/Breadcrumb/indexBread";
import { GETYEARLIST } from "@/utils/comData";
import request from "@/utils/request";
import detailList from "./detail";
import { exportXml, printPdf } from "@/utils/export";

export default {
  components: {
    breadCrumb,
    searchCondition,
    detailList
  },
  data() {
    return {
      formType: "showCharts",
      formData: {},
      searchList: {},
      routerData: [
        {
          name: "体育资源管理",
          isClick: false
        },
        {
          name: "器材统计 ",
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
        url: "api/auth/v1/equipment/statistics/nationwide",
        export: "api/auth/v1/equipment/statistics/nationwide/export",
        fieldName: "provinceName",
        dataName: "nationwideSchoolEquipmentList"
      },
      searchData: {
        schoolYear: "",
        equipmentIds: []
      },
      schoolYearArr: GETYEARLIST.getYear(),
      fieldIdsArr: [],
      detailArr: [], // 详情列表数据
      screen: {},
      title: "",
      isStats: 1,
      btnStyT: "primary",
      btnStyD: ""
    };
  },
  methods: {
    screenChange(name) {
      this.createdFormData(this.formData[this.type.dataName]);
    },
    exportFun() {
      let api = this.type.export;
      let allData = this.$refs.searchAll.getData();
      let params = {};
      if (allData.NposProvinceId.value != "001") {
        params.posProvinceId = allData.NposProvinceId.id;
        params.posProvinceName = allData.NposProvinceId.name;
      }
      if (allData.NposCityId) {
        params.posCityId = allData.NposCityId.id;
        params.posCityName = allData.NposCityId.name;
      }
      if (allData.NposDistrictId) {
        params.posDistrictId = allData.NposDistrictId.id;
        params.posDistrictName = allData.NposDistrictId.name;
      }

      let schoolYearStart = this.searchData.schoolYear.split("-")[0];
      let schoolYearEnd = this.searchData.schoolYear.split("-")[1];
      params.schoolYearStart = schoolYearStart;
      params.schoolYearEnd = schoolYearEnd;
      params.equipmentIds = this.searchData.equipmentIds.join(",");
      exportXml(api, params, this);
    },
    print(name) {
      printPdf(name, this);
    },
    getFieldIdsArr() {
      request.get("/api/auth/v1/equipment/statistics/dropdown").then(res => {
        this.fieldIdsArr = res.data;
      });
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
    selectData: selectData,
    clearData() {
      this.$refs.searchAll.clearData();
      this.searchData.schoolYear = this.schoolYearArr[0].value;
      this.searchData.equipmentIds = [];
    },
    getFormData: getFormData,
    createdFormData(formData) {
      let data = parseFormData(
        formData,
        this.screen,
        this.type.fieldName,
        this.routerData[this.routerData.length - 1].name
      );

      // 图表汇总的处理
      this.detailArr = data.tableData;
      creatLeftCharts(data.leftChartsData, this);
      creatRightCharts(data.rightChartsData, data.xName, this);
    },
    rowClick(row, event, column) {
      if (row.isTotal) {
        return;
      }
      changeChart(row, this);
    },
    getTitle() {
      let name = "";
      name = this.searchData.schoolYear + "学年";
      if (this.routerData.length == 3) {
        name += "全国";
      } else {
        this.routerData.forEach((item, index) => {
          if (index > 2) {
            name += item.name;
          }
        });
      }
      name += "学校体育器材达标统计";
      this.title = name;
    },
    routerClick: routerClick
  },
  mounted() {
    this.searchData.schoolYear = this.schoolYearArr[0].value;
    let schoolYearStart = this.searchData.schoolYear.split("-")[0];
    let schoolYearEnd = this.searchData.schoolYear.split("-")[1];
    this.getFieldIdsArr();
    this.getFormData({
      schoolYearStart: schoolYearStart,
      schoolYearEnd: schoolYearEnd
    });
  }
};

function selectData() {
  let searchData = this.$refs.searchAll.getData();
  let params = {};
  if (searchData.NschoolTypeId) {
    params.schoolTypeId = searchData.NschoolTypeId.value;
  }
  let routerData = [
    {
      name: "体育资源管理",
      isClick: false
    },
    {
      name: "器材统计",
      isClick: false
    },
    {
      name: "全国",
      value: "001",
      isClick: true
    }
  ];
  this.type = {
    name: "全国",
    url: "api/auth/v1/equipment/statistics/nationwide",
    fieldName: "provinceName",
    export: "api/auth/v1/equipment/statistics/nationwide/export",
    dataName: "nationwideSchoolEquipmentList"
  };
  if (searchData.NposProvinceId.value != "001") {
    routerData.push(searchData.NposProvinceId);
    params.posProvinceId = searchData.NposProvinceId.id;
    this.type = {
      name: "省",
      url: "api/auth/v1/equipment/statistics/province",
      export: "api/auth/v1/equipment/statistics/province/export",
      fieldName: "cityName",
      dataName: "provinceSchoolEquipmentList"
    };
  }
  if (searchData.NposCityId) {
    routerData.push(searchData.NposCityId);
    params.posCityId = searchData.NposCityId.id;
    this.type = {
      name: "市",
      url: "api/auth/v1/equipment/statistics/city",
      export: "api/auth/v1/equipment/statistics/city/export",
      fieldName: "districtName",
      dataName: "citySchoolEquipmentList"
    };
  }
  if (searchData.NposDistrictId) {
    routerData.push(searchData.NposDistrictId);
    params.posDistrictId = searchData.NposDistrictId.id;
    this.type = {
      name: "区",
      url: "api/auth/v1/equipment/statistics/district",
      export: "api/auth/v1/equipment/statistics/district/export",
      fieldName: "schoolName",
      dataName: "districtSchoolEquipmentList"
    };
  }
  if (searchData.NschoolId) {
    this.formType = "showList";
    routerData.push({
      id: searchData.NschoolId.id,
      name: searchData.NschoolId.name
    });
    this.routerData = JSON.parse(JSON.stringify(routerData));
    let titleName =
      this.searchData.schoolYear +
      "学年" +
      routerData[3].name +
      routerData[4].name +
      routerData[5].name +
      searchData.NschoolId.name +
      "体育器材配置详情列表";

    let schoolYearStart = this.searchData.schoolYear.split("-")[0];
    let schoolYearEnd = this.searchData.schoolYear.split("-")[1];
    this.searchList = {
      schoolYearStart: schoolYearStart,
      schoolYearEnd: schoolYearEnd,
      schoolId: searchData.NschoolId.id,
      titleName: titleName
    };
    return;
  }
  let schoolYearStart = this.searchData.schoolYear.split("-")[0];
  let schoolYearEnd = this.searchData.schoolYear.split("-")[1];
  params.schoolYearStart = schoolYearStart;
  params.schoolYearEnd = schoolYearEnd;
  params.equipmentIds = this.searchData.equipmentIds.join(",");
  this.getFormData(params, routerData);
}
function getFormData(params, routerData) {
  let api = this.type.url;
  request
    .get(api, {
      params
    })
    .then(res => {
      if (routerData) {
        this.routerData = JSON.parse(JSON.stringify(routerData));
      }
      this.getTitle();
      this.formData = res.data;
      this.screen = getScreen(
        res.data[this.type.dataName],
        this.type.fieldName
      );
      this.createdFormData(res.data[this.type.dataName]);
    });
}

function getScreen(formData, name) {
  let screen = {};
  formData.forEach(item => {
    const itemName = item[name];
    let isSelect = "false";
    let standardRate = item.standardRate ? item.standardRate : 0;
    if (standardRate != 0) {
      isSelect = "true";
    }
    screen[itemName] = {
      name: itemName,
      isSelect: isSelect
    };
  });
  return screen;
}
function parseFormData(formData, screen, name, tableName) {
  // x轴对应名称
  let xName = [],
    seriesArr = [],
    rightChartsData = [],
    leftChartsData = [],
    tableData = [],
    standardRate = 0,
    standardSchoolCount = 0,
    nonStandardSchoolCount = 0;
  let percentOfPass = 0;
  let i = 0;
  // 获取数据
  formData.forEach(item => {
    percentOfPass += item.standardRate ? item.standardRate * 100 : 0;

    standardRate += Number(item.standardRate) || 0;
    standardSchoolCount += Number(item.standardSchoolCount) || 0;
    nonStandardSchoolCount += Number(item.nonStandardSchoolCount) || 0;
    const obj = {
      value: Number(item.standardRate)
        ? (item.standardRate * 100).toFixed(2)
        : 0,
      name: item[name],
      equipmentSchoolAllCount: item.equipmentSchoolAllCount,
      nonStandardSchoolCount: item.nonStandardSchoolCount,
      standardSchoolCount: item.standardSchoolCount,
      posProvinceId: item.provinceId,
      posCityId: item.cityId,
      posDistrictId: item.districtId,
      schoolId: item.schoolId
    };
    if (obj.value) {
      i++;
    }
    if (screen[obj.name].isSelect == "true") {
      obj.standardRate2 = obj.value + "%";
      xName.push(obj.name);
      rightChartsData.push(obj);
      tableData.push(obj);
    }
  });
  let allValue = (percentOfPass / i).toFixed(2);
  tableData.unshift({
    standardRate: standardRate,
    standardSchoolCount: standardSchoolCount,
    nonStandardSchoolCount: nonStandardSchoolCount,
    isTotal: true,
    standardRate2: allValue + "%",
    name: tableName
  });
  leftChartsData = [allValue];
  return {
    leftChartsData: leftChartsData,
    rightChartsData: rightChartsData,
    xName: xName,
    tableData: tableData
  };
}
function creatLeftCharts(data, vm) {
  let leftCharts = Echarts.init(document.getElementById("leftCharts")); //左侧bar图表 当前汇总
  let name = vm.routerData[vm.routerData.length - 1].name;
  var option = {
    color: ["#2E89E6"],
    title: {
      text: ""
    },
    tooltip: {
      formatter: "{c}%"
    },
    legend: {
      data: [""]
    },
    xAxis: {
      data: [name]
    },
    grid: {
      left: "30%"
    },
    yAxis: {
      min: 0,
      max: 100,
      name: "达标率",
      position: "left",
      axisLabel: {
        show: true,
        interval: "auto",
        formatter: "{value}%"
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
  leftCharts.setOption(option);
}
function creatRightCharts(data, xName, vm) {
  let rightCharts = Echarts.init(document.getElementById("rightCharts")); //右侧bar图表
  const option = {
    color: ["#2E89E6"],
    title: {
      text: ""
    },
    tooltip: {
      formatter: "{c}%",
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      y2: 260,
      borderWidth: 1
    },
    legend: {
      data: ""
    },
    xAxis: {
      data: xName
    },
    yAxis: {
      name: "达标率",
      min: 0,
      max: 100,
      axisLabel: {
        show: true,
        interval: "auto",
        formatter: "{value}%"
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
  if (xName.length > 8) {
    option.dataZoom = [
      {
        show: true,
        height: 10,
        type: "slider",
        top: "72%",
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
  rightCharts.setOption(option);
  rightCharts.off("click"); // 防止重复绑定
  rightCharts.on("click", function(params) {
    changeChart(params.data, vm);
  });
}

function changeChart(data, vm) {
  let routerDataLength = vm.routerData.length;
  let routerData = vm.routerData;
  switch (routerDataLength) {
    case 3:
      vm.$refs.searchAll.setData({
        NposProvinceId: data.posProvinceId
      });
      vm.$refs.searchAll.getCity(data.posProvinceId);
      vm.selectData();
      break;
    case 4:
      vm.$refs.searchAll.setData({ NposCityId: data.posCityId });
      vm.$refs.searchAll.getStreet(data.posCityId);
      vm.selectData();
      break;
    case 5:
      vm.$refs.searchAll.setData({
        NposDistrictId: data.posDistrictId
      });
      vm.$refs.searchAll.getSchool(data.posDistrictId);
      vm.selectData();
      break;
    case 6:
      vm.formType = "showList";
      vm.routerData.push({ id: data.schoolId, name: data.name });
      let titleName =
        vm.searchData.schoolYear +
        "学年" +
        routerData[3].name +
        routerData[4].name +
        routerData[5].name +
        data.name +
        "体育器材配置详情列表";

      let schoolYearStart = vm.searchData.schoolYear.split("-")[0];
      let schoolYearEnd = vm.searchData.schoolYear.split("-")[1];
      vm.searchList = {
        schoolYearStart: schoolYearStart,
        schoolYearEnd: schoolYearEnd,
        schoolId: data.schoolId,
        titleName: titleName
      };
      break;
  }
}

function routerClick(data) {
  let routerData = data.routerData;
  this.formType = "showCharts";
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
}
</script>
<style scoped  lang="scss">
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
  .searchValue1 {
    width: 500px;
    vertical-align: middle;
    margin-right: 15px;
  }
  .searchClick {
    float: right;
    margin-right: 20px;
  }
}
.charts {
  position: relative;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px 0;
  overflow: hidden;
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
  right: 75px;
  padding: 0;
}
#leftCharts {
  width: 150px;
  height: 400px;
  margin-left: 20px;
}
#rightCharts {
  width: 955px;
  height: 600px;
  margin-left: 20px;
}
.change_type.tj {
  position: absolute;
  right: 28px;
  top: 75px;
}
.change_type.sj {
  position: absolute;
  right: 28px;
  top: 114px;
}

/* 数据统计 */
.data_detail_body {
  position: relative;
  line-height: 35px;
  width: 1000px;
  height: 450px;
  margin: 0 auto;
  overflow: auto;
  padding: 15px;
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
  top: 35px;
  left: 158px;
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
