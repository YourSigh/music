<template>
    <div id="myFavorite">
        <div class="content">
            <div class="title">
                <div class="title-content">我喜欢</div>
                <div class="menu">
                    <div class="menu-music">歌曲</div>
                    <div class="list">歌单</div>
                </div>
            </div>
            <MusicList :music="favoriteMusic"></MusicList>
        </div>
    </div>
</template>

<script>


export default {
    name: 'MyFavorite',
    props: {
        music: Array,
        required: true,
    },

    data() {
        return {
            favoriteMusic: [],
        };
    },

    mounted() {
        this.favoriteMusic = this.music;
    },

    methods: {
        
    },
};
</script>

<style scoped>
#myFavorite {
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

#myFavorite>.content {
    margin: 0 38px;
}

#myFavorite>.content>.title {
    height: 150px;
}

</style>