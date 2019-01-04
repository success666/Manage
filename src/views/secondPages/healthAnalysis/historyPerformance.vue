<template>
  <div class="historyPerformance">
    <div class="s_1_head">学生信息详情</div>
    <h1>小明</h1>
    <div class="message">
      <el-row class="rowsty">
        <el-col :span="4">
          <img class="iconstyle" src="@/assets/imgs/icon1.png">
          <span class="rowstylevalue">性别：-----</span>
        </el-col>
        <el-col :span="4">
          <img class="iconstyle" src="@/assets/imgs/icon2.png">
          <span class="rowstylevalue">年龄：-------</span>
        </el-col>
        <el-col :span="4">
          <img class="iconstyle" src="@/assets/imgs/icon3.png">
          <span class="rowstylevalue">身份证：------</span>
        </el-col>
      </el-row>
      <el-row class="rowsty">
        <el-col :span="4">
          <img class="iconstyle" src="@/assets/imgs/icon6.png">
          <span class="rowstylevalue">班级：------</span>
        </el-col>
        <el-col :span="4">
          <img class="iconstyle" src="@/assets/imgs/icon7.png">
          <span class="rowstylevalue">学籍状态：------</span>
        </el-col>
        <el-col :span="4">
          <img class="iconstyle" src="@/assets/imgs/icon8.png">
          <span class="rowstylevalue">学籍号：-----</span>
        </el-col>
      </el-row>
      <el-row class="rowsty">
        <el-col :span="4">
          <img class="iconstyle" src="@/assets/imgs/icon9.png">
          <span class="rowstylevalue">家长绑定状态：------</span>
        </el-col>
        <el-col :span="4">
          <img class="iconstyle" src="@/assets/imgs/iocn10.png">
          <span class="rowstylevalue">绑定手机：-----</span>
        </el-col>
      </el-row>
    </div>
    
    <div class="condition">
      <p>
        <span>身体素质：</span>
        <el-button type="info" size="mini" plain>一分钟仰卧起坐</el-button>
        <el-button type="info" size="mini" plain>坐位体前屈</el-button>
        <el-button type="info" size="mini" plain>一分钟跳绳</el-button>
        <el-button type="info" size="mini" plain>立定跳远</el-button>
        <el-button type="info" size="mini" plain>引体向上</el-button>
        <el-button type="info" size="mini" plain>50米跑</el-button>
        <el-button type="info" size="mini" plain>50米x8往返跑</el-button>
        <el-button type="info" size="mini" plain>1000米跑</el-button>
      </p>
      <p>
        <span>身体形态：</span>
        <el-button type="info" size="mini" plain>身体质量指数</el-button>
      </p>
      <p>
        <span>身体机能：</span>
        <el-button type="info" size="mini" plain>肺活量</el-button>
      </p>
      <p>
        <span>体测成绩：</span>
        <el-button type="info" size="mini" plain>体测总成绩</el-button>
      </p>
    </div>
    <div style="height:600px;">
      <div id="container" style="height: 100%"></div>
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
    </div>
  </div>
</template>


