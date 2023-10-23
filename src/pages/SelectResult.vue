<template>
    <div id="selectResult">
        <div class="left"></div>
        <div class="title">
            <div class="t_music">歌曲</div>
            <div class="t_singer">歌手</div>
            <div class="t_album">专辑</div>
            <div class="t_time">时长</div>
        </div>
        <div class="content">
            <ul>
                <li v-for="i in selectResults" :key="i.name" class="iconfont">
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
        <div class="right"></div>
    </div>
</template>

<script>
import bus from '../utils/bus.js'
export default {
    name: 'SelectResult',

    data() {
        return {
            selectResults: [],
            selectContent: this.$route.params.name,
            play_icon:'&#xe7fe;',
            stop_icon:'&#xe7fd;',
            like_icon: "&#xe761;",
            dislike_icon: "&#xe760;",
            play_target:null,
            isRefresh:false,
            isPlay:false
        };
    },
    props:{
        music:Array,
        required:true,
    },

    created() {
        this.updateSelectResult();
        var that = this;
        bus.$on('isPlay', isPlay => {
            that.isPlay = isPlay;
        });

    },

    mounted() {
    },

    methods: {
        updateSelectResult() {
            this.selectResults = [];
            for (var i in this.music) {
                if (this.music[i].name.indexOf(this.selectContent) != -1) {
                    this.selectResults.push(this.music[i]);
                }
            }
            // console.log(this.music);
        },
        play(e, i) {
            if (this.isPlay) {
                // 有歌曲在播放
                if (e.target != this.play_target) {
                    // 当前播放的歌曲不是该歌曲
                    this.play_target.innerHTML = this.play_icon; // 使之前的图标换成暂停播放
                    this.play_target = e.target;
                    this.play_target.innerHTML = this.play_icon; // 使当前的选中的图标为播放
                    this.isPlay = true;
                    bus.$emit('music', i, true);
                    bus.$emit('music', i, true);
                } else {
                    this.play_target.innerHTML = this.stop_icon;
                    this.isPlay = false;
                    bus.$emit('music', i, false);
                }
            } else {
                // 没有歌曲在播放
                e.target.innerHTML = this.play_icon;
                this.isPlay = true;
                this.play_target = e.target;
                bus.$emit('music', i, false);
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
        }
    },
    watch: {
        $route() {
            this.selectContent = this.$route.params.name;
            this.updateSelectResult();
        },
        isPlay(){
            if (this.isPlay) {
                if (this.play_target) {
                    this.play_target.innerHTML = this.stop_icon;
                }
            } else {
                this.play_target.innerHTML = this.play_icon;
            }
        },
        music() {
            this.updateSelectResult();
        }
    },
    computed: {
    }
};
</script>

<style scoped>
#selectResult {
    width: 810px;
    height: 535px;
    overflow: auto;
    display: flex;
}

@font-face {
    font-family: "iconfont logo";
    src: url('https://at.alicdn.com/t/font_985780_km7mi63cihi.eot?t=1545807318834');
    src: url('https://at.alicdn.com/t/font_985780_km7mi63cihi.eot?t=1545807318834#iefix') format('embedded-opentype'),
        url('https://at.alicdn.com/t/font_985780_km7mi63cihi.woff?t=1545807318834') format('woff'),
        url('https://at.alicdn.com/t/font_985780_km7mi63cihi.ttf?t=1545807318834') format('truetype'),
        url('https://at.alicdn.com/t/font_985780_km7mi63cihi.svg?t=1545807318834#iconfont') format('svg');
}

#selectResult::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
}

#selectResult>.left {
    width: 38px;
    height: 535px;
}

#selectResult>.content {
    width: 724px;
    height: 1000px;
}

#selectResult>.title {
    width: 724px;
    height: 50px;
    display: flex;
    line-height: 50px;
    position: fixed;
    margin-left: 38px;
    background-image: url('../assets/img/background.jpg');
    background-position: -248px -80px;
    top:80px;
}

#selectResult>.title:after {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 1;
    width: 100%;
    height: 100%;
}

#selectResult>.title>div{
    color: white;
    z-index: 2;
    font-size: 14px;
}

#selectResult>.title>.t_music{
    margin-left: 10px;
}

#selectResult>.title>.t_singer{
    margin-left: 290px;
}

#selectResult>.title>.t_album {
    margin-left: 100px;
}

#selectResult>.title>.t_time {
    margin-left: 120px;
}

#selectResult>.content>ul>li {
    width: 724px;
    height: 50px;
    line-height: 50px;
    list-style-type: none;
    color: white;
    display: flex;
    font-size: 14px;
    z-index: 0;
}

#selectResult>.content>ul>li>div {
    overflow: hidden;
}

#selectResult>.content>ul{
    margin-top:50px;
}

#selectResult>.content>ul>li:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

#selectResult>.content>ul>li>.like{
    width: 30px;
    height: 50px;
}

#selectResult>.content>ul>li>.musicName{
    width: 200px;
    height: 50px;
}

#selectResult>.content>ul>li>.play, .add, .downLoad, .more{
    font-size:16px;
    width: 25px;
    height: 50px;
    visibility: hidden;
}

#selectResult>.content>ul>li>.play:hover, .add:hover, .downLoad:hover, .more:hover{
    color:aqua;
}

#selectResult>.content>ul>li:hover>.play{
    visibility: visible;
}

#selectResult>.content>ul>li:hover>.add{
    visibility: visible;
}

#selectResult>.content>ul>li:hover>.downLoad{
    visibility: visible;
}

#selectResult>.content>ul>li:hover>.more{
    visibility: visible;
}

#selectResult>.content>ul>li>.singer {
    width: 130px;
    height: 50px;
}

#selectResult>.content>ul>li>.album {
    width: 145px;
    height: 50px;
}

#selectResult>.right {
    width: 38px;
    height: 535px;
}

#selectResult>.content>.title {
    font-size: 34px;
    color: white;
}
</style>