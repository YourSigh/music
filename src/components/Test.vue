<template>
    <div id="test">
        <div id="content">
            <h1>测试页面</h1>
            <button @click="getUser">请求http://121.40.211.209:3000/getUser</button>
            <button @click="nginx">请求/serve,nginx代理</button>
        </div>
    </div>
</template>

<script>
import http from '../utils/http'
import axios from 'axios'
export default {
    name: 'Test',

    data() {
        return {

        };
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
        }
    },
};
</script>

<style scoped>
#content {
    margin: 0 auto;
    width: 500px;
    height: 500px;
    background-color: #aaa;
    color: white;
    z-index: 999;
}
</style>