<template>
    <div id="register">
        <div class="title">账号注册</div>
        <input type="text" placeholder="请输入您的用户名" ref="registername"><br>
        <input type="text" placeholder="请输入您的密码" ref="registerpwd1"><br>
        <input type="text" placeholder="请再次输入您的密码" ref="registerpwd2"><br>
        <button @click="register">注册</button>
    </div>
</template>

<script>
import bus from '../../utils/bus'
import http from '../../utils/http'

export default {
    name: 'Register',

    data() {
        return {

        };
    },

    mounted() {

    },

    methods: {
        register() {
            let that = this;
            if (this.$refs.registerpwd1.value == '' || this.$refs.registerpwd2.value == '' || this.$refs.registername.value == '') {
                alert('用户名或密码不能为空！');
            } else if (this.$refs.registerpwd1.value != this.$refs.registerpwd2.value) {
                alert('两次输入的密码不一致，请重新输入！');
                this.$refs.registerpwd1.value = '';
                this.$refs.registerpwd2.value = '';
            } else {
                let parmas = {
                    username: this.$refs.registername.value,
                    password: this.$refs.registerpwd1.value
                };
                http.post('/serve/register', parmas).then(res => {
                    console.log(res);
                    bus.$emit('register', res.uid, that.$refs.registername.value, res.img);
                })
            }
        }
    },
};
</script>

<style scoped>
#register {
    margin: -15px auto;
    width: 500px;
    height: 300px;
    color: black;
    font-size: 30px;
    text-align: center;
}

#register>.title {
    margin: 50px 0 20px;
}

#register>input {
    width: 210px;
    height: 30px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 20px;
    outline: none;
}

#register>button {
    width: 250px;
    height: 30px;
    background-color: #aaccee;
    border: 0;
    margin: 20px;
    color: white;
}
</style>