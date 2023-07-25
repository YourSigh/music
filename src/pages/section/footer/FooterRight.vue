<template>
    <div id="footerRight">
        <div class="wrapper">
            <input type="range" />
        </div>
        <div class="playback iconfont">
            <audio style="display: none" :src="music_url" controls ref="audio"></audio>
            <div class="musicMsg">
                <div class="img">
                    <img src="../../../assets/img/playback.png" alt="">
                </div>
                <div class="message">
                    <div class="title">QQ音乐 听我想听</div>
                    <div class="menu">
                        <div class="love">喜</div>
                        <div class="download">下</div>
                        <div class="more">更</div>
                        <div class="review">评</div>
                    </div>
                </div>
            </div>
            <div class="player">
                <div class="b_kind">
                    顺
                </div>
                <div class="b_last">
                    &#xe800;
                </div>
                <div class="b_play" @click="play" v-html="b_play">
                    
                </div>
                <div class="b_next">
                    &#xe7ff;
                </div>
                <div class="b_loudness">
                    &#xe801;
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
export default {
    name: "FooterRight",

    data() {
        return {
            b_play:'&#xe658',
            music_url: '/music/Alan Walker - Fade.ogg',
            isPlay:false,
        };
    },

    mounted() { },

    methods: {
        play() {
            this.b_play == '&#xe658'?this.b_play = '&#xe6f7':this.b_play = '&#xe658';
            let audio = this.$refs.audio;
            if (this.isPlay) {
                audio.pause();
                this.isPlay = false;
            } else {
                audio.play();
                this.isPlay = true;
            }
        },
    },
};
</script>

<style>
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
    border-image: linear-gradient(rgb(0, 150, 255), rgb(0, 150, 255)) 0 fill / 4 0 4 0 / 0px 0px 0 2000px;
}

#footerRight>.wrapper:hover>input::-webkit-slider-thumb {
    background-color: rgb(0, 150, 255);
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
}

#footerRight>.playback>.player>div:hover {
    color: aqua;
}

#footerRight>.playback>.player>.b_kind {
    width: 28px;
    height: 60px;
    margin-left: 27px;
}

#footerRight>.playback>.player>.b_last {
    width: 35px;
    height: 60px;
    font-size: 25px;
}

#footerRight>.playback>.player>.b_play {
    width: 46px;
    height: 60px;
    font-size:35px;
    color:aqua;
}

#footerRight>.playback>.player>.b_next {
    width: 38px;
    height: 60px;
    font-size: 25px;
}

#footerRight>.playback>.player>.b_loudness {
    height: 60px;
}

</style>