<template>
    <div id="login">
        <div class="title">密码登录</div>
        <input type="text" placeholder="请输入您的ID" ref="loginid"><br>
        <input type="text" placeholder="请输入您的密码" ref="loginpwd"><br>
        <button @click="sign">登录</button>
    </div>
</template>

<script>
import bus from '../../utils/bus'
import http from '../../utils/http'
export default {
    name: 'Login',

    data() {
        return {

        };
    },

    mounted() {

    },

    methods: {
        sign() {
            http.get('/serve/getUser').then(res => {
                let sign = false;
                res.forEach(res => {
                    if (res.uid == this.$refs.loginid.value && res.password == this.$refs.loginpwd.value) {
                        bus.$emit('sign', res.uid, res.username);
                        sign = true;
                        return sign;
                    }
                });
                if (!sign) {
                    alert('ID不存在或密码错误！');
                }
            })
        }
    },
};
</script>

<style scoped>
#login {
    margin: -15px auto;
    width: 500px;
    height: 300px;
    color: black;
    font-size: 30px;
    text-align: center;
}

#login>.title {
    margin: 50px 0 20px;
}

#login>input {
    width: 210px;
    height: 30px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 20px;
    outline: none;
}

#login>button {
    width: 250px;
    height: 30px;
    background-color: #aaccee;
    border: 0;
    margin: 20px;
    color: white;
}
</style>