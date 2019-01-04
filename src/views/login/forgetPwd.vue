<template>
  <div>
    <div class="modify" v-if="firstStep">
      <div class="title">找回密码</div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="ke-ruleForm">
        <el-form-item prop="tel">
          <el-input v-model="ruleForm.tel" placeholder="请输入手机号码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="verificationCode">
          <el-input v-model="ruleForm.verificationCode" placeholder="验证码" style="width: 200px;"></el-input>
          <el-button type="info" @click="getCode" :disabled="getCodeBtn" class="code-btn">{{ buttonText }}</el-button>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="modify" v-if="!firstStep">
      <div class="title">验证成功</div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="saveForm" class="ke-ruleForm">
        <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm.pass" placeholder="请输入新密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="saveForm('saveForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import {PASSWORD, PASSWORD_TIP, MOBILE} from '../../utils/validate'

  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else if(!PASSWORD.test(value)) {
          callback(new Error(PASSWORD_TIP));
        } else {
          // if (this.ruleForm.checkPass !== '') {
          //   this.$refs.ruleForm.validateField('checkPass');
          // }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入新密码不一致!'));
        } else {
          callback();
        }
      };
      const validateTel = (rule, value, callback) => {
        if (!MOBILE.test(value)) {
          callback(new Error('请输入正确的11位手机号码'))
        } else {
          callback()
        }
      }
      return {
        getCodeBtn: false,
        buttonText: '获取验证码',
        firstStep: true,
        ruleForm: {
          pass: '',
          checkPass: '',
          tel: '',
          verificationCode: ''
        },
        rules: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          tel: [
            {validator: validateTel, trigger: 'change'}
          ],
          verificationCode: [
            { required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request.get('/api/auth/v1/mgmtDeptAccount/forgetPassword/checkVerificationCode', {
              params: {
                phoneNo: this.ruleForm.tel,
                verificationCode: this.ruleForm.verificationCode
              }
            }).then((res) => {
              if (res.status && res.status.code === 500) {
                this.$message.error(res.status.msg);
                return;
              }
              this.firstStep = false
            }).catch(err => {

            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      saveForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request.post('/api/auth/v1/mgmtDeptAccount/forgetPassword', {
              tel: this.ruleForm.tel,
              password: this.ruleForm.pass,
              verificationCode: this.ruleForm.verificationCode
            }).then((res) => {
              this.$router.push({
                path: '/'
              })
            }).catch(err => {

            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      goback() {
        this.$router.push({path: '/'});
      },
      getCode() {
        this.$refs.ruleForm.validateField('tel', (err, value) => {
          if (!err) {
            request.get(`/api/auth/v1/mgmtDeptAccount/forgetPassword/verificationCode?phoneNumber=${this.ruleForm.tel}`)
              .then((res) => {
                this.getCodeBtn = true;
                let second = 60;
                this.buttonText = `${second}秒`;
                this.interval = window.setInterval(() => {
                  this.buttonText = `${--second}秒`;
                  if (second === 0) {
                    this.buttonText = `重新发送`;
                    this.getCodeBtn = false;
                    clearInterval(this.interval)
                  }
                }, 1000)
              }).catch(err => {
                console.log(err)
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .modify {
    position: absolute;
    width: 450px;
    height: 300px;
    padding: 20px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border: 1px solid #ccc;
    background: #fff;
    .title {
      text-align: center;
      padding: 20px 0;
    }
  }
  .code-btn {
    min-width: 112px;
  }
</style>
