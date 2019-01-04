<template>
  <div class="schoolStats">
    <breadCrumb :router-data="routerData" class="routerData" v-on:router-click="routerClick"></breadCrumb>
    <div class="showCharts" v-show="formType=='showCharts'">
      <div class="searchTitle">
        <searchCondition ref="searchAll"></searchCondition>
        <div class="rowStyle">
          <span class="titleSpan">日期:</span>
          <el-date-picker
            class="searchValue searchValue-date"
            v-model="searchData.date"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          ></el-date-picker>
          <div class="searchClick">
            <el-button type="primary" size="mini" @click="selectData">查询</el-button>
            <el-button type="primary" size="mini" @click="clearData">重置</el-button>
          </div>
        </div>
      </div>
      <div class="charts">
        <div class="charts_title">
          {{title}}
          <el-popover class="titlemessage" placement="right" width="280" trigger="click">
            <div>
              <div>统计说明：</div>
              <div>作业完成率=完成作业数/作业总数</div>
              <div>作业未完成率=未完成作业数/作业总数</div>
            </div>
            <span slot="reference" class="shuoming">?</span>
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
            <el-table :data="detailArr" @row-click="rowClick" max-height="391" style="width: 100%">
              <el-table-column align="center" label="区域" prop="name" min-width="180"></el-table-column>
              <el-table-column
                align="center"
                label="作业数量（份）"
                min-width="180"
                prop="homeworkAllCount"
              ></el-table-column>
              <el-table-column align="center" label="完成作业（份）" min-width="180" prop="finishCount"></el-table-column>
              <el-table-column
                align="center"
                label="未完成作业（份）"
                min-width="180"
                prop="nonFinishCount"
              ></el-table-column>
              <el-table-column
                align="center"
                label="作业完成率"
                min-width="180"
                prop="finishRate2"
                :formatter="finishRate"
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
      <studentList :search-data="studentData" @to-form="toHomeworklist"></studentList>
    </div>
    <div class="showList" v-if="formType=='homeworkList'">
      <homeworkList :search-data="homeworkDataToList" @to-form="toHomeworklist"></homeworkList>
    </div>
  </div>
</template>
<script>
import searchCondition from "@/components/conditions/searchCondition";
import Echarts from "echarts";
import breadCrumb from "@/components/Breadcrumb/indexBread";
import request from "@/utils/request";
import studentList from "./studentList";
import homeworkList from "./studentHomeWork";
import { exportXml, printPdf } from "@/utils/export";

