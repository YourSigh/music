<template>
    <div id="selectResult">
        <div class="left"></div>
        <MusicList :music="selectResults"></MusicList>
        <div class="right"></div>
    </div>
</template>

<script>
export default {
    name: 'SelectResult',

    data() {
        return {
            selectResults: [],
            selectContent: this.$route.params.name,
        };
    },
    props:{
        music:Array,
        required:true,
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
                    this.selectResults.push(this.music[i]);
                }
            }
        },
    },
    watch: {
        $route() {
            this.selectContent = this.$route.params.name;
            this.updateSelectResult();
        },
        music() {
            this.updateSelectResult();
        }
    },
    computed: {
    }
};
</script>

<style scoped>
#selectResult {
    width: 810px;
    height: 535px;
    overflow: auto;
    display: flex;
}

#selectResult::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
}

#selectResult>.left {
    width: 38px;
    height: 535px;
}

#selectResult>.content {
    width: 724px;
    height: 1000px;
}
</style>