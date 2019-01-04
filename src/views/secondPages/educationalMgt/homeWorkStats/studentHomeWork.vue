<template>
    <div class="student_detail">
        <div class="showList"  v-if="formType=='showList'">
            <section class="s_1">
                <div class="s_1_head">
                    学生作业完成情况
                    <!-- <div>
                        <el-button type="primary" size="small">导出</el-button><el-button type="primary" size="small">打印</el-button>
                    </div> -->
                </div>
                <div>
                    <p class="nick_name">{{formData.name}}</p>
                    <p class="s_1_m">
                        <span>性别：{{formData.sex}}</span>
                        <span>有无疾病：{{formData.disease}}</span>
                    </p>
                </div>
            </section>
            <div>
                <el-table
                :data="detailListData"
                style="width: 100%">
                <el-table-column
                    align="center"
                    prop="homeworkStudentId"
                    label="序号"
                    min-width="90">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="homeworkDetails"
                    label="作业详情"
                    min-width="580">
                    <template slot-scope="scope">
                        <span v-for="(item, index) in scope.row.homeworkDetails" :key="item.homeworkLibId">
                            <span @click="showActionDetail(item.homeworkLibId)" class="action_name">{{item.homeworkLibName}}</span>
                            ({{item.exerciseGroupNo+'*'+item.groupTime+(item.groupTimeUnit==1&&'次'||item.groupTimeUnit==2&&'秒'||item.groupTimeUnit==3&&'分')}})
                            <template v-if="index<scope.row.homeworkDetails.length-1">、</template>
                        </span>
                        <!-- {{scope.row.homeworkDetails[0].homeworkLibName}} -->
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="arrangeTime"
                    min-width="180"
                    label="布置时间">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="finishTime"
                    min-width="180"
                    label="完成时间">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="homeworkFeedback"
                    min-width="180"
                    label="作业反馈">
                </el-table-column>
                <el-table-column label="操作" align="center" test="date">
                <template slot-scope="scope">
                    <el-button
                    min-width='180'
                    size="mini"
                    @click="handleEdit(scope.row)">查看</el-button>
                </template>
                </el-table-column>
                </el-table>
            </div>    
            <el-dialog :title="showDialogData.name" :visible.sync="dialogVisible" center>
                <div>
                    <p>练习量： {{showDialogData.exerciseGroupNo}}|每组{{showDialogData.groupTime+(showDialogData.groupTimeUnit==1&&'次'||showDialogData.groupTimeUnit==2&&'秒'||showDialogData.groupTimeUnit==3&&'分')}}</p>
                    <p>适合年级： {{showDialogData.gradeNames}}      适合性别： {{showDialogData.sexName}}</p>
                    <p>所需器材：{{showDialogData.apparatusNames}}    难度：  {{showDialogData.difficultyName}}</p>
                    <p>运动项目： {{showDialogData.sportItemNames}}</p>
                    <p>动作描述：<span class="action_desc" v-html="showDialogData.actionDescription"></span></p>
                </div>
            </el-dialog>   
        </div>
        <div class="showDetail" v-if="formType=='showDetail'">
            <homeworkDetail :search-data="homeworkData" @go-back="formType='showList'"></homeworkDetail>
        </div>
    </div>
</template>
<script>

import homeworkDetail from "./homeWorkDetail";
export default {

  components: {
    homeworkDetail
  },
  props: {
    searchData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      formType:"showList",
      homeworkData:{},
      title: "",
      detailListData: [],
      dialogVisible: false,
      showDialogData: {},
      formData: this.searchData
    };
  },
  methods: {
    handleEdit( row) {
      row.name=this.formData.name;
      row.sex=this.formData.sex;
      row.disease=this.formData.disease;
      this.homeworkData=row;
      this.formType="showDetail";
    },
    showDetail(data) {
      this.showDialogData = data;
      this.dialogVisible = true;
    },
    showActionDetail(id) {
      this.$ajax
        .get("/api/auth/v1/homework/statistics/homeworkLib/" + id)
        .then(res => {
          this.showDialogData = res.data;
          this.dialogVisible = true;
        });
    },
    getFormData() {
      this.$ajax
        .get("/api/auth/v1/homework/statistics/student", {
          params: {
            studentId: this.formData.id,
            startDateStr: this.formData.startDateStr,
            endDateStr: this.formData.endDateStr
          }
        })
        .then(res => {
          this.detailListData = res.data; // 暂时没有返回数组
        });
    }
  },
  watch: {
    searchData(data) {
        this.formType="showList";
      this.formData = data;
      this.title = data.titleName;
      this.getFormData();
    }
  },
  mounted() {
      this.getFormData();
  }
};
</script>
<style scoped>
.action_name {
  text-decoration: underline;
  color: #1875f0;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
}
.nick_name {
  color: #1875f0;
  font-size: 38px;
}
.showList {
  padding: 10px 28px;
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
</style>
<style>
.action_desc img {
  width: 100%;
}
</style>


