<template>
  <div class="linkage">
    <div class="select">
        <span class="titleSpan">地区：</span>
            <el-select
            size="mini"
            v-model="NposProvinceId"
            @change="changeSheng"
            placeholder="请选择省">
            <el-option
                v-for="item in NposProvinceIdList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
            </el-select>
            <el-select
            v-model="NposCityId"
            size="mini"
            @change="changeShi"
            placeholder="请选择市">
            <el-option
                v-for="item in NposCityIdList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
            </el-select>
            <el-select
            v-model="NposDistrictId"
            size="mini"
             @change="changeQu"
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
            v-model="NschoolTypeId"
            @change="changeSchoolType"
            size="mini"
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
            v-model="NschoolId"
            @change="changeSchool"
            size="mini"
            placeholder="请选择学校">
            <el-option
                v-for="item in NschoolList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
            </el-select>
          <template v-if="cervixStats">
            <span class="titleSpan">学生：</span><el-input v-model="NidentityNo" placeholder="请输入学生身份证号/护照号/学籍号" size="mini"></el-input>
          </template>
         <span class="search" v-if="schoolStats">
           <el-button type="primary" size="mini" @click="getAllQueryData">查询</el-button>
          <el-button type="primary" size="mini" @click="resetAllQueryData">重置</el-button>  
        </span> 
    </div>
    <div class="indicators" v-if="cervixStats">
      <span>指标：</span>
        <template v-if="!showMoreIndicators">
            <span class="heath">综合体质：</span>
            <el-select
            name="heath"
            v-model="NtestItemLevel"
            size="mini"
            placeholder="请选择">
            <el-option
                v-for="item in testItemLevelArr"
                :key="item.id"
                :label="item.label"
                :value="item.value">
            </el-option>
            </el-select>
            <span class="heathMore" @click="changeInindicators(true)">更多<i class="el-icon-arrow-down"></i></span>
        </template>
        <template v-else>
            <span class="heath indicatorsMoreLabel">体重</span>
                <el-select
                name="heath"
                v-model="NbodyMassIndexLevel"
                size="mini"
                placeholder="请选择">
                <el-option
                    v-for="item in bodyMassIndexLevelArr"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value">
                </el-option>
                </el-select>
             <span class="heath indicatorsMoreLabel">视力</span>
                <el-select
                name="heath"
                v-model="NeyeEyesightLevel"
                size="mini"
                placeholder="请选择">
                <el-option
                    v-for="item in eyeEyesArr"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value">
                </el-option>
                </el-select>
              <span class="heath indicatorsMoreLabel">脊柱侧弯</span>
                <el-select
                name="heath"
                v-model="NtorsoTiltAngleLevel"
                size="mini"
                placeholder="请选择">
                <el-option
                    v-for="item in torsoTiltArr"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value">
                </el-option>
                </el-select>   
              <span class="heathMore" @click="changeInindicators(false)">隐藏<i class="el-icon-arrow-up"></i></span>

              <!-- 二级分类 -->
              <div class="indicatorsDiv">
                  <span class="heath indicatorsMoreLabel">50米跑</span>
                <el-select
                name="heath"
                v-model="NfiftyMeterRunLevel"
                size="mini"
                placeholder="请选择">
                <el-option
                    v-for="item in fiftyMeterRunLevelArr"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value">
                </el-option>
                </el-select><span class="heath indicatorsMoreLabel">50x8往返跑</span>
                <el-select
                name="heath"
                v-model="NfiftyByEightShuttleRunLevel"
                size="mini"
                placeholder="请选择">
                <el-option
                    v-for="item in fiftyMeterRunLevelArr"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value">
                </el-option>
                </el-select><span class="heath indicatorsMoreLabel">800米跑</span>
                <el-select
                name="heath"
                v-model="NeightHundredMeterRunLevel"
                size="mini"
                placeholder="请选择">
                <el-option
                    v-for="item in fiftyMeterRunLevelArr"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value">
                </el-option>
                </el-select>

                <span class="heath indicatorsMoreLabel">1000米跑</span>
                <el-select
                name="heath"
                v-model="NoneThousandMeterRunLevel"
                size="mini"
                placeholder="请选择">
                <el-option
                    v-for="item in fiftyMeterRunLevelArr"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value">
                </el-option>
                </el-select>
              </div>
               <!-- 二级分类 -->


              <!-- 三级分类 -->
              <div class="indicatorsDiv">
                <span class="heath indicatorsMoreLabel">一分钟跳绳</span>
                <el-select
                  name="heath"
                  v-model="NoneMinuteRopeSkippingLevel"
                  size="mini"
                  placeholder="请选择">
                  <el-option
                      v-for="item in fiftyMeterRunLevelArr"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
                <span class="heath indicatorsMoreLabel">一分钟仰卧起坐 </span>
                <el-select
                  name="heath"
                  v-model="NoneMinuteAbdominalCurlLevel"
                  size="mini"
                  placeholder="请选择">
                  <el-option
                      v-for="item in fiftyMeterRunLevelArr"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
                <span class="heath indicatorsMoreLabel">引体向上</span>
                <el-select
                  name="heath"
                  v-model="NupwardsLevel"
                  size="mini"
                  placeholder="请选择">
                  <el-option
                      v-for="item in fiftyMeterRunLevelArr"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
                <span class="heath indicatorsMoreLabel">立定跳远</span>
                <el-select
                  name="heath"
                  v-model="NstandingLongJumpLevel"
                  size="mini"
                  placeholder="请选择">
                  <el-option
                      v-for="item in fiftyMeterRunLevelArr"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <!-- 三级分类 -->

              <!-- 四级分类 -->
                <div class="indicatorsDiv">
                    <span class="heath indicatorsMoreLabel">肺活量</span>
                    <el-select
                      name="heath"
                      v-model="NlungCapacityLevel"
                      size="mini"
                      placeholder="请选择">
                      <el-option
                          v-for="item in fiftyMeterRunLevelArr"
                          :key="item.id"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>

                    <span class="heath indicatorsMoreLabel">坐位体前屈</span>
                    <el-select
                      name="heath"
                      v-model="NsittingAndFlexionLevel"
                      size="mini"
                      placeholder="请选择">
                      <el-option
                          v-for="item in fiftyMeterRunLevelArr"
                          :key="item.id"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                </div>
              <!-- 四级分类 -->
        </template>
    </div>
    <div class="second" v-if="studentStats || teacherStats || cervixStats || equipmentStats||homeWorkStats||siteStats||wisdomStats">
      <template v-if="studentStats||teacherStats||equipmentStats||siteStats">
        <span>学年度：</span>
          <el-select
          v-model="NschoolYear"
          size="mini">
          <el-option
              v-for="item in NschoolYearList"
              :key="item.value"
              :label="item.value"
              :value="item.value">
          </el-option>
          </el-select>
      </template>

      <template v-if="cervixStats">
        <!-- 可多选的学年度 -->
        <div ref="schoolYearRef">
          <span>学年度：</span>
          <el-select v-model="NschoolYearArr" multiple placeholder="请选择学年"  size="mini"
              @change="schoolYearArrChange"
              style="margin-left: 20px;" class="schoolYearClass">
            <el-option
              v-for="item in NschoolYearList"
              :key="item.value"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </template>

        <template v-if="equipmentStats">
          <span style="margin-left: 20px;">指标：</span>
          <el-select v-model="NequipmentIds" multiple placeholder="请选择"  size="mini">
            <el-option
              v-for="item in NequipmentIdsList"
              :key="item.value"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </template>

        <template v-if="siteStats">
          <span style="margin-left: 20px;">指标：</span>
          <el-select v-model="NfieldIds" multiple placeholder="请选择"  size="mini">
            <el-option
              v-for="item in NfieldIdsList"
              :key="item.value"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </template>

        <template v-if="homeWorkStats||wisdomStats">
          <span class="demonstration">日期：</span>
          <!-- {{date}} -->
          <el-date-picker
            v-model="date"
            size="mini"
            type="daterange"
            @change="dateChage"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>

          <!-- <el-radio v-model="timeRadio" label="1">近两周</el-radio>
          <el-radio v-model="timeRadio" label="2">近一个月</el-radio>
          <el-radio v-model="timeRadio" label="3">近三个月</el-radio> -->
          
          <template v-if="wisdomStats">
            <span style="margin-left: 20px;">指标：</span>
            <el-select v-model="wisdomIndicators" placeholder="请选择"  size="mini">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </template>

        <!-- <el-input v-model="Nname" placeholder="请输入学生教师姓名" size="mini" v-if="teacherStats"></el-input>   -->
        <span class="search">
           <el-button type="primary" size="mini" @click="getAllQueryData">查询</el-button>
          <el-button type="primary" size="mini" @click="resetAllQueryData">重置</el-button>  
        </span>  
    </div>
  </div> 
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {
  TESTITEMLEVEL1,
  BODYMASSINDEXLEVEL,
  FIFTYMETERRUNLEVEL,
  EYEEYES,
  TORSOTILT,
  GETYEARLIST
} from "@/utils/comData";

