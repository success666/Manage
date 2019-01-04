import Cookies from 'js-cookie'
import request from '@/utils/request'

const app = {
    state: {
        sidebar: {
            opened: !+Cookies.get('sidebarStatus'),
            withoutAnimation: false
        },
        device: 'desktop',
        schoolStatsShowControl: {

        },
        pageSelectArr: [], // 页面筛选集合 根据里面的值去返回当前页面选择的筛选值
        routeList: [], // 路由列表数据 主要用于动态面包屑
        needRefresh: true,
        wisdomIndicators: '',
        defaultClassification: '',
        posProvinceIdList: [], // 省列表
        posCityIdList: [], // 市列表
        posDistrictIdList: [], // 区列表
        schoolTypeIdList: [], // 学校类型列表
        schoolYearList: [], // 学年度列表
        schoolList: [], // 学校列表
        productDataList: [], // 各接口数据（省市区等返回的信息详情） 
        posProvinceIdName: '', // 省名称
        posCityIdListName: '', // 市名称
        posDistrictIdListName: '', // 区名称
        schoolTypeIdListName: '', //学校类型名称
        schoolListName: '', // 学校列表名称
        topConditionsObj: {}, // 顶部筛选值


        posProvinceId: '', // 省
        posCityId: '', // 市
        posDistrictId: '', // 区
        schoolTypeId: '', // 学校类型
        schoolYear: '', // 学年度
        schoolId: '', // 学校
        schoolYearArr: [], // 学年度集合
        identityNo: '', // 学生证件号码
        equipmentIds: '', // 器材ID
        startDateStr: '', // 开始日期
        endDateStr: '', // 结束日期
        defaultDate: '', // 默认开始日期
        fieldIds: '', // 场地类型
        equipmentIds: '', // 器材类型

        // 体侧统计 更多选项
        testItemLevel: '', //综合体质
        bodyMassIndexLevel: '', //体重
        oneThousandMeterRunLevel: '', //1000米跑
        oneMinuteRopeSkippingLevel: '', //1分钟跳绳
        sittingAndFlexionLevel: '', //坐位体前屈
        fiftyMeterRunLevel: '', //50米跑
        lungCapacityLevel: '', //肺活量
        quietHeartRateLevel: '', //安静心率
        systolicPressureLevel: '', //收缩压
        diastolicBloodPressureLevel: '', //舒张压
        eyeEyesightLevel: '', //视力
        oneMinuteAbdominalCurlLevel: '', //1分钟仰卧起坐
        fiftyByEightShuttleRunLevel: '', //50*80往返跑
        standingLongJumpLevel: '', //立定跳远
        upwardsLevel: '', //引体向上
        eightHundredMeterRunLevel: '', //800米跑
        torsoTiltAngleLevel: '', //背脊侧弯
        // 体侧统计 更多选项 

        itemizedInfoList: '', // 体测主要数据
        phyDeptStatsInfoList: '', // 体测左侧数据
    },
    mutations: {
        ROUTELISTINIT(state, storageList) {
            if (storageList.length > 0) {
                state.routeList = storageList
            } else {

            }
        },
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1)
            } else {
                Cookies.set('sidebarStatus', 0)
            }
            state.sidebar.opened = !state.sidebar.opened
            state.sidebar.withoutAnimation = false
        },
        CLOSE_SIDEBAR: (state, withoutAnimation) => {
            Cookies.set('sidebarStatus', 1)
            state.sidebar.opened = false
            state.sidebar.withoutAnimation = withoutAnimation
        },
        TOGGLE_DEVICE: (state, device) => {
            state.device = device
        },
        ADDROUTELIST(state, obj) {
            let t = false;
            state.routeList.forEach((item, index) => {
                if (obj.name == '全国') {
                    t = true;
                }
                if (index > 0) {
                    if (obj.name == '全国' || (item.name.substr(0, 2) == obj.name.substr(0, 2))) {
                        // 判断前两个汉字是否相等 相等就不添加路由
                        t = true;
                    }
                }
            });
            if (t) {
                return
            } else {
                state.routeList.push(obj);
                localStorage.setItem('routeList', JSON.stringify(state.routeList));
            }
        },
        DELETEROUTELIST(state, index) {
            state.routeList.splice(index, state.routeList.length - 1);
            localStorage.setItem('routeList', JSON.stringify(state.routeList));
            //console.log(state.routeList)
        },
        SETQUERYDATA(state, { key, value }) {
            state[key] = value
        },
        INITPAGESELECTARR(state, arr) {
            //console.log('-------------initPageQuery！');
            //console.log(arr);
            state.pageSelectArr = arr;
        },
        SETNEEDREFRESH(state, data) {
            state.needRefresh = data;
        },
        SETDEFAULTCLASSIFICATION(state, data) {
            state.defaultClassification = data;
        },
        SETCERVIXSTATS(state, res) {
            if (!res.data) {
                res.itemizedInfoList = []
                return
            }
            if (res.data[0] && res.data[0].phyStatsList) {
                state.itemizedInfoList = res.data;
            } else {
                state.itemizedInfoList = res.data.itemizedInfoList;
                state.phyDeptStatsInfoList = res.data.phyDeptStatsInfoList;
            }
        },
        SETSTUDENTSTATS(state, res) {
            state.itemizedInfoList = res.data;
        },
        SETWISDOMSTATS(state, res) {
            state.itemizedInfoList = res.data;
        },
        SETTEACHERSTATS(state, res) {
            state.itemizedInfoList = res.data;
        },
        SETSCHOOLSTATS(state, res) {
            state.itemizedInfoList = res.data;
        },
        SETEQUIPMENTSTATS(state, res) {
            state.itemizedInfoList = res.data.nationwideSchoolEquipmentList || res.data.provinceSchoolEquipmentList || res.data.citySchoolEquipmentList || res.data.districtSchoolEquipmentList;
        },
        SETSITESTATS(state, res) {
            if (res.data) {

                state.itemizedInfoList = res.data.nationwideSchoolFieldList || res.data.provinceSchoolFieldList || res.data.citySchoolFieldList || res.data.districtSchoolFieldList;
            } else {
                state.itemizedInfoList = [];
            }
        },
        SETHOMEWORKSTATS(state, res) {
            state.itemizedInfoList = res.data.homeworkStatisticsSchoolDetailsList ? res.data.homeworkStatisticsSchoolDetailsList : res.data;
        }
    },
    actions: {
        ToggleSideBar: ({ commit }) => {
            commit('TOGGLE_SIDEBAR')
        },
        CloseSideBar({ commit }, { withoutAnimation }) {
            commit('CLOSE_SIDEBAR', withoutAnimation)
        },
        ToggleDevice({ commit }, device) {
            commit('TOGGLE_DEVICE', device)
        },
        AddRouteList({ commit }, obj) {
            commit('ADDROUTELIST', obj)
        },
        DeleteRouteList({ commit }, index) {
            commit('DELETEROUTELIST', index)
        },
        SetQueryData({ commit }, { key, value }) {
            commit('SETQUERYDATA', { key, value })
        },
        InitPageSelectArr({ commit }, arr) {
            commit('INITPAGESELECTARR', arr)
        },
        // 把当前模块的 各个点的url存好 通过 query.index切换不同点的url 点： 全国-省-市-区....
        setDefaultClassification({ commit }, data) {
            commit('SETDEFAULTCLASSIFICATION', data)
        },
        setNeedRefresh({ commit }, data) {
            commit('SETNEEDREFRESH', data)
        },
        // 获取体测统计数据
        getCervixStats({ commit }, payload) {
            //console.log(payload)
            request(payload.requestUrl, {
                params: payload.data
            }).then(res => {
                //console.log('----------------------------------------------------获取数据成功！');
                //console.log(res);
                commit('SETCERVIXSTATS', res)
            })
        },
        //学生统计
        getStudentStats({ commit }, payload) {
            payload.data.gradeId = payload.data.dictSchoolTypeGradeId;
            request(payload.requestUrl, {
                params: payload.data
            }).then(res => {
                commit('SETSTUDENTSTATS', res)
            })
        },
        //师资统计
        getTeacherStats({ commit }, payload) {
            request(payload.requestUrl, {
                params: payload.data
            }).then(res => {
                commit('SETTEACHERSTATS', res)
            })
        },
        //课堂统计
        getWisdomStats({ commit }, payload) {
            request(payload.requestUrl, {
                params: payload.data
            }).then(res => {
                commit('SETWISDOMSTATS', res)
            })
        },
        // 学校统计
        getSchoolStats({ commit }, payload) {
            request(payload.requestUrl, {
                params: payload.data
            }).then(res => {
                commit('SETSCHOOLSTATS', res)
            })
        },
        // 器材统计
        getEquipmentStats({ commit }, payload) {
            request(payload.requestUrl, {
                params: payload.data
            }).then(res => {
                commit('SETEQUIPMENTSTATS', res)
            })
        },
        // 场地统计
        getSiteStats({ commit }, payload) {
            payload.data.posProvinceId = payload.data.provinceId || payload.data.posProvinceId;
            payload.data.posDistrictId = payload.data.districtId || payload.data.posDistrictId;
            payload.data.posCityId = payload.data.cityId || payload.data.posCityId;
            payload.data.schoolYearStart = payload.data.schoolYear.slice(0, 4);
            payload.data.schoolYearEnd = payload.data.schoolYear.slice(5, 9);

            payload.data.startDateStr = payload.data.schoolYear.slice(0, 4);
            payload.data.endDateStr = payload.data.schoolYear.slice(5, 9);

            request(payload.requestUrl, {
                params: payload.data
            }).then(res => {
                commit('SETSITESTATS', res)
            })
        },
        // 作业统计
        getHomeworkStats({ commit }, payload) {
            request(payload.requestUrl, {
                params: payload.data
            }).then(res => {
                commit('SETHOMEWORKSTATS', res)
            })
        }
    }
}

export default app