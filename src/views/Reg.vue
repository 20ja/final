<template lang="pug">
#reg(class="h-100 d-flex justify-content-center align-items-center")
  b-container(class="d-flex justify-content-center align-items-center mt-5 mb-5")
    b-row
      b-col(cols="6")
        b-img(:src="'./img/about.jpg'" class="img-1")
      b-col(cols="6").justify-content-center.align-items-center.d-flex
        div.rall
          h1.text-center 註冊
          b-form(@submit="submit")
            b-form-group#input-name(
            label='姓名'
            label-for='input-name'
            :invalid-feedback='invalidFeedback'
            :valid-feedback='validFeedback' :state="state('name')")
              b-form-input#input-1(v-model='name' :state="state('name')" trim)
            b-form-group(
              label="帳號"
              label-for="input-account"
              description="帳號長度為 6 - 20 個字"
              invalid-feedback="帳號格式不符"
              :state="state('account')"
            )
              b-form-input#input-account(type="text" v-model="account" :state="state('account')")
            b-form-group(
              label="密碼"
              label-for="input-password"
              description="密碼長度為 6 - 20 個字"
              invalid-feedback="密碼格式不符"
              :state="state('password')"
            )
              b-form-input#input-password(type="password" v-model="password" :state="state('password')")
            b-form-group(
              label="確認密碼"
              label-for="input-repassword"
              description="密碼長度為 6 - 20 個字"
              invalid-feedback="密碼格式不符"
              :state="state('repassword')"
            )
              b-form-input#input-password(type="text" v-model="repassword" :state="state('repassword')")
            b-form-group(
                label="e-mail"
                label-for="input-email"
                invalid-feedback="信箱格式不符"
                :state="state('email')"
            )
              b-form-input#input-email(type="email" v-model="email" :state="state('email')")
            b-button( type="submit" class="mr-2 btn1") 註冊
            b-button( type="reset" class="mr-2 btn2" @click="formReset") 重設
</template>

<script>
export default {
  name: 'reg',
  data () {
    return {
      name: '',
      account: '',
      password: '',
      repassword: '',
      email: ''
    }
  },
  methods: {
    state (type) {
      if (type === 'name') {
        if (this.name.length < 2) {
          return null
        } else {
          return true
        }
      } else if (type === 'account') {
        if (this.account.length < 6 || this.account.length > 20) {
          return null
        } else {
          return true
        }
      } else if (type === 'password') {
        if (this.password.length < 6 || this.password.length > 20) {
          return null
        } else {
          return true
        }
      } else if (type === 'repassword') {
        if (this.repassword === this.password && this.repassword > 0) {
          return true
        } else {
          return null
        }
      } else if (type === 'email') {
        if (this.email.includes('@')) {
          return true
        } else {
          return null
        }
      }
    },
    formReset () {
      this.name = ''
      this.account = ''
      this.password = ''
      this.email = ''
    },
    submit (event) {
    // 註冊前的事件
      event.preventDefault()
      if (this.account.length < 6 || this.account.length > 20) {
        alert('帳號格式不符')
      } else if (this.password.length < 6 || this.password.length > 20) {
        alert('密碼格式不符')
      }
      this.axios.post(
        process.env.VUE_APP_APIURL + '/users',
        { name: this.name, account: this.account, password: this.password, email: this.email })
        .then(response => {
          const data = response.data
          if (data.success) {
            alert('註冊成功')
          } else {
            alert(data.message)
          }
        })
        .catch(error => {
          alert(error.response.data.message)
        })
    }
  },
  computed: {
    invalidFeedback () {
      if (this.name.length > 2) {
        return ''
      } else if (this.name.length > 0) {
        return '請輸入姓名'
      } else {
        return '讓我知道您的名字'
      }
    },
    validFeedback () {
      return this.state === true ? 'Thank you' : ''
    }
  }
}
</script>
