<template>
    <div class="student_detail">
        <section class="s_1">
            <div class="s_1_head">
                学生信息详情
                <!-- <div>
                    <el-button type="primary" size="small">导出</el-button><el-button type="primary" size="small">打印</el-button>
                </div> -->
            </div>
            <div>
                <p class="nick_name">{{  detailListData.basicInfo.name  }}</p>
                <p class="s_1_m">
                    <span>性别：{{  detailListData.basicInfo.sex | sex  }}</span>
                    <span>年龄：{{  detailListData.basicInfo.age  }}</span>
                    <span>身份证：{{  detailListData.basicInfo.identityNo  }}</span>
                    <span>{{  detailListData.basicInfo.posProvinceName  }}{{  detailListData.basicInfo.posCityName  }}{{  detailListData.basicInfo.posDistrictName  }}</span>
                </p>
                <p class="s_2_m">
                    <span>{{  detailListData.basicInfo.schoolName  }}</span>
                    <span>班级：{{  detailListData.basicInfo.dictGradeClassName  }}</span>
                    <span>学籍状态：{{  detailListData.basicInfo.studentStatus | studentStatus  }}</span>
                    <span>学籍号：{{  detailListData.basicInfo.registerNumber  }}</span>
                </p>
                <p class="s_3_m">
                    <span>家长绑定状态：{{  detailListData.bindingStatus | bindingStatus  }}</span>
                    <span>绑定手机： {{  detailListData.basicInfo.bindingTel  }}</span>
                </p>

            </div>
        </section>
        <div>
            <div class="btn">
                <el-button size="mini">体测报告</el-button>
                <el-button  size="mini" type="primary">体检报告</el-button>
            </div>
            <div>
                体检时间：{{  detailListData.phyTestItemDtl.healthTestTime | dateFormat('yyyy/MM/dd')  }}
            </div>
            <div>
                <template v-for="(item,index) in detailListData.phyTestItemDtl.physicalTestItemCategoryResponseBeanList">
                    <div class="drop_down" @click="showdrop(index)">
                        <span>{{  item.categoryName  }}</span>
                        <span class="fr">
                            异常项：  
                            <template v-for="n in item.physicalTestItemListResponseBeanList">
                                <span v-if="n.resultInclination!=1">{{  n.name  }}</span>
                            </template>
                            <i class="el-icon-arrow-down"></i>
                        </span>
                    </div>
                    <el-table v-show="item.isShow"
                        :data="item.physicalTestItemListResponseBeanList"
                        style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="项目"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="result"
                            label="结果"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            min-width="180"
                            prop="referenceRange"
                            label="参考范围">
                        </el-table-column>
                        <el-table-column
                             min-width="180"
                            prop="unit"
                            label="单位">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="等级">
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </div>
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
      detailListData: {
        basicInfo: {},
        phyTestItemDtl: {
          physicalTestItemCategoryResponseBeanList: []
        }
      },
      formData: this.searchData
    };
  },
  methods: {
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
            identityNo: this.formData.identityNo,
            schoolYearStart: this.formData.schoolYearStart,
            schoolYearEnd: this.formData.schoolYearEnd
          }
        })
        .then(res => {
          var data = res.data;
          if (data.phyTestItemDtl) {
            if (data.phyTestItemDtl.physicalTestItemCategoryResponseBeanList) {
              for (
                let i = 0;
                i <
                data.phyTestItemDtl.physicalTestItemCategoryResponseBeanList
                  .length;
                i++
              ) {
                if (i == 0) {
                  data.phyTestItemDtl.physicalTestItemCategoryResponseBeanList[
                    i
                  ].isShow = true;
                } else {
                  data.phyTestItemDtl.physicalTestItemCategoryResponseBeanList[
                    i
                  ].isShow = false;
                }
              }
            } else {
              data.phyTestItemDtl.physicalTestItemCategoryResponseBeanList = [];
            }
          } else {
            data.phyTestItemDtl = {
              physicalTestItemCategoryResponseBeanList: []
            };
          }
          if (!data.basicInfo) {
            data.basicInfo = {};
          }
          this.detailListData = data;
        });
    }
  },
  watch:{
    searchData(data) {
      this.formData = data;
      this.getFormData();
    }
  },
  mounted() {
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
    }
  }
};
</script>
<style scoped>
.nick_name {
  color: #1875f0;
  font-size: 38px;
}
.student_detail {
  padding: 0 28px;
  background-color: #fff;
  font-size: 14px;
  color: #6b6b6b;
  line-height: 30px;
  padding-bottom: 30px;
}
.s_1_head {
  line-height: 80px;
  font-size: 16px;
  color: #525252;
  font-weight: 600;
}
.s_1_head > div {
  float: right;
}
.s_1,
.s_2 {
  border-bottom: 1px solid #e7f3ff;
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
.btn button {
  margin: 0;
  border-radius: 0;
  display: inline-block;
}
/* .btn button:first-of-type{
    color: 
} */
.drop_down {
  background-color: #84bef9;
  color: #fff;
  line-height: 35px;
  font-size: 16px;
  padding: 0 28px;
  margin-top: 18px;
}
.drop_down i {
  vertical-align: middle;
}
.fr {
  float: right;
}
.drop_down .fr span:after {
  content: ",";
}
.drop_down .fr span:nth-last-child(2):after {
  content: "";
}
</style>

