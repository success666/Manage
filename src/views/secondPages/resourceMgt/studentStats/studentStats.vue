<template>
  <div class="schoolStats">
    <breadCrumb :router-data="routerData" class="routerData" v-on:router-click="routerClick"></breadCrumb>
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
          <div class="searchClick">
            <el-button type="primary" size="mini" @click="selectData">查询</el-button>
            <el-button type="primary" size="mini" @click="clearData">重置</el-button>
          </div>
        </div>
      </div>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div class="charts">
        <div class="charts_title">
          {{ title }}
          <el-popover class="titlemessage" placement="right" width="320" trigger="click">
            <div class="titlemessage">
              <div>{{iconTitle}}</div>
            </div>
            <span slot="reference" class="shuoming">?</span>
          </el-popover>
        </div>
        <div class="charts_detail" v-show="isStats==1">
          <div id="leftCharts"></div>
          <div id="rightCharts"></div>
          <el-popover placement="right" width="561" trigger="click">
            <template v-for="(n,index) in screen">
              <!-- `checked` 为 true 或 false -->
              <!-- <el-checkbox v-model="n.check" :checked="n.check" @change="screenChange(index)">{{  n.name  }}</el-checkbox> -->
              <el-checkbox
                v-model="n.check"
                true-label="true"
                false-label="false"
                @change="screenChange(index)"
              >{{ n.name }}</el-checkbox>
            </template>
            <el-button slot="reference" class="screening">筛选</el-button>
          </el-popover>
        </div>
        <div class="data_detail" v-show="isStats==0" ref="data_detail">
          <div class="data_detail_body">
            <el-popover placement="right" width="561" trigger="click">
              <template v-for="(n,index) in screen">
                <!-- `checked` 为 true 或 false -->
                <!-- <el-checkbox :checked="n.check" @change="screenChange(index)">{{  n.name  }}</el-checkbox> -->
                <el-checkbox
                  v-model="n.check"
                  true-label="true"
                  false-label="false"
                  @change="screenChange(index)"
                >{{ n.name }}</el-checkbox>
              </template>
              <el-button slot="reference" class="screening" size="mini">筛选</el-button>
            </el-popover>
            <!-- <div class="data_detail_default"><span>区域 <span class="screening">筛选</span></span><span>学生数量</span>  <span>学校(所)</span></div>
            <div class="data_detail_default"><span>全国</span><span>2457</span></div>-->
            <el-table
              :data="tableData"
              @row-click="rowClick"
              max-height="391"
              style="width:1150px"
              class="table_from"
            >
              <el-table-column align="center" label="区域" prop="name"></el-table-column>
              <el-table-column align="center" label="学生数量（人）" prop="value"></el-table-column>
              <el-table-column align="center" label="男女比例（男：女）" prop="proportion"></el-table-column>
            </el-table>
          </div>
          <div class="bottomC">
            <div class="print">
              <el-button type="primary" size="small" @click="exportFun">导出</el-button>
              <el-button type="primary" size="small" @click="print('data_detail')">打印</el-button>
            </div>
          </div>
        </div>

        <!-- <div class="change_type tj" v-show="$route.query.index<5"> -->
        <div class="change_type tj">
          <el-button :type="btnStyT" size="small" @click="dataShow(1)">统计详情</el-button>
        </div>
        <div class="change_type sj">
          <el-button :type="btnStyD" size="small" @click="dataShow(0)">数据详情</el-button>
        </div>
      </div>
    </div>
    <div class="showList" v-if="formType=='showList'">
      <studentList :search-data="searchList" @to-detail="toDetail"></studentList>
    </div>
    <div class="showDetail" v-if="formType=='showDetail'">
      <studentDetail :search-data="searchDetail"></studentDetail>
    </div>
  </div>
