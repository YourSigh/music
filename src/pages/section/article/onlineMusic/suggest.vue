<template>
    <div id="suggest">
        <div class="left"></div>
        <div class="content">
            <h1 class="title1">推荐</h1>
            <div class="title2">Hi 面向慈善 今日为你推荐</div>
            <div class="suggest_content">
                <div class="forYou">
                    <div class="content">
                        <div class="title">For<br/>You</div>
                        <div class="img"></div>
                        <div class="music_message">
                            <div class="music_name">Fade</div>
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
                    <div></div>
                    <div style="color:white">每日30首</div>
                </div>
                <div class="hot">
                    <div></div>
                    <div style="color:white">百万收藏</div>
                </div>
            </div>
            <div class="title3">你的歌单补给站</div>
            <div class="playlist">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
export default {
    name: 'Suggest',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
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

    #suggest>.content>.suggest_content>.forYou>.content {
        width: 360px;
        height: 170px;
        border-radius: 10px;
        margin: 17px 0 10px 0;
        background-color: #aaa;
        display: flex;
    }

    #suggest>.content>.suggest_content>.forYou>.content>.title {
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

    #suggest>.content>.suggest_content>.forYou>.content>.img {
        width: 130px;
        height: 130px;
        background-color: rgb(41, 35, 35);
        margin: 20px 0 0 -20px;
        border-radius: 10px;
    }

    #suggest>.content>.suggest_content>.forYou>.content>.music_message>.music_name {
        margin:50px 0 0 20px;
        color: white;
    }

    #suggest>.content>.suggest_content>.forYou>.content>.music_message>.singer {
        font-size:10px;
        color:#1312127e;
        margin:10px 0 0 20px;
    }

    #suggest>.content>.suggest_content>.daily {
        width: 160px;
        height: 220px;
    }

    #suggest>.content>.suggest_content>.daily>:first-child {
        width: 160px;
        height: 170px;
        border-radius: 10px;
        margin: 17px 0 10px 0;
        background-color: #aaa;
    }

    #suggest>.content>.suggest_content>.hot {
        width: 160px;
        height: 220px;
    }

    #suggest>.content>.suggest_content>.hot>:first-child {
        width: 160px;
        height: 170px;
        border-radius: 10px;
        margin: 17px 0 10px 0;
        background-color: #aaa;
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
        height: 170px;
        background-color: #aaa;
        margin: 17px 0 10px 0;
        border-radius: 10px;
    }
</style>