<template>
    <div id="createPlayList">
        <div class="title">
            <div>
                创建的歌单
            </div>
        </div>
        <div>
            <div>
                歌单1
            </div>
        </div>
        <div>
            <div>
                歌单2
            </div>
        </div>
        <div>
            <div>
                歌单3
            </div>
        </div>
        <div>
            <div>
                歌单4
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CreatePlayList',

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
    #createPlayList{
        margin-left:25px;
        margin-bottom:18px;
        width: 160px;
        color:white;
    }

    #createPlayList>div:first-child{
        width: 160px;
        height: 38px;
        line-height: 50px;
    }

    #createPlayList>div:not(:first-child){
        width: 160px;
        height: 30px;
        line-height: 30px;
        margin: 10px 0 10px 0;
        border-radius: 5px;
    }

    #createPlayList>div>div{
        font-size:13.5px;
        margin-left:15px;
    }

    #createPlayList>.title>div{
        font-size:12px;
    }

    #createPlayList>div:not(:first-child):hover{
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>