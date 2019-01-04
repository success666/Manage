<template>
  <div class="schoolStats">
    <breadCrumb :router-data="routerData" class="routerData" v-on:router-click="routerClick"></breadCrumb>
    <div class="showChart" v-show="formType=='showChart'">
      <div class="searchTitle">
        <searchCondition ref="searchAll"></searchCondition>
        <el-row>
          <el-col :span="24" class="serach_btn">
            <el-button type="primary" size="mini" @click="selectData">查询</el-button>
            <el-button type="primary" size="mini" @click="clearData">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="charts">
        <div class="charts_title">
          {{title}}
          <el-popover class="titlemessage" placement="right" width="320" trigger="click">
            <div class="titlemessage">
              <div>本学年所选区域的学校数量总和</div>
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
        <div class="data_detail" v-show="isStats==0" >
          <div class="data_detail_body" ref="data_detail">
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
              <el-table-column align="center" label="区域" prop="name" min-width="280"></el-table-column>
              <el-table-column align="center" label="学校（所）" min-width="180" prop="value"></el-table-column>
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
    <div v-if="formType=='detailList'">
      <detailList :search-data="detailObj" @to-form="toForm"></detailList>
    </div>
    <div v-if="formType=='teacherDetail'">
      <teacherDetail :teacher-data="teacherObj"></teacherDetail>
    </div>
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
  </div>
</template>
<script>
import Echarts from "echarts";
import request from "@/utils/request";
import searchCondition from "@/components/conditions/searchCondition";
import detailList from "./detailList";
import teacherDetail from "./teacherDetail";
import breadCrumb from "@/components/Breadcrumb/indexBread";
import { exportXml, printPdf } from "@/utils/export";

