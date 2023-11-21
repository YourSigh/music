<template>
    <div id="musicItem">
        <div class="like" v-html="like_icon" @click="changeLike"></div>
        <div class="musicName">
            {{ music.name }}
        </div>
        <div class="play" v-html="play_icon" @click="play"></div>
        <div class="add">&#xe604;</div>
        <div class="downLoad">&#xe646;</div>
        <div class="more">&#xe626;</div>
        <div class="singer">
            {{ music.singer }}
        </div>
        <div class="album">
            {{ music.album }}
        </div>
        <div class="time">
            {{ music.time }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'musicItem',

    props:{
        music:{
            type:Object,
            required:true
        }
    },

    data() {
        return {
            play_icon: "&#xe7fe;",
            stop_icon: "&#xe7fd;",
            like_icon: "&#xe761;",
            dislike_icon: "&#xe760;",
            playTarget: null,
        };
    },

    mounted() {

    },

    methods: {
        changeLike(e) {
            // 改变歌曲喜欢图标
            if (!e.target.islike) {
                e.target.innerHTML = this.dislike_icon;
                e.target.style.color = "rgb(255, 100, 100)";
                e.target.islike = true;
            } else {
                e.target.innerHTML = this.like_icon;
                e.target.style.color = null;
                e.target.islike = false
            }
        },
        play(e) {
            if (!e.target.play) {
                e.target.innerHTML = this.stop_icon;
                e.target.play = true;
                this.playTarget = e.target;
                this.$emit('play', this.music);
            } else {
                e.target.innerHTML = this.play_icon;
                e.target.play = false;
                this.playTarget = null;
                this.$emit('stop', this.music);
            }
        },
        stop() {
            this.playTarget.innerHTML = this.play_icon;
            this.playTarget.play = false;
            this.playTarget = null;
        }
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

#musicItem {
    display: flex;
}

#musicItem>.like {
    width: 20px;
    margin-left: 5px;
    margin-right: 5px;
    height: 50px;
    text-align: center;
    font-size: 20px;
}

#musicItem>.like:hover {
    color: rgb(255, 100, 100);
}

#musicItem>.musicName {
    width: 200px;
    height: 50px;
}

#musicItem>.play,
.downLoad,
.add,
.more {
    font-size: 16px;
    width: 25px;
    height: 50px;
    visibility: hidden;
}

#musicItem>.play:hover,
.add:hover,
.downLoad:hover,
.more:hover {
    color: aqua;
}

#musicItem:hover>.play {
    visibility: visible;
}

#musicItem:hover>.downLoad {
    visibility: visible;
}

#musicItem:hover>.add {
    visibility: visible;
}

#musicItem:hover>.more {
    visibility: visible;
}

#musicItem>.singer {
    width: 130px;
    height: 50px;
}

#musicItem>.album {
    width: 145px;
    height: 50px;
}
</style>