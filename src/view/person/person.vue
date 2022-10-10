<template>
  <div>
    <div class="form-box">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" width="600px">
        <el-form-item :minlength="6" label="原密码" prop="password">
          <el-input v-model="form.password" show-password />
        </el-form-item>
        <el-form-item :minlength="6" label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" show-password />
        </el-form-item>
        <el-form-item :minlength="6" label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="savePassword">确 定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { changePassword } from '@/api/user'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      form: {},
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '最少6个字符', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '最少6个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { min: 6, message: '最少6个字符', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.newPassword) {
                callback(new Error('两次密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    ...mapActions('user', ['LoginOut']),
    savePassword() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res = await changePassword({
            username: this.userInfo.userName,
            password: this.form.password,
            newPassword: this.form.newPassword
          })
          if (res.code === 0) {
            this.$message.success('修改密码成功！')
            setTimeout(() => {
              this.LoginOut()
            }, 1000)
          }
        }
      })
    }
  },

  components: {},

  computed: {
    ...mapGetters('user', ['userInfo', 'token'])
  },

  mounted() {},

  created() {}
}
</script>
<style lang="scss" scoped>
.form-box {
  width: 600px;
}
</style>
