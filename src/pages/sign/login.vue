<template>
    <div id="login">
        <div class="title">密码登录</div>
        <input type="text" placeholder="请输入您的账号"><br>
        <input type="text" placeholder="请输入您的密码"><br>
        <button @click="sign">登录</button>
    </div>
</template>

<script>
import bus from '../../bus'
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
            bus.$emit('sign');
        }
    },
};
</script>

<style scoped>
    #login {
        margin:-15px auto;
        width: 500px;
        height: 300px;
        color: black;
        font-size:30px;
        text-align: center;
    }

    #login>.title {
        margin:50px 0 20px;
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