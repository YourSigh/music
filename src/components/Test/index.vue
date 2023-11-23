<template>
    <div id="test">
        <div id="content">
            <h1>测试页面</h1>
            <button @click="getUser">请求http://121.40.211.209:3000/getUser</button>
            <button @click="nginx">请求/serve,nginx代理</button>
            <button @click="setMusic">添加音乐</button>
            <button @click="changeShow">显示模态框</button>
        </div>
        <MusicList :music="music"></MusicList>
        <Modal :show.sync="isShowModal" :title="title">
            <template v-slot:content>
                测试内容
            </template>
            <template v-slot:footer>
                <div>
                    cs
                </div>
            </template>
        </Modal>
    </div>
</template>

<script>
import http from '../../utils/http'
import axios from 'axios'
import MusicList from '../../components/MusicList'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
export default {
    name: 'Test',

    data() {
        return {
            music: [
                {
                    "name": "Fade",
                    "src": "music/Alan Walker - Fade.ogg",
                    "singer": "Alan Walker",
                    "album": "",
                    "img": "music-img/Faded.png",
                    "time": ""
                },
                {
                    "name": "On My Own",
                    "src": "music/Ashes Remain - On My Own.ogg",
                    "singer": "Ashes Remain",
                    "album": "",
                    "img": "music-img/OnMyOwn.png",
                    "time": ""
                },
                {
                    "name": "Nothin' On You (Radio Edit)",
                    "src": "music/B_o_B _ Bruno Mars - Nothin' On You (Radio Edit).ogg",
                    "singer": "B_o_B _ Bruno Mars",
                    "album": "",
                    "img": "music-img/NothinOnYou.png",
                    "time": ""
                },
            ],
            isShowModal: false,
            title: '测试'
        };
    },

    components: {
        MusicList
    },

    mounted() {
        // axios
        //     .get("/test/test")
        //     .then(response => {
        //         console.log(response.data);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
    },

    methods: {
        getUser() {
            axios.get('http://121.40.211.209:3000/getUser').then(res => {
                console.log(res);
            }).catch(e => {
                console.log(e);
            })
        },
        nginx() {
            axios.get('/serve').then(res => {
                console.log(res);
            }).catch(e => {
                console.log(e);
            })
        },
        setMusic() {
            this.music = this.$store.state.music;
            axios.post('http://localhost:3000/setMusic', this.music).then(res => {
                console.log(res);
            }).catch(e => {
                console.log(e);
            })
        },
        changeShow() {
            this.isShowModal ? this.isShowModal = false : this.isShowModal = true;
        }
    },
};
</script>

<style scoped>
#test {
    width: 100%;
    height: 535px;
    overflow: auto;
    background-color: #aaa;
    color: white;
}

#content {
    margin: 0 auto;
    width: 500px;
    background-color: red;
    z-index: 999;
}
</style>