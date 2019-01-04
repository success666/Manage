<template>
  <div class="cervixStats">
    <breadCrumb :router-data="routerData" class="routerData" v-on:router-click="routerClick"></breadCrumb>
    <div
      class="StatsChart"
      v-show="showEachart=='showForm'"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading">
      <div class="searchTitle" v-show="routerData.length<9">
        <searchCondition ref="searchAll"></searchCondition>
        <div class="rowStyle">
          <span style="display: inline-block;width: 54px;font-size: 14px;">指标：</span>
          <template v-if="!showMoreIndicators">
            <span class="heath" style="margin-left: -44px;">{{searchData.testItemLevel.name}}：</span>
            <el-select
              name="heath"
              v-model="searchData.testItemLevel.value"
              size="mini"
              placeholder="请选择"
            >
              <el-option
                v-for="item in searchData.testItemLevel.data"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span class="heathMore" @click="changeInindicators(true)">
              更多
              <i class="el-icon-arrow-down"></i>
            </span>
          </template>
          <template v-else>
            <span class="heath" style="margin-left: -79px;">{{searchData.bodyMassIndexLevel.name}}</span>
            <el-select
              name="heath"
              v-model="searchData.bodyMassIndexLevel.value"
              size="mini"
              placeholder="请选择"
            >
              <el-option
                v-for="item in searchData.bodyMassIndexLevel.data"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span class="heath indicatorsMoreLabel">{{searchData.eyeEyesightLevel.name}}</span>
            <el-select
              name="heath"
              v-model="searchData.eyeEyesightLevel.value"
              size="mini"
              placeholder="请选择"
            >
              <el-option
                v-for="item in searchData.eyeEyesightLevel.data"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span class="heath indicatorsMoreLabel">{{searchData.torsoTiltAngleLevel.name}}</span>
            <el-select
              name="heath"
              v-model="searchData.torsoTiltAngleLevel.value"
              size="mini"
              placeholder="请选择"
            >
              <el-option
                v-for="item in searchData.torsoTiltAngleLevel.data"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span class="heathMore" @click="changeInindicators(false)">
              隐藏
              <i class="el-icon-arrow-up"></i>
            </span>
          </template>
        </div>
        <template v-if="showMoreIndicators">
          <!-- 二级分类 -->
          <div class="indicatorsDiv">
            <span class="heath" style="margin-left: -79px;">{{searchData.fiftyMeterRunLevel.name}}</span>
            <el-select
              name="heath"
              v-model="searchData.fiftyMeterRunLevel.value"
              size="mini"
              placeholder="请选择"
            >
              <el-option
                v-for="item in searchData.fiftyMeterRunLevel.data"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span class="heath indicatorsMoreLabel">{{searchData.fiftyByEightShuttleRunLevel.name}}</span>
            <el-select
              name="heath"
              v-model="searchData.fiftyByEightShuttleRunLevel.value"
              size="mini"
              placeholder="请选择"
            >
              <el-option
                v-for="item in searchData.fiftyByEightShuttleRunLevel.data"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span class="heath indicatorsMoreLabel">{{searchData.eightHundredMeterRunLevel.name}}</span>
            <el-select
              name="heath"
              v-model="searchData.eightHundredMeterRunLevel.value"
              size="mini"
              placeholder="请选择"
            >
              <el-option
                v-for="item in searchData.eightHundredMeterRunLevel.data"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>

            <span class="heath indicatorsMoreLabel">{{searchData.oneThousandMeterRunLevel.name}}</span>
            <el-select
              name="heath"
              v-model="searchData.oneThousandMeterRunLevel.value"
              size="mini"
              placeholder="请选择"
            >
              <el-option
                v-for="item in searchData.oneThousandMeterRunLevel.data"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <!-- 二级分类 -->
          <!-- 三级分类 -->
          <div class="indicatorsDiv">
            <span
              class="heath"
              style="margin-left: -79px;"
            >{{searchData.oneMinuteRopeSkippingLevel.name}}</span>
            <el-select
              name="heath"
              v-model="searchData.oneMinuteRopeSkippingLevel.value"
              size="mini"
              placeholder="请选择"
            >
              <el-option
                v-for="item in searchData.oneMinuteRopeSkippingLevel.data"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span class="heath indicatorsMoreLabel">{{searchData.oneMinuteAbdominalCurlLevel.name}}</span>
            <el-select
              name="heath"
              v-model="searchData.oneMinuteAbdominalCurlLevel.value"
              size="mini"
              placeholder="请选择"
            >
              <el-option
                v-for="item in searchData.oneMinuteAbdominalCurlLevel.data"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span class="heath indicatorsMoreLabel">{{searchData.upwardsLevel.name}}</span>
            <el-select
              name="heath"
              v-model="searchData.upwardsLevel.value"
              size="mini"
              placeholder="请选择"
            >
              <el-option
                v-for="item in searchData.upwardsLevel.data"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span class="heath indicatorsMoreLabel">{{searchData.standingLongJumpLevel.name}}</span>
            <el-select
              name="heath"
              v-model="searchData.standingLongJumpLevel.value"
              size="mini"
              placeholder="请选择"
            >
              <el-option
                v-for="item in searchData.standingLongJumpLevel.data"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <!-- 三级分类 -->
          <!-- 四级分类 -->
          <div class="indicatorsDiv">
            <span class="heath" style="margin-left: -79px;">{{searchData.lungCapacityLevel.name}}</span>
            <el-select
              name="heath"
              v-model="searchData.lungCapacityLevel.value"
              size="mini"
              placeholder="请选择"
            >
              <el-option
                v-for="item in searchData.lungCapacityLevel.data"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>

            <span class="heath indicatorsMoreLabel">{{searchData.sittingAndFlexionLevel.name}}</span>
            <el-select
              name="heath"
              v-model="searchData.sittingAndFlexionLevel.value"
              size="mini"
              placeholder="请选择"
            >
              <el-option
                v-for="item in searchData.sittingAndFlexionLevel.data"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <!-- 四级分类 -->
        </template>
        <el-row>
          <el-col :span="20">
            <span class="heath1">学年度：</span>
            <el-popover placement="bottom" width="400" trigger="click">
              <el-checkbox-group v-model="searchData.schoolYearArr.value" class="checkbox_year">
                <el-checkbox
                  v-for="schoolYear in NschoolYearList"
                  :label="schoolYear.value"
                  :key="schoolYear.id"
                >{{schoolYear.value}}</el-checkbox>
              </el-checkbox-group>
              <el-button slot="reference" size="mini" class="choose_year">
                选择学年
                <i class="el-icon-date"></i>
              </el-button>
            </el-popover>
            <div class="tag_year">
              <el-tag
                class="tag_year"
                :key="tag"
                v-for="tag in searchData.schoolYearArr.value"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >{{tag}}</el-tag>
            </div>
          </el-col>
          <el-col :span="4" style="    text-align: right;">
            <el-button type="primary" size="mini" @click="selectData">查询</el-button>
            <el-button type="primary" size="mini" @click="clearData">重置</el-button>
          </el-col>
        </el-row>
      </div>

      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div class="charts">
        <div class="charts_title">
          {{title}}
          <el-popover class="titlemessage" placement="right" width="300" trigger="click">
            <div class="titlemessage">
              <div>{{shuoming}}</div>
              <div>统计标准参考《国家学生体质健康标准（2014年修订）》</div>
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
        <template>
          <div class="map_left_data" v-show="isStats==0">
            <div class="part">
              <div class="part_div">
                <p id="map_left_data_title">
                  <span class="fatImg iconImg"></span>肥胖
                </p>
                <p id="map_left_data_title2">
                  <span>肥胖率</span>
                  <span>总人数</span>
                </p>
                <p id="map_left_data_detail">
                  <span class="blue">{{leftMapData.obesityrRate||0}}%</span>
                  <span>{{leftMapData.obesityrCount||0}}人</span>
                </p>
              </div>
              <div class="part_div">
                <p id="map_left_data_title">
                  <span class="overweightImg iconImg"></span>超重
                </p>
                <p id="map_left_data_title2">
                  <span>超重率</span>
                  <span>总人数</span>
                </p>
                <p id="map_left_data_detail">
                  <span class="blue">{{leftMapData.overweightRate||0}}%</span>
                  <span>{{leftMapData.overweightCount||0}}人</span>
                </p>
              </div>
              <div class="part_div">
                <p id="map_left_data_title">
                  <span class="lowweightImg iconImg"></span>低体重
                </p>
                <p id="map_left_data_title2">
                  <span>低体重率</span>
                  <span>总人数</span>
                </p>
                <p id="map_left_data_detail">
                  <span class="blue">{{leftMapData.lowWeightRate||0}}%</span>
                  <span>{{leftMapData.lowWeightCount||0}}人</span>
                </p>
              </div>
            </div>
            <div class="part">
              <div class="part_div">
                <p id="map_left_data_title">
                  <span class="poorvisionImg iconImg"></span>视力不良
                </p>
                <p id="map_left_data_title2">
                  <span>视力不良率</span>
                  <span>总人数</span>
                </p>
                <p id="map_left_data_detail">
                  <span class="blue">{{leftMapData.poorEyesightRate||0}}%</span>
                  <span>{{leftMapData.poorEyesightCount||0}}人</span>
                </p>
              </div>
            </div>
            <div class="part">
              <div class="part_div">
                <p id="map_left_data_title">
                  <span class="scoliosisImg iconImg"></span>脊柱侧弯阳性
                </p>
                <p id="map_left_data_title2">
                  <span>阳性率</span>
                  <span>总人数</span>
                </p>
                <p id="map_left_data_detail">
                  <span class="blue">{{leftMapData.scoliosisPositiveRate||0}}%</span>
                  <span>{{leftMapData.scoliosisPositiveCount||0}}人</span>
                </p>
              </div>
              <div class="part_div">
                <p id="map_left_data_title">
                  <span class="scoliosisImg iconImg"></span>脊柱侧弯强阳性
                </p>
                <p id="map_left_data_title2">
                  <span>强阳性率</span>
                  <span>总人数</span>
                </p>
                <p id="map_left_data_detail">
                  <span class="blue">{{leftMapData.scoliosisStrongPositiveRate||0}}%</span>
                  <span>{{leftMapData.scoliosisStrongPositiveCount||0}}人</span>
                </p>
              </div>
            </div>
          </div>
          <div class="map_right_data" v-show="isStats==0&&showMap">
            <div class="radio">
              <el-radio-group v-model="schoolYearArrNowSelect" @change="schoolYearChange">
                <el-radio :label="item" v-for="item in schoolYearArr" :key="item">{{item}}学年</el-radio>
              </el-radio-group>
            </div>
            <p class="map_right_data_title">
              <span class="iconImg passImg"></span>
              {{chartsName}}：{{percentOfPassValue | formatPassValue}}%
            </p>
            <div id="map"></div>
          </div>
        </template>
        <div class="data_detail" v-show="isStats==2">
          <template v-if="routerData.length==9">
            <div class="radio">
              <el-radio-group v-model="schoolYearArrNowSelect1" @change="schoolYearChangeForTable">
                <el-radio :label="item" v-for="item in schoolYearArr" :key="item">{{item}}学年</el-radio>
              </el-radio-group>
            </div>
            <div class="detail_list" ref="detail_list">
              <div class="detail_data">
                <el-table :data="tableData" style="width: 100%" class="table_form">
                  <el-table-column align="center" prop="studentNo" label="学号" min-width="180"></el-table-column>
                  <el-table-column align="center" prop="name" label="姓名" min-width="100"></el-table-column>
                  <el-table-column
                    align="center"
                    prop="sex"
                    label="性别"
                    min-width="100"
                    :formatter="formatterSex"
                  ></el-table-column>

                  <template v-for="(item,index) in columnArr">
                    <el-table-column
                      v-if="item.fieldName!='eyeEyesightLevel'&& item.fieldName!='torsoTiltAngleLevel'"
                      :prop="item.fieldName"
                      :label="item.label+'成绩'"
                      :sortable="true"
                      align="center"
                      :key="index"
                      min-width="100px"
                    ></el-table-column>
                    <el-table-column
                      v-else
                      :prop="item.fieldName"
                      :label="item.label+'成绩'"
                      :sortable="true"
                      align="center"
                      :key="index"
                      :formatter="formatterValue9"
                      min-width="100px"
                    ></el-table-column>
                  </template>
                  <el-table-column label="操作" align="center" test="date">
                    <template slot-scope="scope">
                      <el-button min-width="180" size="mini" @click="handleEdit(scope.row)">查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="bottomC">
                <div class="print">
                  <el-button type="primary" size="small" @click="exportFun">导出</el-button>
                  <el-button type="primary" size="small" @click="print('detail_list')">打印</el-button>
                </div>
              </div>

      <historyPerformance></historyPerformance>
            </div>
          </template>
          <template v-else>
            <div class="data_detail_body"   ref="data_detail_body">
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
                :data="detailVlue&&detailVlue"
                @row-click="rowClick"
                max-height="380"
                style="width: 100%"
                class="table_form"
              >
                <el-table-column align="center" label="区域" prop="name" width="180"></el-table-column>
                <template v-if="detailVlue" v-for="(value, key) in yearValueArr">
                  <el-table-column
                    :key="key"
                    align="center"
                    :label="key"
                    :prop="key"
                    min-width="130px"
                    :formatter="formatterValue"
                  ></el-table-column>
                </template>
              </el-table>
            </div>
            <div class="bottomC">
              <div class="print">
                <el-button type="primary" size="small" @click="exportFun">导出</el-button>
                <el-button type="primary" size="small" @click="print('data_detail_body')">打印</el-button>
              </div>
            </div>
          </template>
        </div>

        <div class="change_type map" v-show="showMap">
          <el-button :type="btnStyM" size="small" @click="dataShow(0)">统计地图</el-button>
        </div>
        <div class="change_type tj" v-show="routerData.length<9">
          <el-button :type="btnStyT" size="small" @click="dataShow(1)">统计图表</el-button>
        </div>
        <div class="change_type sj" v-show="routerData.length<9">
          <el-button :type="btnStyD" size="small" @click="dataShow(2)">数据详情</el-button>
        </div>
        <el-dialog title="请选择学年" :visible.sync="yearPopover" center>
          <div>
            <p
              @click="toClassDetail(value)"
              v-for="(value, key) in yearValueArr"
              :key="key"
              style="text-align:center"
            >{{value}}</p>
          </div>
        </el-dialog>
      </div>
    </div>
    <div v-if="showEachart=='showList'">
      <studentDetail :search-data="studentDetailData" @open-duidance="openDuidance"></studentDetail>
    </div>

    <div v-if="showEachart=='showGuidance'">
      <guidanceDeyail :id="guidanceDeyailId" @open-duidance="openDuidance"></guidanceDeyail>
    </div>
  </div>
