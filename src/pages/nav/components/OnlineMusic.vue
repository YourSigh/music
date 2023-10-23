<template>
    <div id="onlineMusic">
        <div class="test" style="height: 0px;"></div>
        <div class="title">
            <div>
                在线音乐
            </div>
        </div>
        <div @click="gotoSuggest" class="suggest">
            <div>
                推荐
            </div>
        </div>
        <div @click="gotoMusicHall" class="musicHall">
            <div>
                音乐馆
            </div>
        </div>
        <div>
            <div>
                视频
            </div>
        </div>
        <div>
            <div>
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

    #onlineMusic>div:first-child{
        width: 160px;
        height: 38px;
        line-height: 50px;
    }

    #onlineMusic>div:not(:first-child){
        width: 160px;
        height: 30px;
        line-height: 30px;
        margin: 10px 0 10px 0;
        border-radius: 5px;
    }

    #onlineMusic>div>div{
        font-size:13.5px;
        margin-left:15px;
    }

    #onlineMusic>.title>div{
        font-size:12px;
    }

    #onlineMusic>div:not(:first-child):hover{
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>