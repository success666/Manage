<template>
    <div>
      <breadCrumb  :router-data="routerData" class="routerData" ></breadCrumb>
      <div class="search-add">
        <el-button type="primary" size="medium" @click="addRole()" v-if="btn.add">新增角色</el-button>
      </div>
      <div class="contain-vessel">
        <el-table
          :data="roleList"
          style="width: 100%;"
        >
          <el-table-column
            prop="name"
            label="角色"
            align="center"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            header-align="center"
            v-if="btn.alert || btn.delete"
          >
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="modifyRole(scope.row)" v-if="btn.alert">编辑</el-button>
              <el-button type="primary" size="small" @click="deleteRole(scope.row)" v-if="btn.delete">删除</el-button>
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
import parseBase from "@/utils/parseBase";
import breadCrumb from "@/components/Breadcrumb/indexBread";
import Paging from "../../components/common/paging";

export default {
  components: {
    Paging,
    breadCrumb
  },
  created() {
    this.getList();
    var power = localStorage.getItem("access_token").split(".")[1];
    power = parseBase.decode(power);
    if (power.indexOf("saveMgmtDeptRole") < 0) this.btn.add = false;
    if (power.indexOf("updateMgmtDeptRole") < 0) this.btn.alert = false;
    if (power.indexOf("deleteMgmtDeptRole") < 0) this.btn.delete = false;
  },
  data() {
    return {
      routerData: [
        {
          name: "账号管理",
          isClick: false
        },
        {
          name: "角色管理",
          isClick: false
        },
        {
          name: "角色列表",
          value: "001",
          isClick: true
        }
      ],
      roleList: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: {},
      btn: {
        add: true,
        alert: true,
        delete: true
      }
    };
  },
  methods: {
    modifyRole(row) {
      this.$router.push({
        path: `/roleedit`,
        query: { id: row.id }
      });
    },
    getList() {
      request
        .get("/api/auth/v1/mgmtDeptRole", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          this.roleList = res.data.list || [];
          this.tableData = res.data;
          this.total = res.data.total;
          this.pageNum = res.data.pageNum;
          this.pageSize = res.data.pageSize;
        });
    },
    deleteRole(row) {
      this.$confirm("此操作将删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request.delete(`/api/auth/v1/mgmtDeptRole/${row.id}`).then(res => {
            this.roleList = this.roleList.filter(item => {
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
    addRole() {
      this.$router.push({
        path: `roleadd`
      });
    },
    getCurrent(current) {
      if (current.currentPage) {
        this.pageNum = current.currentPage;
      }
      if (current.currentSize) {
        this.pageSize = current.currentSize;
      }
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
.search-add {
  text-align: right;
  background: #fff;
  padding: 10px 20px 10px;
  margin-bottom: 10px;
  border-radius: 10px;
}
.contain-vessel {
  background: #fff;
  padding: 20px 10px;
  border-radius: 7px;
}
</style>