<script>
import Echarts from "echarts";
import "echarts/map/js/china.js";
import Jquery from "../../../../static/jquery-2.1.1.min";
export default {

  data() {
    Array.prototype.remove = function(val) { 
      var index = this.indexOf(val); 
      if (index > -1) { 
        this.splice(index, 1); 
      } 
    };
    return {
      semester:['14-15','15-16','16-17','17-18','18-19','19-20','20-21'],
      detailListData:{},
      screen: {
        "14-15":{
          isSelect:"true",
          name:"14-15"
        },
        "15-16":{
          isSelect:"true",
          name:"15-16"
        },
        "16-17":{
          isSelect:"true",
          name:"16-17"
        },
        "17-18":{
          isSelect:"true",
          name:"17-18"
        },
        "18-19":{
          isSelect:"true",
          name:"18-19"
        },
        "19-20":{
          isSelect:"true",
          name:"19-20"
        },
        "20-21":{
          isSelect:"true",
          name:"20-21"
        }
      },
    };
  },
  methods: {
    screenChange(name) {
      // this.screen[name].isSelect = !this.screen[name].isSelect
        console.log(this.screen[name].isSelect)
      if(this.screen[name].isSelect == 'true'){
        console.log(2345)
        this.semester.push(name);
      }else{
        this.semester.remove(name);
        console.log(name);
      }
      createdRightBar(this.semester)
      // this.createdFormData(this.formData[this.type.dataName]);
    },
    createdFormData(formData) {
      // let data = parseFormData(
      //   formData,
      //   this.screen,
      //   this.type.fieldName,
      //   this.routerData[this.routerData.length - 1].name
      // );

      // // 图表汇总的处理
      // this.detailArr = data.tableData;
      // createdRightBar(data.rightChartsData, data.xName, this);
    },
  },
  watch: {
    
  },
  mounted() {
    createdRightBar(this.semester)
  },
  filters: {
    studentStatus(v) {
      if ((v = 0)) {
        return "不在本班";
      } else {
        return "在本班";
      }
    },
    bindingStatus(v) {
      if ((v = 0)) {
        return "未关联";
      } else {
        return "已关联";
      }
    }
  }
};
function createdRightBar(formData, vm) {
   let endValue=100;
    // if(data.tableData.length>7){
    //   endValue = 7/data.tableData.length*100;
    // }
var dom = document.getElementById("container");
var myChart = Echarts.init(dom);
var app = {};
var option = null;
option = {
    // legend: {},
    color: ['#003366', '#006699', '#4cabce', '#e5323e'],
    // legend: {
    //     data: ['Forest', 'Steppe', 'Desert', 'Wetland']
    // },
    tooltip: {},
    // dataset: {
    //     source: [
    //         ['product', '2015', '2016', '2017'],
    //         ['Matcha Latte', 43.3, 85.8, 93.7],
    //         ['Milk Tea', 83.1, 73.4, 55.1],
    //         ['Cheese Cocoa', 86.4, 65.2, 82.5],
    //         ['Walnut Brownie', 72.4, 53.9, 39.1]
    //     ]
    // },
   
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0],
        start: 0,
        end: endValue
      },
      {
        show: true,
        height: 17,
        type: "slider",
        bottom: "0px",
        xAxisIndex: [0],
        start: 0,
        end: 100,
        backgroundColor: "#EEEEEE",
        fillerColor: "#84BEF9",
        borderColor: "#fff",
        showDetail: false,
        showDataShadow: false
      }
    ],
    // xAxis: {type: 'category'},
    xAxis: {
      data: formData
    },
    yAxis: {
      min: 0,
      max: 100,
      name: "分数：分",
      position: "left",
      axisLabel: {
        show: true,
        interval: "auto",
      }
    },
    // yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    // series: [
    //     {type: 'bar'},
    //     {type: 'bar'},
    //     {type: 'bar'}
    // ],
    series: [
      {
        name: "",
        type: "bar",
        data: [90,50,0,100,34,60,90],
        barWidth: 10,
        label: {
          normal: {
            show: true,
            position: "top",
          }
        }
      },
      {
        name: "",
        type: "bar",
        data: [40,70,0,50,50,29,100],
        barWidth: 10,
        label: {
          normal: {
            show: true,
            position: "top",
          }
        }
      },
      {
        name: "",
        type: "bar",
        data: [80,90,99,100,29,89,20],
        barWidth: 10,
        label: {
          normal: {
            show: true,
            position: "top",
          }
        }
      }
    ]
  

};
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}

  // let rightCharts = Echarts.init(document.getElementById("rightCharts")); //右侧bar图表
  // let endValue = 50;
  // switch (vm.schoolYearArr.length) {
  //   case 10:
  //   case 9:
  //     endValue = 10;
  //     break;
  //   case 8:
  //     endValue = 15;
  //     break;
  //   case 7:
  //   case 6:
  //     endValue = 20;
  //     break;
  //   case 5:
  //     endValue = 25;
  //     break;
  //   case 4:
  //     endValue = 30;
  //     break;
  //   case 3:
  //     endValue = 45;
  //     break;
  //   case 2:
  //   case 1:
  //     endValue = 50;
  //     break;
  // }
  // let legendData = [];
  // formData.seriesArr.forEach((v, i) => {
  //   legendData.push(v.name);
  // });
  // let option2 = {
  //   title: {
  //     text: ""
  //   },
  //   tooltip: {
  //     trigger: "axis",
  //     formatter: "{a}:{c}%",
  //     axisPointer: {
  //       // 坐标轴指示器，坐标轴触发有效
  //       type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
  //     }
  //   },
  //   grid: {
  //     y2: 260,
  //     borderWidth: 1
  //   },
  //   legend: {
  //     data: legendData
  //   },
  //   xAxis: {
  //     data: formData.xName,
  //     offset: 50,
  //     nameGap: 100,
  //     triggerEvent: true,
  //     axisLabel: {
  //       interval: 0
  //     }
  //   },
  //   yAxis: {
  //     min: 0,
  //     max: 100,
  //     name: vm.chartsName,
  //     axisLabel: {
  //       show: true,
  //       interval: "auto",
  //       formatter: "{value} %"
  //     }
  //   },
  //   series: formData.seriesArr
  // };
  // if (formData.xName.length > 8) {
  //   option2.dataZoom = [
  //     {
  //       show: true,
  //       height: 10,
  //       type: "slider",
  //       top: "72%",
  //       xAxisIndex: [0],
  //       start: 0,
  //       end: endValue,
  //       zoomLock: true,
  //       backgroundColor: "#EEEEEE",
  //       fillerColor: "#84BEF9",
  //       borderColor: "#fff",
  //       showDetail: false,
  //       showDataShadow: false
  //     }
  //   ];
  // }
  // let numberSeries = formData.seriesArr.length,
  //   formatterstr = "";
  // if (numberSeries > 1) {
  //   for (let i = 0; i < numberSeries; i++) {
  //     formatterstr += "{a" + i + "}:{c" + i + "}%<br />";
  //   }
  //   option2.tooltip.formatter = formatterstr;
  // }
  // for (let i = 0; i < numberSeries; i++) {
  //   let line = {
  //     name: formData.seriesArr[i].name,
  //     stack: formData.seriesArr[i].name,
  //     type: "bar",
  //     label: {
  //       normal: {
  //         show: true,
  //         position: "insideBottom",
  //         textBorderWidth: 2,
  //         textStyle: {
  //           color: "#0b0b0c"
  //         },
  //         formatter: "{c}%"
  //       }
  //     },
  //     itemStyle: {
  //       normal: {
  //         color: "rgba(128, 128, 128, 0)"
  //       }
  //     },
  //     data: formData.seriesArr[i].data
  //   };
  //   formData.seriesArr.push(line);
  // }
  // // 使用刚指定的配置项和数据显示图表。
  // //this.mapCharts.setOption(optionMap);

  // rightCharts.setOption(option2, true);
  // rightCharts.off("click"); // 防止重复绑定
  // rightCharts.on("click", function(params) {
  //   params.data.date = params.seriesName;
  //   changeRouter(params.data, vm);
  // });
}
</script>
<style scoped lang="scss">
  .historyPerformance{
    .message{
      width: 100%;
      padding:0px 10px 0px 10px;
      background:#ccc;
      .rowsty{
        line-height: 40px;
        font-size: 0px;
        .iconstyle {
          width: 16px;
          height: 16px;
          margin-right: 4px;
          vertical-align: middle;
        }
        .rowstylevalue {
          font-size: 14px;
          vertical-align: middle;
        }
      }
    }
  }
</style>


