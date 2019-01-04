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
          <span class="titleSpan">指标:</span>
          <el-select
            v-model="searchData.target"
            placeholder="请选择"
            size="mini"
            class="searchValue"
            @change="changeTarget"
          >
            <el-option
              v-for="item in targetArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <div class="searchClick">
            <el-button type="primary" size="mini" @click="selectData">查询</el-button>
            <el-button type="primary" size="mini" @click="clearData">重置</el-button>
          </div>
        </div>
      </div>
      <div class="charts">
        <div class="charts_title">{{ title }}</div>
        <div class="charts_detail" v-show="isStats==1">
          <div id="leftCharts"></div>
          <div id="rightCharts"></div>
          <el-popover placement="right" width="561" trigger="click">
            <template v-for="(n,index) in screen">
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
                <!-- <el-checkbox v-model="n.check" :checked="n.check" @change="screenChange(index)">{{  n.name  }}</el-checkbox> -->
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
            <el-table :data="tableData" @row-click="rowClick" max-height="391" style="width: 100%">
              <el-table-column align="center" label="区域" prop="name" min-width="180"></el-table-column>
              <el-table-column
                v-if="searchData.target==0"
                align="center"
                label="全部平均运动时长（min）"
                min-width="180"
                prop="sportTime"
              ></el-table-column>
              <el-table-column
                v-if="searchData.target==1"
                align="center"
                label="全部平均运动消耗（大卡）"
                min-width="180"
                prop="calorieExpendValue"
              ></el-table-column>

              <el-table-column
                v-if="searchData.target==0"
                align="center"
                label="男生平均运动时长（min）"
                min-width="180"
                prop="manSportTime"
              ></el-table-column>
              <el-table-column
                v-if="searchData.target==1"
                align="center"
                label="男生平均运动消耗（大卡）"
                min-width="180"
                prop="manCalorieExpendValue"
              ></el-table-column>

              <el-table-column
                v-if="searchData.target==0"
                align="center"
                label="女生平均运动时长（min）"
                min-width="180"
                prop="girlSportTime"
              ></el-table-column>
              <el-table-column
                v-if="searchData.target==1"
                align="center"
                label="女生平均运动消耗（大卡）"
                min-width="180"
                prop="girlCalorieExpendValue"
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
    <div class="showList" v-show="formType=='showList'">
      <studentList :search-data="studentListData" @to-form="toDetail"></studentList>
    </div>
    <div class="showDetail" v-show="formType=='showDetail'">
      <studentDetail :search-data="studentDetailData"></studentDetail>
    </div>
  </div>
