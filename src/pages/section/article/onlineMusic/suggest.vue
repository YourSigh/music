<template>
    <div id="suggest">
        <div class="left"></div>
        <div class="content iconfont">
            <h1 class="title1">推荐</h1>
            <div class="title2">Hi {{ userInfo.username }} 今日为你推荐</div>
            <div class="suggest_content">
                <div class="forYou">
                    <div class="forYou_content">
                        <div class="title">For<br/>You</div>
                        <div class="img" ref="forYou"></div>
                        <div class="music_message">
                            <div class="music_name">Faded</div>
                            <div class="singer">Alan Walker</div>
                            <div class="function">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div style="color:white">猜你喜欢</div>
                </div>
                <div class="daily">
                    <div class="content">
                        <div class="title">Daily<br/>30</div>
                        <div class="img" ref="daily"></div>
                        <div class="play" v-html="stop_icon" @click="play($event, 'test8')"></div>
                    </div>
                    <div style="color:white">每日30首</div>
                </div>
                <div class="hot">
                    <div class="content">
                        <div class="title">Hot</div>
                        <div class="img" ref="hot"></div>
                        <div class="play" v-html="stop_icon" @click="play($event, 'test9')"></div>
                    </div>
                    <div style="color:white">百万收藏</div>
                </div>
            </div>
            <div class="title3">你的歌单补给站</div>
            <div class="playlist">
                <div v-for="i in play_list">
                    <div class="content">
                        <div class="img" :ref="i"></div>
                        <div class="play" v-html="stop_icon" @click="play($event, i)" :ref="i + 'play'"></div>
                    </div>
                    <div style="color:white;overflow: hidden;width: 100%;" :ref="i + 'title'"></div>
                </div>
            </div>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import bus from "../../../../utils/bus";
