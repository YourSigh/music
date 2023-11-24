<template>
    <div id="musicList" ref="musicList">
        <div ref="menu" class="menu">
            <div class="t_music">歌曲</div>
            <div class="t_singer">歌手</div>
            <div class="t_album">专辑</div>
            <div class="t_time">时长</div>
        </div>
        <ul ref="music_list" class="list">
            <li v-for="i in music" :key="i.name" class="iconfont">
                <MusicItem :music="i" :ref="i.name" @play="play" @stop="stop"></MusicItem>
            </li>
        </ul>
    </div>
</template>

<script>
import MusicItem from './components/musicItem.vue';
import bus from '../../utils/bus';

export default {
    name: 'MusicList',
    components:{
        MusicItem
    },

    props:{
        music:{
            type:Array,
            required:true
        }
    },

    data() {
        return {
            palyTaget:null,
            isPlay:false,
        };
    },

    mounted() {
        bus.$on('isPlay', (isPlay, path) => {
            // 如果是搜索页面，搜不同的内容歌单不同，但是组件是同一个，可能会出现refs获取不到的情况
            if (path == this.$route.path && this.$refs[this.palyTaget]) {
                this.isPlay = isPlay;
                this.$refs[this.palyTaget][0].play();
            }
        });
    },

    methods: {
        play(music) {
            bus.$emit('music', music, true, this.$route.path);
            // 如果要播放的歌曲不是当前播放的歌曲
            if (this.palyTaget != music.name && this.palyTaget != null && this.isPlay) {
                bus.$emit('music', music, true, this.$route.path);
                this.$refs[this.palyTaget][0].play();
            }
            this.palyTaget = music.name;
            this.isPlay = true;
        },
        stop(music) {
            this.isPlay = false;
            bus.$emit('music', music, false, this.$route.path);
        },
    },
};
</script>

<style scoped>
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

#musicList {
    width: 724px;
    height: 1000px;
    /* background-color: blue; */
}

#musicList::before {
    width: 724px;
    height: 50px;
    background-image: url("../../assets/img/background.jpg");
    background-position: -248px -80px;
    content: '';
    display: block;
    position: absolute;
    top: 80px;
    left: 248px;
    z-index: 1;
}

#musicList::after {
    width: 724px;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    content: '';
    display: block;
    position: absolute;
    top: 80px;
    left: 248px;
    z-index: 1;
}

#musicList>.menu {
    width: 724px;
    height: 50px;
    display: flex;
    line-height: 50px;
    position: sticky;
    margin-left: 0;
    top: 0;
    z-index: 2;
}

#musicList>.menu>div {
    color: white;
    font-size: 14px;
}

#musicList>.menu>.t_music {
    margin-left: 10px;
}

#musicList>.menu>.t_singer {
    margin-left: 290px;
}

#musicList>.menu>.t_album {
    margin-left: 100px;
}

#musicList>.menu>.t_time {
    margin-left: 120px;
}

#musicList>ul>li {
    width: 724px;
    height: 50px;
    line-height: 50px;
    list-style-type: none;
    color: white;
    display: flex;
    font-size: 14px;
}

#musicList>ul>li>div {
    overflow: hidden;
}

#musicList>ul>li:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
</style>