</template>
<script>
import searchCondition from "@/components/conditions/searchCondition";
import studentDetail from "./studentDetail";
import guidanceDeyail from "./GuidanceDeyail";
import historyPerformance from './historyPerformance'
import {
  TESTITEMLEVEL1,
  BODYMASSINDEXLEVEL,
  FIFTYMETERRUNLEVEL,
  EYEEYES,
  TORSOTILT,
  GETYEARLIST
} from "@/utils/comData";
import request from "@/utils/request";
import Echarts from "echarts";
import breadCrumb from "@/components/Breadcrumb/indexBread";
import "echarts/map/js/china.js";
import axios from "axios";
import Jquery from "../../../../static/jquery-2.1.1.min";
import { getToken, isHavePermissions } from "@/utils/auth";
export default {
  components: {
    breadCrumb,
    searchCondition,
    studentDetail,
    guidanceDeyail,
    historyPerformance
  },
  data() {
    return {
      loading: true,
      showEachart: "showForm",
      studentDetailData: {},
      chartsName: "",
      guidanceDeyailId:0,
      routerData: [
        {
          name: "体质健康分析",
          isClick: false
        },
        {
          name: "体测数据统计",
          isClick: false
        },
        {
          name: "全国",
          value: "001",
          isClick: true
        }
      ],
      searchData: {
        identityNo: {
          value: ""
        },
        schoolYearArr: {
          value: []
        }, // 学年度集合
        testItemLevel: {
          value: 0,
          name: "综合体质",
          data: TESTITEMLEVEL1,
          fieldName: "healthTestScore"
        }, // 综合体质 默认为合格
        bodyMassIndexLevel: {
          value: "",
          name: "体重",
          data: BODYMASSINDEXLEVEL,
          fieldName: "bodyMassIndexScore"
        }, // 体重
        eyeEyesightLevel: {
          value: "",
          name: "视力",
          data: EYEEYES,
          fieldName: "eyeEyesightLevel"
        }, //
        torsoTiltAngleLevel: {
          value: "",
          name: "背脊侧弯",
          data: TORSOTILT,
          fieldName: "torsoTiltAngleLevel"
        }, // 背脊侧弯
        fiftyMeterRunLevel: {
          value: "",
          name: "50米跑",
          data: FIFTYMETERRUNLEVEL,
          fieldName: "fiftyMeterRunScore"
        }, // 50米跑
        fiftyByEightShuttleRunLevel: {
          value: "",
          name: "50x8往返跑",
          data: FIFTYMETERRUNLEVEL,
          fieldName: "fiftyByEightShuttleRunScore"
        }, // 50*8往返跑
        eightHundredMeterRunLevel: {
          value: "",
          name: "800米跑",
          data: FIFTYMETERRUNLEVEL,
          fieldName: "eightHundredMeterRunScore"
        }, // 800米跑
        oneThousandMeterRunLevel: {
          value: "",
          name: "1000米跑",
          data: FIFTYMETERRUNLEVEL,
          fieldName: "oneThousandMeterRunScore"
        }, // 1000米跑
        oneMinuteRopeSkippingLevel: {
          value: "",
          name: "1分钟跳绳",
          data: FIFTYMETERRUNLEVEL,
          fieldName: "oneMinuteRopeSkippingScore"
        }, // 1分钟跳绳
        oneMinuteAbdominalCurlLevel: {
          value: "",
          name: "1分钟仰卧起坐",
          data: FIFTYMETERRUNLEVEL,
          fieldName: "oneMinuteAbdominalCurlScore"
        }, // 1分钟仰卧起坐
        upwardsLevel: {
          value: "",
          name: "引体向上",
          data: FIFTYMETERRUNLEVEL,
          fieldName: "upwardsScore"
        }, // 引体向上
        standingLongJumpLevel: {
          value: "",
          name: "立定跳远",
          data: FIFTYMETERRUNLEVEL,
          fieldName: "standingLongJumpScore"
        }, // 立定跳远
        lungCapacityLevel: {
          value: "",
          name: "肺活量",
          data: FIFTYMETERRUNLEVEL,
          fieldName: "lungCapacityScore"
        }, // 肺活量
        sittingAndFlexionLevel: {
          value: "",
          name: "坐位体前屈",
          data: FIFTYMETERRUNLEVEL,
          fieldName: "sittingAndFlexionScore"
        }, // 坐位体前屈
        quietHeartRateLevel: {
          value: "",
          name: "安静心率",
          data: FIFTYMETERRUNLEVEL
        }, // 安静心率
        systolicPressureLevel: {
          value: "",
          name: "收缩压",
          data: FIFTYMETERRUNLEVEL
        }, // 收缩压
        diastolicBloodPressureLevel: {
          value: "",
          name: "舒张压",
          data: FIFTYMETERRUNLEVEL
        } // 舒张压
      },
      type: {}, // 查询类型
      typeArr: [
        {
          name: "全国",
          url: "api/auth/v1/physical/stats/nationwides",
          export: "api/auth/v1/physical/stats/nationwides/export",
          fieldName: "posProvinceName",
          fieldId: "posProvinceId"
        },
        {
          name: "省",
          url: "api/auth/v1/physical/stats/province",
          export: "api/auth/v1/physical/stats/province/export",
          fieldName: "posCityName",
          fieldId: "posCityId"
        },
        {
          name: "市",
          url: "api/auth/v1/physical/stats/city",
          export: "api/auth/v1/physical/stats/city/export",
          fieldName: "posDistrictName",
          fieldId: "posDistrictId"
        },
        {
          name: "区",
          url: "api/auth/v1/physical/stats/district",
          export: "api/auth/v1/physical/stats/district/export",
          fieldName: "schoolName",
          fieldId: "schoolId"
        },
        {
          name: "学校",
          url: "api/auth/v1/physical/stats/school",
          fieldName: "schoolGradeName",
          export: "api/auth/v1/physical/stats/school/export",
          fieldId: "gradeId"
        },
        {
          name: "年级",
          url: "/api/auth/v1/physical/stats/grade",
          fieldName: "schoolClassName",
          export: "api/auth/v1/physical/stats/grade/export",
          fieldId: "schoolClassId",
          id: ""
          // name:""
        },
        {
          name: "班级",
          url: "api/auth/v1/physical/stats/class",
          export: "api/auth/v1/physical/stats/class/export",
          fieldName: "name",
          fieldId: "id",
          id: ""
          // name:""
        }
      ],
      formData: [], // 查询的数据
      schoolYearArr: [],
      testItemLevelArr: TESTITEMLEVEL1,
      fiftyMeterRunLevelArr: FIFTYMETERRUNLEVEL,
      eyeEyesArr: EYEEYES,
      bodyMassIndexLevelArr: BODYMASSINDEXLEVEL,
      torsoTiltArr: TORSOTILT,
      showMoreIndicators: false,
      NschoolYearList: GETYEARLIST.getYear(),
      schoolYearArrNowSelect: "",
      schoolYearArrNowSelect1: "",
      isStats: 0,
      leftMapData: {}, // map左侧数据
      showMap: true,
      tableData: [],
      columnArr: [],
      btnStyM: "primary",
      btnStyT: "",
      btnStyD: "",
      title: "",
      shuoming: "合格率 = 成绩合格（成绩≥60分）的人数/体质测试总人数×100%",
      detailVlue: [
        {
          yearData: []
        }
      ],
      yearValueArr: {},
      yearPopover: false,
      row: "",
      percentOfPass: {}, // 合格率对象 包括对学年的
      percentOfPassValue: "", // 合格率
      screen: {} // 筛选内容 默认分级  全国-省-市-区-学校-年级-班级
    };
  },
  filters: {
    formatPassValue(value) {
      value = Number(value);
      if (!Number.isInteger(value)) {
        if (value.toString().length > 6) {
          value = value.toFixed(2);
        }
      }
      return value;
    }
  },
  methods: {
    handleClose(tag) {
      this.searchData.schoolYearArr.value.splice(
        this.searchData.schoolYearArr.value.indexOf(tag),
        1
      );
    },
    formatterValue(row, column, cellValue, index) {
      let value;
      if (!cellValue) {
        value = 0;
      } else {
        value = Number(cellValue);
      }
      if (!Number.isInteger(value) && value != 100) {
        if (value.toString().length > 6) {
          value = value.toFixed(2);
        }
      }
      return value + "%";
    },
    formatterValue9(row, column, cellValue, index) {
      let value = cellValue;
      if (column.property == "eyeEyesightLevel") {
        switch (cellValue) {
          case 10:
            value = "视力正常";
            break;
          case 11:
            value = "轻度近视";
            break;
          case 12:
            value = "中度近视";
            break;
          case 13:
            value = "重度近视";
            break;
        }
      } else {
        switch (cellValue) {
          case 14:
            value = "阴性";
            break;
          case 15:
            value = "阳性";
            break;
          case 16:
            value = "强阳性";
            break;
        }
      }
      return value;
    },
    changeInindicators(type) {
      if (type) {
        this.searchData.testItemLevel.value = "";
      } else {
        for (name in this.searchData) {
          if (
            name != "identityNo" &&
            name != "testItemLevel" &&
            name != "schoolYearArr"
          ) {
            this.searchData[name].value = "";
          }
        }
        this.searchData.testItemLevel.value = 0;
      }
      this.showMoreIndicators = type;
    },
    schoolYearChange(value) {
      this.percentOfPassValue = this.percentOfPass[value];
      switch (this.type.name) {
        case "全国":
          let data = parseAllData(this);
          handleMapData(this, data);
          break;
        case "省":
          showProvince(this);
          break;
        case "市":
          showCity(this);
          break;
        case "区":
          showDistrict(this);
          break;
      }
      this.handleLeftMapData();
    },
    schoolYearChangeForTable(value) {
      let vm = this,
        schoolYear,
        tableData;
      this.formData.forEach(item => {
        if (item.schoolYear == value) {
          schoolYear = item.schoolYear;
          tableData = item.phyStatsList;
        }
      });
      tableData.forEach(item => {
        item.schoolYear = schoolYear;
      });
      this.tableData = tableData;
    },
    print(name) {
      var that = this;
      var t;
      this.noprint = "noprint";
      this.printWidth = "print-width";
      clearTimeout(t);
      t = setTimeout(function() {
        that.$print(that.$refs[name]);
        that.noprint = "";
        that.printWidth = "";
      }, 500);
    },
    clearData() {
      this.$refs.searchAll.clearData();
      for (name in this.searchData) {
        if (name == "schoolYearArr") {
          this.searchData[name].value = [this.NschoolYearList[0].value];
        } else {
          this.searchData[name].value = "";
        }
      }
    },
    dataShow(flag) {
      this.isStats = flag;
      if (flag == 0) {
        this.btnStyM = "primary";
        this.btnStyT = "";
        this.btnStyD = "";
      } else if (flag == 1) {
        this.btnStyM = "";
        this.btnStyT = "primary";
        this.btnStyD = "";
      } else {
        this.btnStyM = "";
        this.btnStyT = "";
        this.btnStyD = "primary";
      }
    },
    rowClick(row, event, column) {
      if (row.isTotal) return;
      changeRouter(row, this);
    },
    toClassDetail(year) {
      this.yearPopover = false;
      this.$router.push({
        path: "/cervixStats/all",
        query: Object.assign(
          {},
          this.$route.query,
          {
            index: Number(this.$route.query.index) + 1,
            schoolYearArr: year
          },
          this.row
        )
      });
    },
    //地图左侧的数据展示
    handleLeftMapData() {
      const value = this.formData.phyDeptStatsInfoList;
      const statsArr = [];
      const schoolYear = this.schoolYearArrNowSelect;
      let nowSchoolYearData = [];

      nowSchoolYearData = value.filter(item => {
        return item.schoolYear == schoolYear;
      });
      this.leftMapData = nowSchoolYearData[0];
    },
    handleEdit(row) {
      console.log(row);
      this.showEachart = "showList";
      this.routerData.push({
        id: row.identityNo,
        name: row.name
      });
      this.studentDetailData = {
        name: row.name,
        identityNo: row.identityNo,
        id:row.id,
        schoolYearStart: row.schoolYear.split("-")[0],
        schoolYearEnd: row.schoolYear.split("-")[1]
      };
    },
    //表格筛选
    screenChange(name) {
      // 把原来存在的值删除 是、注意区分单学年和多学年
      this.createdFormData();
    },
    openDuidance(data){
      this.routerData.push({id:0,name:"指导点详情"});
      this.showEachart="showGuidance";
      this.guidanceDeyailId=data;
      console.log(data);
    },
    createdFormData: createdFormData,
    routerClick: routerClick,
    selectData: selectData,
    getTitle: getTitle,
    getData: getData,
    formatterSex(row, column, cellValue, index) {
      if (cellValue == 2) {
        return "女";
      } else if (cellValue == 1) {
        return "男";
      }
    },
    exportFun() {
      let api = this.type.export;
      let params = {};
      let allData = this.$refs.searchAll.getData();
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
      if (allData.NschoolId) {
        params.schoolId = allData.NschoolId.id;
        params.schoolName = allData.NschoolId.name;
      }
      if (allData.NschoolTypeId) {
        params.schoolTypeId = allData.NschoolTypeId.id;
      }
      if (this.routerData.length == 8) {
        params.schoolGradeName = this.type.name;
        params.gradeId = this.type.id;
      }
      if (this.routerData.length == 9) {
        params.schoolGradeName = this.routerData[7].name;
        params.gradeId = this.routerData[7].gradeId;
        params.schoolClassName = this.type.name;
        params.classId = this.type.id;
      }
      for (let name in this.searchData) {
        if (name != "schoolYearArr") {
          if (name == "identityNo") {
            if (this.searchData[name].value !== "") {
              params[name] = this.searchData[name].value;
            }
          } else {
            if (isRealNum(this.searchData[name].value)) {
              params[name] = this.searchData[name].value;
            }
          }
        } else {
          params.schoolYearArr = this.searchData[name].value.join(",");
        }
      }
      let instance = axios.create({
        baseURL: process.env.BASE_API,
        timeout: 1000,
        headers: {
          Authorization: getToken()
        },
        responseType: "blob"
      });
      let that = this;
      instance
        .get(api, {
          params: params
        })
        .then(function(response) {
          let fileName = response.headers["content-disposition"];
          let blob = new Blob([response.data], {
            type: "application/vnd.ms-excel"
          });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = that.title + ".xls";
          link.click();
        })
        .catch(function(error) {
          if (error.response) {
            // 存在请求，但是服务器的返回一个状态码
            console.log(error.response);
          } else {
            // 一些错误是在设置请求时触发的
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }
  },
  mounted() {
    console.log('route',this.$router);
    this.type = this.typeArr[0];
    this.searchData.schoolYearArr.value = [this.NschoolYearList[0].value];
    this.getData(this, {});
  }
};

function selectData(data) {
  let params = {};
  if (this.searchData.identityNo.value != "") {
    if (this.searchData.schoolYearArr.length > 1) {
      this.$message.error("只能选择一个学年进行学生信息查询");
      return;
    }
    params.identityNo = this.searchData.identityNo.value;
    let schoolYear = this.searchData.schoolYearArr.value[0];
    params.schoolYearStart = schoolYear.split("-")[0];
    params.schoolYearEnd = schoolYear.split("-")[1];
    request
      .get("/api/auth/v1/physical/testItem/recordId", {
        params
      })
      .then(res => {
        if (res.data == null) {
          this.$message.error(
            "查询不到身份证号/护照号/学籍号为：" +
              this.searchData.identityNo +
              "的学生信息"
          );
          return;
        }
        let schoolYear1 = this.searchData.schoolYearArr[0];
        this.showEachart = "showList";
        this.routerData.push({
          id: this.searchData.identityNo,
          name: res.data.name
        });
        this.studentDetailData = {
          identityNo: this.searchData.identityNo,
          schoolYearStart: schoolYear1.split("-")[0],
          schoolYearEnd: schoolYear1.split("-")[1]
        };
      });
    return;
  }
  let allData = this.$refs.searchAll.getData();
  if (allData.NschoolTypeId) {
    params.schoolTypeId = allData.NschoolTypeId.value;
  }
  let routerData = [
    {
      name: "体质健康分析",
      isClick: false
    },
    {
      name: "体测数据统计",
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
    this.type = this.typeArr[1];
  } else {
    this.type = this.typeArr[0];
  }
  if (allData.NposCityId) {
    routerData.push(allData.NposCityId);
    params.posCityId = allData.NposCityId.id;
    this.type = this.typeArr[2];
  }
  if (allData.NposDistrictId) {
    routerData.push(allData.NposDistrictId);
    params.posDistrictId = allData.NposDistrictId.id;
    this.type = this.typeArr[3];
  }
  if (allData.NschoolId) {
    routerData.push(allData.NschoolId);
    params.schoolId = allData.NschoolId.id;
    this.type = this.typeArr[4];
  }
  if (data && (data.type == "grade" || data.type == "class")) {
    if (data.type == "grade") {
      params.gradeId = data.searchData.gradeId;
      this.type = data.gradeData;
      routerData.push(data.searchData);
    } else {
      params.gradeId = data.searchData.gradeId;
      params.classId = data.searchData.classId;
      this.type = data.classData;
      routerData.push({
        gradeId: data.searchData.gradeId,
        name: data.searchData.gradeName || data.searchData.schoolGradeName
      });
      routerData.push(data.searchData);
    }
  }

  for (let name in this.searchData) {
    if (name != "schoolYearArr") {
      if (name == "identityNo") {
        if (this.searchData[name].value != "") {
          params[name] = this.searchData[name].value;
        }
      } else {
        if (isRealNum(this.searchData[name].value)) {
          params[name] = this.searchData[name].value;
        }
      }
    }
  }
  this.getData(this, params, routerData);
}

function getData(vm, params, routerData) {
  this.loading = true;
  let requestUrl = vm.type.url;
  this.schoolYearArrNowSelect = this.searchData.schoolYearArr.value[0];
  params.schoolYearArr = vm.searchData.schoolYearArr.value.join(",");
  request
    .get(requestUrl, {
      params: params
    })
    .then(res => {
      this.loading = false;
      if (routerData) {
        this.routerData = JSON.parse(JSON.stringify(routerData));
      }
      if (res.data == null || res.data == "") {
        this.showEachart = "showForm";
        return this.$message.error("没有对应的数据");
      }
      vm.schoolYearArr = vm.searchData.schoolYearArr.value;
      vm.formData = res.data;
      vm.screen = parseScreen(res.data, vm.type.fieldName);
      vm.getTitle(vm);
      vm.createdFormData();
      let data = "";
      switch (vm.type.name) {
        case "全国":
          vm.showMap = true;
          data = parseAllData(vm);
          vm.handleLeftMapData();
          handleMapData(vm, data);
          break;
        case "省":
          vm.showMap = true;
          showProvince(vm);
          vm.handleLeftMapData();
          break;
        case "市":
          vm.showMap = true;
          showCity(vm);
          vm.handleLeftMapData();
          break;
        case "区":
          vm.showMap = true;
          showDistrict(vm);
          vm.handleLeftMapData();
          break;
        default:
          vm.showMap = false;
          if (this.isStats == 0) {
            this.dataShow(1);
          }
          break;
      }
    }).catch(res=>{
      this.loading=false;
    });
}
// 获取筛选条件的值
function parseScreen(data, fieldName) {
  let screenData = {},
    screen = {};
  if (data.itemizedInfoList) {
    screenData = data.itemizedInfoList;
  } else {
    screenData = data;
  }
  let isSelect = "";
  screenData.forEach(screenDataItem => {
    let itemData;
    if (screenDataItem.phyDeptAreaInfoList) {
      itemData = screenDataItem.phyDeptAreaInfoList;
    } else if (screenDataItem.phyStatsList) {
      itemData = screenDataItem.phyStatsList;
    }
    itemData.forEach(item => {
      let value =
        item.qualifiedRate || item.healthTestScore || item.currentPercent || 0;
      let itemName =
        item[fieldName] ||
        item.name ||
        item.schoolClasfieldName ||
        item.schoolGradeName;
      if (value != 0) {
        isSelect = "true";
      } else {
        isSelect = "false";
      }
      if (typeof screen[itemName] != "undefined" && isSelect == "true") {
        screen[itemName] = {
          name: itemName,
          isSelect: isSelect
        };
      }
      if (typeof screen[itemName] == "undefined") {
        screen[itemName] = {
          name: itemName,
          isSelect: isSelect
        };
      }
    });
  });
  return screen;
}
// 创建全国地图
function handleMapData(vm, data) {
  let mapCharts = Echarts.init(document.getElementById("map"));
  mapCharts.setOption(getMapOptions(data, "china", vm), true);
  mapCharts.off("click"); // 防止重复绑定
  mapCharts.on("click", params => {
    if (params.data.value > 0) {
      vm.$refs.searchAll.setData({
        NposProvinceId: params.data.posProvinceId
      });
      vm.$refs.searchAll.getCity(params.data.posProvinceId);
      vm.selectData();
    } else {
      alert("暂无数据，请更换选择");
    }
  });
}
// 创建省级地图
function showProvince(vm) {
  const that = vm;
  const code = vm.$refs.searchAll.getData().NposProvinceId.name;
  Jquery.ajax({
    url: `../../../../static/maps/province/${code}.json`,
    success(res) {
      const geoMap = res;
      Echarts.registerMap("maps", geoMap);

      const itemizedInfoList = that.formData.itemizedInfoList;
      const myMap = Echarts.init(document.getElementById("map"));
      let nowSchoolYearData = [];
      const statsArr = [];
      const schoolYear = that.schoolYearArrNowSelect;
      nowSchoolYearData = itemizedInfoList.filter(item => {
        return item.schoolYear == schoolYear;
      });
      nowSchoolYearData = nowSchoolYearData[0].phyDeptAreaInfoList;
      nowSchoolYearData.forEach(item => {
        const statsItem = Object.assign({}, item, {
          name: item.posCityName,
          value: item.qualifiedRate || 0
        });
        statsArr.push(statsItem);
      });

      myMap.setOption(getMapOptions(statsArr, "maps", vm), true);
      myMap.off("click"); // 防止重复绑定
      myMap.on("click", params => {
        if (params.data.value > 0) {
          vm.$refs.searchAll.setData({
            NposCityId: params.data.posCityId
          });
          vm.$refs.searchAll.getStreet(params.data.posCityId);
          vm.selectData();
        }
      });
    }
  });
}
// 创建市级地图
function showCity(vm) {
  const that = vm;
  let code = vm.$refs.searchAll.getData().NposCityId.name;
  if (code === "市辖区") {
    code = vm.$refs.searchAll.getData().NposProvinceId.name + "市辖区";
  }
  Jquery.ajax({
    url: `../../../../static/maps/city/${code}.json`,
    success(res) {
      const geoMap = res;

      Echarts.registerMap("maps", geoMap);

      const itemizedInfoList = that.formData.itemizedInfoList;
      const myMap = Echarts.init(document.getElementById("map"));
      myMap.clear();
      let nowSchoolYearData = [];
      const statsArr = [];
      const schoolYear = that.schoolYearArrNowSelect;
      nowSchoolYearData = itemizedInfoList.filter(item => {
        return item.schoolYear == schoolYear;
      });
      nowSchoolYearData = nowSchoolYearData[0].phyDeptAreaInfoList;
      nowSchoolYearData.forEach(item => {
        const statsItem = Object.assign({}, item, {
          name: item.posDistrictName,
          value: item.qualifiedRate || 0
        });
        statsArr.push(statsItem);
      });
      myMap.setOption(getMapOptions(statsArr, "maps", vm), true);
      myMap.off("click"); // 防止重复绑定
      myMap.on("click", params => {
        if (params.data.value > 0) {
          vm.$refs.searchAll.setData({
            NposDistrictId: params.data.posDistrictId
          });
          vm.$refs.searchAll.getSchool(params.data.posDistrictId);
          vm.selectData();
        }
      });
    }
  });
}
// 创建区级地图
function showDistrict(vm) {
  const that = vm;
  let allData = vm.$refs.searchAll.getData();
  const districtName = allData.NposDistrictId.name;
  const cityName = allData.NposCityId.name;
  const provinceName = allData.NposProvinceId.name;
  Jquery.ajax({
    url: `../../../../static/maps/county/${provinceName}/${cityName}/${districtName}.json`,
    success(res) {
      const geoMap = res;
      Echarts.registerMap("maps", geoMap);

      const itemizedInfoList = that.formData.itemizedInfoList;
      const myMap = Echarts.init(document.getElementById("map"));
      myMap.clear();

      let nowSchoolYearData = [];
      const statsArr = [];
      const schoolYear = that.schoolYearArrNowSelect;

      if (!itemizedInfoList) {
        myMap.setOption(getDistrictOptions(statsArr, "maps"), true);
        return;
      }

      nowSchoolYearData = itemizedInfoList.filter(item => {
        return item.schoolYear == schoolYear;
      });
      nowSchoolYearData = nowSchoolYearData[0].phyDeptAreaInfoList;
      nowSchoolYearData.forEach(item => {
        const statsItem = Object.assign({}, item, {
          name: item.schoolName,
          value: [
            item.longitudeValue,
            item.latitudeValue,
            item.qualifiedRate || 0
          ]
        });
        statsArr.push(statsItem);
      });
      myMap.setOption(getDistrictOptions(statsArr, "maps"), true);
      myMap.off("click");
      myMap.on("click", params => {
        if (params.componentType == "geo") return;
        if (params.data.value[2] == null || params.data.value[2] == 0) {
          return;
        }
        changeRouter(params.data, vm);
      });
    }
  });
}
// 地图配置
function getMapOptions(data, name, vm) {
  const optionMap = {
    tooltip: {
      formatter: vm.chartsName + "<br/>{b}:{c}%"
      // formatter: "{b}:{c}%"
    },
    visualMap: {
      orient: "horizontal",
      min: 0,
      max: 100,
      text: ["高", "合格率：低"],
      realtime: false,
      calculable: false,
      inRange: {
        color: ["#e0ffff", "#006edd"]
      },
      top: 570
    },
    geo: {
      map: name,
      roam: false,
      label: {
        normal: {
          show: true,
          textStyle: {
            color: "rgba(0,0,0,0.4)"
          }
        }
      },
      itemStyle: {
        normal: {
          borderColor: "rgba(0, 0, 0, 0.2)"
        },
        emphasis: {
          areaColor: null,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
          backgroundColor: "#ff55ff"
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
        // tooltip: {show: false},
        label: {
          normal: {
            formatter: "{b}%",
            // formatter: "{a} <br/>{b}:{c}%",
            position: "right",
            show: true
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: "#F06C00"
          }
        },
        data: data
      }
    ]
  };
  return optionMap;
}
// 区级地图配置
function getDistrictOptions(data, name) {
  const optionMap = {
    tooltip: {
      trigger: "item",
      formatter: function(params) {
        let value = params.value[2];
        if (value > 0) {
          value = value.toFixed(2) + "%";
        } else {
          value = value + "%";
        }
        return params.name + " : " + value;
      }
    },
    visualMap: {
      min: 0,
      max: 100,
      inRange: {
        color: ["#e0ffff", "#006edd"]
      },
      text: ["高", "合格率：低"],
      textStyle: {
        color: "#000"
      },
      orient: "horizontal",
      calculable: true
    },
    geo: {
      map: name,
      label: {
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          areaColor: "#bdbcbc",
          borderColor: "#111"
        },
        emphasis: {
          areaColor: "#bdbcbc"
        }
      }
    },
    series: [
      {
        type: "scatter",
        coordinateSystem: "geo",
        data: data,
        symbolSize: 10,
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: "#ffe341"
          },
          emphasis: {
            // borderColor: "#fff",
            borderColor: "#48dad6",
            borderWidth: 1
          }
        }
      }
    ]
  };
  return optionMap;
}

function isRealNum(val) {
  // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
  if (val === "" || val == null) {
    return false;
  }
  if (!isNaN(val)) {
    return true;
  } else {
    return false;
  }
}

function parseAllData(vm) {
  const statsArr = [],
    value = vm.formData.itemizedInfoList;
  const schoolYear = vm.schoolYearArrNowSelect;
  let nowSchoolYearData = [];

  if (schoolYear) {
    nowSchoolYearData = value.filter(item => {
      return item.schoolYear == schoolYear;
    });
    nowSchoolYearData = nowSchoolYearData[0];
  } else {
    nowSchoolYearData = value[0];
  }
  nowSchoolYearData.phyDeptAreaInfoList.forEach((item, inedx) => {
    // 地图名称处理
    if (
      item.posProvinceName.indexOf("市") != -1 ||
      item.posProvinceName.indexOf("省") != -1
    ) {
      item.pName = item.posProvinceName.slice(
        0,
        item.posProvinceName.length - 1
      );
    } else if (item.posProvinceName.indexOf("自治区") != -1) {
      if (item.posProvinceName.indexOf("内蒙古") != -1) {
        item.pName = "内蒙古";
      } else {
        item.pName = item.posProvinceName.slice(0, 2);
      }
    }
    const statsItem = Object.assign({}, item, {
      name: item.pName,
      value: item.qualifiedRate || 0
    });
    statsArr.push(statsItem);
  });
  return statsArr;
}
//头部标题
function getTitle(vm) {
  let titleName = "",
    schoolYear = "",
    searchName = {},
    index = 0,
    chartsName = "";
  if (!vm.showMoreIndicators) {
    if (vm.searchData.testItemLevel.value) {
      vm.searchData.testItemLevel.data.forEach(item => {
        if (vm.searchData.testItemLevel.value == item.id) {
          titleName = "综合体质" + item.label + "率";
          chartsName = item.label + "率";
        }
      });
      switch (vm.searchData.testItemLevel.value) {
        case 1:
          vm.shuoming =
            "优秀率 = 成绩优秀（成绩≥90分）的人数/体质测试总人数×100%";
          break;
        case 2:
          vm.shuoming =
            "良好率 = 成绩良好（80分≤成绩＜90分）的人数/体质测试总人数×100%";
          break;
        case 3:
          vm.shuoming =
            "及格率 = 成绩及格（60分≤成绩＜80分）的人数/体质测试总人数×100%";
          break;
        case 4:
          vm.shuoming =
            "不及格率 = 成绩不及格（成绩＜60分）的人数/体质测试总人数×100%";
          break;
        case 5:
          vm.shuoming =
            "优良率 = 成绩优良（成绩≥80分）的人数/体质测试总人数×100%";
          break;
      }
    } else {
      titleName = "综合体质合格率";
      chartsName = "合格率";
      vm.shuoming = "合格率 = 成绩合格（成绩≥60分）的人数/体质测试总人数×100%";
    }
  } else {
    for (let name in vm.searchData) {
      let item = vm.searchData[name];
      if (typeof item.name != "undefined") {
        let isNumber = isRealNum(item.value);
        if (isNumber) {
          searchName = item;
          index++;
        }
      }
    }
    if (index == 0) {
      titleName = "综合体质合格率";
      chartsName = "合格率";
      vm.shuoming = "合格率 = 成绩合格（成绩≥60分）的人数/体质测试总人数×100%";
    } else if (index == 1) {
      searchName.data.forEach(element => {
        if (searchName.value == element.id) {
          titleName = searchName.name + element.label + "率";
          chartsName = element.label + "率";
        }
      });
      switch (searchName.name) {
        case "体重":
          switch (searchName.value) {
            case 5:
              vm.shuoming =
                "正常率 = BMI指数处于正常范围的人数/体测总人数×100%";
              break;
            case 7:
              vm.shuoming =
                "低体重率 = BMI指数处于低体重范围的人数/体测总人数×100%";
              break;
            case 8:
              vm.shuoming = "BMI指数处于超重范围的人数/体测总人数×100%";
              break;
            case 9:
              vm.shuoming = "BMI指数处于肥胖范围的人数/体测总人数×100%";
              break;
          }
          break;
        case "视力":
          switch (searchName.value) {
            case 10:
              vm.shuoming =
                "视力正常率 = 视力处于正常范围（左眼和右眼裸眼视力均≥5.0）的人数/体测总人数×100%";
              break;
            case 11:
              vm.shuoming =
                "轻度近视率 = 视力处于轻度近视范围（左眼或右眼裸眼视力≥4.9<5.0）的人数/体测总人数×100%";
              break;
            case 12:
              vm.shuoming =
                "中度近视率 = 视力处于中度近视范围（左眼或右眼裸眼视力>4.5<4.9）的人数/体测总人数×100%";
              break;
            case 13:
              vm.shuoming =
                "重度近视率 = 视力处于重度近视范围（左眼或右眼裸眼视力≤4.5）的人数/体测总人数×100%";
              break;
          }
          break;
        case "脊柱侧弯":
          switch (searchName.value) {
            case 14:
              vm.shuoming =
                "阴性率 = 躯干倾斜角处于阴性范围（躯干倾斜角≤ 3°）的人数/体测总人数×100%";
              break;
            case 15:
              vm.shuoming =
                "阳性率 = 躯干倾斜角处于阳性范围（躯干倾斜角≥3°＜7°）的人数/体测总人数×100%";
              break;
            case 16:
              vm.shuoming =
                "强阳性率 = 躯干倾斜角处于强阳性范围（躯干倾斜角≥7°）的人数/体测总人数×100%";
              break;
          }
          break;
        default:
          switch (searchName.value) {
            case 0:
              vm.shuoming =
                "合格率 = 成绩合格（成绩≥60分）的人数/体质测试总人数×100%";
              break;
            case 1:
              vm.shuoming =
                "优秀率 = 成绩优秀（成绩≥90分）的人数/体质测试总人数×100%";
              break;
            case 2:
              vm.shuoming =
                "良好率 = 成绩良好（80分≤成绩＜90分）的人数/体质测试总人数×100%";
              break;
            case 3:
              vm.shuoming =
                "及格率 = 成绩及格（60分≤成绩＜80分）的人数/体质测试总人数×100%";
              break;
            case 4:
              vm.shuoming =
                "不及格率 = 成绩不及格（成绩＜60分）的人数/体质测试总人数×100%";
              break;
          }
          break;
      }
    } else {
      titleName = "符合筛选条件的比率";
      chartsName = "比率";
      vm.shuoming = "比率 = 符合筛选条件的人数/体测总人数×100%";
    }
  }
  if (vm.searchData.schoolYearArr.value.length > 1) {
    schoolYear = "多学年";
  } else {
    schoolYear = vm.searchData.schoolYearArr.value[0] + "学年";
  }
  switch (vm.routerData.length) {
    case 8:
      schoolYear += vm.routerData[6].name + vm.routerData[7].name;
      break;
    case 9:
      schoolYear +=
        vm.routerData[6].name + vm.routerData[7].name + vm.routerData[8].name;
      break;
    default:
      schoolYear += vm.routerData[vm.routerData.length - 1].name;
      break;
  }
  let searchData = vm.$refs.searchAll.getData();
  let titleName1 = "";
  if (searchData.NschoolTypeId) {
    titleName1 = searchData.NschoolTypeId.name + "学生";
  } else {
    titleName1 = "全部学生";
  }
  vm.chartsName = chartsName;
  vm.title = schoolYear + titleName1 + titleName;
  return chartsName;
}

function routerClick(data) {
  this.showEachart = "showForm";
  let vm = this;
  let params = {
    NposProvinceId: "",
    NposCityId: "",
    NposDistrictId: "",
    NschoolId: ""
  };
  let item = data.routerData[data.index];
  switch (data.routerData.length) {
    case 3:
      params.NposProvinceId = item.value;
      vm.$refs.searchAll.setData(params);
      break;
    case 4:
      params.NposProvinceId = item.id;
      vm.$refs.searchAll.setData(params);
      vm.$refs.searchAll.getCity(item.id);
      break;
    case 5:
      params.NposProvinceId = data.routerData[3].id;
      params.NposCityId = item.id;
      vm.$refs.searchAll.setData(params);
      vm.$refs.searchAll.getStreet(item.id);
      break;
    case 6:
      params.NposProvinceId = data.routerData[3].id;
      params.NposCityId = data.routerData[4].id;
      params.NposDistrictId = item.id;
      vm.$refs.searchAll.setData(params);
      vm.$refs.searchAll.getSchool(item.id);
      break;
    case 7:
      params.NposProvinceId = data.routerData[3].id;
      params.NposCityId = data.routerData[4].id;
      params.NposDistrictId = data.routerData[5].id;
      params.NschoolId = item.id;
      vm.$refs.searchAll.setData(params);
      vm.$refs.searchAll.changeSchool(item.id);
      vm.selectData();
      return;
    case 8:
      let gradeData = this.typeArr[5];
      gradeData.id = item.gradeId;
      gradeData.name = item.name;
      vm.selectData({
        gradeData: gradeData,
        searchData: item,
        type: "grade"
      });
      return;
    case 9:
      let classData = this.typeArr[6];
      vm.selectData({
        classData: classData,
        searchData: item,
        type: "class"
      });
      return;
    case 10:
      vm.showEachart="showList"
      vm.routerData=JSON.parse(JSON.stringify(data.routerData));
      return;
  }
  vm.selectData();
}
//创建柱状图的方法

function createdFormData() {
  let vm = this,
    schoolYear,
    tableData;
  if (this.routerData.length == 9) {
    this.schoolYearArrNowSelect1 = this.schoolYearArr[0];
    this.formData.forEach(item => {
      if (item.schoolYear == vm.schoolYearArrNowSelect1) {
        schoolYear = item.schoolYear;
        tableData = item.phyStatsList;
      }
    });
    this.columnArr = [];
    for (name in this.searchData) {
      if (name != "identityNo" && name != "schoolYearArr") {
        let item = this.searchData[name];
        let isNumber = isRealNum(item.value);
        if (isNumber) {
          this.columnArr.push({
            label: item.name,
            searchName: name,
            fieldName: item.fieldName
          });
        }
      }
    }
    if (this.columnArr.length == 0) {
      this.columnArr = [
        {
          label: "综合体质",
          searchName: "综合体质",
          fieldName: "healthTestScore"
        }
      ];
    }
    tableData.forEach(item => {
      item.schoolYear = schoolYear;
    });
    this.btnStyD = "primary";
    this.btnStyT = "";
    this.isStats = 2;
    this.tableData = tableData;
  } else {
    // x轴对应名称
    let formData = parseBarData(this, this.screen, this.type.fieldName);
    //bar图表汇总处理 等待平均值出来了再处理汇总
    let leftChartsSeriesArr = [],
      leftData = [];
    if (this.routerData.length < 7) {
      leftData = this.formData.phyDeptStatsInfoList;
      leftData.forEach(item => {
        let value = item.qualifiedRate || 0;
        leftChartsSeriesArr.push(getSeriesOptions(item.schoolYear, [value]));
      });
    } else {
      leftData = this.formData;
      leftData.forEach(item => {
        let value = item.avgPercent || 0;
        leftChartsSeriesArr.push(getSeriesOptions(item.schoolYear, [value]));
      });
    }
    creatLeftBar(leftChartsSeriesArr, this);
    createdRightBar(formData, this);
    // 表格数据详情的处理
    let tableData = createdTableData(
      this.formData,
      this.screen,
      this.type.fieldName,
      this.routerData[this.routerData.length - 1].name
    );

    this.yearValueArr = tableData.yearValueArr;
    this.detailVlue = tableData.tableData;
  }
}

//实例左侧柱状图
function creatLeftBar(seriesArr, vm) {
  let leftCharts = Echarts.init(document.getElementById("leftCharts")); //左侧bar图表 全国
  let name = vm.routerData[vm.routerData.length - 1].name;
  var option = {
    title: {
      text: ""
    },
    tooltip: {
      trigger: "axis",
      formatter: "{a}:{c}%",
      // formatter: "{a} <br/>{b}:{c}%",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: [""]
    },
    xAxis: {
      data: [name],
      offset: 50,
      nameGap: 100,
      triggerEvent: true,
      axisLabel: {
        interval: 0
      }
    },
    grid: {
      left: "30%",
      y2: 260,
      borderWidth: 1
    },
    yAxis: {
      min: 0,
      max: 100,
      name: vm.chartsName,
      position: "left",
      axisLabel: {
        show: true,
        interval: "auto",
        formatter: "{value} %"
        // formatter: "{a} <br/>{b}:{c}%",
      }
    },
    series: seriesArr
  };
  let numberSeries = seriesArr.length,
    formatterstr = "";

  let value;

  if (numberSeries > 1) {
    for (let i = 0; i < numberSeries; i++) {
      formatterstr += "{a" + i + "}:{c" + i + "}%<br />";
    }
    option.tooltip.formatter = formatterstr;
  }
  for (let i = 0; i < numberSeries; i++) {
    value = seriesArr[i].data[0];
    if (value.toString().indexOf(".") >= 0) {
      value = value.toFixed(2);
      seriesArr[i].data[0] = value;
    }

    let line = {
      name: seriesArr[i].name,
      stack: seriesArr[i].name,
      type: "bar",
      label: {
        normal: {
          show: true,
          position: "insideBottom",
          textBorderWidth: 2,
          textStyle: {
            color: "#0b0b0c"
          },
          formatter: "{c}%"
        }
      },
      itemStyle: {
        normal: {
          color: "rgba(128, 128, 128, 0)"
        }
      },
      data: seriesArr[i].data
    };
    seriesArr.push(line);
  }
  leftCharts.setOption(option, true);
}
//
function createdRightBar(formData, vm) {
  console.log('formData,vm',formData,vm);
  let rightCharts = Echarts.init(document.getElementById("rightCharts")); //右侧bar图表
  let endValue = 50;
  switch (vm.schoolYearArr.length) {
    case 10:
    case 9:
      endValue = 10;
      break;
    case 8:
      endValue = 15;
      break;
    case 7:
    case 6:
      endValue = 20;
      break;
    case 5:
      endValue = 25;
      break;
    case 4:
      endValue = 30;
      break;
    case 3:
      endValue = 45;
      break;
    case 2:
    case 1:
      endValue = 50;
      break;
  }
  let legendData = [];
  formData.seriesArr.forEach((v, i) => {
    legendData.push(v.name);
  });
  let option2 = {
    title: {
      text: ""
    },
    tooltip: {
      trigger: "axis",
      formatter: "{a}:{c}%",
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
      data: legendData
    },
    xAxis: {
      data: formData.xName,
      offset: 50,
      nameGap: 100,
      triggerEvent: true,
      axisLabel: {
        interval: 0
      }
    },
    yAxis: {
      min: 0,
      max: 100,
      name: vm.chartsName,
      axisLabel: {
        show: true,
        interval: "auto",
        formatter: "{value} %"
      }
    },
    series: formData.seriesArr
  };
  if (formData.xName.length > 8) {
    option2.dataZoom = [
      {
        show: true,
        height: 10,
        type: "slider",
        top: "72%",
        xAxisIndex: [0],
        start: 0,
        end: endValue,
        zoomLock: true,
        backgroundColor: "#EEEEEE",
        fillerColor: "#84BEF9",
        borderColor: "#fff",
        showDetail: false,
        showDataShadow: false
      }
    ];
  }
  let numberSeries = formData.seriesArr.length,
    formatterstr = "";
  if (numberSeries > 1) {
    for (let i = 0; i < numberSeries; i++) {
      formatterstr += "{a" + i + "}:{c" + i + "}%<br />";
    }
    option2.tooltip.formatter = formatterstr;
  }
  for (let i = 0; i < numberSeries; i++) {
    let line = {
      name: formData.seriesArr[i].name,
      stack: formData.seriesArr[i].name,
      type: "bar",
      label: {
        normal: {
          show: true,
          position: "insideBottom",
          textBorderWidth: 2,
          textStyle: {
            color: "#0b0b0c"
          },
          formatter: "{c}%"
        }
      },
      itemStyle: {
        normal: {
          color: "rgba(128, 128, 128, 0)"
        }
      },
      data: formData.seriesArr[i].data
    };
    formData.seriesArr.push(line);
  }
  // 使用刚指定的配置项和数据显示图表。
  //this.mapCharts.setOption(optionMap);

  rightCharts.setOption(option2, true);
  rightCharts.off("click"); // 防止重复绑定
  rightCharts.on("click", function(params) {
    params.data.date = params.seriesName;
    changeRouter(params.data, vm);
  });
}

function changeRouter(data, vm) {
  console.log('data',data,vm.routerData);
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
      vm.$refs.searchAll.setData({
        NposCityId: data.posCityId
      });
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
      let gradeData = vm.typeArr[5];
      gradeData.id = data.gradeId;
      gradeData.name = data.name;
      vm.selectData({
        gradeData: gradeData,
        searchData: data,
        type: "grade"
      });
      break;
    case 8:
      let classData = vm.typeArr[6];
      classData.id = data.classId;
      classData.name = data.name;
      vm.selectData({
        classData: classData,
        searchData: data,
        type: "class"
      });
      break;
    case 9:
      if (data.identityNo) {
        vm.showEachart = "showList";
        vm.routerData.push({
          id: data.identityNo,
          name: data.name
        });
        vm.studentDetailData = {
          name: data.name,
          identityNo: data.identityNo,
          schoolYearStart: data.date.split("-")[0],
          schoolYearEnd: data.date.split("-")[1]
        };
      } else {
        vm.$message.error("没有对应的数据");
      }
      break;
  }
}
//柱状图数据解释
function parseBarData(vm, screen, fieldName) {
  const xName = [];
  let rightChartsData;
  if (vm.formData.itemizedInfoList) {
    rightChartsData = vm.formData.itemizedInfoList;
  } else {
    rightChartsData = vm.formData;
  }

  const seriesArr = [];

  // 获取数据
  rightChartsData.forEach((itemData, index) => {
    const data = [];
    let i = 0;
    let percentOfPass = 0; // 合格率
    let itemDataArr = itemData.phyDeptAreaInfoList || itemData.phyStatsList;
    itemDataArr.forEach(item => {
      let value =
        item.qualifiedRate ||
        item.healthTestScore ||
        item.avgPercent ||
        item.currentPercent ||
        0;
      let name = item[fieldName];
      let obj = {
        value: value,
        name: name,
        posCityId: item.posCityId,
        posDistrictId: item.posDistrictId,
        posProvinceId: item.posProvinceId,
        posProvinceCode: item.posProvinceCode,
        posCityCode: item.posCityCode,
        posDistrictCode: item.posDistrictCode,
        schoolId: item.schoolId,
        gradeId: item.gradeId || item.schoolTypeGradeId,
        classId: item.classId,
        gradeName: item.schoolGradeName,
        identityNo: item.identityNo
      };
      percentOfPass += value;
      if (obj.value != 0) {
        i++;
      }
      if (screen[obj.name].isSelect == "true") {
        if (xName.indexOf(obj.name) == -1) {
          xName.push(obj.name);
        }
        if (index == 0) {
          data.push(obj);
        } else {
          let dataIndex = xName.indexOf(obj.name);
          data[dataIndex] = obj;
        }
      }
    });

    seriesArr.push(getSeriesOptions(itemData.schoolYear, data));
    vm.percentOfPass[itemData.schoolYear] = percentOfPass / i;
    if (i == 0) {
      vm.percentOfPass[itemData.schoolYear] = 0;
    }
  });
  vm.percentOfPassValue = vm.percentOfPass[vm.schoolYearArrNowSelect];
  return {
    seriesArr: seriesArr,
    xName: xName
  };
}
//右侧柱状图配置
function getSeriesOptions(titleName, data) {
  return {
    name: titleName,
    stack: titleName,
    type: "bar",
    test: "999999999999",
    data: data,
    barWidth: 20,
    label: {
      normal: {
        show: true,
        rotate: 30,
        align: "center",
        verticalAlign: "top",
        position: "bottom",
        distance: 22,
        formatter: "{name|{a}}",
        fontSize: 16,
        rich: {
          name: {
            textBorderColor: "#fff"
          }
        }
      }
    }
  };
}
//左侧柱状图配置
function getLeftChartsSeriesOptions(titleName, data) {
  return {
    name: titleName,
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
  };
}
//子表的数据解释
function createdTableData(data, screen, fieldName, tableName) {
  let yearValueObj = {};
  let tableDataArr = [];
  let tableDataObj = {};
  let itemizedInfoList;
  if (data.itemizedInfoList) {
    itemizedInfoList = data.itemizedInfoList;
  } else {
    itemizedInfoList = data;
  }

  itemizedInfoList.forEach(itemData => {
    let itemDataArr = itemData.phyDeptAreaInfoList || itemData.phyStatsList;
    let year = itemData.schoolYear;
    yearValueObj[year] = 0;
    itemDataArr.forEach(item => {
      let name = item[fieldName];
      item.name = name;
      item.gradeId = item.gradeId|| item.schoolTypeGradeId ;
      if (screen[name].isSelect == "true") {
        let value =
          item.qualifiedRate ||
          item.healthTestScore ||
          item.avgPercent ||
          item.currentPercent ||
          0;
        if (!tableDataObj[name]) {
          tableDataObj[name] = item;
          tableDataObj[name][year] = value;
          yearValueObj[year] += value;
        } else {
          tableDataObj[name][year] = value;
          yearValueObj[year] += value;
        }
      }
    });
  });
  for (name in tableDataObj) {
    tableDataArr.push(tableDataObj[name]);
  }
  for (name in yearValueObj) {
    yearValueObj[name] = yearValueObj[name] / tableDataArr.length;
  }
  tableDataArr.unshift(
    Object.assign({}, yearValueObj, {
      name: tableName,
      isTotal: true
    })
  );
  return {
    tableData: tableDataArr,
    yearValueArr: yearValueObj
  };
}
</script>

<style scoped lang="scss">
.cervixStats {
  min-width: 1140px;
}
.searchTitle {
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 10px;
  .heath {
    font-size: 14px;
    display: inline-block;
    width: 121px;
    text-align: right;
    padding-right: 10px;
  }
  .heath1 {
    font-size: 14px;
    vertical-align: middle;
  }
  .choose_year{
    vertical-align: middle;
  }
  .tag_year{
    display: inline-block;
    vertical-align: top;
    max-width: 750px;
    .el-tag{
      margin-right: 5px;
      margin-bottom: 5px;
    }
    .el-tag{
    }
  }
  .rowStyle {
    margin-bottom: 10px;
    font-size: 0px;
  }
  .indicatorsDiv {
    margin-bottom: 10px;
    padding-left: 52px;
    font-size: 0px;
  }
  .heathMore {
    color: #2e89e6;
    margin-left: 10px;
    cursor: pointer;
    font-size: 16px;
  }
  .titleSpan {
    font-size: 14px;
    margin-right: 10px;
    display: inline-block;
    vertical-align: middle;
  }
  .identityNo {
    width: 300px;
    vertical-align: middle;
  }
}

.routerData {
  top: 60px;
  background: #f0f0f0;
  z-index: 1000;
  width: 100%;
}

.map_left_data {
  position: absolute;
  left: 27px;
  top: 78px;
  float: left;
}

.part {
  width: 211px;
  padding: 22px 40px 17px 19px;
  background-color: #f5f5f5;
  text-align: center;
  border-radius: 10px;
}

.map_left_data .part_1,
.map_left_data .part_2,
.map_left_data .part_3 {
  border-radius: 10px;
}

.map_left_data p {
  margin: 0;
}

#map_left_data_title {
  font-size: 14px;
  color: #525252;
}

