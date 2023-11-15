<template>
    <div id="modal" v-show="show" @click="$emit('update:show', false)">
        <div class="modal-table" :style="{width:width}" @click.stop>
            <div class="modal-header">
                <slot name="header">
                    <slot name="title">
                        <h3>{{ title }}</h3>
                    </slot>
                    <button @click="$emit('update:show', false)" class="modal-close">X</button>
                </slot>
            </div>
            <div class="modal-content" v-if="this.$slots.content">
                <slot name="content">

                </slot>
            </div>
            <div class="modal-footer" v-if="this.$slots.footer">
                <slot name="footer">

                </slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',

    data() {
        return {
            
        };
    },
    props:{
        show:{
            type:Boolean,
            default:false
        },
        title:{
            type:String,
            default:''
        },
        width:{
            type:String,
            default:'640px'
        }
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style scoped>
    #modal{
        position: fixed;
        font-size:16px;
        width: 100%;
        height: 100%;
        top:0;
        left:0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
        color:black;
    }
    #modal>.modal-table {
        background-color: white;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        bottom:calc(50vh - 345px);
    }

    #modal>.modal-table>.modal-header {
        display: flex;
        height: 24px;
        position: relative;
        align-items: center;
        padding: 10px 20px;
        background-color: #fafafa;
        color:black;
    }

    #modal>.modal-table>.modal-header>.modal-close {
        border: 0;
        position: absolute;
        right: 20px;
    }

    #modal>.modal-table>.modal-header>.modal-close:hover{
        color: red;
    }

    #modal>.modal-table>.modal-content{
        padding: 20px;
        margin:0 auto;
    }

    #modal>.modal-table>.modal-footer{
        padding: 10px 20px;
        border-top: 1px solid #e5e5e5;
    }
</style>