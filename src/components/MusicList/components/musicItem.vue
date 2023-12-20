<template>
    <div id="musicItem">
        <div class="like" v-html="like_icon" @click="changeLike"></div>
        <div class="musicName">
            {{ music.name }}
        </div>
        <div class="play" v-html="play_icon" @click="playSon" :ref="music.name + 'target'"></div>
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
        play() {
            let target = this.$refs[this.music.name + 'target']
            if (!target.play) {
                target.innerHTML = this.stop_icon;
                target.play = true;
                this.playTarget = target;
            } else {
                target.innerHTML = this.play_icon;
                target.play = false;
                this.playTarget = null;
            }
        },
        // 子组件调用play方法
        playSon() {
            this.play();
            let target = this.$refs[this.music.name + 'target'];
            if (target.play) {
                this.$emit('play', this.music);
            } else {
                this.$emit('stop', this.music);
            }
        }
    },
};
</script>

<style scoped>
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