</template>
<script>
import searchCondition from "@/components/conditions/searchCondition";
import Echarts from "echarts";
import breadCrumb from "@/components/Breadcrumb/indexBread";
import request from "@/utils/request";
import studentList from "./detailList";
import studentDetail from "./detail";
import { exportXml, printPdf } from "@/utils/export";
export default {
  components: {
    searchCondition,
    breadCrumb,
    studentList,
    studentDetail
  },
  data() {
    return {
      isStats: 1,
      screen: {},
      btnStyT: "primary",
      btnStyD: "",
      showHeader: false,
      title: "全国",
      formType: "showCharts",
      tableData: [],
      type: {},
      totleFormData: [],
      formData: [],
      studentListData: {},
      studentDetailData: {},
      routerData: [
        {
          name: "体育教务管理",
          isClick: false
        },
        {
          name: "智慧课堂统计",
          isClick: false
        },
        {
          name: "全国",
          value: "001",
          isClick: true
        }
      ],
      searchData: {
        date: [],
        target: 0
      },
      totalData: [],
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
      },
      targetArr: [
        {
          value: 0,
          label: "体育课堂平均运动时长"
        },
        {
          value: 1,
          label: "体育课堂平均运动消耗"
        }
      ],
      typeArr: [
        {
          name: "全国",
          url: "api/auth/v1/course/statistics/national",
          export: "api/auth/v1/course/statistics/nationwide/export",
          fieldId: "posProvinceId",
          fieldName: "posProvince"
        },
        {
          name: "省",
          url: "/api/auth/v1/course/statistics/province",
          export: "api/auth/v1/course/statistics/province/export",
          fieldId: "posCityId",
          fieldName: "posCity"
        },
        {
          name: "市",
          url: "/api/auth/v1/course/statistics/city",
          export: "api/auth/v1/course/statistics/city/export",
          fieldId: "posDistrictId",
          fieldName: "posDistrict"
        },
        {
          name: "区",
          url: "/api/auth/v1/course/statistics/district",
          export: "api/auth/v1/course/statistics/district/export",
          fieldId: "schoolId",
          fieldName: "schoolName"
        },
        {
          name: "学校",
          url: "/api/auth/v1/course/statistics/grade",
          export: "api/auth/v1/course/statistics/school/export",
          fieldId: "dictSchoolTypeGradeId",
          fieldName: "gradeName"
        },
        {
          name: "年级",
          url: "/api/auth/v1/course/statistics/schoolClass",
          export: "api/auth/v1/course/statistics/grade/export",
          fieldId: "schoolClassId",
          fieldName: "schoolClassName"
        }
      ] // 默认分级  全国-省-市-区-学校-年级-班级
    };
  },
  methods: {
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
        params.dictSchoolTypeGradeId = this.exportXmlData.dictSchoolTypeGradeId;
        params.dictGradeId = this.exportXmlData.dictGradeId;
        params.schoolId = this.routerData[6].id;
      }
      params.startTime = this.searchData.date[0];
      params.endTime = this.searchData.date[1];
      params.indicators=this.searchData.target+1;
      exportXml(api, params, this);
    },
    print(name) {
      printPdf(name, this);
    },
    screenChange: function(index) {
      this.createdFormData("nochange");
    },
    rowClick(row, event, column) {
      //table 第一个总数据没有点击事件
      if (row.istotal) {
        return false;
      }
      changeChart(row, this);
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
      if (this.searchData.target == 0) {
        name += "体育课堂平均运动时长统计";
      } else {
        name += "体育课堂平均运动消耗统计";
      }
      this.title = name;
    },
    changeTarget(value) {
      this.screen = getScreen(
        this.formData,
        this.type.fieldName,
        this.searchData.target
      );
      this.createdFormData();
    },
    createdFormData: createdFormData,
    selectData: selectData,
    getFormData: getFormData,
    getNationwideData: getNationwideData,
    clearData() {
      this.$refs.searchAll.clearData();
      this.searchData.target = 0;
      this.searchData.date = [getDay(-7), getDay(0)];
    },
    routerClick: routerClick,
    toDetail(data) {
      let router = JSON.parse(data);
      router.id = router.studentId;
      router.titleName =
        this.searchData.date[0] +
        "至" +
        this.searchData.date[1] +
        router.name +
        "体育课堂";
      if (this.searchData.target == 0) {
        router.titleName += "运动时长";
      } else {
        router.titleName += "运动消耗";
      }
      this.formType = "showDetail";
      this.studentDetailData = router;
      this.routerData.push(router);
    }
  },
  mounted() {
    this.type = this.typeArr[0];
    this.searchData.date = [getDay(-7), getDay(0)];
    let params = { startTime: getDay(-7), endTime: getDay(0) };
    this.getNationwideData(params);

    //this.getFormData(params);
  }
};
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
      name: "智慧课堂统计",
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
  } else {
    params.startTime = this.searchData.date[0];
    params.endTime = this.searchData.date[1];
    this.routerData = JSON.parse(JSON.stringify(routerData));
    this.getNationwideData(params);
    return;
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
    this.exportXmlData=value;
    params.dictSchoolTypeGradeId = value.dictSchoolTypeGradeId;
    params.dictGradeId = value.dictGradeId;
    routerData.push(value);
  }
  params.startTime = this.searchData.date[0];
  params.endTime = this.searchData.date[1];
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
      this.formData = res.data;
      this.screen = getScreen(
        res.data,
        this.type.fieldName,
        this.searchData.target
      );
      this.createdFormData();
    });
}

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
      this.totleFormData = this.totalData[routerData.length - 4].table;
      break;
    case 5:
      vm.$refs.searchAll.setData({
        NposDistrictId: "",
        NschoolTypeId: "",
        NschoolId: ""
      });
      this.totleFormData = this.totalData[routerData.length - 4].table;
      break;
    case 6:
      vm.$refs.searchAll.setData({
        NschoolTypeId: "",
        NschoolId: ""
      });
      this.totleFormData = this.totalData[routerData.length - 4].table;
      break;
    case 7:
      this.totleFormData = this.totalData[routerData.length - 4].table;
      break;
    case 8:
      vm.selectData(routerData[7]);
      vm.formType = "showCharts";
      this.totleFormData = this.totalData[routerData.length - 4].table;
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
function getNationwideData(params) {
  request
    .get("/api/auth/v1/course/statistics/wholeCountry", {
      params
    })
    .then(res => {
      let formData = res.data;
      formData[0].name = "全国";
      formData[0].sportTime = formData[0].sportTime
        ? formData[0].sportTime.toFixed(1)
        : 0;
      formData[0].calorieExpendValue = formData[0].calorieExpendValue
        ? formData[0].calorieExpendValue.toFixed(1)
        : 0;
      formData[0].girlSportTime = formData[0].girlSportTime
        ? formData[0].girlSportTime.toFixed(1)
        : 0;
      formData[0].manSportTime = formData[0].manSportTime
        ? formData[0].manSportTime.toFixed(1)
        : 0;
      formData[0].girlCalorieExpendValue = formData[0].girlCalorieExpendValue
        ? formData[0].girlCalorieExpendValue.toFixed(1)
        : 0;
      formData[0].manCalorieExpendValue = formData[0].manCalorieExpendValue
        ? formData[0].manCalorieExpendValue.toFixed(1)
        : 0;
      formData[0].preventEvent = true;
      if (this.searchData.target == 0) {
        formData[0].value = formData[0].sportTime;
      } else {
        formData[0].value = formData[0].calorieExpendValue;
      }
      this.totleFormData = formData;
      this.getFormData();
    });
}
function createdFormData(type) {
  const data = this.formData;
  if (!type || type != "nochange") {
    this.getTitle();
  }
  let formData = parseFormData(
    data,
    this.type.fieldId,
    this.type.fieldName,
    this.screen,
    this.searchData.target,
    this
  );
  if (this.searchData.target == 0) {
    this.totleFormData[0].value = this.totleFormData[0].sportTime;
  } else {
    this.totleFormData[0].value = this.totleFormData[0].calorieExpendValue;
  }
  this.totleFormData[0].istotal = true;
  if (this.routerData.length > 3) {
    this.totalData[this.routerData.length - 4] = {
      table: JSON.parse(JSON.stringify(this.totleFormData))
    };
  }
  createdLeftCharts(this.totleFormData, this);
  this.tableData = this.totleFormData.concat(formData.tableData);
  //createdLeftCharts(formData.leftData, this);
  createdRightCharts(formData.rightData, formData.nameArr, this);
}
function getScreen(data, fieldName, target) {
  let screen = {};
  data.forEach((item, index) => {
    let obj = { name: "", check: "true" };
    obj.name = item[fieldName];
    let manCalorieExpendValue = item.manCalorieExpendValue
      ? item.manCalorieExpendValue
      : 0;
    let manSportTime = item.manSportTime ? item.manSportTime : 0;

    let girlCalorieExpendValue = item.girlCalorieExpendValue
      ? item.girlCalorieExpendValue
      : 0;
    let girlSportTime = item.girlSportTime ? item.girlSportTime : 0;

    let sportTime = (manSportTime + girlSportTime) / 2;
    let calorieExpendValue =
      (manCalorieExpendValue + girlCalorieExpendValue) / 2;
    if (target == 0) {
      obj.check = sportTime > 0 ? "true" : "false";
    } else {
      obj.check = calorieExpendValue > 0 ? "true" : "false";
    }
    screen[item[fieldName]] = obj;
  });
  return screen;
}
function parseFormData(data, fieldId, fieldName, screen, target, vm) {
  let nameArr = [],
    leftData = [],
    rightData = [],
    tableData = [];
  data.forEach((item, index) => {
    let manCalorieExpendValue = item.manCalorieExpendValue
      ? item.manCalorieExpendValue
      : 0;
    let manSportTime = item.manSportTime ? item.manSportTime : 0;
    let girlCalorieExpendValue = item.girlCalorieExpendValue
      ? item.girlCalorieExpendValue
      : 0;
    let girlSportTime = item.girlSportTime ? item.girlSportTime : 0;
    let sportTime = item.sportTime;
    let calorieExpendValue =
      (manCalorieExpendValue + girlCalorieExpendValue) / 2;
    let tableDataObj = {};
    let id = item[fieldId];
    let region = item[fieldName];
    tableDataObj.name = region;
    tableDataObj.id = id;
    tableDataObj.sportTime = sportTime.toFixed(1);
    tableDataObj.calorieExpendValue = item.calorieExpendValue.toFixed(1);
    tableDataObj.girlSportTime = girlSportTime.toFixed(1);
    tableDataObj.manSportTime = manSportTime.toFixed(1);
    tableDataObj.girlCalorieExpendValue = girlCalorieExpendValue.toFixed(1);
    tableDataObj.manCalorieExpendValue = manCalorieExpendValue.toFixed(1);
    if (screen[region].check == "true") {
      nameArr.push(region);
      if (target == 0) {
        rightData.push(
          Object.assign({}, item, tableDataObj, {
            value: sportTime.toFixed(1),
            id: id,
            manSportTime: manSportTime.toFixed(1),
            girlSportTime: girlSportTime.toFixed(1)
          })
        );
      } else {
        rightData.push(
          Object.assign({}, item, tableDataObj, {
            value: item.calorieExpendValue.toFixed(1),
            id: id,
            manCalorieExpendValue: manCalorieExpendValue.toFixed(1),
            girlCalorieExpendValue: girlCalorieExpendValue.toFixed(1)
          })
        );
      }
      tableData.push(Object.assign({}, item, tableDataObj));
    }
  });
  return {
    rightData: rightData,
    nameArr: nameArr,
    tableData: tableData
  };
}
function createdLeftCharts(data, vm) {
  let name = vm.routerData[vm.routerData.length - 1].name;
  // 指定图表的配置项和数据
  let leftOption = {
    color: ["#2E89E6"],
    title: {
      text: ""
    },
    tooltip: {
      formatter: function(params) {
        //修改鼠标移上去显示的文字
        if (vm.searchData.target == 0) {
          return (
            "全部平均运动时长：" +
            params.data.value +
            "min<br />男生平均运动时长：" +
            params.data.manSportTime +
            "min<br />女生平均运动时长：" +
            params.data.girlSportTime +
            "min"
          );
        } else {
          return (
            "全部平均运动消耗：" +
            params.data.calorieExpendValue +
            "大卡<br />男生平均运动消耗：" +
            params.data.manCalorieExpendValue +
            "大卡<br />女生平均运动消耗：" +
            params.data.girlCalorieExpendValue +
            "大卡"
          );
        }
      }
    },
    legend: {
      data: ["消耗"]
    },
    xAxis: {
      data: [name]
    },
    grid: {
      left: "30%"
    },
    yAxis: {
      name: vm.searchData.target == 0 ? "时长（min）" : "消耗（大卡）"
      // position: 'left',
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
          formatter: vm.searchData.target == 0 ? "{c}min" : "{c}大卡"
        }
      }
    }
  };
  let leftCharts = Echarts.init(document.getElementById("leftCharts"));

  // 使用刚指定的配置项和数据显示图表。
  leftCharts.setOption(leftOption);
}
function createdRightCharts(data, xData, vm) {
  var rightOption = {
    color: ["#2E89E6"],
    title: {
      text: ""
    },
    tooltip: {
      formatter: function(params) {
        //修改鼠标移上去显示的文字
        if (vm.searchData.target == 0) {
          if (!params.data) return "";
          return (
            "全部平均运动时长：" +
            params.data.sportTime +
            "min<br />男生平均运动时长：" +
            params.data.manSportTime +
            "min<br />女生平均运动时长：" +
            params.data.girlSportTime +
            "min"
          );
        } else {
          return (
            "全部平均运动消耗：" +
            params.data.calorieExpendValue +
            "大卡<br />男生平均运动消耗：" +
            params.data.manCalorieExpendValue +
            "大卡<br />女生平均运动消耗：" +
            params.data.girlCalorieExpendValue +
            "大卡"
          );
        }
      }
    },
    legend: {
      data: ["消耗"]
    },
    xAxis: {
      data: xData
    },
    yAxis: {
      name: vm.searchData.target == 0 ? "时长（min）" : "消耗（大卡）"
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
          formatter: vm.searchData.target == 0 ? "{c}min" : "{c}大卡"
        }
      }
    }
  };
  if (xData.length > 5) {
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
  let rightCharts = Echarts.init(document.getElementById("rightCharts"));
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
      vm.totleFormData = [data];
      vm.$refs.searchAll.setData({
        NposProvinceId: data.posProvinceId
      });
      vm.$refs.searchAll.getCity(data.posProvinceId);
      vm.selectData();
      break;
    case 4:
      vm.totleFormData = [data];
      vm.$refs.searchAll.setData({ NposCityId: data.posCityId });
      vm.$refs.searchAll.getStreet(data.posCityId);
      vm.selectData();
      break;
    case 5:
      vm.totleFormData = [data];
      vm.$refs.searchAll.setData({
        NposDistrictId: data.posDistrictId
      });
      vm.$refs.searchAll.getSchool(data.posDistrictId);
      vm.selectData();
      break;
    case 6:
      vm.totleFormData = [data];
      vm.$refs.searchAll.setData({
        NschoolId: data.schoolId
      });
      vm.$refs.searchAll.changeSchool(data.schoolId);
      vm.selectData();
      break;
    case 7:
      vm.totleFormData = [data];
      data.type = "search";
      data.index = 5;
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
        "学生列表";
      data.startTime = vm.searchData.date[0];
      data.endTime = vm.searchData.date[1];
      data.target = vm.searchData.target;
      vm.formType = "showList";
      vm.studentListData = data;
      routerData.push(data);
      break;
  }
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
  height: 662px;
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
  left: 190px;
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
