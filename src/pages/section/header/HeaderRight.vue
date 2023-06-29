<template>
    <div id="headerRight">
        <div class="return" title="后退">
            &lt;
        </div>
        <div class="forward" title="前进">
            &gt;
        </div>
        <div class="select">
            <input type="text" placeholder="搜索音乐">
        </div>
        <div class="img">
            <img src="../../../assets/听歌识曲.png" alt="听歌识曲" title="听歌识曲">
        </div>
        <div class="user">
            <div class="headshot">
                <img src="../../../assets/headshot.png" alt="">
            </div>
            <div class="username">
                面向慈善
            </div>
        </div>
        <div class="menu">
            <div></div>
            <div>|</div>
            <div></div>
        </div>
        <div class="titleBar">
            <div class="minimize">
                <div>
                    —
                </div>
            </div>
            <div class="zoom">
                <div>
                    □
                </div>
            </div>
            <div class="close">
                <div @click="close">
                    X
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderRight',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        close() {
            document.getElementById("app").style.visibility = "hidden";
        }
    },
};
</script>

<style>
    #headerRight{
        width: 810px;
        height: 80px;
        align-items: center;
        display: flex;
    }

    #headerRight>.return{
        width: 35px;
        height: 40px;
        line-height: 40px;
        font-size:20px;
        margin-left:38px;
    }

    #headerRight>.forward{
        width: 35px;
        height: 40px;
        line-height: 40px;
        font-size:20px;
    }

    #headerRight>.select{
        height: 40px;
        line-height: 35px;
        width: 160px;
    }

    #headerRight>.select>input{
        width: 130px;
        background-color: rgba(55, 55, 55, 0.5);
        color:white;
        padding: 10px 15px 10px 15px;
        border: 0;
        border-radius: 20px;
        outline: none;
    }

    #headerRight>.img{
        width: 40px;
        height: 40px;
        line-height: 55px;
        text-align: center;
    }

    #headerRight>.img>img{
        width: 30px;
        height: 30px;
    }

    #headerRight>.user {
        display: flex;
        width: 215px;
        height: 40px;
        align-items: center;
        margin-left: 100px;
    }

    #headerRight>.user>.headshot>img{
        width: 25px;
        height: 25px;
    }

    #headerRight>.user>.username{
        width: 70px;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
        text-align: center;
        font-size:10px;
    }

    #headerRight>.menu{
        width: 78px;
        height: 40px;
        display: flex;
        align-items: center;
    }

    #headerRight>.titleBar{
        width: 105px;
        height: 40px;
        align-items: center;
        display: flex;
    }

    #headerRight>.titleBar>.minimize{
        width: 35px;
        height: 40px;
        line-height: 40px;
        font-size:10px;
    }

    #headerRight>.titleBar>.minimize>div{
        width: 12px;
    }

    #headerRight>.titleBar>.zoom{
        width: 35px;
        height: 40px;
        line-height: 40px;
        font-size:25px;
    }

    #headerRight>.titleBar>.zoom>div{
        width: 14px;
    }

    #headerRight>.titleBar>.close{
        width: 35px;
        margin-top:5px;
    }

    #headerRight>.titleBar>.close>div{
        width: 10px;
    }
</style>