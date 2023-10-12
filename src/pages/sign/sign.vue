<template>
    <div ref="sign">
        <div class="close" @click="close">X</div>
        <div id="sign">
            <div class="title">
                <div class="login" @click="change('login')" ref="login">登录</div>
                <div class="register" @click="change('register')" ref="register">
                    注册
                </div>
            </div>
            <component :is="signComponent"></component>
        </div>
    </div>
</template>

<script>
import Login from "./login.vue";
import Register from "./register.vue";

export default {
    name: "Sign",

    components: {
        Login,
        Register,
    },

    data() {
        return {
            signComponent: "Login",
        };
    },

    mounted() { },

    methods: {
        close() {
            this.$refs.sign.style.display = 'none';
        },
        change(kind) {
            if (kind == "login") {
                this.signComponent = "Login";
                this.$refs.login.style.backgroundColor = "white";
                this.$refs.register.style.backgroundColor = "#ccc";
                this.$refs.login.style.color = "black";
                this.$refs.register.style.color = "#aaa";
            } else {
                this.signComponent = "Register";
                this.$refs.login.style.backgroundColor = "#ccc";
                this.$refs.register.style.backgroundColor = "white";
                this.$refs.login.style.color = "#aaa";
                this.$refs.register.style.color = "black";
            }
        },
    },
};
</script>

<style scoped>
#sign {
    width: 500px;
    height: 400px;
    background-color: white;
    border-radius: 10px;
    margin: 0 auto;
}

.close {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 5px;
    right: 20px;
    font-size: 30px;
}

#sign>.title {
    margin: 50px auto;
    display: flex;
    width: 400px;
    height: 52px;
    line-height: 50px;
    border-radius: 25px;
    background-color: #ccc;
}

#sign>.title>.login,
.register {
    width: 200px;
    height: 50px;
    line-height: 50px;
    border-radius: 25px;
    border: 1px solid #ccc;
    text-align: center;
}

#sign>.title>.login {
    background-color: white;
    color: black;
}

#sign>.title>.register {
    color: #aaa;
}
</style>