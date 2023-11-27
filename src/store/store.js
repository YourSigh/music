import Vue from "vue";
import Vuex from "vuex";
import createPersistedstate from 'vuex-persistedstate'
import { getMusic } from "../api/music";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        music: [],
        color:localStorage.getItem('color'),
        userInfo:{
            username:localStorage.getItem('username'),
            img:localStorage.getItem('img'),
            uid:localStorage.getItem('uid'),
        }
    },
    mutations: {
        setMusic(state, music) {
            state.music = music;
        },
        setColor(state, color) {
            state.color = color;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {
        async fetchMusic({ commit }) {
            try {
                const res = await getMusic();
                commit('setMusic', res);
            } catch (error) {
                console.log(error);
            }
        }
    },
    getters: {

    },
    plugins: [
        createPersistedstate({
            key: 'music',
            paths: ['music']
        })
    ]
})

export default store;