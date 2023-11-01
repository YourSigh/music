<template>
    <div ref="user" @click=$event.stopPropagation();>
        <div id="user">
            <div class="head">
                <img src="../../assets/img/headshot.png" alt="">
            </div>
            <div class="username" @click="changename">
                {{ username }}
            </div>
            <input type="text" :value="username" ref="changename" class="changename" @keyup.enter="hidden" @blur="hidden">
            <div class="userid">
                UID：{{ uid }}
            </div>
            <button class="signout" @click="signout">退出登录</button>
            <div class="changepwd">修改密码</div>
        </div>

    </div>
</template>

<script>
import bus from '../../utils/bus'
export default {
    name: 'User',

    data() {
        return {
        };
    },

    props:{
        username:{
            type:String
        },
        uid:{
            type:Number|String
        }
    },

    mounted() {

    },

    methods: {
        changename(e) {
            this.$refs.changename.style.display = 'block';
            this.$refs.changename.focus();
            e.stopPropagation(); // 阻止事件冒泡，防止无法触发
        },
        hidden(e) {
            bus.$emit('changename', this.$refs.changename.value);
            this.$refs.changename.style.display = 'none';
            e.stopPropagation(); // 阻止事件冒泡，防止无法触发
        },
        signout() {
            this.$emit('signout');
        }
    },
};
</script>

<style scoped>
#user {
    width: 230px;
    height: 400px;
    margin: 10px auto;
    text-align: center;
    background-color: #363648;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
}

#user>.head>img {
    width: 100px;
    height: 100px;
    margin: 20px auto;
}

#user>.username {
    font-size: 30px;
    width: 200px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    margin: 0 auto;
}

#user>.changename {
    width: 200px;
    height: 40px;
    font-size: 20px;
    position: absolute;
    left: 15px;
    top: 150px;
    border: none;
    outline: none;
    border-radius: 5px;
    display: none;
    text-align: center;
}

#user>.userid {
    margin: 20px auto;
}

#user>.signout {
    margin: 60px auto 0;
    width: 200px;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #aaccee;
    color: white;
}

#user>.changepwd {
    margin: 20px auto;
    color: #aaccee;
    font-size: 12px;
}
</style>