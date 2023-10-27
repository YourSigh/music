<template>
    <div id="test">
        <div id="content">
            <h1>测试页面</h1>
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
        http.get('/test/test').then(res => {
            console.log(res);
        });
    },

    methods: {

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