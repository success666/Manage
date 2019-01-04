<template>
  <div class="schoolStats">
    <breadCrumb :router-data="routerData" class="routerData" v-on:router-click="routerClick"></breadCrumb>
    <div class="formType" v-show="formType=='showChart'">
      <div class="searchTitle">
        <searchCondition ref="searchAll"></searchCondition>
        <el-row class="rowStyle">
          <el-col :span="12">
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
          </el-col>
          <el-col :span="12">
            <span class="titleSpan">教师姓名：</span>
            <el-input
              v-model="searchData.name"
              class="searchValue"
              size="mini"
              placeholder="请输入教师姓名"
            ></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="serach_btn">
            <el-button type="primary" size="mini" @click="selectData">查询</el-button>
            <el-button type="primary" size="mini" @click="clearData">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div class="charts">
        <div class="charts_title">
          {{ title }}
          <el-popover class="titlemessage" placement="right" width="300" trigger="click">
            <div class="titlemessage_teacher">
              <div class="value">&nbsp;&nbsp;&nbsp;配置比例参考《国家学校体育卫生条件试行基本标准》</div>
              <p class="value">&nbsp;&nbsp;&nbsp;小学：</p>
              <p class="value">&nbsp;&nbsp;&nbsp;1～2年级，每5～6个班至少应配备1名体育教师；</p>
              <p class="value">&nbsp;&nbsp;&nbsp;3～6年级，每6～7个班至少应配备1名体育教；</p>
              <p class="value">&nbsp;&nbsp;&nbsp;初中：</p>
              <p class="value">&nbsp;&nbsp;&nbsp;每6～7个班至少应配备1名体育教师；</p>
              <p class="value">&nbsp;&nbsp;&nbsp;高中（含中等职业学校）：</p>
              <p class="value">&nbsp;&nbsp;&nbsp;每8～9个班至少应配备1名体育教师；</p>
              <p class="value">&nbsp;&nbsp;&nbsp;农村：</p>
              <p class="value">&nbsp;&nbsp;&nbsp;200名学生以上的中小学校，至少配备应1名专职体育教师；</p>
              <p class="value">&nbsp;&nbsp;&nbsp;体育师生比计算方法：实际配置人数/校学生总人数。</p>
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
            <el-button slot="reference" class="screening">筛选</el-button>
          </el-popover>
        </div>
        <div class="data_detail" v-show="isStats==0">
          <div class="data_detail_body" ref="data_detail_body">
            <el-popover placement="right" width="561" trigger="click">
              <template v-for="(n) in screen">
                <!-- `checked` 为 true 或 false -->
                <!-- <el-checkbox :checked="n.check" @change="screenChange(index)">{{  n.name  }}</el-checkbox> -->
                <el-checkbox
                  v-model="n.isSelect"
                  true-label="true"
                  false-label="false"
                  @change="screenChange(n.name)"
                >{{ n.name }}</el-checkbox>
              </template>
              <el-button slot="reference" class="screening" size="mini">筛选</el-button>
            </el-popover>
            <!-- <div class="data_detail_default"><span>区域 <span class="screening">筛选</span></span>  <span>学校(所)</span></div>
            <div class="data_detail_default"><span>全国</span><span>2457</span></div>-->
            <el-table
              :data="tableData"
              @row-click="rowClick"
              max-height="385"
              style="width: 100%"
              class="table_from"
            >
              <el-table-column align="center" label="区域" prop="name" min-width="180"></el-table-column>
              <el-table-column
                align="center"
                label="体育师资配置达标率"
                min-width="180"
                :formatter="teacherConfRate"
                prop="teacherConfRate"
              ></el-table-column>
              <el-table-column
                align="center"
                label="已达标学校数(所)"
                min-width="180"
                prop="standardSchoolCount"
              ></el-table-column>
              <el-table-column
                align="center"
                label="未达标学校数(所)"
                min-width="180"
                prop="notStandardSchoolCount"
              ></el-table-column>
              <el-table-column
                align="center"
                label="已配置体育师资(人)"
                min-width="180"
                prop="teacherConfCount"
              ></el-table-column>
              <el-table-column align="center" label="体育师生比" min-width="180" prop="teaStuRateStr"></el-table-column>
            </el-table>
          </div>
          <div class="bottomC">
            <div class="print">
              <el-button type="primary" size="small" @click="exportFun">导出</el-button>
              <el-button type="primary" size="small" @click="print('data_detail_body')">打印</el-button>
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
    <div v-if="formType=='showList'">
      <detailList :search-data="searchList" @to-detail="toDetail"></detailList>
    </div>
    <div v-if="formType=='showDetail'">
      <teacherDetail :search-data="searchDetail"></teacherDetail>
    </div>
  </div>
