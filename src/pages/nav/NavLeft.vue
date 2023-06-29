<template>
    <div id="navLeft">
        <OnlineMusic></OnlineMusic>
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
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
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