<template>
    <div id="headerRight" class="iconfont">
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
        
        <div class="menu">
            <div class="color">
                <div @click="changecolor">&#xe65e;</div>
            </div>
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

        <Modal :show.sync="isShowSign" :width="'500px'">
            <template v-slot:content>
                <Sign class="sign"></Sign>
            </template>
        </Modal>
        <Modal :show.sync="isShowColor" :width="'200px'" :title="'更换背景颜色'">
            <template v-slot:content>
                <div style="margin: 0 auto;">
                    <div :style="{ backgroundColor: color, width: '100px', height:'100px', borderRadius:'50%', margin: '0 auto'}" @click="$refs.color.click()"></div>
                    <input type="color" v-model="color" style="visibility: hidden; width: 0; height: 0;" ref="color">
                </div>
            </template>
        </Modal>
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
            isLogin: false,
            uid: '',
            username: '点我登录',
            img:'music-img/默认头像.png',
            isShowSign:false,
            isShowColor:false,
            color:localStorage.getItem('color')
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

    watch:{
        color() {
            this.$store.commit('setColor', this.color);
            localStorage.setItem('color', this.color);
        }
    },

    mounted() { 
        if (localStorage.getItem('uid')) {
            // 如果已经登录，刷新页面时从缓存中获取信息
            this.uid = localStorage.getItem('uid');
            this.username = localStorage.getItem('username');
            this.img = localStorage.getItem('img')  + "?time=" + new Date();
            this.isLogin = true;
        }
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
            localStorage.setItem('username', this.username);
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
            this.uid = '';
            this.username = '点我登录';
            this.img = 'music-img/默认头像.png';
            localStorage.removeItem('uid');
            localStorage.removeItem('username');
            localStorage.removeItem('img');
            this.$refs.userComponent.$refs.user.style.visibility = this.$refs.userComponent.$refs.user.style.visibility == 'visible'?'hidden':'visible';
        },
        changename(username) {
            this.username = username;
        }
    },
};
</script>

<style scoped>
@font-face {
    font-family: "iconfont logo";
    src: url('https://at.alicdn.com/t/font_985780_km7mi63cihi.eot?t=1545807318834');
    src: url('https://at.alicdn.com/t/font_985780_km7mi63cihi.eot?t=1545807318834#iefix') format('embedded-opentype'),
        url('https://at.alicdn.com/t/font_985780_km7mi63cihi.woff?t=1545807318834') format('woff'),
        url('https://at.alicdn.com/t/font_985780_km7mi63cihi.ttf?t=1545807318834') format('truetype'),
        url('https://at.alicdn.com/t/font_985780_km7mi63cihi.svg?t=1545807318834#iconfont') format('svg');
}

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
    margin-left:10px;
    font-size: 12px;
    overflow: hidden;
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

#headerRight>.menu>.color{
    width: 35px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
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