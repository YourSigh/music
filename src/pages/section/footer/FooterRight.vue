<template>
  <div id="footerRight">
    <div class="wrapper">
      <input type="range" />
    </div>
    <div class="playback">
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
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style>
    #footerRight {
        width: 810px;
        height: 75px;
    }

    #footerRight > .wrapper {
        width: 810px;
        height: 15px;
        line-height: 5px;
        overflow: hidden;
    }

    #footerRight>.wrapper>input{
        -webkit-appearance: none;
        appearance: none;
        background-color: transparent;
        width: 810px;
        height: 3px;
        background-color: #ccc;
    }

    #footerRight>.wrapper>input::-webkit-slider-thumb{
        -webkit-appearance: none;
        appearance: none;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        border: 1px solid transparent;
        border-image: linear-gradient(rgb(0, 150, 255), rgb(0, 150, 255)) 0 fill / 4 0 4 0 / 0px 0px 0 2000px;
    }

    #footerRight > .wrapper:hover>input::-webkit-slider-thumb{
        background-color: rgb(0, 150, 255);
    }

    #footerRight>.playback {
        width: 810px;
        height: 60px;
        display: flex;
    }

    #footerRight>.playback>.musicMsg{
        width: 300px;
        height: 60px;
        display: flex;
    }

    #footerRight>.playback>.musicMsg>.img{
        width: 40px;
        height: 40px;
        margin-left: 40px;
        position: relative;
        top:5px;
    }

    #footerRight>.playback>.musicMsg>.img>img{
        width: 40px;
        height: 40px;
        border-radius: 5px;
    }

    #footerRight>.playback>.musicMsg>.message{
        width: 220px;
        height: 60px;
        margin-left:10px;
    }

    #footerRight>.playback>.musicMsg>.message>.title{
        font-size:13.8px;
        position: relative;
        top:5px;
    }

    #footerRight>.playback>.musicMsg>.message>.menu{
        display: flex;
        margin-top:5px;
    }

    #footerRight>.playback>.musicMsg>.message>.menu>div{
        margin-right:17px;
    }

    #footerRight>.playback>.player{
        width: 410px;
        height: 60px;
    }
</style>