#map_left_data_title2 > span:last-of-type,
#map_left_data_detail > span:last-of-type {
  float: right;
}

#map_left_data_title2 {
  position: relative;
  font-size: 14px;
  color: #6b6b6b;
  margin-top: 11px;
  text-align: left;
}

#map_left_data_title2::after {
  position: absolute;
  content: "";
  top: 7px;
  right: 64px;
  background-color: #d1d1d1;
  height: 33px;
  width: 1px;
}

#map_left_data_detail {
  font-size: 14px;
  color: #858585;
  text-align: left;
  margin-top: 14px;
}

#map_left_data_detail .blue {
  color: #2e89e6;
}

.part ~ .part {
  border-top: 5px solid #fff;
}

.part_div ~ .part_div {
  margin-top: 8px;
}

.charts {
  background: #fff;
  position: relative;
  padding: 20px 0 75px;
  overflow: hidden;
  border-radius: 10px;
}

.charts_title {
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  color: #333;
  font-weight: 600;
  margin: 0;
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
  right: 15px;
  padding: 0;
}

#leftCharts {
  width: 250px;
  height: 600px;
  margin-left: 20px;
}

#rightCharts {
  width: 900px;
  height: 600px;
  margin-left: 20px;
}

.change_type.map {
  position: absolute;
  right: 28px;
  top: 75px;
}

