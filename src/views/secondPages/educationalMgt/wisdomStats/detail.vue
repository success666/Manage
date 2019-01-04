<template>
    <div class="detail_list">
        <h2>{{  title  }}</h2>
        <div id="main2"></div>
    </div>
</template>
<script>
export default {
  props: {
    searchData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      title: "",
      formData: this.searchData
    };
  },
  methods: {
    getFormData() {
      var echarts = require("echarts");
      var myChart = echarts.init(document.getElementById("main2"));
      var name = "";
      if (this.formData.target == 0) {
        name = "运动时长(min)";
      } else {
        name = "运动消耗(大卡)";
      }
      var option = {
        color: ["#2E89E6"],
        title: {
          text: ""
        },
        tooltip: {},
        legend: {
          data: ["运动"]
        },
        xAxis: {
          boundaryGap: false,
          data: []
        },
        yAxis: {
          name: name
        },
        series: {
          name: "",
          type: "line",
          data: [],
          barWidth: 20,
          areaStyle: {},
          label: {
            normal: {
              show: true,
              position: "top"
            }
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }],
            lineStyle: {
              type: "solid",
              color: "#E4B422"
            }
          }
        }
      };

      this.$ajax
        .get("/api/auth/v1/course/statistics/studentDetailed", {
          params: {
            schoolClassId: this.formData.schoolClassId,
            startTime: this.formData.startTime,
            endTime: this.formData.endTime,
            studentId: this.formData.studentId
          }
        })
        .then(res => {
          var data = res.data;
          if (data.length > 8) {
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
          for (let i = 0; i < data.length; i++) {
            option.xAxis.data.push(data[i].date);

            if (this.formData.target == 0) {
              option.series.data.push(data[i].sportTime);
            } else {
              option.series.data.push(data[i].calorieExpendValue);
            }
          }
          myChart.setOption(option);
        });
    }
  },
  watch: {
    searchData(data) {
      this.formData = data;
      this.title = data.titleName;
      this.getFormData();
    }
  },
  mounted(){
      console.log(this.formData);
      this.title=this.formData.titleName;
      this.getFormData()
  }
};
</script>
<style scoped>
#main2 {
  height: 570px;
  width: 950px;
  margin: 0 auto;
}
.detail_data {
  height: 500px;
  overflow: auto;
  background-color: #fff;
}
.detail_list {
  position: relative;
  height: 900px;
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

