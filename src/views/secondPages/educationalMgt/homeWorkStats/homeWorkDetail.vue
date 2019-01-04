<template>
    <div class="detail_list">
        <h2>个人作业详情</h2>
        <p class="stu">
            <span>姓名：{{formData.name}}</span>
            <span>性别：{{formData.sex}}</span>
            <span>疾病：{{formData.disease}}</span>
        </p>
        <div class="homework_detail">
            <p class="title">作业详情</p>
            <div class="item" v-for="item in detailData.studentHomeworkLibList" :key="item.homeworkLibId">
                <p class="item_title" @click="showActionDetail(item.homeworkLibId)">{{item.homeworkLibName}}</p>
                <p class="desc"><span>练习量:{{item.exerciseGroupNo}}组  </span> 每组{{item.groupTime+(item.groupTimeUnit==1&&'次'||item.groupTimeUnit==2&&'秒'||item.groupTimeUnit==3&&'分')}}</p>            
            </div>
            <p class="desc_fu">作业说明:{{detailData.homeworkExplain||'暂无作业说明'}}</p>
            <p class="title">作业反馈</p>
            <p class="feedback">
                <span>完成时间:{{detailData.finishTime}}</span>
                <span>作业反馈:{{detailData.homeworkFeedback}}</span>
                <span>视频查看:{{detailData.isVideoView==1&&'已查看'||detailData.isVideoView==2&&'未查看'}}</span>
            </p>
            <p class="feedback_text">
                文字反馈： {{detailData.textFeedback||'暂无文字反馈'}}
            </p>
        </div>
        <div class="row-btn">        
             <el-button type="primary" @click="goBack" size="mini">返回</el-button>
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
      detailData: {},
      dialogVisible: false,
      showDialogData: {},
      formData: this.searchData
    };
  },
  methods: {
    handleEdit(index, data) {
      this.$router.push({
        name: "homeWorkDetail",
        query: Object.assign(
          {},
          {
            actioniId: data[index].id
          },
          this.$route.query
        )
      });
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
    goBack(){
        this.$emit("go-back",{});
    },
    getFormData() {
      this.$ajax
        .get("/api/auth/v1/homework/statistics/studentHomework", {
          params: {
            homeworkStudentId: this.formData.homeworkStudentId
          }
        })
        .then(res => {
          this.detailData = res.data; // 暂时没有返回数组
        });
    }
  },
  watch: {
    searchData(data) {
      this.formData = data;
      this.getFormData();
    }
  },
  mounted() {
    this.getFormData();
  }
};
</script>

<style scoped>
.row-btn{
    text-align: center;
    margin: 10px 0px;
}
p {
  margin: 0;
  font-size: 14px;
  color: #6b6b6b;
}
.detail_list {
  background-color: #fff;
  height: 750px;
  padding: 26px 0 0 31px;
  height: 757px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(179, 179, 179, 0.2);
}
h2 {
  font-size: 16px;
  color: #000;
  font-weight: 600;
}
.stu {
  margin: 36px 0 39px;
  font-size: 14px;
  color: #6b6b6b;
}
.stu span {
  margin-right: 39px;
}
.title {
  color: #333;
  border-left: 2px solid #1875f0;
  padding-left: 7px;
  margin-bottom: 27px;
}
.item {
  margin-bottom: 20px;
}
.item_title {
  color: #1875f0;
  text-decoration: underline;
  margin-bottom: 15px;
  cursor: pointer;
}
.desc span {
  position: relative;
  padding-right: 13px;
  margin-right: 13px;
}
.desc span::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
  background-color: #d9d9d9;
}
.desc_fu {
  margin-bottom: 40px;
}
.feedback {
  margin-bottom: 19px;
}
.feedback span {
  margin-right: 40px;
}
</style>
<style>
.action_desc img {
  width: 100%;
}
</style>
