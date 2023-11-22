<template>
    <div id="login">
        <div class="title">密码登录</div>
        <input type="text" placeholder="请输入您的ID" ref="loginid"><br>
        <input type="password" placeholder="请输入您的密码" ref="loginpwd"><br>
        <button @click="sign">登录</button>
        <Modal :title="'提示'" :show.sync = isShowErr>
            <template v-slot:content>
                <div>
                    ID不存在或密码错误！
                </div>
            </template>
        </Modal>
    </div>
</template>

<script>
import store from '@/store/store';
import bus from '../../utils/bus'
import http from '../../utils/http'
export default {
    name: 'Login',

    data() {
        return {
            isShowErr:false,
        };
    },

    mounted() {

    },

    methods: {
        sign() {
            http.post('/serve/login', {uid:this.$refs.loginid.value, password:this.$refs.loginpwd.value}).then(res => {
                if (res.status) {
                    // 登录后本地存储登录信息
                    localStorage.setItem('uid', res.uid);
                    localStorage.setItem('username', res.username);
                    localStorage.setItem('img', res.img);
                    bus.$emit('sign', res.uid, res.username, res.img);
                    this.$store.commit('setUserInfo', {
                        uid: res.uid,
                        username: res.username,
                        img: res.img,
                    })
                } else {
                    this.isShowErr = true;
                }
            })
        }
    },
};
</script>

<style scoped>
#login {
    margin: -15px auto;
    width: 460px;
    height: 300px;
    color: black;
    font-size: 30px;
    text-align: center;
}

#login>.title {
    margin: 40px 0 20px;
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
    margin: 50px;
    color: white;
}
</style>