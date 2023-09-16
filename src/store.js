import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        music: [],

    },
    mutations: {
        getMusic(state, music) {
            state.music = music;
        }
    },
    actions: {
        fetchMusic({ commit }) {
            return new Promise((resolve, reject) => {
                axios
                .get("/music.json")
                .then(response => {
                    commit('getMusic', response.data.data);
                    resolve();
                })
                .catch(error => {
                    console.log(error);
                })
            })
        }
    },
    getters: {

    }
})

export default store;