<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="param"
               :rules="rules"
               ref="login"
               label-width="0px"
               class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username"
                    placeholder="手机号">
            <el-button slot="prepend"
                       icon="el-icon-user"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password"
                    placeholder="密码"
                    v-model="param.password">
            <el-button slot="prepend"
                       icon="el-icon-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary"
                     @click="submitForm">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { apiGetCode, apiLogin } from '@/utils/api';
import storage from '@/utils/storage';

export default {
  data() {
    return {
      param: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    };
  },
  mounted() {
    // this._getCodeHandle();
  },
  methods: {
    _getCodeHandle() {
      apiGetCode().then((result) => {
        if (result.code === 200) {
          let { verifyKey, uuid } = result;
          storage.set('verifyKey', verifyKey)
          storage.set('uuid', uuid)
        }
      }).catch((err) => {
        console.log(err.message);
      });
    },
    submitForm() {
      this.$refs.login.validate(valid => {
        if (valid) {
          let { username, password } = this.param
          let data = {
            username,
            password,
            //code: storage.get('verifyKey') || '',
            //uuid: storage.get('uuid') || ''
          }
          apiLogin(data).then((result) => {
            if (result.code == 200) {
              this.$message.success('登录成功');
              storage.set("users", {
                username,
                token: result.token
              })
              setTimeout(() => {
                this.$router.replace('/index');
              }, 1000)
            } else {
              this.$message.success(result.msg);
            }
          }).catch((err) => {
            console.log(err.message);
          });
        } else {
          this.$message.error('请输入账号和密码');
          return false;
        }
      });
    }

  },
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #000;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>