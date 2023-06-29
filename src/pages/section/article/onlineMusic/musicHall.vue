<template>
    <div id="musicHall">
        <div class="left"></div>
        <div class="content">
            <h1 class="title">音乐馆</h1>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
export default {
    name: 'MusicHall',

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
    #musicHall{
        width: 810px;
        height: 535px;
        overflow: auto;
        display: flex;
    }

    #musicHall::-webkit-scrollbar{
        width: 10px;
    }

    ::-webkit-scrollbar-thumb{
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.5);
    }

    #musicHall>.left{
        width: 38px;
        height: 535px;
        
    }

    #musicHall>.content{
        width: 724px;
        height: 1000px;
        background-color: red;
    }

    #musicHall>.right{
        width: 38px;
        height: 535px;
    }

    #musicHall>.content>.title{
        font-size:34px;
        color:white;
    }
</style>