<template>
    <div id="navLeft">
        <OnlineMusic :selectComponent.sync = "selectComponent" ></OnlineMusic>
        <MyMusic></MyMusic>
        <CreatePlayList></CreatePlayList>
        <FavoritePlayList></FavoritePlayList>
    </div>
</template>

<script>
import CreatePlayList from './components/CreatePlayList.vue';
import FavoritePlayList from './components/FavoritePlayList.vue';
import MyMusic from './components/MyMusic.vue';
import OnlineMusic from './components/OnlineMusic.vue';

export default {
    name: 'NavLeft',
    components:{
        CreatePlayList,
        FavoritePlayList,
        MyMusic,
        OnlineMusic,
    },
    data() {
        return {
            selectComponent:'suggest',
        };
    },

    mounted() {
        document.querySelector(".suggest").style.background = 'rgba(0, 0, 0, 0.2)'
    },

    methods: {
    },
    watch:{
        selectComponent(n, o) {
            if (o != '' || n == '') {
                document.querySelector("." + o).style.background = null;
            }
            document.querySelector("." + n).style.background = 'rgba(0, 0, 0, 0.2)';
        }
    }
};
</script>

<style>
    #navLeft{
        width: 210px;
        height: 610px;
        overflow: hidden;
    }

    #navLeft:hover{
        overflow: auto;
    } 
    
    #navLeft::-webkit-scrollbar{
        width: 10px;
    }

    ::-webkit-scrollbar-thumb{
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.5);
    }
</style>