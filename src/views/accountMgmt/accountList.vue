<template>
    <div>
      <breadCrumb  :router-data="routerData" class="routerData" ></breadCrumb>
      <div class="search-add">
          <div class="search">
            <el-input v-model="username" size="small" placeholder="联系人"></el-input>
            <el-input v-model="tel" size="small" placeholder="联系人电话"></el-input>
            <el-button type="primary" size="small" @click="searchList()" >查询</el-button>
          </div>
          <el-button type="primary" size="medium" @click="addAccount()" v-if="btn.add">新增账号</el-button>
        </div>
      <div class="contain-vessel">
        <el-table
          :data="listData"
          style="width: 100%;"
        >
          <el-table-column
            prop="mgmtDeptName"
            label="教育机构名称"
            align="center"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            prop="account"
            label="教育机构账号"
            align="center"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            prop="mgmtDeptRoleName"
            label="角色"
            align="center"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            prop="username"
            label="联系人姓名"
            align="center"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            prop="tel"
            label="联系人手机号"
            align="center"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="状态"
            align="center"
            header-align="center"
          >
            <template slot-scope="scope">{{scope.row.status === 1 ? '启用' : '停用'}}</template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            header-align="center"
            v-if="btn.alert"
          >
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="modifyRole(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <Paging :pageNum="pageNum"
                :pageSize="pageSize"
                :total="total"
                @current="getCurrent"
        >
        </Paging>
      </div>
    </div>
</template> 

<script>
import request from "@/utils/request";
import Paging from "../../components/common/paging";
import parseBase from "@/utils/parseBase";
import breadCrumb from "@/components/Breadcrumb/indexBread";
import { PASSWORD, PASSWORD_TIP } from "../../utils/validate";

export default {
  components: {
    Paging,
    breadCrumb
  },
  created() {
    this.getList();
    var power = localStorage.getItem("access_token").split(".")[1];
    power = parseBase.decode(power);
    if (power.indexOf("addMgmtDeptAccount") < 0) this.btn.add = false;
    if (power.indexOf("updateMgmtDeptAccount") < 0) this.btn.alert = false;
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
        }
      ],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      listData: [],
      username: "",
      tel: "",
      account: "",
      form: {
        pass: "",
        id: ""
      },
      dialogFormVisible: false,
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }]
      },
      btn: {
        add: true,
        alert: true,
        delete: true
      }
    };
  },
  methods: {
    getList() {
      request
        .get("/api/auth/v1/mgmtDeptAccount", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            username: this.username,
            tel: this.tel
          }
        })
        .then(res => {
          this.listData = res.data.list || [];
          this.total = res.data.total;
          this.pageNum = res.data.pageNum;
          this.pageSize = res.data.pageSize;
        });
    },
    modifyRole(row) {
      this.$router.push({
        path: `/accountedit`,
        query: { id: row.id }
      });
    },
    deleteRole(row) {
      console.log(row.id);
      this.$confirm("此操作将删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request.delete(`/api/auth/v1/operation/user/${row.id}`).then(res => {
            this.listData = this.listData.filter(item => {
              return item.id != row.id;
            });
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {});
    },
    resetPwd(row) {
      this.form.account = row.account;
      this.form.pass = "";
      this.form.id = row.id;
      this.dialogFormVisible = true;
    },
    getCurrent(current) {
      console.log(current);
      if (current.currentPage) {
        this.pageNum = current.currentPage;
      }
      if (current.currentSize) {
        this.pageSize = current.currentSize;
      }
      this.getList();
    },
    addAccount() {
      this.$router.push({
        path: "/accountadd"
      });
    },
    sureDialog() {
      this.$refs.form.validate(valid => {
        if (valid) {
          request
            .post("/api/auth/v1/operation/user/updatePassword", {
              password: this.form.pass,
              userId: this.form.id
            })
            .then(res => {
              this.$message({
                type: "success",
                message: "重置密码成功!"
              });
              this.dialogFormVisible = false;
            });
        }
      });
    },
    searchList() {
      this.pageSize = 10;
      this.pageNum = 1;
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
.search-add {
  border-radius: 10px;
  text-align: right;
  background: #fff;
  padding: 13px 20px 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  // height: 71px;
}
.search {
  float: left;
}
.el-input {
  width: 150px !important;
}
.contain-vessel {
  border-radius: 10px;
  background: #fff;
  padding: 20px 10px;
  border-radius: 7px;
}
</style>
