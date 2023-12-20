import test from './test'
import selectResult from './selectResult'
import onlineMusic from './onlineMusic'
import myMusic from './myMusic'

export default [
    {
        path: "/",
        redirect: "/suggest"
    },
    ...onlineMusic,
    ...myMusic,
    ...selectResult,
    ...test,
]