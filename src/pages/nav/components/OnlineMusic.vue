<template>
    <div id="onlineMusic" class="iconfont">
        <div class="title">
            <div>
                在线音乐
            </div>
        </div>
        <div @click="gotoSuggest" class="suggest">
            <div class="suggest-icon">
                &#xe681;
            </div>
            <div class="suggest-text">
                推荐
            </div>
        </div>
        <div @click="gotoMusicHall" class="musicHall">
            <div class="musicHall-icon">
                &#xe667;
            </div>
            <div class="musicHall-text">
                音乐馆
            </div>
        </div>
        <div class="video">
            <div class="video-icon">
                &#xe629;
            </div>
            <div class="video-text">
                视频
            </div>
        </div>
        <div class="radar">
            <div class="radar-icon">
                &#xe640;
            </div>
            <div class="radar-text">
                雷达
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OnlineMusic',
    props:{
        selectComponent:{
            type:String,
        }
    },
    data() {
        return {
            
        };
    },

    mounted() {
    },

    methods: {
        gotoMusicHall() {
            this.$router.push('/musicHall');
            this.$emit('update:selectComponent', 'musicHall');
        },
        gotoSuggest() {
            this.$router.push('/suggest');
            this.$emit('update:selectComponent', 'suggest');
        }
    },
};
</script>

<style>
    #onlineMusic{
        margin-left:25px;
        margin-bottom:18px;
        width: 160px;
        color:white;
    }

    #onlineMusic>div {
        display: flex;
    }

    #onlineMusic>div:first-child{
        width: 160px;
        height: 38px;
        line-height: 50px;
        font-size:13.5px;
    }

    #onlineMusic>div:not(:first-child){
        width: 160px;
        height: 30px;
        line-height: 30px;
        margin: 10px 0 10px 0;
        border-radius: 5px;
    }

    #onlineMusic>.video>.video-icon {
        font-size:10px;
    }

    #onlineMusic>div:not(:first-child)>div:first-child{
        width: 25px;
    }

    #onlineMusic>div>div:first-child{
        margin-left:15px;
    }

    #onlineMusic>div>div:nth-child(2) {
        font-size:13.5px;
    }

    #onlineMusic>.title>div{
        font-size:12px;
    }

    #onlineMusic>div:not(:first-child):hover{
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>