export default {
  props: [
    'studentStats','teacherStats','schoolStats','cervixStats','equipmentStats','homeWorkStats','siteStats','wisdomStats'
  ],
  data () {
    return {
      //  N 开头 的都是 这个组件的组内数据 之所有多加一个N而不是直接用vuexdata,是因为select 绑定的值会改变 vuex的值不能直接被改变而报错
      //  N 开头 的都是 这个组件的组内数据
      //  N 开头 的都是 这个组件的组内数据

      NposProvinceIdList: [],// 省列表
      NposCityIdList: [], // 市列表
      NposDistrictIdList: [], // 区列表
      NschoolTypeIdList: [], // 学校类型列表
      NschoolYearList: [], // 学年度列表
      NschoolList: [], // 学校列表
      NproductDataList: [], // 各接口数据（省市区等返回的信息详情） 
      NposProvinceIdName: '',// 省名称
      NposCityIdName: '',// 市名称
      NposDistrictIdName: '',// 区名称
      NschoolTypeIdName: '', //学校类型名称
      NschoolName: '', // 学校列表名称
      Nname: '', // 教师名称
    

      NposProvinceId: '', // 省
      NposCityId: '', // 市
      NposDistrictId: '', // 区
      NschoolTypeId: '', // 学校类型
      NschoolYear: '', // 学年度
      NschoolId: '', // 学校
      NschoolYearArr: [], // 学年度集合
      NidentityNo: '', // 学生证件号码
      NequipmentId: '', // 器材id 

      NposProvinceCode: '' ,//省code
      NposCityCode: '' ,//省code
      NposDistrictCode: '' ,//省code

      // 体侧统计 更多选项
      NtestItemLevel: '', //综合体质 默认为合格 
      NbodyMassIndexLevel: '', //体重
      NoneThousandMeterRunLevel: '', //1000米跑
      NoneMinuteRopeSkippingLevel: '', //1分钟跳绳
      NsittingAndFlexionLevel: '', //坐位体前屈
      NfiftyMeterRunLevel: '', //50米跑
      NlungCapacityLevel: '', //肺活量
      NquietHeartRateLevel: '', //安静心率
      NsystolicPressureLevel: '', //收缩压
      NdiastolicBloodPressureLevel: '', //舒张压
      NeyeEyesightLevel: '', //视力
      NoneMinuteAbdominalCurlLevel: '', //1分钟仰卧起坐
      NfiftyByEightShuttleRunLevel: '', //50*80往返跑
      NstandingLongJumpLevel: '', //立定跳远
      NupwardsLevel: '', //引体向上
      NeightHundredMeterRunLevel: '', //800米跑
      NtorsoTiltAngleLevel: '', //背脊侧弯

      NfieldIds: '', // 场地类型
      NfieldIdsList: [],
      NequipmentIds: '', //器材类型
      NequipmentIdsList: [], 


      nIdentityNo: '', // 学生证件号码
      sheng1:'', // 省的数据列表
      sheng: '',// 当前选中的省
      shi: '',// 当前选中的市
      shi1: '',// 市的数据列表
      qu: '',// 当前选中的区
      qu1: [],// 区的数据列表
      yearList: [],// 学年度列表集合 10年内的
      nSchoolTyle: '', //n 开头 的都是 这个组件的组内数据  学校类型
      nSchool: '', // 学校
      schoolYear: [],
      academicYear: '',
      city:'',
      block:'',
      schoolArr:[],
      date: [],
      timeRadio: '',
      pickerOptions: {
          shortcuts: [{
            text: '近两周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      options3: [{
          value: 0,
          label: '体育课堂平均运动时长'
        }, {
          value: 1,
          label: '体育课堂平均运动消耗'
        }], 
      value5: '',
      value6: '',
      wisdomIndicators: 0,
      schoolTypeArr: [],
      teacherName: '',
      heathValue: '请选择',
      showMoreIndicators: false,
      testItemLevelArr: TESTITEMLEVEL1,
      fiftyMeterRunLevelArr:FIFTYMETERRUNLEVEL,
      eyeEyesArr:EYEEYES,
      bodyMassIndexLevelArr:BODYMASSINDEXLEVEL,
      torsoTiltArr:TORSOTILT


    }
  },
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
      'posProvinceIdList',
      'posCityIdList',
      'posDistrictIdList',
      'schoolTypeIdList',
      'schoolList',
      'pageSelectArr',
      'defaultClassification',
      'posProvinceId',
      'posCityId',
      'posDistrictId',
      // ...
      ]),
      NstartDateStr() {
        return this.date?this.date[0]:''
      },
      NendDateStr() {
        return this.date?this.date[1]:''
      },
  },
  methods:{
      ...mapActions([
        'SetQueryData',
      ]),
      setDefaultValueByUrl() {
        // 省 市 区 学校 4个 如果有多的可以继续往这添加
        const queryData = this.$route.query;
        const index = queryData.index;
        if(index==1){
          // 全国
          // 清空省市区学校 和url参数
          
          this.NposProvinceId = '';
          this.NposCityId = '';
          this.NposCityIdList = [];
          this.NposDistrictId = '';
          this.NposCityIdList = [];
          this.NschoolId = '';
          this.NschoolTypeIdList = [];
        }else if(index==2){
          // 省
          if(this.NposProvinceId == (queryData.posProvinceId||queryData.provinceId)){
            this.NposCityId = '';
            this.NposDistrictId = '';
            this.NposDistrictIdList = '';
            this.NschoolList = '';
            this.NschoolId = '';
            return
          }
          this.NposProvinceId = Number(queryData.posProvinceId||queryData.provinceId);
          this.changeSheng(this.NposProvinceId);
        }else if(index==3){
          if(this.NposCityId == (queryData.posCityId||queryData.cityId)){
            this.NposDistrictId = '';
            this.NschoolList = '';
            this.NschoolId = '';
            return
          }
          this.NposCityId = Number(queryData.posCityId||queryData.cityId);
          this.changeShi(this.NposCityId);
        }else if(index==4){
          if(this.NposDistrictId == (queryData.posDistrictId||queryData.districtId)){
            this.NschoolId = '';
            return
          }
          this.NposDistrictId = Number(queryData.posDistrictId||queryData.districtId);
          this.changeQu(this.NposDistrictId);
        }else if(index==5){
          if(this.NschoolId == (queryData.posSchoolId||queryData.schoolId)){
            return
          }
          this.NschoolId = Number(queryData.posSchoolId||queryData.schoolId);

          //this.changeSchool(this.NschoolId);
        }
      },
      dateChage() {
        //console.log(this.date);
        //console.log(this.NstartDateStr);
        this.SetQueryData({
          key: 'defaultDate',
          value: this.date
        });
      },
      schoolYearArrChange() {
        const len = this.NschoolYearArr.length==0?1:this.NschoolYearArr.length;
        const wid = 143;
        const addWid = 85;
        this.$refs.schoolYearRef.childNodes[2].style.width=addWid*len+addWid+'px'
      },
      getAllQueryData() {
        // 获取当前所有的 筛选值
        let obj = {   // 省市区学校类型 学校的名称也都穿过去
          NposProvinceIdName: this.NposProvinceIdName,
          NposCityIdName: this.NposCityIdName,
          NposDistrictIdName: this.NposDistrictIdName,
          NschoolTypeIdName: this.NschoolTypeIdName,
          NschoolName: this.NschoolName,
          time: new Date().getTime()
        };
        this.pageSelectArr.forEach(item => {
          if(this[`N${item}`]){
            if(Array.isArray(this[`N${item}`])){
              // 改参数为数组
              if(this[`N${item}`].length>0){
                obj[item] = this[`N${item}`].join(); // 转换成 字符串传过去 
                //obj[item] = JSON.stringify(this[`N${item}`]); // 不确定数组参数是否需要序列化才能给后台接收
              }
            }else{
              obj[item] = this[`N${item}`];
            }
          }      
        });
        this.SetQueryData({
          key: 'topConditionsObj',
          value: obj
        });
        //this.getData(obj);
        // 学年集合还要置入
        this.SetQueryData({
          key: 'schoolYearArr',
          value: this.NschoolYearArr
        });
        this.SetQueryData({
          key: 'schoolYear',
          value: this.NschoolYear
        });
        // 获取数据
        this.$emit('getdata', obj);
      },
      getData(data) {
        //const requestUrl = this.defaultClassification.data[this.defaultClassification.index].url;
        const requestUrl = this.defaultClassification[this.$route.query.index-1].url;

        this.$store.dispatch('getCervixStats', {
            requestUrl, data
        });
      },
      resetAllQueryData() {
        // 清空当前所有的 筛选值
        this.pageSelectArr.forEach(item => {
          if(item =='startDateStr'|| item == 'endDateStr'){
            this.data = []
          }else{
            this[`N${item}`] = '';
          }
               
        });
        this.setDefaultVaule(); //重置默认页面加载属性
      },
      changeInindicators(t) {
        this.showMoreIndicators = t;
        // 这里处理 综合体质的queryData和更多的Data的切换 
        if(!t){
          // 综合体质
          this.NtestItemLevel = '';
          // 找到需要清空的数据 循环清空
          const moreQuery = [
                'bodyMassIndexLevel','eyeEyesightLevel','torsoTiltAngleLevel','fiftyMeterRunLevel','fiftyByEightShuttleRunLevel',
                'eightHundredMeterRunLevel','oneThousandMeterRunLevel','oneMinuteRopeSkippingLevel','oneMinuteAbdominalCurlLevel',
                'upwardsLevel','standingLongJumpLevel','lungCapacityLevel','sittingAndFlexionLevel'
            ];
          moreQuery.forEach(item => {
            this[`N${item}`] = ''
          })  
        }else{
          this.NtestItemLevel = '';
        }
      },
      getSchoolType() {
        this.$ajax('api/auth/v1/school/type')
        .then(res => {
          //console.log(res);
          this.NschoolTypeIdList = res.data;
        })
      },
      getSitAndEquType(id) {
        // 获取场地和器材的类型
        this.$ajax('api/auth/v1/field/statistics/dropdown?schoolTypeId='+id)
        .then(res => {
          //console.log(res);
          this.NfieldIdsList = res.data;
        })
        this.$ajax('api/auth/v1/equipment/statistics/dropdown')
        .then(res => {
          //console.log(res);
          this.NequipmentIdsList = res.data;
          
        })
      },
      getSchool() {
        this.$ajax('api/auth/v1/school/list ',{
          parmas: {
            posProvinceId: this.NposProvinceCode,
            posCityId: this.NposCityCode,
            posDistrictId: this.NposDistrictCode,
            schoolTypeId: this.NschoolTypeId || ''
          }
        }).then(res => {
          //console.log(res);
          this.NschoolList = res.data;
        })
      }, 
      getYearList() {
        const date = new Date();
        let nowYear = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();
        const yearList = [];
        for(let i=nowYear;i>nowYear-10;i--) {
          let itemObj = {};
          if(month>8&&day>1){
            itemObj = {
              value: `${i}-${i+1}`,
            }
          }else{
            itemObj = {
              value: `${i-1}-${i}`,
            }
          }
          //const yearItem = `${i}-${i-1}`;
          yearList.push(itemObj);
        }
        this.NschoolYearList = yearList;
        // 学年度集合默认
        this.NschoolYearArr = [yearList[0].value];
        this.NschoolYear = yearList[0].value
        this.SetQueryData({
          key: 'schoolYearArr',
          value: [yearList[0].value]
        });
        this.SetQueryData({
          key: 'schoolYear',
          value: yearList[0].value
        });
      },   
      getCity(code) {
        this.$ajax('api/auth/v1/chinaArea/'+code)
        .then(res => {
          //console.log(res);
          this.NposCityIdList = res.data;
        })
      },
      getStreet(code) {
        this.$ajax('api/auth/v1/chinaArea/'+code)
        .then(res => {
          //console.log(res);
          this.NposDistrictIdList = res.data;
        })
      },
      changeSheng(id) {
        // 获取名称
        let obj = {};
        obj = this.NposProvinceIdList.find(item =>{
            return item.id == id;
        });
        this.NposProvinceIdName = obj.name;
        this.NposProvinceCode = obj.code;
        //console.log(obj.name);
        this.NposCityIdList = '';
        this.NposCityId = '';
        this.NposDistrictId = '';
        this.NposDistrictIdList = '';
        this.NschoolList = '';
        this.NschoolId = '';
        this.getCity(obj.code);
      },
      changeShi(id) {
        // 获取名称
        let obj = {};
        obj = this.NposCityIdList.find(item =>{
            return item.id == id;
        });
        this.NposCityIdName = obj.name;
        this.NposCityCode = obj.code;
        //console.log(obj.name);
        this.NposDistrictId = '';
        this.NposDistrictIdList = '';
        this.NschoolList = '';
        this.NschoolId = '';
        this.getStreet(obj.code)
      },
      changeQu(id) {
        let obj = {};
        obj = this.NposDistrictIdList.find(item =>{
            return item.id == id;
        });
        this.NposDistrictIdName = obj.name;
        this.NposDistrictCode = obj.code;
        //console.log(obj.name);
        this.NschoolList = '';
        this.NschoolId = '';
        this.getSchool();
      },
      changeSchoolType(value) {
         // 获取场地和器材的类型
          this.getSitAndEquType(value);
        if(this.NposProvinceId&&this.NposCityId&&this.NposDistrictId){
          // 省市区都选择了的情况下 才重新请求获取学校数据
          let obj = {};
          obj = this.NschoolTypeIdList.find(item =>{
              return item.id == value;
          });
          this.NschoolTypeIdName = obj.name;
          //console.log(obj.name);
          this.getSchool();
        }
      },
      changeSchool(value) {
        let obj = {};
          obj = this.NschoolList.find(item =>{
              return item.id == value;
          });
          this.NschoolName = obj.name;
          //console.log(obj.name);
      },
      getProvince() {
        // 默认要先把所有的省存到vuex里， 筛选里要用到这个数据
        this.$ajax('api/auth/v1/chinaArea/0')
        .then(res => {
          //console.log(res);
          this.NposProvinceIdList = res.data
          this.SetQueryData({
            key: 'posProvinceIdList',
            value: res.data
          });
          //this.sheng1 = res.data;
        })
      },
      getDay(day) {
        var today = new Date();  
         
        var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;          
    
        today.setTime(targetday_milliseconds); //注意，这行是关键代码
          
        var tYear = today.getFullYear();  
        var tMonth = today.getMonth();  
        var tDate = today.getDate();  
        tMonth = this.doHandleMonth(tMonth + 1);  
        tDate = this.doHandleMonth(tDate);  
        return tYear+"-"+tMonth+"-"+tDate;
      },
      doHandleMonth(month) {
        var m = month;  
        if(month.toString().length == 1){  
            m = "0" + month;  
        }  
        return m;
      },
      setDefaultVaule() {
        this.setDefaultDate(); // 日期重置
        this.setDefaultIndicators(); // 智慧课堂指标重置
        this.getYearList();
      },
      setDefaultDate() {
        // 默认设定一周
        this.date = [this.getDay(-7),this.getDay(0)];
        this.SetQueryData({
          key: 'defaultDate',
          value: this.date
        });
      },
      setDefaultIndicators() {
        this.SetQueryData({
          key: 'wisdomIndicators',
          value: this.wisdomIndicators
        });
      }
    },
    created:function(){
      // 展示的省市区名字这些 可以存在当前组件 如果有涉及别的组件的数据时 比如当前选中的省code等 这些则存在vuex里
      this.getProvince();
      this.getSchoolType();// 获取学校类型
      this.getYearList();
      this.setDefaultDate();// 设置初始日期
      this.setDefaultIndicators();
      console.log("GETYEARLIST",GETYEARLIST.getYear())
    },
    watch: {
      'wisdomIndicators'() {
        this.setDefaultIndicators();
      },
      '$route' (to, from){
        //console.log('topconditions');
        this.setDefaultValueByUrl();
      },
    }
}
</script>

<style scoped>
.el-input.el-input--mini{
  width: 277px;
  font-size: 14px;
  color: #858585
}
.titleSpan~.titleSpan{
  margin-left: 10px
}
.heath{
  margin-left: 10px
}
.linkage{
  padding: 28px;
  border-bottom: 10px solid #f0f0f0
}
.search{
  float: right;
}
.second, .indicators{
  margin-top: 20px
}
.el-input--mini{
  width: auto
}

.heathMore{
  color: #2E89E6;
  margin-left: 10px;
  cursor: pointer; 
}
.indicatorsMoreLabel{
  display: inline-block;
  width: 100px;
}
.indicatorsDiv{
  margin: 10px 0 0 36px
}
</style>
<style>
.el-input--mini .el-input__inner{
  padding: 0;
  padding-left: 10px
}
.lastItem>span{
  color: #1875F0 !important
}
</style>