export default {
  components: {
    breadCrumb,
    searchCondition,
    studentList,
    homeworkList
  },
  data() {
    return {
      studentData: {},
      homeworkDataToList: {},
      homeworkDataToDetail: {},
      formData: {},
      formType: "showCharts",
      searchData: {
        date: ""
      },
      routerData: [
        {
          name: "体育教务管理",
          isClick: false
        },
        {
          name: "作业统计",
          isClick: false
        },
        {
          name: "全国",
          value: "001",
          isClick: true
        }
      ],
      type: {},
      typeArr: [
        {
          name: "全国",
          url: "api/auth/v1/homework/statistics/nationwide",
          export: "api/auth/v1/homework/statistics/nationwide/export",
          fieldName: "posProvinceName"
        },
        {
          name: "省",
          url: "api/auth/v1/homework/statistics/province",
          export: "api/auth/v1/homework/statistics/province/export",
          fieldName: "posCityName"
        },
        {
          name: "市",
          url: "api/auth/v1/homework/statistics/city",
          export: "api/auth/v1/homework/statistics/city/export",
          fieldName: "posDistrictName"
        },
        {
          name: "区",
          url: "api/auth/v1/homework/statistics/district",
          export: "api/auth/v1/homework/statistics/district/export",
          fieldName: "schoolName"
        },
        {
          name: "学校",
          url: "api/auth/v1/homework/statistics/school",
          export: "api/auth/v1/homework/statistics/school/export",
          fieldName: "gradeName"
        },
        {
          name: "年级",
          url: "api/auth/v1/homework/statistics/grade",
          export: "api/auth/v1/homework/statistics/grade/export",
          fieldName: "className"
        },
        {
          name: "班级",
          url: "api/auth/v1/homework/statistics/class",
          export: "api/auth/v1/homework/statistics/class/export",
          fieldName: "studentName"
        }
      ], // 默认分级  全国-省-市-区-学校
      title: "",
      detailArr: [], // 详情列表数据
      screen: [],
      isStats: 1,
      btnStyT: "primary",
      btnStyD: "",
      showHeader: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "近两周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {
    screenChange(name) {
      this.createdForm();
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
      if (this.routerData.length == 7) {
        params.schoolId = this.routerData[6].id;
      }
      if (this.routerData.length == 8) {
        params = this.exportXmlData;
        params.schoolId = this.routerData[6].id;
      }
      params.startDateStr = this.searchData.date[0];
      params.endDateStr = this.searchData.date[1];
      exportXml(api, params, this);
    },
    print(name) {
      printPdf(name, this);
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
    rowClick(row, event, column) {
      if (row.isTotal) {
        return;
      }
      changeChart(row, this);
    },
    getSeriesOptions(data, name) {
      return {
        name: name,
        type: "bar",
        data: data,
        barWidth: 40,
        stack: "总量",
        label: {
          normal: {
            show: true,
            position: "inside",
            color: "black"
          }
        }
      };
    },
    getTitle() {
      let name = "";
      name = this.searchData.date[0] + "至" + this.searchData.date[1];
      if (this.routerData.length == 3) {
        name += "全国";
      } else {
        this.routerData.forEach((item, index) => {
          if (index > 2) {
            name += item.name;
          }
        });
      }
      name += "作业统计";
      this.title = name;
    },
    finishRate(a, b, c) {
      if (c) {
        return c + "%";
      } else {
        return "0.00%";
      }
    },
    selectData: selectData,
    getFormData: getFormData,
    createdForm: createdForm,
    routerClick: routerClick,
    clearData() {
      this.$refs.searchAll.clearData();
      this.searchData.date = [getDay(-7), getDay(0)];
    },
    toHomeworklist(data) {
      let router = JSON.parse(data);
      router.id = router.studentId;
      router.name = router.studentName;
      router.startDateStr = this.searchData.date[0];
      router.endDateStr = this.searchData.date[1];
      this.formType = "homeworkList";
      this.homeworkDataToList = router;
      this.routerData.push(router);
    }
  },
  mounted() {
    this.type = this.typeArr[0];
    this.searchData.date = [getDay(-7), getDay(0)];
    let params = { startDateStr: getDay(-7), endDateStr: getDay(0) };
    this.getFormData(params);
  }
};
function routerClick(data) {
  let routerData = data.routerData;
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
    case 8:
      vm.selectData(routerData[7]);
      vm.formType = "showCharts";
      return;
    case 9:
      vm.searchList = JSON.parse(JSON.stringify(routerData[8]));
      break;
  }
  if (routerData.length <= 8) {
    vm.formType = "showCharts";
    vm.selectData();
  } else {
    vm.formType = "showList";
    vm.routerData = JSON.parse(JSON.stringify(routerData));
  }
}
function selectData(value) {
  let searchData = this.$refs.searchAll.getData();
  let params = {};
  if (searchData.NschoolTypeId) {
    params.schoolTypeId = searchData.NschoolTypeId.value;
  }
  let routerData = [
    {
      name: "体育教务管理",
      isClick: false
    },
    {
      name: "作业统计",
      isClick: false
    },
    {
      name: "全国",
      value: "001",
      isClick: true
    }
  ];
  this.type = this.typeArr[0];
  if (searchData.NposProvinceId.value != "001") {
    routerData.push(searchData.NposProvinceId);
    params.posProvinceId = searchData.NposProvinceId.id;
    this.type = this.typeArr[1];
  }
  if (searchData.NposCityId) {
    routerData.push(searchData.NposCityId);
    params.posCityId = searchData.NposCityId.id;
    this.type = this.typeArr[2];
  }
  if (searchData.NposDistrictId) {
    routerData.push(searchData.NposDistrictId);
    params.posDistrictId = searchData.NposDistrictId.id;
    this.type = this.typeArr[3];
  }
  if (searchData.NschoolId) {
    params.schoolId = searchData.NschoolId.id;
    routerData.push({
      id: searchData.NschoolId.id,
      name: searchData.NschoolId.name
    });
    this.type = this.typeArr[4];
  }
  if (value && value.type == "search") {
    this.type = this.typeArr[value.index];
    params.gradeId = value.gradeId;
    params.schoolTypeGradeId = value.schoolTypeGradeId;
    routerData.push(value);
  }
  params.startDateStr = this.searchData.date[0];
  params.endDateStr = this.searchData.date[1];
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
      if (this.routerData.length == 7) {
        this.formData = res.data.homeworkStatisticsSchoolDetailsList;
      } else {
        this.formData = res.data;
      }
      this.getTitle();
      // 获取标题
      // this.getTitle();
      this.screen = getScreen(this.formData, this.type.fieldName);
      this.createdForm();
    });
}
function getScreen(data, fieldName) {
  let screen = {};
  data.forEach(item => {
    let itemName = item[fieldName];
    let value1 = Number(item.finishCount) || 0;
    let value2 = Number(item.nonFinishCount) || 0;
    if (value1 != 0 || value2 != 0) {
      screen[itemName] = { name: itemName, isSelect: "true" };
    } else {
      screen[itemName] = { name: itemName, isSelect: "false" };
    }
  });
  return screen;
}
function createdForm() {
  let formData = parseFormData(this.formData, this.type.fieldName, this.screen);
  formData.tableData[0].name = this.routerData[this.routerData.length - 1].name;
  this.detailArr = formData.tableData;
  createdRightCharts(formData.xName, formData.rightChartData, this);
  createdLeftCharts(formData.leftChartData, this);
}
function createdLeftCharts(data, vm) {
  let seriesArr = [];
  seriesArr.push(vm.getSeriesOptions(data.finishCountData, "已完成"));
  seriesArr.push(vm.getSeriesOptions(data.nonFinishCountData, "未完成"));
  seriesArr.push(createdAll(data));
  let leftCharts = Echarts.init(document.getElementById("leftCharts")); //左侧bar图表 当前汇总
  let name = vm.routerData[vm.routerData.length - 1].name;

  let option = {
    color: ["#2E89E6", "#FCDC30"],
    title: {
      text: ""
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: []
    },
    xAxis: {
      data: [name]
    },
    grid: {
      left: "50"
    },
    yAxis: {
      name: "作业：份",
      position: "left"
    },
    series: seriesArr
  };
  leftCharts.setOption(option);
}
function createdRightCharts(xName, data, vm) {
  let rightCharts = Echarts.init(document.getElementById("rightCharts")); //右侧bar图表
  let seriesArr = [];
  seriesArr.push(vm.getSeriesOptions(data.finishCountData, "已完成"));
  seriesArr.push(vm.getSeriesOptions(data.nonFinishCountData, "未完成"));
  seriesArr.push(createdAll(data));
  seriesArr[0].barWidth = 40;
  seriesArr[1].barWidth = 40;
  let option = {
    color: ["#2E89E6", "#FCDC30"],
    title: {
      text: ""
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ["已完成", "未完成"]
    },
    xAxis: {
      type: "category",
      data: xName,
      axisLabel: {
        interval: 0
      }
    },
    yAxis: {
      type: "value",
      name: "作业：份"
    },
    series: seriesArr
  };
  if (xName.length > 5) {
    option.dataZoom = [
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
  rightCharts.setOption(option);

  const _this = vm;
  rightCharts.off("click"); // 防止重复绑定
  rightCharts.on("click", function(params) {
    changeChart(params.data, vm);
  });
}
function createdAll(data) {
  let allData = [];
  data.finishCountData.forEach((item, index) => {
    let value = item.value + data.nonFinishCountData[index].value;
    allData.push(value);
  });
  let series = {
    name: "总合计",
    type: "line",
    label: {
      normal: {
        show: true,
        position: "insideBottom",
        textBorderWidth: 2,
        textStyle: {
          color: "#0b0b0c"
        }
      }
    },
    itemStyle: {
      normal: {
        color: "rgba(128, 128, 128, 0)"
      }
    },
    data: allData
  };
  return series;
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
      vm.$refs.searchAll.setData({
        NschoolId: data.schoolId
      });
      vm.$refs.searchAll.changeSchool(data.schoolId);
      vm.selectData();
      break;
    case 7:
      data.type = "search";
      data.index = 5;
      vm.exportXmlData = data;
      vm.selectData(data);
      break;
    case 8:
      data.titleName =
        vm.searchData.date[0] +
        "至" +
        vm.searchData.date[1] +
        routerData[4].name +
        routerData[5].name +
        routerData[6].name +
        routerData[7].name +
        data.name +
        "作业统计";
      data.id = data.schoolClassId;
      vm.formType = "showList";
      vm.studentData = data;
      routerData.push(data);
      break;
  }
}
function parseFormData(data, fieldName, screen) {
  // x轴对应名称
  let xName = [];
  let leftChartData = {},
    rightChartData = {};
  let finishCountData = []; // 已完成
  let nonFinishCountData = []; // 未完成
  let totalValue1 = 0;
  let totalValue2 = 0;
  let totalNum = 0;
  let tableData = [];
  // 获取数据
  data.forEach(item => {
    let tableName = item[fieldName];
    totalValue1 += Number(item.finishCount) || 0;
    totalValue2 += Number(item.nonFinishCount) || 0;
    totalNum += item.homeworkAllCount;
    item.finishRate2 = item.finishRate
      ? (Number(item.finishRate) * 100).toFixed(2)
      : 0;
    const obj1 = {
      value: Number(item.finishCount) || 0,
      name: item[fieldName],
      posCityId: item.posCityId,
      posDistrictId: item.posDistrictId,
      posProvinceId: item.posProvinceId,
      homeworkAllCount: item.homeworkAllCount,
      schoolId: item.schoolId,
      schoolTypeGradeId: item.schoolTypeGradeId,
      schoolClassId: item.schoolClassId,
      gradeId: item.gradeId
    };
    const obj2 = {
      value: Number(item.nonFinishCount) || 0,
      name: item[fieldName],
      posCityId: item.posCityId,
      posDistrictId: item.posDistrictId,
      posProvinceId: item.posProvinceId,
      homeworkAllCount: item.homeworkAllCount,
      schoolId: item.schoolId,
      schoolTypeGradeId: item.schoolTypeGradeId,
      schoolClassId: item.schoolClassId,
      gradeId: item.gradeId
    };
    if (screen[obj1.name].isSelect == "true") {
      xName.push(obj1.name);
      finishCountData.push(obj1);
      nonFinishCountData.push(obj2);
      item.name = tableName;
      tableData.push(item);
    }
  });
  //子表数据
  tableData.unshift({
    name: "全国",
    homeworkAllCount: totalNum,
    finishCount: totalValue1,
    finishRate2: ((totalValue1 / totalNum) * 100).toFixed(2),
    nonFinishCount: totalValue2,
    isTotal: true
  });

  // 汇总
  if (totalValue1.toString().indexOf(".") >= 0) {
    totalValue1 = totalValue1.toFixed(1);
  }
  if (totalValue2.toString().indexOf(".") >= 0) {
    totalValue2 = totalValue2.toFixed(1);
  }
  const totalObj1 = {
    value: totalValue1 || 0,
    totalNum: totalNum
  };
  const totalObj2 = {
    value: totalValue2 || 0,
    totalNum: totalNum
  };
  rightChartData.finishCountData = finishCountData;
  rightChartData.nonFinishCountData = nonFinishCountData;
  leftChartData.finishCountData = [totalObj1];
  leftChartData.nonFinishCountData = [totalObj2];
  return {
    rightChartData: rightChartData,
    leftChartData: leftChartData,
    xName: xName,
    tableData: tableData
  };
}
function getDay(day) {
  var today = new Date();

  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

  today.setTime(targetday_milliseconds); //注意，这行是关键代码

  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  return tYear + "-" + tMonth + "-" + tDate;
}

function doHandleMonth(month) {
  var m = month;
  if (month.toString().length == 1) {
    m = "0" + month;
  }
  return m;
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
    height: 28px;
    line-height: 28px;
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
  padding: 20px 0;
  overflow: hidden;
  background-color: #fff;
  border-radius: 10px;
}
.schoolStats {
  min-width: 1200px;
}
.charts_title {
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  color: #333;
  font-weight: 600;
  margin-bottom: 20px;
}
#leftCharts,
#rightCharts {
  float: left;
}
.charts_detail {
  position: relative;
  height: 450px;
}
.charts_detail .screening {
  position: absolute;
  bottom: 20px;
  right: 25px;
  padding: 0;
}
#leftCharts {
  width: 200px;
  height: 450px;
  margin-left: 30px;
}
#rightCharts {
  width: calc(100% - 250px);
  min-width: 940px;
  height: 450px;
  margin-left: 20px;
}
.change_type.tj {
  position: absolute;
  right: 28px;
  top: 25px;
}
.change_type.sj {
  position: absolute;
  right: 28px;
  top: 65px;
}

/* 数据统计 */
.data_detail_body {
  position: relative;
  line-height: 35px;
  width: 1000px;
  height: 450px;
  margin: 0 auto;
  padding: 15px 0;
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
.screening {
  display: inline-block;
  line-height: 26px;
  background-color: #84bef9;
  color: #fff !important;
  width: 69px;
  border-radius: 13px;
  text-align: center;
}
.data_detail_body .screening {
  position: absolute;
  top: 30px;
  left: 161px;
  line-height: 10px;
  background-color: #84bef9;
  color: #fff !important;
  width: 69px;
  border-radius: 13px;
  text-align: center;
  z-index: 1;
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
