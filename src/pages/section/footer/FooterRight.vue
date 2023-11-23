<template>
    <div id="footerRight">
        <div class="wrapper" @mousedown="isMouseDown = true" @mouseup="isMouseDown = false">
            <input type="range" @change="onChange" ref="range" />
        </div>
        <div class="playback iconfont">
            <audio style="display: none" :src="music_url" controls ref="audio" @canplay="getDuration"
                @timeupdate="update"></audio>
            <div class="musicMsg">
                <div class="img">
                    <img :src="music_img" alt="">
                </div>
                <div class="message">
                    <div class="title">{{ music_name }}</div>
                    <div class="menu">
                        <div class="love">&#xe761;</div>
                        <div class="download">&#xe646;</div>
                        <div class="more">&#xe626;</div>
                        <div class="review">&#xe6ad;</div>
                    </div>
                </div>
            </div>
            <div class="player">
                <div class="b_kind" @click="kind_v" v-html="kind_icon"></div>
                <div class="kind" style="visibility: hidden;" ref="kind" @click=$event.stopPropagation();>
                    <div>随机播放</div>
                    <div>顺序播放</div>
                    <div>单曲循环</div>
                    <div>列表循环</div>
                </div>
                <div class="b_last">
                    &#xe800;
                </div>
                <div class="b_play" @click="play(2)" v-html="b_play"></div>
                <div class="b_next">
                    &#xe7ff;
                </div>
                <div class="b_loudness" @click="loudness_v" v-html="mute_icon"></div>
                <div class="loudness" style="visibility: hidden;" ref="loudness" @click=$event.stopPropagation();>
                    <input type="range" class="range" @change="changeLoudness" ref="loudness_range" />
                    <div class="loudness_percentage"> {{ loudness }}% </div>
                    <div class="mute" @click="mute" v-html="mute_icon"></div>
                </div>
                <div class="time">
                    {{ getTime(nowTime) }} / {{ getTime(totalTime) }}
                </div>
            </div>
            <div class="lyrics" title="打开歌词">
                词
            </div>
            <div class="queue" title="播放队列">

            </div>
        </div>
    </div>
</template>

<script>
import bus from '../../../utils/bus'
export default {
    name: "FooterRight",

    data() {
        return {
            b_play: '&#xe658',
            music_url: 'music/Alan Walker - Fade.ogg',
            isPlay: false,
            nowTime: 0,
            totalTime: 0,
            loudness: 0,
            isMouseDown: false,
            mute_icon: '&#xe642;',
            kind_icon: '&#xe871;',
            music_name: 'QQ音乐 听我想听',
            music_img: require('../../../assets/img/playback.png'),
            path: '' // 调用当前组件播放的页面路径
        };
    },
    props: {
        music: Array,
        required: true,
    },

    created() {

    },

    mounted() {
        // 设置默认音量为10%
        this.$refs.audio.volume = 0.1;
        this.loudness = this.$refs.audio.volume * 100;
        this.$refs.loudness_range.value = this.$refs.audio.volume * 100;
        var that = this;
        // 组件传值音乐信息
        bus.$on('music', (music, isPlay, path) => {
            that.music_url = music.src;
            that.music_name = music.name;
            that.music_img = music.img;
            if (this.path != path && this.isPlay) {
                this.b_play = '&#xe658';
                this.$refs.audio.pause();
            }
            this.path = path;
            that.play(1);
        })
    },

    methods: {
        // kind：1：组件传值播放，2：点击播放按钮播放
        play(kind) {
            if (this.music_name == 'QQ音乐 听我想听') {
                this.music_name = 'Fade';
                this.music_img = '/music-img/Faded.png';
            }

            this.b_play == '&#xe658' ? this.b_play = '&#xe6f7' : this.b_play = '&#xe658';
            let audio = this.$refs.audio;

            // 判断是否需要对其他页面的歌曲进行暂停与播放
            if (kind == 2 && this.isPlay) {
                // 如果点击播放按钮时歌曲正在播放，则执行下面的代码
                bus.$emit('isPlay', false, this.path);
            } else if (kind == 2 && !this.isPlay) {
                bus.$emit('isPlay', true, this.path);
            }
            // 存储不销毁的页面路径
            this.$emit('alive', this.$route.path);
            if (this.isPlay) {
                this.isPlay = false;
            } else {
                this.isPlay = true;
            }

            setTimeout(() => {
                if (this.isPlay) {
                    audio.pause();
                } else {
                    audio.play();
                }
            }, 1000);
        },
        onChange() {
            // 鼠标拖动进度条时改变歌曲的播放进度
            let value = this.$refs.range.value;
            let audio = this.$refs.audio;
            audio.currentTime = value / 100 * this.totalTime;
        },
        update() {
            // 防止鼠标拖动进度条时触发该事件
            if (this.isMouseDown) {
                return;
            }
            // 歌曲播放时改变进度条
            let audio = this.$refs.audio;
            let range = this.$refs.range;
            range.value = (audio.currentTime / this.totalTime).toFixed(3) * 100;
            this.nowTime = audio.currentTime;
        },
        getTime(t) {
            let m, s;
            m = parseInt((t / 60)).toString().padStart(2, '0');
            s = parseInt((t % 60)).toString().padStart(2, '0');
            return m + ":" + s;
        },
        kind_v(e) {
            let kind = this.$refs.kind;
            kind.style.visibility == 'hidden' ? kind.style.visibility = 'visible' : kind.style.visibility = 'hidden';
            e.stopPropagation(); // 阻止事件冒泡，防止事件冒泡导致无法显示循环方式控制面板
        },
        loudness_v(e) {
            let loudness = this.$refs.loudness;
            loudness.style.visibility == 'hidden' ? loudness.style.visibility = 'visible' : loudness.style.visibility = 'hidden';
            e.stopPropagation(); // 阻止事件冒泡，防止事件冒泡导致无法显示音乐控制面板
        },
        changeLoudness() {
            // 改变音量条
            let audio = this.$refs.audio;
            audio.volume = this.$refs.loudness_range.value / 100;
            this.loudness = this.$refs.loudness_range.value;
            if (audio.muted) {
                // 如果此时为静音则取消静音
                audio.muted = false;
                this.mute_icon = '&#xe641;';
            }
        },
        mute() {
            // 按下静音按钮
            var audio = this.$refs.audio;
            if (audio.muted) {
                audio.muted = false;
                this.mute_icon = '&#xe642;';
            } else {
                audio.muted = true;
                this.mute_icon = '&#xe641;';
            }
        },
        getDuration() {
            this.totalTime = this.$refs.audio.duration;
        }
    },
    watch: {

    }
};
</script>

