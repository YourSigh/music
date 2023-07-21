<template>
    <div id="selectResult">
        <div class="left"></div>
        <div class="content">
            <ul>
                <li v-for = "i in selectResults" :key="i">
                    {{ i }}
                </li>
            </ul>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
export default {
    name: 'SelectResult',

    data() {
        return {
            music: [
                {
                    name: "歌曲1",
                    src: "",
                },
                {
                    name: "歌曲2",
                    src: "",
                },
                {
                    name: "你好",
                    src: "",
                },
            ],
            selectResults:[],
            selectContent:this.$route.params.name
        };
    },

    created() {
        this.updateSelectResult();
    },

    mounted() {
        
    },

    methods: {
      updateSelectResult() {
        this.selectResults = [];
        for (var i in this.music) {
            if (this.music[i].name.indexOf(this.selectContent) != -1) {
                this.selectResults.push(this.music[i].name);
            }
        }
      }  
    },
    watch:{
        selectContent(){
            //this.updateSelectResult();
            
        }
    }
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

    #selectResult>.content>ul>li {
        width: 724px;
        height: 50px;
        line-height: 50px;
        list-style-type: none;
        background-color: black;
        color:white;
        font-size: 14px;
    }

    #selectResult>.content>ul>li:hover{
        background-color: rgba(255, 255, 255, 0.5);
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