</template>
<script>
import searchCondition from "@/components/conditions/searchCondition";
import Echarts from "echarts";
import breadCrumb from "@/components/Breadcrumb/indexBread";
import { GETYEARLIST } from "@/utils/comData";
import request from "@/utils/request";
import studentList from "./detailList";
import studentDetail from "../../healthAnalysis/studentDetail";
import { exportXml, printPdf } from "@/utils/export";

export default {
  components: {
    breadCrumb,
    searchCondition,
    studentList,
    studentDetail
  },
  data() {
    return {
      iconTitle: "本学年所选区域的学生数量总和",
      formType: "showCharts",
      routerData: [
        {
          name: "体育资源管理",
          isClick: false
        },
        {
          name: "学生统计",
          isClick: false
        },
        {
          name: "全国",
          value: "001",
          isClick: true
        }
      ],
      searchData: {
        schoolYear: ""
      },
      schoolYearArr: GETYEARLIST.getYear(),
      screen: [],
      isStats: 1,
      btnStyT: "primary",
      btnStyD: "",
      tableData: [],
      title: "全国",
      searchList: {},
      searchDetail: {},
      type: {},
      defaultClassificationF: [
        {
          name: "全国",
          url: "api/auth/v1/resourceMgmt/student/stats/nationwides",
          export: "api/auth/v1/resourceMgmt/student/stats/nationwides/export",
          fieldId: "posProvinceId",
          fieldName: "posProvinceName"
        },
        {
          name: "省",
          url: "api/auth/v1/resourceMgmt/student/stats/province",
          export: "api/auth/v1/resourceMgmt/student/stats/province/export",
          fieldId: "posCityId",
          fieldName: "posCityName"
        },
        {
          name: "市",
          url: "api/auth/v1/resourceMgmt/student/stats/city",
          export: "api/auth/v1/resourceMgmt/student/stats/city/export",
          fieldId: "posDistrictId",
          fieldName: "posDistrictName"
        },
        {
          name: "区",
          url: "api/auth/v1/resourceMgmt/student/stats/district",
          export: "api/auth/v1/resourceMgmt/student/stats/district/export",
          fieldId: "schoolId",
          fieldName: "schoolName"
        },
        {
          name: "学校",
          url: "api/auth/v1/resourceMgmt/student/stats/school",
          export: "api/auth/v1/resourceMgmt/student/stats/school/export",
          fieldId: "dictSchoolTypeGradeId",
          fieldName: "gradeName"
        },
        {
          name: "年级",
          url: "api/auth/v1/resourceMgmt/student/stats/grade",
          export: "api/auth/v1/resourceMgmt/student/stats/grade/export",
          fieldId: "id",
          fieldName: "className"
        }
      ] // 默认分级  全国-省-市-区-学校-年级-班级
    };
  },
  methods: {
    routerClick: routerClick,
    selectData: selectData,
    getFormData: getFormData,
    clearData() {
      this.$refs.searchAll.clearData();
      this.searchData.schoolYear = this.schoolYearArr[0].value;
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
      this.createdFormData();
    },
    rowClick(row, event, column) {
      //table 第一个总数据没有
      if (row.preventEvent) {
        return false;
      }
      this.exportXmlGradeName = row.name;
      changeChart(row, this);
    },
    createdFormData: createdFormData,
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
      name += "学生统计";
      this.title = name;
    },
    exportFun() {
      let api = this.type.export;
      let searchData = this.$refs.searchAll.getData();
      let params = {};
      if (searchData.NposProvinceId.value != "001") {
        params.posProvinceId = searchData.NposProvinceId.id;
        params.posProvinceName = searchData.NposProvinceId.name;
      }
      if (searchData.NposCityId) {
        params.posCityId = searchData.NposCityId.id;
        params.posCityName = searchData.NposCityId.name;
      }
      if (searchData.NposDistrictId) {
        params.posDistrictId = searchData.NposDistrictId.id;
        params.posDistrictName = searchData.NposDistrictId.name;
      }
      if (searchData.NschoolId) {
        params.schoolId = searchData.NschoolId.id;
        params.schoolName = searchData.NschoolId.name;
      }
      if (this.type.name == "年级") {
        params.gradeId	 = this.exportXmlGradeId;
        params.gradeName	 = this.exportXmlGradeName;
      }
      params.schoolYear = this.searchData.schoolYear;
      exportXml(api, params, this);
    },
    print(name) {
      printPdf(name, this);
    },
    toDetail(data) {
      request.get("/api/auth/v1/physical/testItem/recordId",{
        params:{
          schoolYearEnd:data.schoolYearEnd,
          schoolYearStart:data.schoolYearStart,
          identityNo:data.identityNo,
        }
      }).then(res=>{
        console.log(res);
        if(res.data){
          this.searchDetail={
            name: data.name,
            schoolYearEnd:data.schoolYearEnd,
            schoolYearStart:data.schoolYearStart,
            identityNo:data.identityNo,
            id:res.data
          };
          this.routerData.push(data);
          this.formType = "showDetail";
        }else{
          this.$message.error('该学生没有体测报告');
        }
      })
    }
  },
  mounted() {
    this.type = this.defaultClassificationF[0];
    this.searchData.schoolYear = this.schoolYearArr[0].value;
    let params = { schoolYear: this.schoolYearArr[0].value };
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
      name: "体育资源管理",
      isClick: false
    },
    {
      name: "学生统计",
      isClick: false
    },
    {
      name: "全国",
      value: "001",
      isClick: true
    }
  ];
  this.type = this.defaultClassificationF[0];
  if (searchData.NposProvinceId.value != "001") {
    routerData.push(searchData.NposProvinceId);
    params.posProvinceId = searchData.NposProvinceId.id;
    this.type = this.defaultClassificationF[1];
  }
  if (searchData.NposCityId) {
    routerData.push(searchData.NposCityId);
    params.posCityId = searchData.NposCityId.id;
    this.type = this.defaultClassificationF[2];
  }
  if (searchData.NposDistrictId) {
    routerData.push(searchData.NposDistrictId);
    params.posDistrictId = searchData.NposDistrictId.id;
    this.type = this.defaultClassificationF[3];
  }
  if (searchData.NschoolId) {
    params.schoolId = searchData.NschoolId.id;
    routerData.push({
      id: searchData.NschoolId.id,
      name: searchData.NschoolId.name
    });
    this.type = this.defaultClassificationF[4];
  }
  if (value && value.type == "search") {
    this.type = this.defaultClassificationF[value.index];
    params.gradeId = value.dictSchoolTypeGradeId;
    this.exportXmlGradeId = value.dictSchoolTypeGradeId;
    routerData.push(value);
  }
  params.schoolYear = this.searchData.schoolYear;
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
      let data = res.data;
      this.getTitle();
      this.formData = res.data;
      this.screen = getScreen(data, this.type.fieldName);
      this.createdFormData();
    });
}
function getScreen(data, fieldName) {
  let screen = {};
  data.forEach((item, index) => {
    let obj = {};
    obj.name = item[fieldName];
    let studentMaleCount = item.studentMaleCount ? item.studentMaleCount : 0;
    let studentFemaleCount = item.studentFemaleCount
      ? item.studentFemaleCount
      : 0;

    let total = studentMaleCount + studentFemaleCount;
    if (total > 0) {
      obj.check = "true";
    } else {
      obj.check = "false";
    }

    screen[item[fieldName]] = obj;
  });
  return screen;
}
function createdFormData() {
  let formData = parseFormData(
    this.formData,
    this.type.fieldId,
    this.type.fieldName,
    this.screen
  );
  formData.tableData[0].name = this.routerData[this.routerData.length - 1].name;
  this.tableData = formData.tableData;
  createdLeftCharts(formData.leftData, this);
  createdRightCharts(formData.rightData, formData.xData, this);
}
function parseFormData(data, fieldId, fieldName, screen) {
  let tableData = [];
  let tableDataTotal = {
    total: 0,
    studentMaleCount: 0,
    studentFemaleCount: 0,
    proportion: ""
  };
  let leftData = { man: 0, woman: 0 },
    rightData = { man: [], woman: [] },
    xData = [];

  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    let studentMaleCount = item.studentMaleCount ? item.studentMaleCount : 0;
    let studentFemaleCount = item.studentFemaleCount
      ? item.studentFemaleCount
      : 0;

    let total = studentMaleCount + studentFemaleCount;
    let tableDataObj = {};

    tableDataTotal.studentMaleCount += studentMaleCount;
    tableDataTotal.studentFemaleCount += studentFemaleCount;
    tableDataTotal.total += studentMaleCount;
    tableDataTotal.total += studentFemaleCount;
    let id = item[fieldId];
    let region = item[fieldName];

    tableDataObj.name = region;
    tableDataObj.id = id;
    tableDataObj.value = total;

    if (studentFemaleCount > 0 && studentMaleCount > 0) {
      tableDataObj.proportion =
        ((studentMaleCount / total) * 100).toFixed(0) +
        "%：" +
        ((studentFemaleCount / total) * 100).toFixed(0) +
        "%";
    } else if (studentMaleCount > 0) {
      tableDataObj.proportion = "100%：0%";
    } else if (studentFemaleCount > 0) {
      tableDataObj.proportion = "0%：100%";
    } else {
      tableDataObj.proportion = "0%:0%";
    }
    leftData.man += studentMaleCount;
    leftData.woman += studentFemaleCount;
    //筛选那里选中了的
    if (screen[region].check == "true") {
      xData.push(region);
      rightData.man.push(
        Object.assign({}, item, tableDataObj, {
          value: studentMaleCount,
          id: id
        })
      );
      rightData.woman.push(
        Object.assign({}, item, tableDataObj, {
          value: studentFemaleCount,
          id: id
        })
      );
      tableData.push(Object.assign({}, item, tableDataObj));
    }
  }

  if (
    tableDataTotal.studentFemaleCount > 0 &&
    tableDataTotal.studentMaleCount > 0
  ) {
    tableDataTotal.proportion =
      ((tableDataTotal.studentMaleCount / tableDataTotal.total) * 100).toFixed(
        0
      ) +
      "%：" +
      (
        (tableDataTotal.studentFemaleCount / tableDataTotal.total) *
        100
      ).toFixed(0) +
      "%";
  } else if (tableDataTotal.studentMaleCount > 0) {
    tableDataTotal.proportion = "100%：0%";
  } else if (tableDataTotal.studentFemaleCount > 0) {
    tableDataTotal.proportion = "0%：100%";
  } else {
    tableDataTotal.proportion = "0%:0%";
  }

  tableData.unshift({
    name: name,
    value: tableDataTotal.total,
    preventEvent: true,
    proportion: tableDataTotal.proportion
  });
  return {
    tableData: tableData,
    leftData: leftData,
    rightData: rightData,
    xData: xData
  };
}
function createdLeftCharts(data, vm) {
  let leftCharts = Echarts.init(document.getElementById("leftCharts"));
  let name = vm.routerData[vm.routerData.length - 1].name;
  let manArr = [{ value: data.man, allValue: data.man + data.woman }];
  let womanArr = [{ value: data.woman, allValue: data.man + data.woman }];
  let leftOption = {
    color: ["#2E89E6", "#ec3434"],
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
      data: ["销量"]
    },
    xAxis: {
      data: [name]
    },
    grid: {
      left: "40%"
    },
    yAxis: {
      name: "单位：人",
      position: "left"
    },
    series: [
      {
        name: "男生",
        type: "bar",
        data: manArr,
        barWidth: 40,
        stack: "总量",
        label: {
          normal: {
            show: true,
            position: "inside",
            color: "#ffffff",
            formatter: function(params) {
              let value = params.data.value / params.data.allValue;
              return (value * 100).toFixed(0) + "%";
            }
          }
        }
      },
      {
        name: "女生",
        type: "bar",
        data: womanArr,
        barWidth: 20,
        stack: "总量",
        label: {
          normal: {
            show: true,
            position: "inside",
            color: "#ffffff",
            formatter: function(params) {
              let value = params.data.value / params.data.allValue;
              return (value * 100).toFixed(0) + "%";
            }
          }
        }
      }
    ]
  };
  leftOption.series.push(createdAll(data, "left"));
  // 使用刚指定的配置项和数据显示图表。
  leftCharts.setOption(leftOption);
}

