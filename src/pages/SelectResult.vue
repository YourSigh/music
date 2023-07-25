<template>
    <div id="selectResult">
        <div class="left"></div>
        <div class="title">
            <div class="t_music">歌曲</div>
            <div class="t_singer">歌手</div>
            <div class="t_album">专辑</div>
            <div class="t_time">时长</div>
        </div>
        <div class="content">
            <ul>
                <li v-for="i in selectResults" :key="i" class="iconfont">
                    <div class="like"></div>
                    <div class="musicName">
                        {{ i }}
                    </div>
                    <div class="play">
                        &#xe7fd;
                    </div>
                    <div class="singer">歌手</div>
                    <div class="album">专辑</div>
                    <div class="time">时长</div>
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
            selectResults: [],
            selectContent: this.$route.params.name
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
    watch: {
        $route() {
            this.selectContent = this.$route.params.name;
            this.updateSelectResult();
        }
    }
};
</script>

<style>
#selectResult {
    width: 810px;
    height: 535px;
    overflow: auto;
    display: flex;
}

@font-face {
    font-family: "iconfont logo";
    src: url('https://at.alicdn.com/t/font_985780_km7mi63cihi.eot?t=1545807318834');
    src: url('https://at.alicdn.com/t/font_985780_km7mi63cihi.eot?t=1545807318834#iefix') format('embedded-opentype'),
        url('https://at.alicdn.com/t/font_985780_km7mi63cihi.woff?t=1545807318834') format('woff'),
        url('https://at.alicdn.com/t/font_985780_km7mi63cihi.ttf?t=1545807318834') format('truetype'),
        url('https://at.alicdn.com/t/font_985780_km7mi63cihi.svg?t=1545807318834#iconfont') format('svg');
}

#selectResult::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
}

#selectResult>.left {
    width: 38px;
    height: 535px;

}

#selectResult>.content {
    width: 724px;
    height: 1000px;
    /* background-color: red; */
}

#selectResult>.title {
    width: 724px;
    height: 50px;
    display: flex;
    line-height: 50px;
    position: fixed;
    margin-left: 38px;
    background-color: rgba(0, 0, 0, 1);
    top:80px;
}

#selectResult>.title>div{
    color: #aaa;
    font-size: 14px;
}

#selectResult>.title>.t_music{
    margin-left: 10px;
}

#selectResult>.title>.t_singer{
    margin-left: 290px;
}

#selectResult>.title>.t_album {
    margin-left: 100px;
}

#selectResult>.title>.t_time {
    margin-left: 120px;
}

#selectResult>.content>ul>li {
    width: 724px;
    height: 50px;
    line-height: 50px;
    list-style-type: none;
    background-color: black;
    color: white;
    display: flex;
    font-size: 14px;
    z-index: 0;
}

#selectResult>.content>ul{
    margin-top:50px;
}

#selectResult>.content>ul>li:hover {
    background-color: rgba(255, 255, 255, 0.5);
}

#selectResult>.content>ul>li>.like{
    width: 30px;
    height: 50px;
}

#selectResult>.content>ul>li>.musicName{
    width: 200px;
    height: 50px;
}

#selectResult>.content>ul>li>.play {
    width: 100px;
    height: 50px;
    visibility: hidden;
}

#selectResult>.content>ul>li>.play:hover{
    color:aqua;
}

#selectResult>.content>ul>li:hover>.play{
    visibility: visible;
}

#selectResult>.content>ul>li>.singer {
    width: 130px;
    height: 50px;
}

#selectResult>.content>ul>li>.album {
    width: 145px;
    height: 50px;
}

#selectResult>.right {
    width: 38px;
    height: 535px;
}

#selectResult>.content>.title {
    font-size: 34px;
    color: white;
}
</style>