<template>
    <div id="selectResult">
        <div class="left"></div>
        <div class="content">
            <h1 class="title">搜索结果</h1>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
export default {
    name: 'SelectResult',

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
    #selectResult{
        width: 810px;
        height: 535px;
        overflow: auto;
        display: flex;
    }

    #selectResult::-webkit-scrollbar{
        width: 10px;
    }

    ::-webkit-scrollbar-thumb{
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.5);
    }

    #selectResult>.left{
        width: 38px;
        height: 535px;
        
    }

    #selectResult>.content{
        width: 724px;
        height: 1000px;
        background-color: red;
    }

    #selectResult>.right{
        width: 38px;
        height: 535px;
    }

    #selectResult>.content>.title{
        font-size:34px;
        color:white;
    }
</style>