.change_type.tj {
  position: absolute;
  right: 28px;
  top: 114px;
}

.change_type.sj {
  position: absolute;
  right: 28px;
  top: 153px;
}
/* 数据统计 */

.data_detail {
  width: calc(100% - 115px);
  .data_detail_body {
    position: relative;
    line-height: 35px;
    width: 100%;
    margin: 0 auto;
    padding: 15px 0px 15px 15px;
    overflow: auto;
    .screening {
      position: absolute;
      top: 33px;
      left: 130px;
      line-height: 10px;
      background-color: #84bef9;
      color: #fff !important;
      width: 69px;
      border-radius: 13px;
      text-align: center;
      z-index: 1;
    }
  }
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

.print {
  text-align: right;
  padding-right: 28px;
  margin-bottom: 20px;
}

.data_detail_pagination {
  text-align: right;
  padding-right: 28px;
}

.iconImg {
  display: inline-block;
  width: 16px;
  height: 18px;
  vertical-align: -2px;
  margin-right: 10px;
  background-size: contain;
  background-repeat: no-repeat;
}

.fatImg {
  background-image: url(../../../assets/imgs/icon17.png);
}

.scoliosisImg {
  background-image: url(../../../assets/imgs/icon21.png);
}

.overweightImg {
  background-image: url(../../../assets/imgs/icon18.png);
  width: 22px;
  height: 15px;
}

.lowweightImg {
  background-image: url(../../../assets/imgs/icon19.png);
  width: 22px;
  height: 15px;
}

.poorvisionImg {
  background-image: url(../../../assets/imgs/icon20.png);
  width: 22px;
  height: 13px;
}

.passImg {
  background-image: url(../../../assets/imgs/icon16.png);
  width: 19px;
  height: 24px;
  vertical-align: middle;
  margin-right: 5px;
}
/*.tipsImg{*/
/*background-image: url(../../../assets/imgs/icon23.png);*/
/*width: 19px;*/
/*height: 24px;*/
/*vertical-align: middle;*/
/*margin-right: 5px;*/
/*}*/

.screeningImg {
  background-image: url(../../../assets/imgs/icon15.png);
  width: 13px;
  height: 13px;
  vertical-align: -1px;
  margin-right: 5px;
}
/* 数据统计 */
/* 修改多选 选中样式 */

.el-checkbox + .el-checkbox {
  float: none;
  // margin: 0 0 0 28px;
}
.el-popper {
  width: 460px !important;
  .el-checkbox {
    margin: 0px;
    width: 140px;
  }
}

.el-checkbox__label {
  padding-left: 10px;
}
/* 修改多选 选中样式 */

.map_right_data {
  width: 878px;
  margin: 0 auto;
}

#map {
  width: 891px;
  height: 666px;
}

.map_right_data_title {
  font-size: 18px;
  color: #1875f0;
  text-align: center;
  font-weight: 600;
  margin-bottom: 0;
}

.radio {
  text-align: center;
  margin-top: 10px;
}

.detail_data {
  padding-bottom: 20px;
  overflow: auto;
  background-color: #fff;
  margin: 20px 50px 0;
  
}
.data_detail{
  .bottomC{
    position: static !important;
  }
}

.detail_list {
  position: relative;
  height: initial;
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

.print {
  text-align: right;
  padding-right: 28px;
  margin-bottom: 20px;
}

.data_detail_pagination {
  text-align: right;
  padding-right: 28px;
}

.shuoming {
  display: inline-block;
  width: 18px;
  height: 18px;
  background: #c8cace;
  line-height: 18px;
  font-size: 14px;
  color: white;
  border-radius: 12px;
  vertical-align: middle;
  cursor: pointer;
}
</style>
<style lang="scss">
.checkbox_year {
  .el-checkbox {
    width: 100px !important;
    margin-right: 5px;
    margin-bottom: 5px;
  }
}
</style>

