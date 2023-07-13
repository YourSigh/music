<template>
    <div id="headerRight">
        <div class="back" title="后退" @click="back">&lt;</div>
        <div class="forward" title="前进" @click="forward">&gt;</div>
        <div class="select">
            <input type="text" placeholder="搜索音乐" @keyup.enter="selectMusic" id="select" @input="select" />
            <img src="../../../assets/img/搜索.png" title="搜索" @click="selectMusic" />
            <div class="selectResults">
                <ul>
                    <li v-for="i in selectResults">
                        {{ i }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="img">
            <img src="../../../assets/img/听歌识曲.png" alt="听歌识曲" title="听歌识曲" />
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
            music: [
                {
                    name: "歌曲1",
                    src: "",
                },
                {
                    name: "歌曲2",
                    src: "",
                },
                {
                    name: "你好",
                    src: "",
                },
            ],
            selectResults: [],
        };
    },

    mounted() { },

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
        selectMusic() {
            var text = document.getElementById("select").value;
            if (text == "") {
                alert("请输入您要搜索的内容！");
            } else {
                alert(text);
                this.$router.push("/selectResult");
            }
        },
        select() {
            var text = document.getElementById("select").value;
            var results = document.querySelector(".selectResults");
            if (text == "") {
                results.style.display = null;
            } else {
                this.selectResults = [];
                // 防抖实现用户搜索提示内容列表
                if (this.timer != null) {
                    clearTimeout(this.timer);
                }
                var that = this;
                this.timer = setTimeout(function () {
                    for (var i in that.music) {
                        if (that.music[i].name.indexOf(text) != -1) {
                            that.selectResults.push(that.music[i].name);
                        }
                    }
                    console.log(that.selectResults);
                }, 1000);
            }
        },
    },
};
</script>

<style>
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