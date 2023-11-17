<template>
    <div id="musicHall" @scroll="scrollChange" ref="musicHall">
        <div class="left" ref="left"></div>
        <div class="right" ref="right"></div>
        <h1 class="title">音乐馆</h1>
        <div class="menu" ref="menu">
            <div class="t_music">歌曲</div>
            <div class="t_singer">歌手</div>
            <div class="t_album">专辑</div>
            <div class="t_time">时长</div>
        </div>
        <ul ref="music_list">
            <li v-for="i in selectResults" :key="i.name + 'musicHall'" class="iconfont">
                <div class="like" v-html="like_icon" @click="changeLike($event, i)"></div>
                <div class="musicName">
                    {{ i.name }}
                </div>
                <div class="play" v-html="play_icon" @click="play($event, i)"></div>
                <div class="add">&#xe604;</div>
                <div class="downLoad">&#xe646;</div>
                <div class="more">&#xe626;</div>
                <div class="singer">
                    {{ i.singer }}
                </div>
                <div class="album">
                    {{ i.album }}
                </div>
                <div class="time">
                    {{ i.time }}
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
import bus from "../../../../utils/bus";
export default {
    name: "MusicHall",

    data() {
        return {
            selectResults: [],
            selectContent: this.$route.params.name,
            play_icon: "&#xe7fe;",
            stop_icon: "&#xe7fd;",
            like_icon: "&#xe761;",
            dislike_icon: "&#xe760;",
            play_target: null,
            isRefresh: false,
            isPlay: false,
            height:this.$refs.music_list?.offsetHeight
        };
    },
    props: {
        music: Array,
        required: true,
    },

    created() {
        this.selectResults = this.music;
        var that = this;
        bus.$on("isPlay", (isPlay) => {
            that.isPlay = isPlay;
        });
    },

    mounted() {
        this.height = this.$refs.music_list.offsetHeight;
    },

    updated() {
        this.$nextTick(() => {
            this.height = this.$refs.music_list.offsetHeight;
        });
    },

    methods: {
        scrollChange() {
            if (this.$refs["musicHall"].scrollTop < 50) {
                var str = "-248px " + (this.$refs["musicHall"].scrollTop - 125) + "px";
                this.$refs["menu"].style.backgroundPosition = str;
            }
        },
        play(e, i) {
            if (this.isPlay) {
                // 有歌曲在播放
                if (e.target != this.play_target) {
                    // 当前播放的歌曲不是该歌曲
                    if (this.play_target != null) {
                        this.play_target.innerHTML = this.play_icon; // 使之前的图标换成暂停播放
                    }
                    this.play_target = e.target;
                    this.play_target.innerHTML = this.play_icon; // 使当前的选中的图标为播放
                    this.isPlay = true;
                    bus.$emit("music", i, true);
                    bus.$emit("music", i, true);
                } else {
                    this.play_target.innerHTML = this.stop_icon;
                    this.isPlay = false;
                    bus.$emit("music", i, false);
                }
            } else {
                // 没有歌曲在播放
                e.target.innerHTML = this.play_icon;
                this.isPlay = true;
                this.play_target = e.target;
                bus.$emit("music", i, false);
            }
        },
        changeLike(e, i) {
            // 改变歌曲喜欢图标
            if (e.target.islike != "true") {
                e.target.innerHTML = this.dislike_icon;
                e.target.style.color = "rgb(255, 100, 100)";
                e.target.islike = "true";
            } else {
                e.target.innerHTML = this.like_icon;
                e.target.style.color = null;
                e.target.islike = "false"
            }
        },
    },
    watch: {
        isPlay() {
            if (this.isPlay) {
                if (this.play_target) {
                    this.play_target.innerHTML = this.stop_icon;
                }
            } else {
                this.play_target.innerHTML = this.play_icon;
            }
        },
        music() {
            this.selectResults = this.music;
        },
        height() {
            this.$refs.left.style.height = this.$refs.music_list.offsetHeight + 95 + 'px';
            this.$refs.right.style.height = this.$refs.music_list.offsetHeight + 95 + 'px';
        }
    },
};
</script>

<style scoped>
#musicHall {
    width: 810px;
    height: 535px;
    overflow: auto;
}

#musicHall::before {
    width: 724px;
    height: 50px;
    background-image: url("../../../../assets/img/background.jpg");
    background-position: -248px -80px;
    content: '';
    display: block;
    position: absolute;
    top: 80px;
    left: 248px;
    z-index: 1;
}

#musicHall::after {
    width: 724px;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    content: '';
    display: block;
    position: absolute;
    top: 80px;
    left: 248px;
    z-index: 1;
}

@font-face {
    font-family: "iconfont logo";
    src: url("https://at.alicdn.com/t/font_985780_km7mi63cihi.eot?t=1545807318834");
    src: url("https://at.alicdn.com/t/font_985780_km7mi63cihi.eot?t=1545807318834#iefix") format("embedded-opentype"),
        url("https://at.alicdn.com/t/font_985780_km7mi63cihi.woff?t=1545807318834") format("woff"),
        url("https://at.alicdn.com/t/font_985780_km7mi63cihi.ttf?t=1545807318834") format("truetype"),
        url("https://at.alicdn.com/t/font_985780_km7mi63cihi.svg?t=1545807318834#iconfont") format("svg");
}

::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
}

#musicHall>.left {
    width: 38px;
    height: 100%;
    float: left;
    position: relative;
}

#musicHall>.right {
    width: 38px;
    float: right;
    position: relative;
}

#musicHall>.menu {
    width: 724px;
    height: 50px;
    display: flex;
    line-height: 50px;
    position: sticky;
    margin-left: 0;
    top: 0;
    z-index: 2;
}

#musicHall>.menu>div {
    color: white;
    font-size: 14px;
}

#musicHall>.menu>.t_music {
    margin-left: 10px;
}

#musicHall>.menu>.t_singer {
    margin-left: 290px;
}

#musicHall>.menu>.t_album {
    margin-left: 100px;
}

#musicHall>.menu>.t_time {
    margin-left: 120px;
}

#musicHall>ul>li {
    width: 724px;
    height: 50px;
    line-height: 50px;
    list-style-type: none;
    color: white;
    display: flex;
    font-size: 14px;
}

#musicHall>ul>li>div {
    overflow: hidden;
}

#musicHall>ul>li:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

#musicHall>ul>li>.like {
    width: 20px;
    margin-left: 5px;
    margin-right: 5px;
    height: 50px;
    text-align: center;
    font-size: 20px;
}

#musicHall>ul>li>.like:hover {
    color: rgb(255, 100, 100);
}

#musicHall>ul>li>.musicName {
    width: 200px;
    height: 50px;
}

#musicHall>ul>li>.play,
.downLoad,
.add,
.more {
    font-size: 16px;
    width: 25px;
    height: 50px;
    visibility: hidden;
}

#musicHall>ul>li>.play:hover,
.add:hover,
.downLoad:hover,
.more:hover {
    color: aqua;
}

#musicHall>ul>li:hover>.play {
    visibility: visible;
}

#musicHall>ul>li:hover>.downLoad {
    visibility: visible;
}

#musicHall>ul>li:hover>.add {
    visibility: visible;
}

#musicHall>ul>li:hover>.more {
    visibility: visible;
}

#musicHall>ul>li>.singer {
    width: 130px;
    height: 50px;
}

#musicHall>ul>li>.album {
    width: 145px;
    height: 50px;
}

#musicHall>.title {
    font-size: 34px;
    color: white;
    position: relative;
    z-index: 2;
}
</style>