<style scoped>
#footerRight {
    width: 810px;
    height: 75px;
}

@font-face {
    font-family: "iconfont logo";
    src: url('https://at.alicdn.com/t/font_985780_km7mi63cihi.eot?t=1545807318834');
    src: url('https://at.alicdn.com/t/font_985780_km7mi63cihi.eot?t=1545807318834#iefix') format('embedded-opentype'),
        url('https://at.alicdn.com/t/font_985780_km7mi63cihi.woff?t=1545807318834') format('woff'),
        url('https://at.alicdn.com/t/font_985780_km7mi63cihi.ttf?t=1545807318834') format('truetype'),
        url('https://at.alicdn.com/t/font_985780_km7mi63cihi.svg?t=1545807318834#iconfont') format('svg');
}

#footerRight>.wrapper {
    width: 810px;
    height: 15px;
    line-height: 5px;
    overflow: hidden;
}

#footerRight>.wrapper>input {
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    width: 810px;
    height: 3px;
    background-color: #ccc;
}

#footerRight>.wrapper>input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    border: 1px solid transparent;
    /*控制滑块的大小*/
    border-image: linear-gradient(#aaccee, #aaccee) 0 fill / 4 5 4 0 / 0px 0px 0 2000px;
}

#footerRight>.wrapper:hover>input::-webkit-slider-thumb {
    background-color: #aaccee;
}

#footerRight>.playback {
    width: 810px;
    height: 60px;
    display: flex;
}

#footerRight>.playback>.musicMsg {
    width: 300px;
    height: 60px;
    display: flex;
}

#footerRight>.playback>.musicMsg>.img {
    width: 40px;
    height: 40px;
    margin-left: 40px;
    position: relative;
    top: 5px;
}

#footerRight>.playback>.musicMsg>.img>img {
    width: 40px;
    height: 40px;
    border-radius: 5px;
}

#footerRight>.playback>.musicMsg>.message {
    width: 220px;
    height: 60px;
    margin-left: 10px;
}

#footerRight>.playback>.musicMsg>.message>.title {
    font-size: 13.8px;
    position: relative;
    width: 210px;
    height: 18.4px;
    overflow: hidden;
    top: 5px;
}

#footerRight>.playback>.musicMsg>.message>.menu {
    display: flex;
    margin-top: 5px;
}

#footerRight>.playback>.musicMsg>.message>.menu>div {
    margin-right: 17px;
}

#footerRight>.playback>.player {
    width: 410px;
    height: 60px;
    line-height: 60px;
    display: flex;
    position: relative;
}

#footerRight>.playback>.player>div:not(:nth-child(2), :nth-child(7), :nth-child(8)):hover {
    color: #aaccee;
}

#footerRight>.playback>.player>.b_kind {
    margin-left: 27px;
}

#footerRight>.playback>.player>.kind {
    width: 130px;
    height: 180px;
    left: -30px;
    bottom: 50px;
    background-color: rgb(40, 50, 100);
    border-radius: 10px;
    position: absolute;
    text-align: center;
    z-index: 3;
}

#footerRight>.playback>.player>.kind>div {
    font-size: 16px;
    height: 45px;
    line-height: 45px;
}

#footerRight>.playback>.player>.b_last {
    font-size: 25px;
    margin-left: 12px;
}

#footerRight>.playback>.player>.b_play {
    font-size: 35px;
    color: #aaccee;
    margin-left: 10px;
}

#footerRight>.playback>.player>.b_next {
    font-size: 25px;
    margin-left: 10px;
}

#footerRight>.playback>.player>.b_loudness {
    margin-left: 10px;
}

#footerRight>.playback>.player>.loudness {
    width: 60px;
    height: 250px;
    left: 150px;
    bottom: 50px;
    background-color: rgb(40, 50, 100);
    border-radius: 10px;
    position: absolute;
    text-align: center;
    z-index: 10;
}

#footerRight>.playback>.player>.loudness>.range {
    margin-top: 20px;
    -webkit-appearance: none;
    appearance: slider-vertical;
    width: 5px;
    height: 120px;
}

#footerRight>.playback>.player>.loudness>.range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 10px;
    width: 10px;
    border-radius: 10%;
}

#footerRight>.playback>.player>.loudness>.loudness_percentage {
    margin-top: -35px;
    border-bottom: 1px solid #aaa;
}

#footerRight>.playback>.player>.loudness>.mute:hover {
    color: #aaccee;
}

#footerRight>.playback>.player>.time {
    font-size: 10px;
    margin-left: 148px;
}

#footerRight>.playback>.lyrics {
    width: 16px;
    height: 60px;
    line-height: 60px;
    font-size: 15px;
    margin-left: 5px;
}
</style>