<template>
  <div class="role contain-vessel">
    <breadCrumb :router-data="routerData" class="routerData" v-on:router-click="routerClick"></breadCrumb>
    <div class="content">
      <el-input v-model="roleName" placeholder="请输入角色名称" class="role-name"></el-input>
      <el-tree :data="menuList" :default-expanded-keys="[1]" :default-checked-keys="permissionIds" show-checkbox node-key="id" :props="defaultProps" ref="roletree" :check-strictly="true" @check-change="checkChange">
      </el-tree>
      <div class="role-btn">
        <el-button @click="cancelSet">取消</el-button>
        <el-button type="primary" @click="sureSet">确认</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import breadCrumb from "@/components/Breadcrumb/indexBread";

export default {
  components: {
    breadCrumb
  },
  created() {
    request.get(`/api/auth/v1/mgmtDeptAccount/menus`).then(res => {
      this.menuList = res.data || [];
    });
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
        },
        {
          name: "新增角色",
          value: "001",
          isClick: true
        }
      ],
      roleName: "",
      menuList: [],
      permissionIds: [],
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  methods: {
    sureSet() {
      if (!this.roleName) {
        this.$message.error("请输入角色名称");
        return;
      }
      const permissionId = this.$refs.roletree.getCheckedKeys();
      request
        .post(`/api/auth/v1/mgmtDeptRole`, {
          name: this.roleName,
          remark: "",
          menuIds: permissionId
        })
        .then(res => {
          console.log(res);
          this.$router.push({
            path: `rolelist`
          });
        });
    },
    cancelSet() {
      this.$router.push({
        path: `rolelist`
      });
    },
    checkChange(node, isCheck, parent) {
      if (node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          setNode(this, node.children[i], isCheck);
        }
      }
    },
    routerClick(data) {
      this.$router.push({
        name: "rolelist"
      });
    }
  }
};
function setNode(vm, node, isCheck) {
  if (node.children.length == 0) {
    vm.$refs.roletree.setChecked(node.id, isCheck, false);
  } else {
    vm.$refs.roletree.setChecked(node.id, isCheck, false);
    for (let i = 0; i < node.children.length; i++) {
      setNode(vm, node.children[i], isCheck, false);
    }
  }
}
</script>

<style lang="scss" scoped>
.role {
  padding-bottom: 20px;
  border-radius: 10px;
}
.content{
  background: #fff;
  padding: 20px;
  border-radius: 10px;
}
.role-btn {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
}
.role-name {
  padding: 28px 10px;
  display: inline-block;
  width: 250px;
  margin-bottom: 20px;
}
</style>