export default {
  components: {
    searchCondition,
    breadCrumb,
    detailList,
    teacherDetail
  },
  data() {
    return {
      type: {
        name: "全国",
        url: "api/auth/v1/resourceMgmt/school/stats/nationwides",
        export:"api/auth/v1/resourceMgmt/school/stats/nationwides/export",
        fieldName: "posProvinceName"
      },
      formData: [], //表单数据
      formType: "showChart", //显示图标
      defaultClassificationF: [
        {
          name: "学校",
          url: "api/auth/v1/resourceMgmt/school/stats/school",
          fieldName: "name"
        }
      ],
      detailArr: [], // 详情列表数据
      screen: [],
      isStats: 1,
      btnStyT: "primary",
      btnStyD: "",
      title: "",
      routerData: [
        {
          name: "体育资源管理",
          isClick: false
        },
        {
          name: "学校统计 ",
          isClick: false
        },
        {
          name: "全国",
          value: "001",
          isClick: true
        }
      ],
      detailObj: {},
      teacherObj: {}
    };
  },
  methods: {
    
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
      exportXml(api, params, this);
    },
    print(name) {
      printPdf(name, this);
    },
    selectData: selectData,
    clearData() {
      this.$refs.searchAll.clearData();
    },
    getData: getData,
    screenChange(name) {
      this.initForm(this.formData);
    },
    initForm(formData) {
      let tableName = this.routerData[this.routerData.length - 1].name;
      let data = parseData(
        formData,
        this.screen,
        this.type.fieldName,
        tableName
      );
      this.detailArr = data.tableArr;
      createdLeftChart(data.leftChartData, this, tableName);
      createdRightChart(
        { xName: data.xName, seriesData: data.rightChartdata },
        this
      );
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
    routerClick(data) {
      let routerData = data.routerData;
      switch (routerData.length) {
        case 3:
          this.formType = "showChart";
          this.$refs.searchAll.setData({
            NposProvinceId: "001",
            NposCityId: "",
            NposDistrictId: "",
            NschoolTypeId: "",
            NschoolId: ""
          });
          break;
        case 4:
          this.formType = "showChart";
          this.$refs.searchAll.setData({
            NposCityId: "",
            NposDistrictId: "",
            NschoolTypeId: "",
            NschoolId: ""
          });
          break;
        case 5:
          this.routerData = JSON.parse(JSON.stringify(routerData));
          this.formType = "showChart";
          return;
        case 6:
          this.routerData = JSON.parse(JSON.stringify(routerData));
          this.formType = "detailList";
          return;
        // this.formType="detailList";
        // this.detailObj
      }
      this.selectData();
    },
    rowClick(row, event, column) {
      if (row.isTotal) return;
      changeChart(row, this);
    },
    getTitle() {
      let searchData = this.$refs.searchAll.getData();
      let name = "";
      //name = this.schoolYearArr[0]+'学年';
      if (this.routerData.length == 3) {
        name += "全国";
      } else {
        this.routerData.forEach((item, index) => {
          if (index > 2) {
            name += item.name;
          }
        });
      }
      if (typeof searchData.NschoolTypeId == "undefined") {
        name += "全部学校统计";
      } else {
        name += searchData.NschoolTypeId.name + "学校统计";
      }
      this.title = name;
    },
    toForm(data) {
      this.routerData.push({ id: data.rowData.id, name: data.rowData.name });
      this.formType = "teacherDetail";
      this.teacherObj = {
        data: data.rowData,
        id: data.rowData.id
      };
    }
  },
  mounted() {
    this.getData({});
  }
};
function selectData() {
  let searchData = this.$refs.searchAll.getData();
  let params = {};
  let schoolTypeName = "";
  if (searchData.NschoolTypeId) {
    params.schoolTypeId = searchData.NschoolTypeId.value;
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
  this.type = {
    name: "全国",
    url: "api/auth/v1/resourceMgmt/school/stats/nationwides",
    export:"api/auth/v1/resourceMgmt/school/stats/nationwides/export",
    fieldName: "posProvinceName"
  };
  if (searchData.NposProvinceId.value != "001") {
    routerData.push(searchData.NposProvinceId);
    params.posProvinceId = searchData.NposProvinceId.id;
    this.type = {
      name: "省",
      url: "api/auth/v1/resourceMgmt/school/stats/province",
      export:"api/auth/v1/resourceMgmt/school/stats/province/export",
      fieldName: "posCityName"
    };
  }
  if (searchData.NposCityId) {
    routerData.push(searchData.NposCityId);
    params.posCityId = searchData.NposCityId.id;
    this.type = {
      name: "市",
      url: "api/auth/v1/resourceMgmt/school/stats/city",
      export:"api/auth/v1/resourceMgmt/school/stats/city/export",
      fieldName: "posDistrictName"
    };
  }
  if (searchData.NposDistrictId) {
    routerData.push(searchData.NposDistrictId);
    if (!searchData.NschoolId) {
      let titleName =
        routerData[3].name +
        routerData[4].name +
        searchData.NposDistrictId.name +
        "学校列表";
      this.detailObj = {
        posProvinceId: routerData[3].id,
        posCityId: routerData[4].id,
        posDistrictId: searchData.NposDistrictId.id,
        schoolTypeId: params.schoolTypeId || "",
        titleName: titleName
      };
      this.routerData = JSON.parse(JSON.stringify(routerData));
      this.formType = "detailList";
      return;
    }
  }
  if (searchData.NschoolId) {
    routerData.push({
      id: searchData.NschoolId.id,
      name: searchData.NschoolId.name
    });
    this.routerData = JSON.parse(JSON.stringify(routerData));
    this.teacherObj = {
      data: searchData.NschoolId,
      id: searchData.NschoolId.id
    };
    this.formType = "teacherDetail";
    return;
  }
  this.getData(params, routerData);
}
function getData(params, routerData) {
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
      // 获取标题
      this.getTitle();
      this.screen = parseScreen(this.formData, this.type.fieldName);
      this.initForm(this.formData);
    });
}
function parseScreen(data, name) {
  const screen = {};
  data.forEach(item => {
    let itemName = item[name];
    let value = item.schoolCount || 0;
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
function parseData(data, screen, fieldName, tableName) {
  // x轴对应名称
  let xName = [];
  let seriesArr = [];
  let rightChartdata = [];
  let leftChartData = 0;
  let tableArr = [];
  // 获取数据
  data.forEach((item, index) => {
    leftChartData += item.schoolCount || 0;
    let name = item[fieldName];
    let obj = {
      value: item.schoolCount || 0,
      name: name,
      posCityId: item.posCityId,
      posDistrictId: item.posDistrictId,
      posProvinceId: item.posProvinceId,
      posProvinceCode: item.posProvinceCode,
      posCityCode: item.posCityCode,
      posDistrictCode: item.posDistrictCode,
      schoolId: item.schoolId
    };
    if (screen[obj.name].isSelect == "true") {
      xName.push(obj.name);
      rightChartdata.push(obj);
      tableArr.push(obj);
    }
  });
  tableArr.unshift({ name: tableName, value: leftChartData, isTotal: true });

  return {
    leftChartData: leftChartData,
    rightChartdata: rightChartdata,
    xName: xName,
    tableArr: tableArr
  };
}
function createdLeftChart(data, vm, tableName) {
  let leftCharts = Echarts.init(document.getElementById("leftCharts")); //左侧bar图表 当前汇总
  let name = tableName;
  var option = {
    color: ["#2E89E6"],
    title: {
      text: ""
    },
    tooltip: {},
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
      name: "学校：所",
      position: "left",
      axisLabel: {
        show: true,
        interval: "auto",
        formatter: "{value}"
      }
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
          formatter: "{c}"
        }
      }
    }
  };
  leftCharts.setOption(option);
}

