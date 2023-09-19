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
        <div class="user">
            <div class="headshot">
                <img src="../../../assets/img/headshot.png" alt="" />
            </div>
            <div class="username">面向慈善</div>
        </div>
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
import store from "../../../store";
export default {
    name: "HeaderRight",
    store,
    data() {
        return {
            timer: null,
            selectResults: [""],
        };
    },

    props:{
        music:Array,
        required:true,
    },

    mounted() { 
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
}

#headerRight>.user>.username {
    width: 70px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    font-size: 10px;
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
