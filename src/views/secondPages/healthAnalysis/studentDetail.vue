<template>
  <div class="student_detail">
    <section class="s_1">
      <div class="s_1_head">学生信息详情
        <!-- <div>
                    <el-button type="primary" size="small">导出</el-button><el-button type="primary" size="small">打印</el-button>
        </div>-->
      </div>
      <div class="user_msg">
        <el-row class="rowStyle">
          <el-col :span="16" class="nick_name">{{ detailListData.basicInfo.name }}</el-col>
          <el-col
            :span="8"
            class="healthTime"
          >体测时间：{{ detailListData.healthDetail.healthTestTime | dateFormat('yyyy/MM/dd') }}</el-col>
        </el-row>
        <el-row class="rowStyle">
          <el-col :span="6">
            <img class="icon_style" :src="image_sex">
            <span class="rowStyle_value">性别：{{ detailListData.basicInfo.sex | sex }}</span>
          </el-col>
          <el-col :span="6">
            <img class="icon_style" :src="image_age">
            <span class="rowStyle_value">年龄：{{ detailListData.basicInfo.age }}</span>
          </el-col>
          <el-col :span="6">
            <img class="icon_style" :src="image_class">
            <span class="rowStyle_value">班级：{{ detailListData.basicInfo.dictGradeClassName }}</span>
          </el-col>
          <el-col :span="6">
            <img class="icon_style" :src="image_school">
            <span class="rowStyle_value">学校：{{ detailListData.basicInfo.schoolName }}</span>
          </el-col>
        </el-row>
        <el-row class="rowStyle">
          <el-col :span="6">
            <img class="icon_style" :src="image_sfz">
            <span class="rowStyle_value">身份证：{{ detailListData.basicInfo.identityNo }}</span>
          </el-col>
          <el-col :span="6">
            <img class="icon_style" :src="image_xueji">
            <span
              class="rowStyle_value"
            >学籍状态：{{ detailListData.basicInfo.studentStatus | studentStatus }}</span>
          </el-col>
          <el-col :span="6">
            <img class="icon_style" :src="image_xjh">
            <span class="rowStyle_value">学籍号：{{ detailListData.basicInfo.registerNumber }}</span>
          </el-col>
          <el-col :span="6">
            <img class="icon_style" :src="image_jzbd">
            <span class="rowStyle_value">家长绑定状态：{{ detailListData.bindingStatus | bindingStatus }}</span>
          </el-col>
        </el-row>
        <el-row class="rowStyle">
          <el-col :span="6">
            <img class="icon_style" :src="image_dz">
            <span
              class="rowStyle_value"
            >地址：{{ detailListData.basicInfo.posProvinceName }}{{ detailListData.basicInfo.posCityName }}{{ detailListData.basicInfo.posDistrictName }}</span>
          </el-col>
          <el-col :span="12">
            <img class="icon_style" :src="image_sj">
            <span class="rowStyle_value">绑定手机： {{ detailListData.basicInfo.bindingTel }}</span>
          </el-col>
          <el-col :span="6">
            <a href="#" @click="history" class="rowStyle_value history">历史成绩>></a>
          </el-col>
        </el-row>
      </div>
    </section>

    <div class="test_perform">
      <div :style="{backgroundImage:backgroundImage}" class="test_perform_img">
        <span class="test_perform_num">{{detailListData.healthDetail.healthTestScore}}</span>
        <span style="font-size: 20px; color: #ffd649;">分</span>
        <span class="test_perform_num1">体侧成绩</span>
      </div>
      <div class="test_perform_duibi">
        <img class="icon_style" :src="imageNum">
        <span :class="numLableType">{{numLable}}</span>
        <span class="avgScore">平均分 ({{detailListData.healthDetail.avgScore}}分）</span>
      </div>
    </div>
    <div class="assess">评估</div>
    <hr style="border:0.5px solid #C1DAFB;">
    <el-table :data="detailListData.healthDetail.assessmentDtlList" width="100%" class="test_table">
      <el-table-column
        prop="name"
        label="项目"
        align="center"
        width="200"
        class-name="test_table_column"
      ></el-table-column>
      <el-table-column
        prop="appraise"
        label="评价"
        align="center"
        width="200"
        class-name="test_table_column"
      >
        <template slot-scope="scope">
          <span
            style="vertical-align: middle;font-size:14px;"
          >{{ formatterAppraise(scope.row.appraise).value[0] }}</span>
          <span
            :style="formatterAppraise(scope.row.appraise).style"
          >{{ formatterAppraise(scope.row.appraise).value[1] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="advise"
        label="建议"
        align="center"
        min-width="180"
        class-name="test_table_column"
      ></el-table-column>
    </el-table>
    <div class="tes_zhidao" v-if="imgUrlArr.length>0">
        <h3>指导锻炼</h3>
        <template v-for="(item,index) in imgUrlArr">
          <div :key="index" class="tes_zhidao_img" @click="openDuidance(item)">
            <img class="icon_style" :src="item.coverUrl">
            <span class="tes_zhidao_name">{{item.name}}</span>
          </div>
        </template>
      </div>
    <div v-if="detailListData.healthDetail.haveValue" class="detailListData">
      <div class="healthContent">
        <el-collapse v-model="activeNames">
          <template v-for="(item,index) in detailListData.healthDetail.healthList">
            <el-collapse-item :key="index" :name="index+1">
              <template slot="title">
                <span class="collapse-title-left">{{item.categoryName}}</span>
                <span class="collapse-title-right">
                  异常项:
                  <span
                    v-if="item.abnormalArr.length>0"
                    style="color: #9C4F59;"
                  >{{item.abnormalArr.join("、")}}</span>
                  <span v-else>无</span>
                </span>
                <span class="collapse-title-right">
                  缺测:
                  <span
                    v-if="item.lackArr.length>0"
                    style="color: #9C4F59;"
                  >{{item.lackArr.join("、")}}</span>
                  <span v-else>无</span>
                </span>
              </template>
              <div class="collapse-content">
                <el-table :data="item.physicalTestItemListResponseBeanList" style="width: 100%">
                  <el-table-column prop="name" label="项目" :formatter="formatterTableValue" align="center" min-width="150"></el-table-column>
                  <el-table-column prop="result" label="结果" :formatter="formatterTableValue" align="center" width="160">
                    <template slot-scope="scope">
                        <div v-bind:class="{'physical-unnormal':scope.row.resultInclination==2|| scope.row.resultInclination==3}">
                          <span style="margin-left: 10px">{{ scope.row.result |  formatterTableResult }}</span>
                          <span v-if="scope.row.resultInclination==2">↑</span>
                          <span v-else-if="scope.row.resultInclination==3">↓</span></div>
                      </template>
                  </el-table-column>
                  <el-table-column prop="referenceRange" label="参考范围" :formatter="formatterTableValue" align="center" width="190"></el-table-column>
                  <el-table-column prop="unit" label="单位" :formatter="formatterTableValue" align="center" width="150"></el-table-column>
                  <el-table-column prop="itemScore" label="成绩" :formatter="formatterTableValue" align="center" width="160"></el-table-column>
                  <el-table-column prop="level" label="等级" :formatter="formatterTableValue" align="center" width="200"></el-table-column>
                </el-table>
              </div>
            </el-collapse-item>
          </template>
        </el-collapse>
      </div>
    </div>
    <div v-else>暂无体检报告</div>
  </div>
</template>
<script>
import image_tice_score from "@/assets/imgs/icon_tice_score.png";
// 图片资源
import image_sex from "@/assets/imgs/icon1.png";
import image_age from "@/assets/imgs/icon2.png";
import image_class from "@/assets/imgs/icon6.png";
import image_school from "@/assets/imgs/icon5.png";
import image_xueji from "@/assets/imgs/icon7.png";
import image_sfz from "@/assets/imgs/icon3.png";
import image_xjh from "@/assets/imgs/icon8.png";
import image_jzbd from "@/assets/imgs/icon9.png";
import image_dz from "@/assets/imgs/icon4.png";
import image_sj from "@/assets/imgs/iocn10.png";

export default {
  props: {
    searchData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      backgroundImage:
        "url(" + require("@/assets/imgs/img_class_ala_bg.png") + ")",
      imageNum: "",
      numLable: "",
      numLableType: "",
      image_sex,
      image_age,
      image_class,
      image_school,
      image_xueji,
      image_sfz,
      image_xjh,
      image_dz,
      image_sj,
      image_jzbd,
      abnormalArr: [],
      lackArr: [],
      activeNames: [1],
      image_tice_score,
      detailListData: {
        basicInfo: {},
        healthDetail: {
          haveValue: true,
          healthTestAssessment: "",
          healthTestScore: "",
          avgScore: "",
          healthTestTime: "",
          healthList: [],
          assessmentDtlList: []
        }
      },
      studentData: this.searchData,
      radio1: "体测报告",
      routerData: [],
      imgUrlArr:[]
    };
  },
  methods: {
    history(){
      
    },
    formatterTableValue(row, column, cellValue, index){
      let value=cellValue;
      if(cellValue==null||cellValue==""){
         value="-"
      }else{
        if(column.property=="level"){
          value=this.getLevelName(value);
        }
      }
      return value
    },
    getLevelName(value){
      let val="";
      switch(value){
        case 1:
          val="优秀";
          break;
        case 2:
          val="良好";
          break;
        case 3:
          val="及格";
          break;
        case 4:
          val="不及格";
          break;
        case 5:
          val="正常";
          break;
        case 6:
          val="异常";
          break;
        case 7:
          val="低体重";
          break;
        case 8:
          val="超重";
          break;
        case 9:
          val="肥胖";
          break;
        case 10:
          val="视力正常";
          break;
        case 11:
          val="轻度近视";
          break;
        case 12:
          val="中度近视";
          break;
        case 13:
          val="重度近视";
          break;
        case 14:
          val="阴性";
          break;
        case 15:
          val="阳性";
          break;
        case 16:
          val="强阳性";
          break;
      }
      return val;
    },
    changebaogao() {
      if (this.radio1 == "体检报告") {
      } else {
      }
    },
    showdrop(index) {
      this.detailListData.phyTestItemDtl.physicalTestItemCategoryResponseBeanList[
        index
      ].isShow = !this.detailListData.phyTestItemDtl
        .physicalTestItemCategoryResponseBeanList[index].isShow;
      this.$set(
        this.detailListData.phyTestItemDtl
          .physicalTestItemCategoryResponseBeanList,
        index,
        this.detailListData.phyTestItemDtl
          .physicalTestItemCategoryResponseBeanList[index]
      );
    },
    getFormData() {
      this.$ajax
        .get("/api/auth/v1/physical/stats/student", {
          params: {
            identityNo: this.studentData.identityNo,
            schoolYearStart: this.studentData.schoolYearStart,
            schoolYearEnd: this.studentData.schoolYearEnd
          }
        })
        .then(res => {
          var data = res.data;
          if (data.phyTestItemDtl) {
            this.detailListData.healthDetail.haveValue = true;
            for (name in data.phyTestItemDtl) {
              if (
                typeof this.detailListData.healthDetail[name] != "undefined"
              ) {
                this.detailListData.healthDetail[name] =
                  data.phyTestItemDtl[name];
              }
            }
            this.detailListData.healthDetail.avgScore =
              Number(this.detailListData.healthDetail.avgScore) || 0;
            if (
              this.detailListData.healthDetail.healthTestScore >
              this.detailListData.healthDetail.avgScore
            ) {
              this.numLable = "大于";
              this.numLableType = "num_high";
              this.imageNum = this.icon_compare_high;
            } else if (
              this.detailListData.healthDetail.healthTestScore ==
              this.detailListData.healthDetail.avgScore
            ) {
              this.imageNum = this.icon_compare_equot;
              this.numLable = "等于";
              this.numLableType = "num_equot";
            } else {
              this.imageNum = this.icon_compare_low;
              this.numLable = "小于";
              this.numLableType = "num_low";
            }
            if (data.phyTestItemDtl.physicalTestItemCategoryResponseBeanList) {
              this.detailListData.healthDetail.healthList =
                data.phyTestItemDtl.physicalTestItemCategoryResponseBeanList;
              let listData =
                data.phyTestItemDtl.physicalTestItemCategoryResponseBeanList;
              listData.forEach(item => {
                item.abnormalArr = [];
                item.lackArr = [];
                item.physicalTestItemListResponseBeanList.forEach(item1 => {
                  if (item1.resultInclination != 1) {
                    item.abnormalArr.push(item1.name);
                  }
                  if (!item1.result) {
                    item.lackArr.push(item1.name);
                  }
                });
              });
            } else {
              this.detailListData.healthDetail.healthList = [];
            }
          } else {
            this.detailListData.healthDetail.haveValue = false;
          }
          if (!data.basicInfo) {
            data.basicInfo = {};
          }
          this.detailListData.basicInfo = data.basicInfo;
          this.getRecom();
        });
    },
    getRecom(){
      let params = { testItemId:this.searchData.id };
      this.$ajax.get("/api/auth/v1/guida-point/recom",{
        params:params
      }).then(res=>{
        this.imgUrlArr=res.data.recommendedGuidancePointBeanList;
      })
      
    },
    openDuidance(row){
      this.$emit("open-duidance",row.id);
    },
    formatterAppraise(value) {
      let value1;
      if (value.indexOf("肥胖") >= 0) {
        value1 = value.split("肥胖", 1);
        value1.push("肥胖");
        return { value: value1, style: {
          color:"#b93838",
          fontSize:"14px",
          verticalAlign: "middle"
        } };
      }
      if (value.indexOf("超重") >= 0) {
        value1 = value.split("超重", 1);
        value1.push("超重");
        return { value: value1, style: {
          color:"#4cca4d",
          fontSize:"14px",
          verticalAlign: "middle"
        } };
      }
      if (value.indexOf("标准") >= 0) {
        value1 = value.split("标准", 1);
        value1.push("标准");
        return { value: value1,  style: {
          color:"#409eff",
          fontSize:"14px",
          verticalAlign: "middle"
        }  };
      }
      if (value.indexOf("较轻") >= 0) {
        value1 = value.split("较轻", 1);
        value1.push("较轻");
        return { value: value1,  style: {
          color:"#b93838",
          fontSize:"14px",
          verticalAlign: "middle"
        }  };
      }
      if (value.indexOf("比较好") >= 0) {
        value1 = value.split("比较好", 1);
        value1.push("比较好");
        return { value: value1,style: {
          color:"#409eff",
          fontSize:"14px",
          verticalAlign: "middle"
        } };
      }
      if (value.indexOf("较好") >= 0) {
        value1 = value.split("较好", 1);
        value1.push("较好");
        return { value: value1,style: {
          color:"#409eff",
          fontSize:"14px",
          verticalAlign: "middle"
        } };
      }
      if (value.indexOf("一般") >= 0) {
        value1 = value.split("一般", 1);
        value1.push("一般");
        return { value: value1,style: {
          color:"#74d842",
          fontSize:"14px",
          verticalAlign: "middle"
        } };
      }
      if (value.indexOf("较差") >= 0) {
        value1 = value.split("较差", 1);
        value1.push("较差");
        return { value: value1,  style: {
          color:"#b93838",
          fontSize:"14px",
          verticalAlign: "middle"
        }  };
      }
    },
  },
  watch: {
    searchData(data) {
      this.studentData = data;
      this.getFormData();
    }
  },
  mounted() {
    if (
      localStorage.getItem("routeList") &&
      JSON.parse(localStorage.getItem("routeList")).length != 0
    ) {
      this.$store.commit(
        "ROUTELISTINIT",
        JSON.parse(localStorage.getItem("routeList"))
      );
    } else {
      this.$store.dispatch("AddRouteList", {
        path: `/studentStatsDetail?name=${this.$route.query.name}&id=${
          this.$route.query.id
        }&schoolYear=${this.$route.query.schoolYear}`,
        name: this.$route.query.name
      });
    }
    this.getFormData();
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
    },
    formatterTableResult(val){
      let value=val;
      if(val==null||val==""){
         value="-"
      }
      return value
    }
  }
};
</script>
<style scoped lang="scss">
.detailListData {
  .healthTitle {
    margin: 10px 0px;
    .health_time {
      margin-bottom: 10px;
    }
    .health_grade {
      text-align: center;
      font-size: 19px;
      color: #525252;
      /* height: 25px; */
      padding: 25px 0px;
      border-bottom: 1px solid #c1dafb;
      border-top: 1px solid #c1dafb;
    }
    .assessment {
      .left {
        font-size: 17px;
        width: 80px;
      }
    }
  }
}
.physical-unnormal{
  color: red;
}
.student_detail {
  padding: 0 28px;
  background-color: #fff;
  font-size: 14px;
  color: #6b6b6b;
  line-height: 30px;
  padding-bottom: 30px;
  border-radius: 10px;
  .s_1 {
    margin-bottom: 10px;
  }
  .s_1_head {
    font-size: 16px;
    color: #525252;
    font-weight: 600;
    padding: 10px 0px 20px 0px;
  }
  .user_msg {
    .nick_name {
      color: #1875f0;
      font-size: 38px;
      line-height: 40px;
      margin-bottom: 10px;
    }
    .healthTime {
      text-align: right;
      font-size: 18px;
      margin-top: 18px;
    }
    .rowStyle {
      font-size: 0px;
      .icon_style {
        width: 16px;
        height: 16px;
        margin-right: 10px;
        vertical-align: middle;
      }
      .rowStyle_value {
        font-size: 14px;
        /* color: #333333; */
        vertical-align: middle;
      }
      .history{
        color:rgb(33, 110, 210);
      }
    }
  }

  .test_perform {
    .test_perform_img {
      width: 305px;
      height: 172px;
      padding-top: 39px;
      text-align: center;
      font-size: 0px;
    }
    .test_perform_num {
      font-size: 60px;
      color: #ffd649;
    }
    .test_perform_num1 {
      display: inline-block;
      width: 100%;
      height: 20px;
      color: #e2e2e2;
      line-height: 20px;
      font-size: 16px;
    }
  }
  .test_perform_duibi {
    height: 56px;
    width: 305px;
    line-height: 56px;
    background: #f0f0f0;
    border-radius: 0 0 7px 7px;
    text-align: center;
    img {
      vertical-align: middle;
      margin-right: 5px;
    }
    .num_high {
      color: rgb(247, 77, 106);
      font-size: 23px;
      vertical-align: middle;
      margin-right: 5px;
    }
    .num_equot {
      color: rgb(48, 141, 32);
      font-size: 23px;
      vertical-align: middle;
      margin-right: 5px;
    }
    .num_low {
      color: rgb(33, 110, 210);
      font-size: 23px;
      vertical-align: middle;
      margin-right: 5px;
    }
    .avgScore {
      color: #666666;
      vertical-align: middle;
      height: 22px;
      line-height: 22px;
      display: inline-block;
      padding-top: 3px;
    }
  }
}

.s_1_m > span {
  display: inline-block;
  width: 244px;
}
.s_2_m > span {
  display: inline-block;
  width: 244px;
}
.s_3_m > span {
  display: inline-block;
  width: 244px;
}
.s_3_m > span:last-of-type {
  width: 644px;
}
.btn {
  text-align: center;
  padding: 20px;
  font-size: 0%;
}
.assess {
  font-size: 20px;
  margin-top: 30px;
}
.tes_zhidao {
  width: 100%;
  height: 274px;
  text-align: center;
  border-radius: 6px;
  background: #f5f5f5;
  h3 {
    margin: 0px;
    padding: 24px 26px;
    text-align: left;
  }
  .tes_zhidao_img {
    cursor: pointer;
    vertical-align: middle;
    width: 300px;
    height: 180px;
    display: inline-block;
    border-radius: 6px;
    position: relative;
    img {
      width: 300px;
      height: 180px;
      border-radius: 6px;
    }
    .tes_zhidao_name {
      position: absolute;
      bottom: 0px;
      width: 100%;
      left: 0px;
      height: 30px;
      line-height: 30px;
      background-color: #000000;
      opacity: 0.5;
      -moz-opacity: 0.5;
      -khtml-opacity: 0.5;
      color: white;
      border-radius: 0px 0px 6px 6px;
    }
  }
  .tes_zhidao_img + .tes_zhidao_img {
    margin-left: 20px;
  }
}
</style>
<style lang="scss">
.detailListData {
  .healthContent {
    .el-collapse-item__header {
      background-color: #79b6f8 !important;
      color: #ffffff !important;
      font-weight: bold;
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      padding: 0px 10px;
      .collapse-title-right {
        margin-right: 15px;
        float: right;
        max-width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .el-collapse-item__arrow {
        color: #ffffff;
        font-weight: bold;
        font-size: larger;
        line-height: 40px;
        margin-right: 10px;
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
      }
    }
    .el-collapse-item__content {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
}
.test_table {
  margin-bottom: 30px;
  th.test_table_column {
    background: #f0f0f0;
  }
}
</style>


