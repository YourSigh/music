<template>
    <div id="musicHall" ref="musicHall">
        <div class="content">
            <h1 class="title">音乐馆</h1>
            <MusicList :music="selectResults" ref="music_list"></MusicList>
        </div>
    </div>
</template>

<script>
export default {
    name: "MusicHall",

    data() {
        return {
            selectResults: [],
        };
    },
    props: {
        music: Array,
        required: true,
    },

    created() {
        this.selectResults = this.music;
    },

    mounted() {
    },

    methods: {
        
    },
    watch: {
        music() {
            this.selectResults = this.music;
        },
    },
};
</script>

<style scoped>
#musicHall {
    width: 810px;
    height: 535px;
    overflow: auto;
    display: flex;
}

::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
}

#musicHall>.content {
    margin: 0 38px;
}

#musicHall>div>.title {
    font-size: 34px;
    color: white;
    z-index: 2;
    position: relative;
}
</style>