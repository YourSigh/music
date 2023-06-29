<template>
  <div id="footerRight">
    <div class="wrapper">
      <input type="range" />
    </div>
    <div class="playback">
        <div class="img">
            <img src="../../../assets/playback.png" alt="">
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
        background-color: red;
    }

    #footerRight>.playback>.img{
        width: 40px;
        height: 40px;
        margin-left: 38px;
        position: relative;
        top:5px;
    }

    #footerRight>.playback>.img>img{
        width: 40px;
        height: 40px;
        border-radius: 5px;
    }
</style>