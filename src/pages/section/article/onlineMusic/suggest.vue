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
                        <div class="play" v-html="stop_icon" @click="play($event, 'test8')" ref="8play"></div>
                    </div>
                    <div style="color:white">每日30首</div>
                </div>
                <div class="hot">
                    <div class="content">
                        <div class="title">Hot</div>
                        <div class="img" ref="hot"></div>
                        <div class="play" v-html="stop_icon" @click="play($event, 'test9')" ref="9play"></div>
                    </div>
                    <div style="color:white">百万收藏</div>
                </div>
            </div>
            <div class="title3">你的歌单补给站</div>
            <div class="playlist">
                <div v-for="(i, item) in play_list">
                    <div class="content">
                        <div class="img" :ref="i"></div>
                        <div class="play" v-html="stop_icon" @click="play($event, i)" :ref="item + 'play'"></div>
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
            reandoms:[], // 存放随机数在音乐列表中的下标
            item: 0, // 当前播放的歌曲在音乐列表中的下标
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
        bus.$off('isPlay');
        bus.$on('isPlay', (isPlay, path, musicName) => {
            this.$nextTick(() => {
                if (path == '/suggest') {
                    // 如果要播放的歌曲不是当前播放的歌曲
                    let playTarget = this.music[this.reandoms[this.item]].name;
                    this.item = this.reandoms.indexOf(this.music.findIndex((item) => item.name == musicName));
                    if (playTarget != musicName && this.isPlay) {
                        this.play_(this.play_target);
                        let target = this.$refs[this.reandoms.indexOf(this.music.findIndex((item) => item.name == musicName)) + 'play']
                        this.play_target = Array.isArray(target) ? target[0] : target;
                        this.play_(this.play_target);
                        return;
                    } else if (playTarget != musicName && !this.isPlay) {
                        let target = this.$refs[this.reandoms.indexOf(this.music.findIndex((item) => item.name == musicName)) + 'play']
                        this.play_target = Array.isArray(target) ? target[0] : target;
                        return;
                    }
                    this.play_(this.play_target);
                    this.isPlay = isPlay;
                }
            });
        });
    },

    activated() {
        bus.$off('isPlay');
        bus.$on('isPlay', (isPlay, path, musicName) => {
            if (path == '/suggest') {
                    // 如果要播放的歌曲不是当前播放的歌曲
                    let playTarget = this.music[this.reandoms[this.item]].name;
                    this.item = this.reandoms.indexOf(this.music.findIndex((item) => item.name == musicName));
                    if (playTarget != musicName && this.isPlay) {
                        this.play_(this.play_target);
                        let target = this.$refs[this.reandoms.indexOf(this.music.findIndex((item) => item.name == musicName)) + 'play']
                        this.play_target = Array.isArray(target) ? target[0] : target;
                        this.play_(this.play_target);
                        return;
                    } else if (playTarget != musicName && !this.isPlay) {
                        let target = this.$refs[this.reandoms.indexOf(this.music.findIndex((item) => item.name == musicName)) + 'play']
                        this.play_target = Array.isArray(target) ? target[0] : target;
                        return;
                    }
                    this.play_(this.play_target);
                    this.isPlay = isPlay;
                }
        });
        // 如果在其他页面修改了播放状态，需要同步到当前页面
        const data = this.$parent.$children[3].$data;
        let playTarget = this.music[this.reandoms[this.item]].name;
        // 如果只是修改了播放状态，不是切换歌曲
        if (data.isPlay != this.isPlay && data.musicList[data.index].name == playTarget) {
            this.play_(this.play_target);
        }
        // 如果切换了歌曲
        if (data.musicList[data.index].name != playTarget) {
            this.item = this.reandoms.indexOf(this.music.findIndex((item) => item.name == data.musicList[data.index].name));
            if (this.isPlay != data.isPlay) {
                if (data.isPlay) {
                    // 播放状态不同，并且当前是在播放
                    let target = this.$refs[this.reandoms.indexOf(this.music.findIndex((item) => item.name == data.musicList[data.index].name)) + 'play']
                    this.play_target = Array.isArray(target) ? target[0] : target;
                    this.play_(this.play_target);
                } else {
                    // 播放状态不同，并且当前是在暂停
                    this.play_(this.play_target);
                    let target = this.$refs[this.reandoms.indexOf(this.music.findIndex((item) => item.name == data.musicList[data.index].name)) + 'play']
                    this.play_target = Array.isArray(target) ? target[0] : target;
                }
            } else {
                if (data.isPlay) {
                    // 播放状态相同，并且当前是在播放
                    this.play_(this.play_target);
                    let target = this.$refs[this.reandoms.indexOf(this.music.findIndex((item) => item.name == data.musicList[data.index].name)) + 'play']
                    this.play_target = Array.isArray(target) ? target[0] : target;
                    this.play_(this.play_target);
                } else {
                    // 播放状态相同，并且当前是在暂停
                    let target = this.$refs[this.reandoms.indexOf(this.music.findIndex((item) => item.name == data.musicList[data.index].name)) + 'play']
                    this.play_target = Array.isArray(target) ? target[0] : target;
                }
            }
        }
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
            let music = [];
            for (let i = 0; i < this.reandoms.length; i++) {
                music.push(this.music[this.reandoms[i]]);
            }
            this.item = i.slice(4, 5);
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
                    bus.$emit("music", music, i.slice(4, 5), true, this.$route.path);
                    bus.$emit("music", music, i.slice(4, 5), true, this.$route.path);
                } else {
                    this.play_target.innerHTML = this.stop_icon;
                    this.isPlay = false;
                    bus.$emit("music", music, i.slice(4, 5), false, this.$route.path);
                }
            } else {
                // 没有歌曲在播放
                e.target.innerHTML = this.play_icon;
                this.isPlay = true;
                this.play_target = e.target;
                bus.$emit("music", music, i.slice(4, 5), false, this.$route.path);
            }
        },
        play_(e) {
            if (this.isPlay) {
                // 有歌曲在播放
                e.innerHTML = this.stop_icon;
                this.isPlay = false;
            } else {
                // 没有歌曲在播放
                e.innerHTML = this.play_icon;
                this.isPlay = true;
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