<template>
    <div id="suggest">
        <div class="left"></div>
        <div class="content">
            <h1 class="title">推荐</h1>
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

<style>
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
        background-color: black;
    }

    #suggest>.right{
        width: 38px;
        height: 535px;
    }

    #suggest>.content>.title{
        font-size:34px;
        color:white;
    }
</style>