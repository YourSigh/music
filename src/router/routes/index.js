import test from './test'
import selectResult from './selectResult'
import onlineMusic from './onlineMusic'

export default [
    {
        path: "/",
        redirect: "/suggest"
    },
    ...onlineMusic,
    ...selectResult,
    ...test,
]