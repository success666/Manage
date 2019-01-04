<template>
    <div class="teacher_detail">
        <section class="s_1">
            <div class="s_1_head">
                <p class="copy">
                    <el-button type="primary" size="small">导出</el-button><el-button type="primary" size="small">打印</el-button>
                </p>
                <template v-if="detailListData.logoUrl">
                    <img :src="detailListData.logoUrl" />
                </template>
                <template v-else>
                    <img src="../../../../assets/imgs/user_icon.png" />
                </template>
                <div>
                    <p>{{  detailListData.name  }}</p>
                    <p>{{  detailListData.nativePlaceProvinceName  }}{{  detailListData.nativePlaceCityName  }}</p>
                </div>
            </div>
            <div class="img">
                <div>
                    {{  detailListData.educationDegreeName  }}
                </div>
                <div>
                    {{  detailListData.teacherProfessionalTitleName  }}
                </div>
                <div>
                    {{  detailListData.workExperience  }}年
                </div>
            </div>
        </section>
        <section class="s_2">
            <p class="s_2_title"><span>//</span>个人信息</p>
            <p class="info">
                <span><i class="sexImg iconImg"></i>性别：{{  detailListData.sex | sex  }}</span>
                <span><i class="birthImg iconImg"></i>出生日期：{{  detailListData.birthdate | dateFormat('yyyy-MM-dd')  }}</span>
                <span><i class="phoneImg iconImg"></i></i>{{  detailListData.tel  }}</span>
            </p>
            <p class="s_2_title"><span>//</span>工作信息</p>
            <p class="info main">
                <span>学年度：{{  detailListData.schoolYearStart  }}-{{  detailListData.schoolYearEnd  }}</span>
                <span>地区：{{  $route.query.posProvinceName  }}{{  $route.query.posCityName  }}{{  $route.query.posDistrictName  }}</span>
                <span>学校：{{  $route.query.schoolName  }}</span>
            </p>
            <p class="info main">
                <span>岗位：{{  detailListData.post | post  }}</span>
                <span>在职状态：{{  detailListData.status | status  }}</span>
                <span>入职时间：{{  detailListData.entryDate  | dateFormat('yyyy-MM-dd')  }}</span>
            </p>
            <div class="info renzhi">
                <span>任职班级：</span><span>一年级：{{  detailListData.classNames  }}</span>
            </div>
            <p class="s_2_title"><span>//</span>荣誉与成就</p>
            <div class="honer">
                <span></span>
                荣誉：
            </div>

            <template v-if="detailListData.teacherHonorDtlList&&detailListData.teacherHonorDtlList.length>0">
                <p class="honer_list" v-for="n in detailListData.teacherHonorDtlList">
                    <span>{{  n.matchName  }}({{  n.honourDegreeName  }}）</span>
                </p>
            </template>
            <template v-else>
                <p class="honer_list">暂无数据</p>
            </template>
            
            <div class="honer">
                <span></span>
                论文/优秀教案：
            </div>

            <template v-if="detailListData.teacherTreatiseDtlList&&detailListData.teacherTreatiseDtlList.length>0">
                <p class="honer_list" v-for="n in detailListData.teacherTreatiseDtlList">
                    <span>{{  n.name  }}</span>
                    <span><a :href="n.opusUrl" target="_blank"><i class="linkImg iconImg"></i>{{ n.opusUrl | interceptingTheName }}</a></span>
                </p>
            </template>
            <template v-else>
                <p class="honer_list">暂无数据</p>
            </template>
        </section>
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
      detailListData: {},
      formData: this.searchData
    };
  },
  watch: {
    searchData(data) {
      this.formData = data;
      getData(this);
    }
  },
  mounted() {
    getData(this);
  },
  filters: {
    interceptingTheName(url) {
      if (url) {
        var urlArr = url.split("?");
        var k = urlArr[0];
        var appU = k.split("/");
        return appU[appU.length - 1];
      } else {
        return "";
      }
    },
    status(v) {
      if (v == 1) {
        return "在职";
      } else {
        return "离职";
      }
    },
    post(v) {
      if (v == 1) {
        return "体育教师";
      } else {
        return "校医 ";
      }
    }
  }
};
function getData(vm) {
  vm.$ajax
    .get("/api/auth/v1/resourceMgmt/teacher/stats/teacherDtl", {
      params: {
        name: vm.formData.name,
        schoolYear: vm.formData.schoolYear,
        schoolId: vm.formData.schoolId
      }
    })
    .then(res => {
      if (!res.data) {
        vm.$message({
          message: "查询不到姓名为：" + vm.formData.name + "的老师",
          type: "error"
        });
        return;
      }
      vm.detailListData = res.data;
    });
}
</script>
<style scoped>
.teacher_detail {
  padding: 30px 30px 10px;
  background-color: #fff;
  font-size: 14px;
  color: #6b6b6b;
  line-height: 30px;
  border-bottom: 14px solid #f0f0f0;
}
.s_1_head {
  overflow: hidden;
  position: relative;
}
.copy {
  position: absolute;
  right: 0;
}
.s_1_head > img {
  float: left;
  width: 107px;
  height: 109px;
}
.clear {
  clear: both;
}
.s_1_head > div {
  float: left;
}
.s_1_head > div p {
  padding: 0;
  margin-left: 36px;
}
.s_1_head > div p:first-of-type {
  color: #1875f0;
  font-size: 38px;
  margin: 43px 0 10px 36px;
}
.s_1_head > div p:last-of-type {
  font-size: 14px;
  color: #333;
  margin: 0 0 0 36px;
}
.img {
  overflow: hidden;
}
.img > div {
  float: left;
  width: 84px;
  height: 88px;
  line-height: 88px;
  text-align: center;
  margin: 43px 61px 44px 0;
  border: 1px solid #e8e8e8;
  border-radius: 50%;
}
.s_2_title {
  font-size: 18px;
  color: #333;
}
.s_2_title > span {
  font-size: 20px;
  color: #2e89e6;
  font-weight: 600;
  vertical-align: middle;
  margin-right: 10px;
}
.el-icon-phone {
  color: #227bf1;
}
.info {
  padding-left: 20px;
}
.info > span {
  font-size: 14px;
  color: #333;
}
.info > span:nth-of-type(2) {
  margin: 0 78px;
}

.renzhi > span:last-of-type {
  margin-left: 0;
}
.renzhi p {
  margin: 0 0 0 70px;
}
.main {
  margin: 0;
}
.honer {
  font-size: 16px;
  color: #333;
}
.honer > span {
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #2e89e6;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 12px;
}
.honer_list {
  padding-left: 25px;
  font-size: 14px;
  color: #333;
}
.honer_list > span:nth-child(2) {
  color: #1875f0;
  margin-left: 41px;
}
.iconImg {
  display: inline-block;
  width: 20px;
  height: 18px;
  vertical-align: -2px;
  margin-right: 10px;
  background-size: contain;
  background-repeat: no-repeat;
}
.sexImg {
  background-image: url(../../../../assets/imgs/icon1.png);
}
.birthImg {
  background-image: url(../../../../assets/imgs/icon11.png);
}
.phoneImg {
  background-image: url(../../../../assets/imgs/icon12.png);
}
.linkImg {
  background-image: url(../../../../assets/imgs/icon14.png);
  width: 16px;
  height: 14px;
  margin-right: 5px;
}
</style>

