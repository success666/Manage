<template>
  <div class="contain-vessel">
      <breadCrumb  :router-data="routerData" class="routerData" v-on:router-click="routerClick"></breadCrumb>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="130px" class="ke-ruleForm">
      <el-form-item label="教育机构账号" prop="account">
        <el-input v-model="ruleForm.account" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系人姓名" prop="username">
        <el-input v-model="ruleForm.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系人手机号" prop="tel">
        <el-input-number v-model="ruleForm.tel" auto-complete="off" class="inputNumber"></el-input-number>
      </el-form-item>
      <!--<el-form-item label="管理部门" prop="mgmtDeptId">-->
        <!--<el-select v-model="ruleForm.mgmtDeptId" placeholder="管理部门">-->
          <!--<el-option v-for="(item, idx) in mgmtDeptList"-->
                     <!--:key="item.id"-->
                     <!--:label="item.name"-->
                     <!--:value="item.id">-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item label="角色" prop="roleId">
        <el-select v-model="ruleForm.roleId" placeholder="请选择角色">
          <el-option v-for="(item, idx) in roleList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="停用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="goback">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "@/utils/request";
import breadCrumb from "@/components/Breadcrumb/indexBread";
import { PASSWORD, PASSWORD_TIP,MOBILE } from "../../utils/validate";

export default {
  components: {
    breadCrumb
  },
  created() {
    request.get(`/api/auth/v1/mgmtDeptAccount/roles`).then(res => {
      this.roleList = res.data;
    });
    // request.get(`/api/auth/v1/mgmtDept`).then((res) => {
    //   this.mgmtDeptList = res.data
    // })
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (!PASSWORD.test(value)) {
        callback(new Error(PASSWORD_TIP));
      } else {
        callback();
      }
    };
    const validateMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!MOBILE.test(value)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    return {
      routerData: [
        {
          name: "账号管理",
          isClick: false
        },
        {
          name: "账号管理",
          isClick: false
        },
        {
          name: "账号列表",
          value: "001",
          isClick: true
        },
        {
          name: "新增账号",
          value: "001",
          isClick: true
        }
      ],
      roleList: [],
      mgmtDeptList: [],
      ruleForm: {
        account: "",
        username: "",
        roleName: "",
        roleId: "",
        status: "",
        password: "",
        mgmtDeptId: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入教育机构账号", trigger: "blur" }
        ],
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        roleId: [{ required: true, message: "请选择角色", trigger: "change" }],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        tel: [{ required: true, validator: validateMobile, trigger: "blur" }],
        password: [{ required: true, validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          request
            .post(`/api/auth/v1/mgmtDeptAccount`, {
              account: this.ruleForm.account,
              // mgmtDeptId: 11,
              roleId: this.ruleForm.roleId,
              username: this.ruleForm.username,
              status: this.ruleForm.status,
              tel: this.ruleForm.status,
              password: this.ruleForm.password
            })
            .then(res => {
              this.$router.push({
                path: `/accountlist`
              });
            });
        } else {
          console.log("error");
        }
      });
    },
    goback() {
      this.$router.go(-1);
    },
    routerClick(data){
      this.$router.push({
        name:"accountlist"
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.contain-vessel {
  
  -webkit-border-radius: 7px;
  -moz-border-radius: 7px;
  border-radius: 7px;
}
.ke-ruleForm{
  background: #fff;
  padding: 10px;
  border-radius: 10px;
}

</style>
<style lang="scss">
.inputNumber {
  width: 100%;
  .el-input-number__decrease,
  .el-input-number__increase {
    display: none;
  }
  .el-input__inner {
    padding: 15px;
    text-align: left;
  }
}
</style>
