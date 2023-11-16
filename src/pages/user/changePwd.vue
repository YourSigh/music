<template>
  <div id="changePwd">
    <div>
      <input type="password" v-model="pwd" placeholder="请输入原始密码" />
    </div>
    <div>
      <input type="password" v-model="pwd1" placeholder="请输入修改后的密码" />
    </div>
    <div>
      <input type="password" v-model="pwd2" placeholder="请再次输入密码" />
    </div>
    <div>
      <button @click="changePwd">确认</button>
      <button @click="$emit('update:show', false)">取消</button>
    </div>
    <Modal :title="'提示'" :show.sync="isShowErr" :width="'350px'">
      <template v-slot:content>
        <div>
          {{ message }}
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import http from '../../utils/http'

export default {
  name: "ChangePwd",

  data() {
    return {
      pwd: "",
      pwd1: "",
      pwd2: "",
      isShowErr: false,
      message:'',
      status: false,
    };
  },

  mounted() { 
  },
  watch:{
    isShowErr(n) {
      if (n == false && this.status == true) {
        this.$emit('update:show', false);
      }
    }
  },

  methods: {
    changePwd() {
      if (this.pwd == '' || this.pwd1 == '' || this.pwd2 == '') {
        this.message = '密码不能为空！'
        this.isShowErr = true;
      } else if (this.pwd1 != this.pwd2) {
        this.message = '两次输入的密码不一致，请重新输入！'
        this.isShowErr = true;
        this.pwd1 = '';
        this.pwd2 = '';
      } else {
        const params = {
          oldpwd:this.pwd,
          newpwd:this.pwd1,
          uid:localStorage.getItem('uid')
        }
        http.post('/serve/changePassword', params).then(res => {
          if (res.results) {
            this.message = '密码修改成功！'
            this.isShowErr = true;
            this.status = true;
          } else {
            this.message = '旧密码不正确，请重新输入！'
            this.Pwd = '';
            this.pwd1 = '';
            this.pwd2 = '';
            this.isShowErr = true;
          }
        });
      }
    }
  },
};
</script>

<style scoped>
#changePwd {
  margin: 0 auto;
}

#changePwd>div {
  text-align: center;
}

#changePwd>div>input {
  width: 210px;
  height: 30px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 20px;
  outline: none;
}

#changePwd>div>button {
  width: 70px;
  height: 30px;
  margin: 20px;
  border: 0;
  border-radius: 5px;
}

#changePwd>div>button:first-child {
  background-color: #aaccee;
  color: white;
}
</style>