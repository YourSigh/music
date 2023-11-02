<template>
    <div id="myMusic" class="iconfont">
        <div class="title">
            <div>
                我的音乐
            </div>
        </div>
        <div>
            <div>
                &#xe760;
            </div>
            <div>
                我喜欢
            </div>
        </div>
        <div>
            <div>
                &#xe605;
            </div>
            <div>
                本地和下载
            </div>
        </div>
        <div>
            <div>
                &#xe63b;
            </div>
            <div>
                最近播放
            </div>
        </div>
        <div>
            <div>
                &#xe6d7;
            </div>
            <div>
                试听列表
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyMusic',

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
    }

    #myMusic>div:not(:first-child){
        width: 160px;
        height: 30px;
        line-height: 30px;
        margin: 10px 0 10px 0;
        border-radius: 5px;
    }

    #myMusic>div>div{
        font-size:13.5px;
        margin-left:15px;
    }

    #myMusic>.title>div{
        font-size:12px;
    }

    #myMusic>div:not(:first-child):hover{
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>