export default {
    name: 'Suggest',

    data() {
        return {
            play_icon:'&#xe6f7;',
            stop_icon:'&#xe658;',
            username: "面向慈善",
            play_list:[],
            isPlay:false,
            play_target:null,
            reandoms:[]
        };
    },

    props: {
        music: Array,
        required: true,
    },

    created() {
        for (var i = 0;i < 8; i++) {
            this.play_list.push('list' + i); 
        }
        var that = this;
        bus.$on("isPlay", (isPlay) => {
            that.isPlay = isPlay;
        });
    },

    mounted() {
        if (this.music.length != 0) {
            this.setImg();
        } 
    },

    computed: {
        ...mapState(['userInfo'])
    },

    methods: {
        setImg() {
            var reandoms = [];
            for (var i = 0; i < 10; i++) {
                while(true) {
                    let r = parseInt(Math.random() * this.music.length);
                    if (reandoms.indexOf(r) == -1) {
                        reandoms.push(r);
                        break;
                    }
                }
            }

            this.reandoms = reandoms;
            
            for (var i = 0; i < 8; i++) {
                var s = 'list' + i;
                this.$refs[s][0].style.backgroundImage = "url(" + this.music[reandoms[i]].img + ")";
                this.$refs[s + 'title'][0].innerHTML = this.music[reandoms[i]].name;
            }
            this.$refs.daily.style.backgroundImage = "url(" + this.music[reandoms[8]].img + ")";
            this.$refs.hot.style.backgroundImage = "url(" + this.music[reandoms[9]].img + ")";
        },

        play(e, i) {
            var i = this.music[this.reandoms[i.slice(4, 5)]];
            if (this.isPlay) {
                // 有歌曲在播放
                if (e.target != this.play_target) {
                    // 当前播放的歌曲不是该歌曲
                    if (this.play_target != null) {
                        this.play_target.innerHTML = this.stop_icon; // 使之前的图标换成暂停播放
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
        }
    },

    watch:{
        music() {
            this.setImg();
        }
    }
};
</script>

<style scoped>
    #suggest{
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

    #suggest::-webkit-scrollbar{
        width: 10px;
    }

    ::-webkit-scrollbar-thumb{
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.5);
    }

    #suggest>.left{
        width: 38px;
        height: 535px; 
    }

    #suggest>.content{
        width: 724px;
        height: 1000px;
        /* background-color: black; */
    }

    #suggest>.right{
        width: 38px;
        height: 535px;
    }

    #suggest>.content>.title1{
        font-size:32px;
        color:white;
        margin-top:10px
    }

    #suggest>.content>.title2{
        font-size:22px;
        color:white;
        margin-top:25px;
    }

    #suggest>.content>div>div>.content{
        position: relative;
        bottom:0;
        transition: bottom 0.5s;
    }

    #suggest>.content>div>div>.content>.play {
        visibility: hidden;
    }

    #suggest>.content>div>div>.content:hover>.play {
        visibility: visible;
        position: absolute;
        float:left;
        color:white;
        top: calc(50% - 25px);
        left: calc(50% - 25px);
        font-size:50px;
        z-index: 2;
    }

    #suggest>.content>div>div>.content>.play:hover{
        color: #aaccee;
    }

    #suggest>.content>div>div>.content:hover{
        bottom:10px;
    }

    #suggest>.content>div>div>.content:hover:before{
        content:'';
        display: block;
        width: 160px;
        height: 170px;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        z-index:2;
    }

    #suggest>.content>.suggest_content {
        width: 724px;
        height: 220px;
        display: flex;
        justify-content: space-between;
    }

    #suggest>.content>.suggest_content>.forYou {
        width: 360px;
        height: 220px;
    }

    #suggest>.content>.suggest_content>.forYou>.forYou_content {
        width: 360px;
        height: 170px;
        border-radius: 10px;
        margin: 17px 0 10px 0;
        background-color: #aaccee;
        display: flex;
        position: relative;
        bottom:0;
        transition: bottom 0.5s;
    }

    #suggest>.content>.suggest_content>.forYou>.forYou_content:hover {
        bottom:10px;
    }

    #suggest>.content>.suggest_content>.forYou>.forYou_content>.title {
        position: relative;
        float: left;
        top:10px;
        left:10px;
        z-index: 6;
        font-size:28px;
        font-weight: 1000;
        line-height: 28px;
        color:white;
    }

    #suggest>.content>.suggest_content>.forYou>.forYou_content>.img {
        width: 130px;
        height: 130px;
        background-color: #aaccee;
        margin: 20px 0 0 -20px;
        border-radius: 10px;
        background-image: url('../../../../../public/music-img/Faded.png');
        background-size: auto 100%;
    }

    #suggest>.content>.suggest_content>.forYou>.forYou_content>.music_message>.music_name {
        margin:50px 0 0 20px;
        color: white;
    }

    #suggest>.content>.suggest_content>.forYou>.forYou_content>.music_message>.singer {
        font-size:10px;
        color:#1312127e;
        margin:10px 0 0 20px;
    }

    #suggest>.content>.suggest_content>.daily {
        width: 160px;
        height: 220px;
    }

    #suggest>.content>.suggest_content>.daily>.content>.title {
        position: relative;
        float: left;
        top:10px;
        left:10px;
        z-index: 6;
        font-size:28px;
        font-weight: 1000;
        line-height: 28px;
        color:white;
    }

    #suggest>.content>.suggest_content>.daily>.content>.img {
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
    }

    #suggest>.content>.suggest_content>.daily>:first-child {
        width: 160px;
        height: 170px;
        border-radius: 10px;
        margin: 17px 0 10px 0;
        background-color: #aaa;
        overflow: hidden;
    }

    #suggest>.content>.suggest_content>.hot {
        width: 160px;
        height: 220px;
    }

    #suggest>.content>.suggest_content>.hot>.content>.title {
        position: relative;
        float: left;
        top:10px;
        left:10px;
        z-index: 6;
        font-size:28px;
        font-weight: 1000;
        line-height: 28px;
        color:white;
    }

    #suggest>.content>.suggest_content>.hot>:first-child {
        width: 160px;
        height: 170px;
        border-radius: 10px;
        margin: 17px 0 10px 0;
        background-color: #aaa;
        overflow: hidden;
    }

    #suggest>.content>.suggest_content>.hot>.content>.img {
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
    }

    #suggest>.content>.title3{
        font-size:22px;
        color:white;
        margin-top:25px;
    }

    #suggest>.content>.playlist {
        width: 724px;
        height: 500px;
        display: flex;
        justify-content: space-between;
        flex-flow:row wrap;
    }

    #suggest>.content>.playlist>div {
        width: 160px;
        height: 250px;
    }

    #suggest>.content>.playlist>div>.content{
        width: 160px;
        height: 170px;
        background-color: #aaa;
        margin: 17px 0 10px 0;
        border-radius: 10px;
        overflow: hidden;
    }

    #suggest>.content>.playlist>div>.content>.img {
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
    }
</style>