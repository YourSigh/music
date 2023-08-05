import VueRouter from "vue-router";
import Vue from "vue";
import MusicHall from "../pages/section/article/onlineMusic/musicHall.vue"
import Suggest from "../pages/section/article/onlineMusic/suggest.vue"
import SelectResult from "../pages/SelectResult.vue"

Vue.use(VueRouter)

const RouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return RouterPush.call(this, to).catch(err => err)
}
const RouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return RouterReplace.call(this, to).catch(err => err)
}

const router = new VueRouter({
    routes:[
        {
            component:SelectResult,
            path:"/selectResult/:name"
        },
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
            redirect:"/suggest"
        },
    ]
})

export default router