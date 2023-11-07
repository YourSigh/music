<template>
    <div id="headerRight">
        <div class="back" title="后退" @click="back">&lt;</div>
        <div class="forward" title="前进" @click="forward">&gt;</div>
        <div class="select">
            <input type="text" placeholder="搜索音乐" id="select" @keyup.enter="selectMusic('')" @input="select" @focus="select" @blur="hide"/>
            <img src="../../../assets/img/select.png" title="搜索" @click="selectMusic('')" />
            <div class="selectResults" v-show="selectResults[0] != ''">
                <p v-show="selectResults.length == 0">未搜索到相关歌曲！</p>
                <ul>
                    <li v-for="i in selectResults" @click="selectMusic(i)" :key="i">
                        {{ i }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="img">
            <img src="../../../assets/img/listen.png" alt="听" title="听歌识曲" />
        </div>
        <div class="user" @click="open">
            <div class="headshot">
                <img :src="img" alt="" />
            </div>
            <div class="username">{{ username }}</div>
        </div>
        <User class="userInfo" ref="userComponent" @signout="signout" :username="username" :uid="uid" :img.sync="img"></User>
        <Modal :show.sync="isShowSign" :width="'500px'">
            <template v-slot:content>
                <Sign class="sign"></Sign>
            </template>
        </Modal>
        <div class="menu">
            <div></div>
            <div>|</div>  
            <div></div>
        </div>
        <div class="titleBar">
            <div class="minimize">
                <div>—</div>
            </div>
            <div class="zoom">
                <div>□</div>
            </div>
            <div class="close">
                <div @click="close">X</div>
            </div>
        </div>
    </div>
</template>

<script>
import store from "../../../store/store";
import Sign from "../../sign/sign.vue"
import User from "../../user/index.vue"
import bus from "../../../utils/bus"
export default {
    name: "HeaderRight",
    store,
    data() {
        return {
            timer: null,
            selectResults: [""],
            username: '点我登录',
            uid: '',
            isLogin: false,
            img:'music-img/默认头像.png', // ../../../assets/img/headshot.png
            isShowSign:false,
        };
    },
    components:{
        Sign,
        User
    },

    props:{
        music:Array,
        required:true,
    },

    mounted() { 
        bus.$on('sign', (uid, username, img) => {
            this.isLogin = true;
            this.username = username;
            this.uid = uid;
            this.img = img;
            this.isShowSign = false;
        });
        bus.$on('register', (uid, username, img) => {
            this.isLogin = true;
            this.username = username;
            this.uid = uid;
            this.img = img;
            this.isShowSign = false;
        });
        bus.$on('changename', (username) => {
            this.username = username;
        })
    },

    methods: {
        back() {
            history.back();
        },
        forward() {
            history.forward();
        },
        close() {
            document.getElementById("app").style.visibility = "hidden";
        },
        selectMusic(i) {
            setTimeout(() => {
                var text = document.getElementById("select").value;
                if (text == "") {
                    alert("请输入您要搜索的内容！");
                } else {
                    if (i != '') {
                        this.$router.push(`/selectResult/${i}`);
                    } else {
                        this.$router.push(`/selectResult/${text}`);
                    }
                    this.selectResults = [''];
                }
            }, 500);
        },
        select() {
            // 防抖实现用户搜索提示内容列表
            if (this.timer != null) {
                clearTimeout(this.timer);
            }
            var that = this;
            this.timer = setTimeout(function () {
                that.selectResults = [];
                var text = document.getElementById("select").value;
                if (text == "") {
                    that.selectResults[0] = "";
                } else {
                    for (var i in that.music) {
                        if (that.music[i].name.indexOf(text) != -1) {
                            that.selectResults.push(that.music[i].name);
                        }
                    }
                }
            }, 500);
        },
        hide(){
            setTimeout(() => this.selectResults = [''], 500);
        },
        open(e) {
            if (this.isLogin) {
                this.$refs.userComponent.$refs.user.style.visibility = this.$refs.userComponent.$refs.user.style.visibility == 'visible'?'hidden':'visible';
            } else {
                this.isShowSign?this.isShowSign = false: this.isShowSign = true;
            }
            e.stopPropagation();// 阻止事件冒泡，防止无法触发该事件
        },
        signout() {
            this.isLogin = false;
            this.username = '点我登录';
            this.img = 'music-img/默认头像.png'
            this.$refs.userComponent.$refs.user.style.visibility = this.$refs.userComponent.$refs.user.style.visibility == 'visible'?'hidden':'visible';
        },
        changename(username) {
            this.username = username;
        }
    },
};
</script>

<style scoped>
#headerRight {
    width: 810px;
    height: 80px;
    align-items: center;
    display: flex;
    position: relative;
}

#headerRight>.back {
    width: 35px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    margin-left: 38px;
}

#headerRight>.forward {
    width: 35px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
}

#headerRight>.select {
    height: 40px;
    line-height: 35px;
    width: 160px;
    display: flex;
}

#headerRight>.select>input {
    width: 130px;
    background-color: rgba(55, 55, 55, 0.5);
    color: white;
    padding: 10px 15px 10px 15px;
    border: 0;
    border-radius: 20px;
    outline: none;
}

#headerRight>.select>img {
    width: 15px;
    height: 15px;
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    position: relative;
    top: 12px;
    right: 25px;
}

#headerRight>.select>img:hover {
    filter: none;
}

#headerRight>.select>.selectResults {
    width: 300px;
    height: 300px;
    background-color: black;
    border-radius: 10px;
    top: 60px;
    position: absolute;
    z-index: 2;
    overflow: auto;
}

#headerRight>.select>.selectResults::-webkit-scrollbar{
    width: 10px;
}

::-webkit-scrollbar-thumb{
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
}

#headerRight>.select>.selectResults>ul {
    list-style-type: none;
}

#headerRight>.select>.selectResults>ul>li:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

#headerRight>.img {
    width: 40px;
    height: 40px;
    line-height: 55px;
    text-align: center;
}

#headerRight>.img>img {
    width: 30px;
    height: 30px;
}

#headerRight>.user {
    display: flex;
    width: 215px;
    height: 40px;
    align-items: center;
    margin-left: 100px;
}

#headerRight>.user>.headshot>img {
    width: 25px;
    height: 25px;
    border-radius: 12.5px;
}

#headerRight>.user>.username {
    width: 70px;
    height: 40px;
    line-height: 38px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    font-size: 12px;
}

#headerRight>.userInfo {
    position: absolute;
    width: 250px;
    height: 420px;
    top: 50px;
    right: 230px;
    background-color: #323264a0;
    z-index: 10;
    border-radius: 10px;
    visibility: hidden;
}

#headerRight>.menu {
    width: 78px;
    height: 40px;
    display: flex;
    align-items: center;
}

#headerRight>.titleBar {
    width: 105px;
    height: 40px;
    align-items: center;
    display: flex;
}

#headerRight>.titleBar>.minimize {
    width: 35px;
    height: 40px;
    line-height: 40px;
    font-size: 10px;
}

#headerRight>.titleBar>.minimize>div {
    width: 12px;
}

#headerRight>.titleBar>.zoom {
    width: 35px;
    height: 40px;
    line-height: 40px;
    font-size: 25px;
}

#headerRight>.titleBar>.zoom>div {
    width: 14px;
}

#headerRight>.titleBar>.close {
    width: 35px;
    margin-top: 5px;
}

#headerRight>.titleBar>.close>div {
    width: 10px;
}
</style>
../../../store/store