<template>
    <div class="address">
        <span class="titleSpan">地区：</span>
            <el-select
            size="mini"
            v-model="searchData.NposProvinceId.value"
            @change="getCity"
            placeholder="请选择省">
            <el-option
                v-for="item in NposProvinceIdList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
            </el-select>
            <el-select
            v-model="searchData.NposCityId.value"
            size="mini"
            @change="getStreet"
            placeholder="请选择市">
            <el-option
                v-for="item in NposCityIdList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
            </el-select>
            <el-select
            v-model="searchData.NposDistrictId.value"
            size="mini"
            @change="getSchool"
            placeholder="请选择区/县">
            <el-option
                v-for="item in NposDistrictIdList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
            </el-select>
        <span class="titleSpan">学校类型：</span>
            <el-select
            v-model="searchData.NschoolTypeId.value"
            size="mini"
            @change="getSchool1"
            placeholder="请选择">
            <el-option
                v-for="item in NschoolTypeIdList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
            </el-select>
        <span class="titleSpan">学校：</span>
            <el-select
            v-model="searchData.NschoolId.value"
            size="mini"
            @change="changeSchool"
            placeholder="请选择学校">
            <el-option
                v-for="item in NschoolList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
            </el-select>
    </div>
</template>
<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      searchData:{
        NposProvinceId: {value:"001",name:""},
        NposCityId:  {value:"",name:""},
        NposDistrictId:  {value:"",name:""},
        NschoolTypeId:  {value:"",name:""},
        NschoolId:  {value:"",name:""},
      },
      NposProvinceIdList: [],
      NposCityIdList: [],
      NposDistrictIdList: [],
      NschoolTypeIdList: [],
      NschoolList: []
    };
  },
  methods: {
    getProvince() {
      let chinaArea=sessionStorage.getItem("chinaArea");
      if(!chinaArea){
        this.$ajax("api/auth/v1/chinaArea/0").then(res => {
          chinaArea=[{id:"001",name:"全部"}].concat(res.data);
          this.NposProvinceIdList=chinaArea;
          sessionStorage.setItem("chinaArea",JSON.stringify(chinaArea));
          //this.sheng1 = res.data;
        });
      }else{
        this.NposProvinceIdList=JSON.parse(chinaArea);
      }
    },
    getSchoolType() {
      this.$ajax("api/auth/v1/school/type").then(res => {
        this.NschoolTypeIdList = [{id:"",name:"全部"}].concat(res.data);
      });
    },
    getCity(id,type) {
      if(typeof type=="undefined"){
        this.searchData.NposCityId.value = "";
        this.searchData.NposDistrictId.value = "";
        this.searchData.NschoolId.value = "";
      }
      let obj = this.NposProvinceIdList.find(item => {
        return item.id == id;
      });
      obj.value=obj.id;
      for(name in obj){
        this.searchData.NposProvinceId[name]=obj[name]
      }
      this.$ajax("api/auth/v1/chinaArea/" + obj.code).then(res => {
        this.NposCityIdList = res.data;
      });
    },
    getStreet(id,type) {
      if(typeof type=="undefined"){
        this.searchData.NposDistrictId.value = "";
        this.searchData.NschoolId.value = "";
      }
      let obj = {};
      obj = this.NposCityIdList.find(item => {
        return item.id == id;
      });
      obj.value=obj.id;
      for(name in obj){
        this.searchData.NposCityId[name]=obj[name]
      }
      this.$ajax("api/auth/v1/chinaArea/" + obj.code).then(res => {
        this.NposDistrictIdList = res.data;
      });
    },
    getSchool(id,type) {
      if(typeof type=="undefined"){
        this.NschoolId = "";
      }
      let obj = {};
      obj = this.NposDistrictIdList.find(item => {
        return item.id == id;
      });
      obj.value=obj.id;
      for(name in obj){
        this.searchData.NposDistrictId[name]=obj[name]
      }
      request.get("api/auth/v1/school/list").then(res => {
        this.NschoolList = res.data;
      });
    },
    getSchool1(id){
      this.NschoolId = "";
      let obj = {};
      obj = this.NschoolTypeIdList.find(item => {
        return item.id == id;
      });
      obj.value=obj.id;
      for(name in obj){
        this.searchData.NschoolTypeId[name]=obj[name]
      }
      this.$ajax("api/auth/v1/school/list", {
        params: {
          posProvinceId: this.searchData.NposProvinceId.id,
          posCityId: this.searchData.NposCityId.id,
          posDistrictId: this.searchData.NposDistrictId.id,
          schoolTypeId: this.searchData.NschoolTypeId.value || ""
        }
      }).then(res => {
        this.NschoolList = res.data;
      });
    },
    changeSchool(id){
      let obj = {};
      obj = this.NschoolList.find(item => {
        return item.id == id;
      });
      obj.value=obj.id;
      for(name in obj){
        this.searchData.NschoolId[name]=obj[name]
      }
    },
    getData(){
      let searchData={};
      for(name in this.searchData){
          if(this.searchData[name].value!=""){
            searchData[name]=this.searchData[name];
          }
      }
      return searchData;
    },
    setData(data){
      for(name in data){
        if(this.searchData[name]){
          this.searchData[name].value=data[name]
        }
      }
    },
    clearData(){
      for(name in this.searchData){
        this.searchData[name].value="";
      }
      this.searchData.NposProvinceId.value="001";
    }
  },
  mounted() {
    this.getProvince();
    this.getSchoolType(); // 获取学校类型
  }
};
</script>
<style lang="scss" scoped>
.address{
  margin-bottom: 10px;
  .titleSpan{
    font-size: 14px;
  }
}
</style>
