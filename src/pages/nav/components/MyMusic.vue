<template>
    <div id="myMusic" class="iconfont">
        <div class="title">
            <div>
                我的音乐
            </div>
        </div>
        <div @click="gotoMyFavorite" class="myFavorite">
            <div class="like-icon">
                &#xe760;
            </div>
            <div class="like-text">
                我喜欢
            </div>
        </div>
        <div class="download">
            <div class="download-icon">
                &#xe605;
            </div>
            <div class="download-text">
                本地和下载
            </div>
        </div>
        <div class="recently">
            <div class="recently-icon">
                &#xe63b;
            </div>
            <div class="recently-text">
                最近播放
            </div>
        </div>
        <div class="audition">
            <div class="audition-icon">
                &#xe6d7;
            </div>
            <div class="audition-text">
                试听列表
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyMusic',
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
        gotoMyFavorite() {
            this.$router.push('/myFavorite');
            this.$emit('update:selectComponent', 'myFavorite');
        },
    },
};
</script>

<style>
    #myMusic{
        margin-left:25px;
        margin-bottom:18px;
        width: 160px;
        color:white;
    }

    #myMusic>div {
        display: flex;
    }

    #myMusic>div:first-child{
        width: 160px;
        height: 38px;
        line-height: 50px;
        font-size:13.5px;
    }

    #myMusic>div:not(:first-child){
        width: 160px;
        height: 30px;
        line-height: 30px;
        margin: 10px 0 10px 0;
        border-radius: 5px;
    }

    #myMusic>div:not(:first-child)>div:first-child{
        width: 25px;
    }

    #myMusic>div>div:first-child{
        margin-left:15px;
    }

    #myMusic>div>div:nth-child(2) {
        font-size:13.5px;
    }

    #myMusic>.title>div{
        font-size:12px;
    }

    #myMusic>div:not(:first-child):hover{
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>