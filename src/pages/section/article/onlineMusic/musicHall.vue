<template>
    <div id="musicHall"  ref="musicHall">
        <div class="left" ref="left"></div>
        <div>
            <h1 class="title">音乐馆</h1>
            <MusicList :music="selectResults" ref="music_list"></MusicList>
        </div>
        <div class="right" ref="right"></div>
    </div>
</template>

<script>
export default {
    name: "MusicHall",

    data() {
        return {
            selectResults: [],
            selectContent: this.$route.params.name,
            height:this.$refs.music_list?.offsetHeight
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
        this.height = this.$refs.music_list.offsetHeight;
    },

    updated() {
        this.$nextTick(() => {
            this.height = this.$refs.music_list.offsetHeight;
        });
    },

    methods: {
        
    },
    watch: {
        music() {
            this.selectResults = this.music;
        },
        height() {
            this.$refs.left.style.height = this.$refs.music_list.offsetHeight + 95 + 'px';
            this.$refs.right.style.height = this.$refs.music_list.offsetHeight + 95 + 'px';
        }
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

@font-face {
    font-family: "iconfont logo";
    src: url("https://at.alicdn.com/t/font_985780_km7mi63cihi.eot?t=1545807318834");
    src: url("https://at.alicdn.com/t/font_985780_km7mi63cihi.eot?t=1545807318834#iefix") format("embedded-opentype"),
        url("https://at.alicdn.com/t/font_985780_km7mi63cihi.woff?t=1545807318834") format("woff"),
        url("https://at.alicdn.com/t/font_985780_km7mi63cihi.ttf?t=1545807318834") format("truetype"),
        url("https://at.alicdn.com/t/font_985780_km7mi63cihi.svg?t=1545807318834#iconfont") format("svg");
}

::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
}

#musicHall>.left {
    width: 38px;
    height: 100%;
    float: left;
}

#musicHall>.right {
    width: 38px;
    float: right;
}

#musicHall>div>.title {
    font-size: 34px;
    color: white;
    z-index: 2;
    position: relative;
}
</style>