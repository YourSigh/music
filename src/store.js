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
        fetchMusic({ commit }, data) {
            axios
                .get("/music.json")
                .then((response) => {
                    //console.log(response.data.data);
                    commit('getMusic', response.data.data);
                    console.log(this.state.music[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
    getters: {

    }
})

export default store;