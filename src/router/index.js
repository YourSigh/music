import VueRouter from "vue-router";
import Vue from "vue";
import MusicHall from "../pages/section/article/onlineMusic/musicHall.vue"
import Suggest from "../pages/section/article/onlineMusic/suggest.vue"

Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {
            component:MusicHall,
            path:"/musicHall"
        },
        {
            component:Suggest,
            path:"/suggest"
        },
        {
            path:"/",
            redirect:"/musicHall"
        }
    ]
})

export default router