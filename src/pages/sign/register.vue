<template>
    <div id="register">
        <div class="title">账号注册</div>
        <input type="text" placeholder="请输入您的账号"><br>
        <input type="text" placeholder="请输入您的密码"><br>
        <button>注册</button>
    </div>
</template>

<script>
export default {
    name: 'Register',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style scoped>
    #register {
        margin:-15px auto;
        width: 500px;
        height: 300px;
        color: black;
        font-size:30px;
        text-align: center;
    }

    #register>.title {
        margin:50px 0 20px;
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