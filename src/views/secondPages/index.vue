<template>
  <div class="all">
    <header>
         <div class="triangle">广东省智慧体育数据统计</div>
    </header>
    <section>
      <el-row>
          <el-col :span="7">
            <div class="grid-content row-left">
                <p class="textA-c">学生综合体质合格率</p>
                <div ref="echart1" @click="goCervixStats" style="width: 500px;height:300px;margin:-55px 0 -90px -90px;"></div>
                <p class="textA-c color-green">低于合格率<span class="num-c">94%</span>的{{city}} <span class="num-b">{{syntheticalDtl.numBelowQualifiedRate}}</span> 个</p>
            </div>
            <div class="grid-content row-left">
                <p class="textA-c">学生综合体质优良率</p>
                <div ref="echart2" @click="goCervixStats" style="width: 300px;height:200px;margin: -30px auto;"></div>
                <p class="textA-c color-green">低于优良率<span class="num-c">25%</span>的{{city}} <span class="num-b">{{syntheticalDtl.numBelowExcellentRate}}</span> 个</p>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content row-center" ref="chartContent">
              <el-row class="mapchartTitle">
                <el-col :span="24">
                  <div class="mapCharts-border">
                    <h3 class="title">累计接收运动数据</h3>
                    <span v-for="(item,index) in numberValue" :key="index" class="numberStyle">{{item}}</span>
                    <span class="unit">条</span>
                  </div>
                </el-col>
              </el-row>
              <div id="mapchart" ref="mapchart" style="width: 500px;margin-top: -50px;"></div>
              <span class="spanValue">学生综合体质合格率</span>
              <div class="mapchart-foot">
                <span class="span-left">实时数据</span>
                <el-row class="span-row">
                  <el-col :span="24"><span class="span-number">{{realTime.areaUseCount}}个</span>城市已使用智慧体育设备</el-col>
                  <el-col :span="24"><span class="span-number">{{realTime.schoolUseCount}}所</span>学校已使用智慧体育设备</el-col>
                  <el-col :span="24"><span class="span-number">{{realTime.studentCount}}个</span>学生正使用智慧体育设备</el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content row-right">
                <p><span>全省学生体重情况</span> <span class="fr item-r">正常体重范围学生</span></p>
                <div @click="goCervixStats">
                    <!--肥胖-->
                    <div class="item1">
                        <img src="../../assets/imgs/tz-fat.png" style="width:75px;" alt="">
                        <p class="color-orange">{{rightData.obesityrCount}}人</p>
                    </div>
                    <!--超重-->
                    <div class="item1">
                        <img src="../../assets/imgs/tz-overweight.png" style="width:75px;" alt="">
                        <p class="color-yellow">{{rightData.overweightCount}} 人</p>
                    </div>
                    <!--低体重-->
                    <div class="item1">
                        <img src="../../assets/imgs/tz-thin.png" style="width:75px;" alt="">
                        <p class="color-green">{{rightData.lowWeightCount}} 人</p>
                    </div>
                </div>
                <div class="progress" ref="progress1" :class="{hide: baifenbi1.w1 + baifenbi1.w2 + baifenbi1.w3 + baifenbi1.w4 <50}">
                    <div class="pr bgc6" v-show="baifenbi1.w1">{{baifenbi1.w1}}%</div>
                    <div class="pr bgc2" v-show="baifenbi1.w2">{{baifenbi1.w2}}%</div>
                    <div class="pr bgc3" v-show="baifenbi1.w3">{{baifenbi1.w3}}%</div>
                    <div class="pr bgc4" v-show="baifenbi1.w4">{{baifenbi1.w4}}%</div>
                </div>
            </div>
            <div class="grid-content row-right">
                <p><span>全省学生近视情况</span> <span class="fr item-r">非近视学生</span></p>
                <div @click="goCervixStats">
                  <!--重度近视-->
                    <div class="item1">
                        <img src="../../assets/imgs/myopic-serious.png" style="width:75px;" alt="">
                        <p class="color-red">{{rightData.severeMyopiaCount}} 人</p>
                    </div>
                  <!--中度近视-->
                    <div class="item1">
                        <img src="../../assets/imgs/myopic-mezzo.png" style="width:75px;" alt="">
                        <p class="color-orange">{{rightData.moderateMyopiaCount}} 人</p>
                    </div>
                  <!--轻度近视-->
                    <div class="item1">
                        <img src="../../assets/imgs/myopic-mild.png" style="width:75px;" alt="">
                        <p class="color-yellow">{{rightData.mildMyopiaCount}} 人</p>
                    </div>
                </div>
              <div class="progress" ref="progress2" :class="{hide: baifenbi2.w1 + baifenbi2.w2 + baifenbi2.w3 + baifenbi2.w4 < 50}">
                <div class="pr bgc1" v-show="baifenbi2.w1">{{baifenbi2.w1}}%</div>
                <div class="pr bgc6" v-show="baifenbi2.w2">{{baifenbi2.w2}}%</div>
                <div class="pr bgc2" v-show="baifenbi2.w3">{{baifenbi2.w3}}%</div>
                <div class="pr bgc4" v-show="baifenbi2.w4">{{baifenbi2.w4}}%</div>
              </div>
            </div>
            <div class="grid-content row-right">
                <p><span>全省学生脊柱侧弯情况</span> <span class="fr item-r">脊柱侧弯阴性学生</span></p>
                <div @click="goCervixStats">
                  <!--脊柱侧弯强阳性-->
                    <div class="item2">
                        <img src="../../assets/imgs/backbone-r.png" style="width:135px;margin-left: 10px;" alt="">
                        <span class="item-span color-orange">{{rightData.scoliosisStrongPositiveCount}} 人</span>
                    </div>
                  <!--脊柱侧弯阳性-->
                    <div class="item2">
                        <img src="../../assets/imgs/backbone-y.png" style="width:135px;margin-left: 10px;" alt="">
                        <span class="item-span color-yellow">{{rightData.scoliosisPositiveCount}} 人</span>
                    </div>
                </div>
              <div class="progress" ref="progress3" :class="{hide: baifenbi3.w1+baifenbi3.w2+baifenbi3.w3+baifenbi3.w4 < 50}">
              <!--<div class="progress" ref="progress3" :class="{ hide: 5< 98 }">-->
                <div class="pr bgc6" v-show="baifenbi3.w1">{{baifenbi3.w1}}%</div>
                <div class="pr bgc2" v-show="baifenbi3.w2">{{baifenbi3.w2}}%</div>
                <div class="pr bgc4" v-show="baifenbi3.w3">{{baifenbi3.w3}}%</div>
                <div class="pr bgc4" v-show="baifenbi3.w4">{{baifenbi3.w4}}</div>
              </div>
            </div>

         </el-col>
      </el-row>
    </section>
    <footer>
      <el-row>
        <el-col style="color: white;font-size: 14px;height: 40px;line-height: 40px;text-align: center;margin: 10px 0;">
          粤ICP备17031860号-1©2017-2018校体通版权所有
        </el-col>
      </el-row>
    </footer>
  </div>
