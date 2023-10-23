import VueRouter from "vue-router";
import Vue from "vue";
import routes from './routes'

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
    routes
})

export default router