</template>
<script>
import Echarts from "echarts";
import request from "@/utils/request";
import { exportXml, printPdf } from "@/utils/export";
import searchCondition from "@/components/conditions/searchCondition";
import breadCrumb from "@/components/Breadcrumb/indexBread";
import { GETYEARLIST } from "@/utils/comData";
import detailList from "./detailList";
import teacherDetail from "./teacherDetail";
export default {
  components: {
    searchCondition,
    breadCrumb,
    detailList,
    teacherDetail
  },
  data() {
    return {
      title: "",
      screen: {},
      gridData: [],
      isStats: 1,
      btnStyT: "primary",
      btnStyD: "",
      formData: [],
      showHeader: false,
      tableData: [],
      formType: "showChart",
      searchList: {},
      searchDetail: {},
      searchData: {
        schoolYear: "",
        name: ""
      },
      schoolYearArr: GETYEARLIST.getYear(),
      type: {
        name: "全国",
        url: "api/auth/v1/resourceMgmt/teacher/stats/nationwides",
        export: "api/auth/v1/resourceMgmt/teacher/stats/nationwidesExport",
        fieldName: "posProvinceName",
        id: "posProvinceId"
      },
      routerData: [
        {
          name: "体育资源管理",
          isClick: false
        },
        {
          name: "师资统计",
          isClick: false
        },
        {
          name: "全国",
          value: "001",
          isClick: true
        }
      ]
    };
  },
  methods: {
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
      let schoolType = "";

      name += "学校师资配置达标统计";
      this.title = name;
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
      params.schoolYear = this.searchData.schoolYear;
      exportXml(api, params, this);
    },
    print(name) {
      printPdf(name, this);
    },
    teacherConfRate(row, column, cellValue) {
      return cellValue + "%";
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
      for (name in this.searchData) {
        this.searchData[name] = "";
      }
      this.searchData.schoolYear = this.schoolYearArr[0].value;
    },
    routerClick: routerClick,
    getData: getData,
    createdFormData: createdFormData,
    screenChange(index) {
      this.createdFormData();
    },
    rowClick(row, event, column) {
      // table 第一个总数据没有点击事件
      if (row.preventEvent) {
        return false;
      }
      changeChart(row, this);
    },
    toDetail(data) {
      this.routerData.push({
        id: data.rowData.teacherProfessionalTitleId,
        name: data.rowData.name
      });
      this.formType = "showDetail";
      this.searchDetail = {
        name: data.rowData.name,
        schoolId: data.rowData.id,
        schoolYear:
          data.rowData.schoolYearStart + "-" + data.rowData.schoolYearEnd
      };
    }
  },
  mounted() {
    this.searchData.schoolYear = this.schoolYearArr[0].value;
    // this.$store.dispatch('DeleteRouteList', 0)
    this.getData({ schoolYear: this.searchData.schoolYear });
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
      name: "师资统计",
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
    url: "api/auth/v1/resourceMgmt/teacher/stats/nationwides",
    export: "api/auth/v1/resourceMgmt/teacher/stats/nationwidesExport",
    fieldName: "posProvinceName",
    id: "posProvinceId"
  };
  if (searchData.NposProvinceId.value != "001") {
    routerData.push(searchData.NposProvinceId);
    params.posProvinceId = searchData.NposProvinceId.id;
    this.type = {
      name: "省",
      url: "api/auth/v1/resourceMgmt/teacher/stats/province",
      export: "api/auth/v1/resourceMgmt/teacher/stats/provinceExport",
      id: "posCityId",
      fieldName: "posCityName"
    };
  }
  if (searchData.NposCityId) {
    routerData.push(searchData.NposCityId);
    params.posCityId = searchData.NposCityId.id;
    this.type = {
      name: "市",
      url: "api/auth/v1/resourceMgmt/teacher/stats/city",
      export: "api/auth/v1/resourceMgmt/teacher/stats/cityExport",
      id: "posDistrictId",
      fieldName: "posDistrictName"
    };
  }
  if (searchData.NposDistrictId) {
    routerData.push(searchData.NposDistrictId);
    params.posDistrictId = searchData.NposDistrictId.id;
    this.type = {
      name: "区",
      url: "api/auth/v1/resourceMgmt/teacher/stats/district",
      export: "api/auth/v1/resourceMgmt/teacher/stats/districtExport",
      fieldName: "schoolName",
      id: "schoolId"
    };
  }

  if (searchData.NschoolId && !this.searchData.name) {
    let titleName =
      this.searchData.schoolYear +
      "学年" +
      routerData[3].name +
      routerData[4].name +
      routerData[5].name +
      searchData.NschoolId.name +
      "师资配置详情列表";
    this.formType = "showList";
    this.searchList = {
      schoolId: searchData.NschoolId.id,
      schoolYear: this.searchData.schoolYear,
      titleName: titleName
    };
    routerData.push({
      id: searchData.NschoolId.id,
      name: searchData.NschoolId.name
    });
    this.routerData = JSON.parse(JSON.stringify(routerData));
    return;
  }
  if (this.searchData.name) {
    if (!searchData.NschoolId) {
      this.$message({
        message: "请选择学校",
        type: "warning"
      });
      return;
    }
    routerData.push({
      id: searchData.NschoolId.id,
      name: searchData.NschoolId.name
    });
    routerData.push({
      id: 2222,
      name: this.searchData.name
    });
    this.formType = "showDetail";
    this.searchDetail = {
      name: this.searchData.name,
      schoolId: searchData.NschoolId.id,
      schoolYear: this.searchData.schoolYear
    };
    this.searchData.name = "";
    this.routerData = JSON.parse(JSON.stringify(routerData));
    return;
  }
  params.schoolYear = this.searchData.schoolYear;
  this.getData(params, routerData);
}
function getData(params, routerData) {
  let api = this.type.url;
  request.get(api, { params }).then(res => {
    if (routerData) {
      this.routerData = JSON.parse(JSON.stringify(routerData));
    }
    this.formData = res.data;
    this.screen = parseScreen(res.data, this.type.fieldName);
    this.getTitle();
    this.createdFormData();
  });
}
function parseScreen(data, name) {
  let screen = {};
  data.forEach(item => {
    let itemName = item[name];
    let value = item.teacherConfRate || 0;
    let isSelect = "";
    if (value != 0) {
      isSelect = "true";
    } else {
      isSelect = "false";
    }
    screen[itemName] = {
      name: itemName,
      isSelect: isSelect
    };
  });
  return screen;
}
function createdFormData() {
  let data = parseFormData(
    this.formData,
    this.screen,
    this.type.id,
    this.type.fieldName,
    this.routerData[this.routerData.length - 1].name
  );
  this.tableData = data.tableDataArr;
  if (this.routerData.length == 6) {
    data.leftDataArr[0].value = this.formData[0].distTeacherConfRate;
  }
  createdLeftChart(data.leftDataArr, this);
  createdrRightChart(data.rightDataArr, data.xNameArr, this);
  // 指定图表的配置项和数据
}
function parseFormData(data, screen, idName, fieldName, tableName) {
  let tableDataArr = [],
    xNameArr = [],
    leftDataArr = [],
    rightDataArr = [];
  let total = {
    // 总计  左侧图表
    teacherConfRate: 0, // 达标率
    standardSchoolCount: 0, // 已达标
    notStandardSchoolCount: 0, // 未达标
    teaStuRateStr: 0, // 师生比
    teacherConfCount: 0, // 老师人数用于计算总师生比
    studentCount: 0, // 学生人数用于计算总师生比
    schoolTotal: 0 // 用于计算总达标率
  };
  let index = 0;
  data.forEach((item, index) => {
    //已达标
    item.standardSchoolCount = item.standardSchoolCount || 0;
    //未达标
    item.notStandardSchoolCount = item.notStandardSchoolCount || 0;
    //老师人数
    item.teacherConfCount = item.teacherConfCount || 0;
    //学生人数
    item.studenCount = item.studenCount || 0;
    //达标率
    item.teacherConfRate = item.teacherConfRate || 0;
    if (item.teacherConfRate > 0) {
      total.standardSchoolCount += item.standardSchoolCount;
      total.notStandardSchoolCount += item.notStandardSchoolCount;
      total.teacherConfCount += item.teacherConfCount;
      total.studentCount += item.studentCount;
      total.teacherConfRate += item.teacherConfRate;
      total.schoolTotal += item.standardSchoolCount;
      total.schoolTotal += item.notStandardSchoolCount;
    }
    let tableDataObj = {};
    tableDataObj.id = item[idName];
    tableDataObj.name = item[fieldName];
    // 达标率
    tableDataObj.teacherConfRate = item.teacherConfRate;
    // 已达标
    tableDataObj.standardSchoolCount = item.standardSchoolCount;
    // 未达标
    tableDataObj.notStandardSchoolCount = item.notStandardSchoolCount;
    // 已配置师资人
    tableDataObj.teacherConfCount = item.teacherConfCount;
    // 师生比
    tableDataObj.teaStuRateStr = item.teaStuRateStr;
    if (screen[tableDataObj.name].isSelect == "true") {
      index++;
      xNameArr.push(tableDataObj.name);
      rightDataArr.push(
        Object.assign({}, item, tableDataObj, { value: item.teacherConfRate })
      );
      tableDataArr.push(Object.assign({}, item, tableDataObj));
    }
  });
  // 使用刚指定的配置项和数据显示图表。

  var totalTeacherConfRate = 0;
  if (total.schoolTotal > 0) {
    totalTeacherConfRate = (
      (total.standardSchoolCount / total.schoolTotal) *
      100
    ).toFixed(0);
  }

  leftDataArr = [
    {
      value: totalTeacherConfRate,
      standardSchoolCount: total.standardSchoolCount,
      notStandardSchoolCount: total.notStandardSchoolCount,
      teaStuRateStr: proportionTransformation(
        total.teacherConfCount,
        total.studentCount
      )
    }
  ];
  tableDataArr.unshift({
    name: tableName,
    teacherConfRate: totalTeacherConfRate,
    preventEvent: true,
    standardSchoolCount: total.standardSchoolCount,
    notStandardSchoolCount: total.notStandardSchoolCount,
    teacherConfCount: total.teacherConfCount,
    teaStuRateStr: proportionTransformation(
      total.teacherConfCount,
      total.studentCount
    )
  });
  return {
    tableDataArr: tableDataArr,
    xNameArr: xNameArr,
    leftDataArr: leftDataArr,
    rightDataArr: rightDataArr,
    index: index
  };
}
function createdLeftChart(data, vm) {
  let leftCharts = Echarts.init(document.getElementById("leftCharts")); //左侧bar图表 当前汇总
  let name = vm.routerData[vm.routerData.length - 1].name;
  var leftOption = {
    color: ["#2E89E6"],
    title: {
      text: ""
    },
    tooltip: {
      formatter: function(params) {
        // 修改鼠标移上去显示的文字
        if (vm.routerData.length < 6) {
          return (
            "已达标：" +
            params.data.standardSchoolCount +
            "<br />未达标：" +
            params.data.notStandardSchoolCount +
            "<br />体育师生比：" +
            params.data.teaStuRateStr
          );
        } else {
          return "达标率：" + params.data.value + "%";
        }
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
  leftCharts.setOption(leftOption);
}
function createdrRightChart(data, xNameArr, vm) {
  let rightCharts = Echarts.init(document.getElementById("rightCharts"));
  var rightOption = {
    color: ["#2E89E6"],
    title: {
      text: ""
    },
    tooltip: {
      formatter: function(params) {
        if (vm.routerData.length < 6) {
          return (
            "已达标：" +
            params.data.standardSchoolCount +
            "<br />未达标：" +
            params.data.notStandardSchoolCount +
            "<br />体育师生比：" +
            params.data.teaStuRateStr
          );
        } else {
          return params.data.name + "<br />达标率：" + params.data.value + "%";
        }
      }
    },
    legend: {
      data: ["达标率"]
    },
    xAxis: {
      data: xNameArr
    },
    yAxis: {
      min: 0,
      max: 100,
      name: "达标率",
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
  if (data.length > 5) {
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
    changeChart(params.data, vm);
  });
}

function changeChart(data, vm) {
  let routerDataLength = vm.routerData.length;
  let routerData = vm.routerData;
  switch (routerDataLength) {
    case 3:
      vm.$refs.searchAll.setData({
        NposProvinceId: data.id
      });
      vm.$refs.searchAll.getCity(data.id);
      vm.selectData();
      break;
    case 4:
      vm.$refs.searchAll.setData({ NposCityId: data.id });
      vm.$refs.searchAll.getStreet(data.id);
      vm.selectData();
      break;
    case 5:
      vm.$refs.searchAll.setData({
        NposDistrictId: data.id
      });
      vm.$refs.searchAll.getSchool(data.id);
      vm.selectData();
      break;
    case 6:
      vm.routerData.push({ id: data.schoolId, name: data.schoolName });
      let titleName =
        vm.searchData.schoolYear +
        "学年" +
        routerData[3].name +
        routerData[4].name +
        routerData[5].name +
        data.schoolName +
        "师资配置详情列表";
      vm.formType = "showList";
      vm.searchList = {
        schoolId: data.schoolId,
        schoolYear: vm.searchData.schoolYear,
        titleName: titleName
      };
      break;
  }
}
function routerClick(data) {
  let routerData = data.routerData;
  let vm = this;
  switch (routerData.length) {
    case 3:
      this.formType = "showChart";
      vm.$refs.searchAll.setData({
        NposProvinceId: "001",
        NposCityId: "",
        NposDistrictId: "",
        NschoolTypeId: "",
        NschoolId: ""
      });
      break;
    case 4:
      this.formType = "showChart";
      vm.$refs.searchAll.setData({
        NposCityId: "",
        NposDistrictId: "",
        NschoolTypeId: "",
        NschoolId: ""
      });
      break;
    case 5:
      this.formType = "showChart";
      vm.$refs.searchAll.setData({
        NposDistrictId: "",
        NschoolTypeId: "",
        NschoolId: ""
      });
      break;
    case 6:
      this.formType = "showChart";
      vm.routerData = JSON.parse(JSON.stringify(routerData));
      this.formType = "showChart";
      return;
    case 7:
      this.formType = "showList";
      vm.routerData = JSON.parse(JSON.stringify(routerData));
      return;
  }
  vm.selectData();
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
    .el-col {
      width: 270px;
    }
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
    width: 174px;
  }
  .serach_btn {
    text-align: right;
    padding-right: 20px;
  }
}
.charts {
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 0;
  /*overflow: hidden;*/
  height: 662px;
  box-sizing: border-box;
}
.topSelect {
  border-bottom: 10px solid #f0f0f0;
  width: 100%;
  padding: 20px 10px;
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
  width: 1200px;
  margin: auto;
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
  width:1140px;
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
  left: 133px;
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