</template>
<script>
import "echarts/map/js/china.js";
import echarts from "echarts";
import request from "@/utils/request";
import Jquery from "../../../static/jquery-2.1.1.min";

export default {
  data() {
    return {
      // one
      pageNum: 1,
      pageSize: 10,
      city: '城市',
      num: 100,
      myChart1: '',
      myChart2: '',
      myChart3: '',
      realTime: {
        schoolUseCount: '',
        areaUseCount: '',
        studentCount: ''
      }, // 实时数据
      chinaAreaDtlList: {}, // 学校
      syntheticalDtl: {}, // 优良率
      rightData: {}, // 右边数据
      baifenbi1: {
        w1: '',
        w2: '',
        w3: '',
        w4: ''
      },
      baifenbi2: {
        w1: '',
        w2: '',
        w3: '',
        w4: ''
      },
      baifenbi3: {
        w1: '',
        w2: '',
        w3: '',
        w4: ''
      },
      option1: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '体质合格率', type: 'pie', radius: ['45%', '55%'],
            data: [
              { value: 35, name: '全国不合格率', itemStyle: { color: '#c3c1bd' }},
              { value: 65, name: '全国合格率', itemStyle: { color: '#2dca2d' }}
            ]
          }
        ]
      },
      option2: {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: '{a} <br/>{b}: {c} %'
        },
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b}: {c} ({d}%)'
        // },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: { color: '#eee' }
          },
          data: ['全省', '全国']
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: { color: '#eee' }
          }
        },
        series: [
          {
            name: '优良率',
            data: [],
            barMaxWidth: 40, // 最大宽度
            type: 'bar',
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    'rgb(210,105,30)',
                    '#4ed621',
                    'rgb(178,58,238)',
                    'rgb(54,100,139)'
                  ];
                  return colorList[params.dataIndex]
                }
              },
              // 鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      numberValue: '',
      domWidth: 550
    };
  },
  methods: {
    showEcharts() {
      let e = this;
      let dom = e.$refs.echart1;
      e.myChart1 = echarts.init(dom);
      e.myChart1.setOption(e.option1, true);
      e.myChart1.off('click'); // 防止重复绑定
      e.myChart1.on('click', function(params) {
        e.goCervixStats()
      })
    },
    showEcharts2(option) {
      let e = this;
      let dom = e.$refs.echart2;
      e.myChart2 = echarts.init(dom);
      e.myChart2.setOption(e.option2, true);
      e.myChart2.off('click'); // 防止重复绑定
      e.myChart2.on('click', function(params) {
        e.goCervixStats();
      })
    },
    setWidth(el, baifenbi, w1, w2, w3, w4) {
      // let parentWidth = el.clientWidth; // 获取父元素的宽度
      let parentWidth = 300; // 获取父元素的宽度
      let ww1 = parseInt(parentWidth * w1 / (w1 + w2 + w3 + w4)) || null; // 参数对应的宽度
      let ww2 = parseInt(parentWidth * w2 / (w1 + w2 + w3 + w4)) || null;
      let ww3 = parseInt(parentWidth * w3 / (w1 + w2 + w3 + w4)) || null;
      let ww4 = parseInt(parentWidth * w4 / (w1 + w2 + w3 + w4)) || null;
      // 对于的百分比数值
      baifenbi.w1 = parseInt(100 * w1 / (w1 + w2 + w3 + w4));
      baifenbi.w2 = parseInt(100 * w2 / (w1 + w2 + w3 + w4));
      baifenbi.w3 = parseInt(100 * w3 / (w1 + w2 + w3 + w4));
      baifenbi.w4 = parseInt(100 * w4 / (w1 + w2 + w3 + w4));
      // console.log(baifenbi.w1, baifenbi.w2, baifenbi.w3, baifenbi.w4);

      el.children[0].style.width = ww1 + "px";
      el.children[1].style.width = ww2 + "px";
      el.children[2].style.width = ww3 + "px";
      el.children[3].style.width = ww4 + "px";
    },
    getClassQuaRate() {
      // 低于合格率94%的班级列表
      request
        .get('/api/auth/v1/home/stats/phy/classQuaRate', {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          // console.log(res);
        })
        .catch(err => {
          console.log(err)
        })
    },
    getClassExcellentRate() {
      // 优良率低于25%的班级
      request
        .get('/api/auth/v1/home/stats/phy/classExcellentRate', {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSchoolExcellentRate() {
      // 全区学校优良率
      request
        .get('/api/auth/v1/home/stats/phy/schoolExcellentRate', {
          params: {
            posDistrictId: '',
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          // console.log(res);
        })
        .catch(err => {
          console.log(err)
        })
    },
    getSchoolQuaRate() {
      // 全区学校合格率
      request
        .get('/api/auth/v1/home/stats/phy/schoolQuaRate', {
          params: {
            posDistrictId: '',
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          // console.log(res);
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMessageCount() {
      request.get('/api/auth/v1/statisticsDevice/messageCount').then((res) => {
        // console.log(res);
        this.messageCount = res.data.messageCount;
        // 转换成8位数
        if (this.messageCount >= 10000000) {
          this.numberValue = '' + this.messageCount; // 8位数
        } else if (this.messageCount < 10000000 && this.messageCount >= 1000000) {
          this.numberValue = '0' + this.messageCount; // 7位数
        } else if (this.messageCount < 1000000 && this.messageCount >= 100000) {
          this.numberValue = '00' + this.messageCount; // 6位
        } else if (this.messageCount < 100000 && this.messageCount >= 10000) {
          this.numberValue = '000' + this.messageCount; // 5位
        } else if (this.messageCount < 10000 && this.messageCount >= 1000) {
          this.numberValue = '00000' + this.messageCount; // 4位
        } else if (this.messageCount < 1000 && this.messageCount >= 100) {
          this.numberValue = '000000' + this.messageCount; // 3位
        } else if (this.messageCount < 100 && this.messageCount >= 10) {
          this.numberValue = '0000000' + this.messageCount; // 2位
        } else if (this.messageCount < 10 && this.messageCount >= 0) {
          this.numberValue = '00000000' + this.messageCount; // 1位
        }
      })
    },
    getShoolYearDtl() {
      // 首页 体质统计
      request
        .get('/api/auth/v1/home/stats/phy/shoolYearDtl')
        .then(res => {
          // console.log('res.data', res.data);
          // console.log('省', res.data.chinaAreaDtlList); // 省
          this.chinaAreaDtlList = res.data.chinaAreaDtlList;
          let levelStatus = res.data.jurisdiction; // 用这个参数来判断显示全国还是全省/全市/全区
          // console.log('levelStatus', levelStatus);

          // console.log('优良率', res.data.syntheticalDtl); // 优良率
          this.syntheticalDtl = res.data.syntheticalDtl;

          // this.syntheticalDtl.natExcellentRate // 全国优良率
          // this.syntheticalDtl.natQualifiedRate // 全国合格率
          // this.syntheticalDtl.proExcellentRate // 省优良率
          // this.syntheticalDtl.proQualifiedRate // 省合格率
          // this.syntheticalDtl.cityExcullentRate // 市优良率
          // this.syntheticalDtl.cityQualifiedRate // 市合格率
          // this.syntheticalDtl.distExcellentRate // 区优良率
          // this.syntheticalDtl.distQualifiedRate // 区合格率
          // this.syntheticalDtl.numBelowExcellentRate // 低于优良率25%的城市数
          // this.syntheticalDtl.numBelowQualifiedRate // 低于合格率94%的城市数
          let arrPieData = [
            this.syntheticalDtl.natQualifiedRate,
            this.syntheticalDtl.proQualifiedRate,
            this.syntheticalDtl.cityQualifiedRate,
            this.syntheticalDtl.distQualifiedRate
          ]; // 合格率//从区到国

          let arrBarData = [
            this.syntheticalDtl.distExcellentRate,
            this.syntheticalDtl.cityExcullentRate,
            this.syntheticalDtl.proExcellentRate,
            this.syntheticalDtl.natExcellentRate
          ]; // 优良率//从区到国
          // console.log('优良率', arrPieData);
          let arrCity = ['全区', '全市', '全省', '全国'];
          let youData, xData, seriesData;
          if (levelStatus === 1) {
            // 全国
            youData = arrBarData.splice(3, 4);
            xData = arrCity.slice(3, 4);
            seriesData = [
              {
                name: '体质合格率', type: 'pie', radius: ['45%', '55%'],
                data: [
                  { value: 100 - arrPieData[3], name: '全国不合格率', itemStyle: { color: '#c3c1bd' }},
                  { value: arrPieData[3], name: '全国合格率', itemStyle: { color: '#2dca2d' }}
                ]
              }
            ]
          } else if (levelStatus === 2) {
            // 全省
            youData = arrBarData.splice(2, 4);
            xData = arrCity.slice(2, 4);
            seriesData = [
              {
                name: '体质合格率', type: 'pie', radius: ['30%', '40%'],
                data: [
                  { value: 100 - arrPieData[2], name: '全省不合格率', itemStyle: { color: '#c3c1bd' }},
                  { value: arrPieData[2], name: '全省合格率', itemStyle: { color: '#2dca2d' }}
                ]
              },
              {
                name: '体质合格率', type: 'pie', radius: ['45%', '55%'],
                data: [
                  { value: 100 - arrPieData[3], name: '全国不合格率', itemStyle: { color: '#c3c1bd' }},
                  { value: arrPieData[3], name: '全国合格率', itemStyle: { color: '#2dca2d' }}
                ]
              }
            ]
          } else if (levelStatus === 3) {
            // 全市
            youData = arrBarData.splice(1, 3);
            xData = arrCity.slice(1, 3);
            seriesData = [
              {
                name: '体质合格率', type: 'pie', radius: ['30%', '40%'],
                data: [
                  { value: 100 - arrPieData[1], name: '全市不合格率', itemStyle: { color: '#c3c1bd' }},
                  { value: arrPieData[1], name: '全市合格率', itemStyle: { color: '#2dca2d' }}
                ]
              },
              {
                name: '体质合格率', type: 'pie', radius: ['45%', '55%'],
                data: [
                  { value: 100 - arrPieData[2], name: '全省不合格率', itemStyle: { color: '#c3c1bd' }},
                  { value: arrPieData[2], name: '全省合格率', itemStyle: { color: '#2dca2d' }}
                ]
              }
            ]
          } else if (levelStatus === 4) {
            // 全区
            youData = arrBarData.splice(0, 2);
            xData = arrCity.slice(0, 2);
            seriesData = [
              {
                name: '体质合格率', type: 'pie', radius: ['30%', '40%'],
                data: [
                  { value: 100 - arrPieData[0], name: '全区不合格率', itemStyle: { color: '#c3c1bd' }},
                  { value: arrPieData[0], name: '全区合格率', itemStyle: { color: '#FFD700' }}
                ]
              },
              {
                name: '体质合格率', type: 'pie', radius: ['45%', '55%'],
                data: [
                  { value: 100 - arrPieData[1], name: '全市不合格率', itemStyle: { color: '#c3c1bd' }},
                  { value: arrPieData[1], name: '全市合格率', itemStyle: { color: '#2dca2d' }}
                ]
              }
            ]
          } else {
            console.log('出错了，后台返回的数据有问题');
          }
          this.myChart1.setOption({
            series: seriesData
          });
          this.myChart2.setOption({
            xAxis: {
              data: xData
            },
            series: {
              data: youData
            }
          });
          // console.log('右边数据', res.data.testItemDtl); // 右边三个数据
          this.rightData = res.data.testItemDtl; // 右边数据
          this.setWidth(
            this.$refs.progress1,
            this.baifenbi1,
            this.rightData.obesityrCount,
            this.rightData.overweightCount,
            this.rightData.lowWeightCount,
            this.rightData.normalWeightCount
          );
          this.setWidth(
            this.$refs.progress2,
            this.baifenbi2,
            this.rightData.severeMyopiaCount,
            this.rightData.moderateMyopiaCount,
            this.rightData.mildMyopiaCount,
            this.rightData.normalVisionCount
          );
          this.setWidth(
            this.$refs.progress3,
            this.baifenbi3,
            this.rightData.scoliosisStrongPositiveCount,
            this.rightData.scoliosisPositiveCount,
            this.rightData.scoliosisNormalCount,
            0
          );
          // 创建地图

          this.mapchart(res.data, levelStatus);
        })
        .catch(err => {
          console.log(err);
        });
      this.showEcharts();
      this.showEcharts2();
    },
    getUsage() {
      request.get('/api/auth/v1/statisticsDevice/usage').then((res) => {
        // console.log(res.data);
        this.realTime.schoolUseCount = res.data.schoolUseCount; // 使用设备的学校个数
        this.realTime.areaUseCount = res.data.areaUseCount; // 使用设备的区域个数
        this.realTime.studentCount = res.data.studentCount; // 使用设备的学生个数
      })
    },
    getStuUnquaRate() {
      // 学生综合体质不合格的人数
      request
        .get('/api/auth/v1/home/stats/phy/stuUnquaRate', {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          // console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    goCervixStats() {
      this.$route({
        path: 'cervixStats/all?index=1',
        query: {
        //
        }
      })
    },
    mapchart: mapchart
  },
  mounted() {
    this.getShoolYearDtl();
    // this.mapchart();
    this.getMessageCount();
    setInterval(this.getUsage(), 3000000)
    // this.getUsage();
  }
};
function mapchart(data, type) {
  this.domWidth = this.$refs.chartContent.offsetWidth;
  let dom = this.$refs.mapchart;
  let mapCharts = echarts.init(dom);
  let name = "",
    api = "",
    mapData = [];
  switch (type) {
    case 1:
      name = "china";
      mapData = parseChinaData(data.chinaAreaDtlList);
      break;
    case 2:
      name = "maps";
      api = `../../../static/maps/province/${
        data.jurisdictionProvinceName
      }.json`;
      mapData = parseProvinceData(data.chinaAreaDtlList);
      break;
    case 3:
      name = "maps";
      api = `../../../static/maps/city/${data.jurisdictionCityName}.json`;
      mapData = parseProvinceData(data.chinaAreaDtlList);
      break;
    case 4:
      name = "maps";
      api = `../../../static/maps/county/${data.jurisdictionProvinceName}/${
        data.jurisdictionCityName
      }/${data.jurisdictionDistrictName}.json`;
      mapData = parseDistrictData(data.chinaAreaDtlList);
      break;
  }
  // console.log("首页地图data", data);
  let option = creatOption(mapData, name);
  if (name == "china") {
    mapCharts.setOption(option, true);
  } else {
    Jquery.ajax({
      url: api,
      success(res) {
        echarts.registerMap("maps", res);
        mapCharts.setOption(option, true);
      }
    });
  }
  mapCharts.off('click'); // 防止重复绑定
  mapCharts.on('click', function(params) {
    goCervixStats();
  })
}
function parseChinaData(data) {
  let statsArr = [];
  data.forEach(item => {
    if (
      item.name.indexOf("市") != -1 ||
      item.name.indexOf("省") != -1
    ) {
      item.pName = item.name.slice(
        0,
        item.name.length - 1
      );
    } else if (item.name.indexOf("自治区") != -1) {
      if (item.name.indexOf("内蒙古") != -1) {
        item.pName = "内蒙古";
      } else {
        item.pName = item.name.slice(0, 2);
      }
    }
  });
  data.forEach(item => {
    item.name = item.pName;
    item.value = item.qualifiedRate;
    statsArr.push(item);
  })
  // console.log(JSON.stringify(statsArr));
  return statsArr;
}
function parseProvinceData(data) {
  let statsArr = [];
  data.forEach(item => {
    item.value = item.qualifiedRate;
    statsArr.push(item);
  })
  // console.log(JSON.stringify(statsArr));
  return statsArr;
}
function parseDistrictData(data) {
  let statsArr = [];
  data.forEach(item => {
    const statsItem = Object.assign({}, item, {
      name: item.schoolName,
      value: [item.longitudeValue, item.latitudeValue, item.qualifiedRate || 0]
    });
    statsArr.push(statsItem);
  });
  return statsArr;
}
function creatOption(data, name) {
  var setOption = {
    tooltip: {
      trigger: "item",
      formatter:
        "{b}<br/>学生综合体质合格率<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{c}%"
    },
    visualMap: {
      orient: "horizontal",
      min: 0,
      max: 100,
      align: "left",
      text: ["高", "低"],
      realtime: false,
      calculable: false,
      inRange: {
        color: ["#c0eeff", "#7789e7", "#4d59e7"]
      },
      textStyle: {
        color: "#ffcd45",
        fontSize: 12
      },
      top: 415,
      right: 40
    },
    geo: {
      map: name,
      roam: false,
      label: {
        normal: {
          show: true,
          textStyle: {
            color: "#FFFFFF"
          }
        }
      },
      itemStyle: {
        normal: {
          borderColor: "rgba(0, 0, 0, 0.2)",
          color: "#c0eeff"
        },
        emphasis: {
          areaColor: null,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    },
    series: [
      {
        name: "",
        type: "map",
        roam: true,
        layoutCenter: ["30%", "30%"],
        coordinateSystem: "geo",
        geoIndex: 0,
        data: data
      }
    ]
  };
  return setOption;
}
</script>

<style scoped lang="scss">
.triangle {
  width: 666px;
  height: 70px;
  margin: 0 auto;
  text-align: center;
  font-size: 30px;
  line-height: 60px;
  color: #ffda45;
  background-size: 666px 70px;
  background-image: url(../../assets/imgs/index-top.png);
}
.all {
  height: 100%;
  width: 100%;
  background-size: 50px 50px;
  background-repeat: repeat;
  background-image: url(../../assets/imgs/bgc-gezi-b.png);
}
.grid-content {
  margin: 15px;
  background-size: 50px 50px;
  background-repeat: repeat;
  background-image: url(../../assets/imgs/bgc-gezi-g.png);
  background-position: -4px -7px;
  border-radius: 20px;
  border: 2px solid #00c2ff;
  padding: 15px;
  color: rgb(235, 229, 229);
}
.row-center {
  height: 630px;
  position: relative;
}
.row-center .spanValue {
  position: absolute;
  bottom: 65px;
  left: 320px;
  font-size: 12px;
}
#mapchart {
  width: 500px;
  height: 470px;
  margin: 0 auto;
  top: -25px;
  left: -20px;
}
.mapchartTitle {
  /*padding-top: 10px;*/
  text-align: center;
}
.mapchartTitle .mapCharts-border {
  border: 2px solid #cfcf08;
  border-radius: 5px;
  height: 100px;
  width: 440px;
  margin: auto;
}
.mapCharts-border .title {
  margin: 10px 0px;
}
.mapCharts-border .numberStyle {
  border: 1px solid #45c0ff;
  border-radius: 5px;
  display: inline-block;
  margin-left: 5px;
  background-color: black;
  font-size: 35px;
  font-family: "PingFangSC-Semibold";
  padding: 2px 6px;
  color: #ffda45;
  font-weight: bold;
}
.mapCharts-border .unit {
  color: #ffda45;
  font-size: 18px;
  font-weight: bold;
  vertical-align: bottom;
}
.mapchart-foot {
  position: absolute;
  font-size: 0px;
  bottom: 10px;
  left: 15px;
}
.mapchart-foot .span-left {
  display: inline-block;
  width: 25px;
  padding: 4px 0px;
  text-align: center;
  background-color: #ffcd45;
  color: #22356f;
  border-radius: 5px 0px 0px 5px;
  font-size: 15px;
  vertical-align: middle;
  font-weight: bold;
}
.mapchart-foot .span-row {
  width: calc(300px - 45px);
  font-size: 15px;
  display: inline-block;
  height: 75px;
  vertical-align: middle;
  padding: 5px;
  font-weight: bold;
  border: 2px solid #ffcd45;
  border-radius: 0px 5px 5px 0px;
  text-align: right;
}
.mapchart-foot .span-row .el-col {
  margin-bottom: 5px;
  font-weight: 500;
}
.mapchart-foot .span-row .el-col .span-number {
  color: #ffcd45;
}
.row-left {
  height: 307px;
}
.row-left .textA-c {
  text-align: center;
}
.row-left .textA-c.color-green {
  color: #21a4d6;
}
.row-left .textA-c .num-b {
  font-size: 50px;
  color: yellow;
}
.row-left .textA-c .num-c {
  font-size: 16px;
  color: #26dc26;
}
.row-right {
  height: 200px;
}
.row-right p {
  line-height: 10px;
}
.row-right .item1 {
  width: 30%;
  display: inline-block;
  margin: 0 1%;
  text-align: center;
}
.row-right .item2 {
  width: 45%;
  display: inline-block;
  margin: 10px 6px;
  position: relative;
}
.row-right .item1 p {
  text-align: center;
  margin: 5px;
}
.row-right .item2 .item-span {
  position: absolute;
  top: 40px;
  left: 60px;
}
.fr {
  float: right;
}
.fl {
  float: left;
}
.item-r {
  font-size: 12px;
}
.item-r:before {
  content: "";
  display: inline-block;
  width: 11px;
  height: 11px;
  margin-right: 4px;
  background-color: #4ed621;
}
.color-red {
  color: red;
}
.color-orange {
  color: #fd7c0a;
}
.color-green {
  color: #17f7f9;
}
.color-yellow {
  color: yellow;
}
.progress {
  margin: 5px auto;
  /*width: 90%;*/
  /*max-width: 350px;*/
  width: 300px;
  height: 16px;
}
.hide{
  display: none;
}
.pr {
  display: inline-block;
  height: 100%;
  color: #f9fdff;
  font-size: 12px;
  line-height: 14px;
  margin-left: -4px;
  /*border: 1px solid #666666;*/
}
.bgc1 {
  background-color: red;
}
.bgc2 {
  background-color: #eed126;
}
.bgc3 {
  background-color: #26f5ff;
}
.bgc4 {
  background-color: #5bff2f;
}
.bgc5 {
  background-color: #ffae25;
}
.bgc6 {
  background-color: #ff6a16;
}
</style>