function createdAll(data, type) {
  let allData = [];
  if (type == "left") {
    allData.push(data.man + data.woman);
  } else {
    data.man.forEach((item, index) => {
      let value = item.value + data.woman[index].value;
      allData.push(value);
    });
  }
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
function createdRightCharts(data, xData, vm) {
  let rightCharts = Echarts.init(document.getElementById("rightCharts"));
  let rightOption = {
    color: ["#2E89E6", "#ec3434"],
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
      data: ["男生", "女生"]
    },
    xAxis: {
      axisLabel: {
        interval: 0,
        margin: 15,
        verticalAlign: "top",
        align: "center"
      },
      type: "category",
      data: xData
    },
    yAxis: {
      type: "value",
      name: "单位：人）"
    },
    series: [
      {
        name: "男生",
        type: "bar",
        data: data.man,
        barWidth: 40,
        stack: "总量",
        label: {
          normal: {
            show: true,
            position: "inside",
            color: "#ffffff",
            formatter: function(params) {
              let value =
                params.value /
                (params.data.studentFemaleCount + params.data.studentMaleCount);
              return (value * 100).toFixed(0) + "%";
            }
          }
        }
      },
      {
        name: "女生",
        type: "bar",
        data: data.woman,
        barWidth: 40,
        stack: "总量",
        label: {
          normal: {
            show: true,
            position: "inside",
            color: "#ffffff",
            formatter: function(params) {
              let value =
                params.value /
                (params.data.studentFemaleCount + params.data.studentMaleCount);
              return (value * 100).toFixed(0) + "%";
            }
          }
        }
      }
    ]
  };
  rightOption.series.push(createdAll(data, "right"));
  if (data.man.length > 5) {
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
    vm.exportXmlGradeName = params.name;
    changeChart(params.data, vm, params);
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
      vm.$refs.searchAll.setData({
        NschoolId: data.schoolId
      });
      vm.$refs.searchAll.changeSchool(data.schoolId);
      vm.selectData();
      break;
    case 7:
      data.type = "search";
      data.index = 5;
      vm.selectData(data);
      break;
    case 8:
      data.titleName =
        vm.searchData.schoolYear +
        "学年" +
        routerData[4].name +
        routerData[5].name +
        routerData[6].name +
        routerData[7].name +
        data.name +
        "学生列表";
      data.gradeId = routerData[7].dictSchoolTypeGradeId;
      data.schoolYear = vm.searchData.schoolYear;
      data.schoolId = routerData[6].id;
      vm.formType = "showList";
      vm.searchList = data;
      routerData.push(data);
  }
}
</script>
<style scoped lang="scss">
.searchTitle {
  margin: auto;
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 10px;
  min-width: 1200px;
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
  padding: 20px 0;
  border-radius: 10px;
  min-width: 1200px;
  margin: auto;
  background-color: #fff;
  margin-bottom: 10px;
  .charts_title {
    line-height: 30px;
    text-align: center;
    font-size: 20px;
    color: #333;
    font-weight: 600;
    margin: 20px 0 50px;
  }
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
  height: 400px;
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

.data_detail_body {
  width: 1000px;
  margin: auto;
  position: relative;
  line-height: 35px;
  overflow: auto;
  padding: 15px 0;
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
  top: 34px;
  left: 216px;
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