function createdRightChart(data, vm) {
  let rightCharts = Echarts.init(document.getElementById("rightCharts"));
  rightCharts.clear();
  const option = {
    color: ["#2E89E6"],
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
    grid: {},
    legend: {
      data: ["学校：所"]
    },
    xAxis: {
      data: data.xName
    },
    yAxis: {
      name: "学校：所",
      axisLabel: {
        show: true,
        interval: "auto",
        formatter: "{value}"
      }
    },
    series: [
      {
        name: "",
        type: "bar",
        data: data.seriesData,
        barWidth: 20,
        label: {
          normal: {
            show: true,
            position: "top",
            formatter: "{c}"
          }
        }
      }
    ]
  };
  if (data.xName.length > 8) {
    option.dataZoom = [
      {
        type: "inside",
        xAxisIndex: [0],
        start: 0,
        end: 50
      },
      {
        show: true,
        height: 17,
        type: "slider",
        bottom: "0px",
        xAxisIndex: [0],
        start: 0,
        end: 50,
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
      let searchData = vm.$refs.searchAll.getData();
      let schoolTypeId = "";
      if (searchData.NschoolTypeId) {
        schoolTypeId = searchData.NschoolTypeId.value;
      }
      let titleName =
        vm.routerData[3].name + vm.routerData[4].name + data.name + "学校列表";
      vm.detailObj = {
        posProvinceId: data.posProvinceId,
        posCityId: data.posCityId,
        posDistrictId: data.posDistrictId,
        titleName: titleName,
        schoolTypeId: schoolTypeId
      };
      vm.routerData.push({
        id: data.posDistrictId,
        name: data.name
      });
      vm.formType = "detailList";
      break;
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
  .serach_btn {
    text-align: right;
    padding-right: 20px;
    margin-bottom: 10px;
  }
}
.routerData {
  width: 96% !important;
}
.charts {
  position: relative;
  padding: 20px 0;
  overflow: hidden;
  min-height: 500px;
  margin-bottom: 30px;
  background-color: #fff;
  border-radius: 10px;
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
  width: 476px;
  max-height: 450px;
  margin: 0 auto;
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
  top: 15px;
  left: 37px;
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
