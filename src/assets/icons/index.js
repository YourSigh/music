import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component
 
// register globally
Vue.component('svg-icon', SvgIcon)
 
// 进行导入所有的svg格式  如果手动引入 需要依次引入 
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)