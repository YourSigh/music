<template>
    <div ref="user" @click=$event.stopPropagation();>
        <div id="user">
            <div class="head">
                <img :src="img" alt="" @click="isShowimg = true">
            </div>
            <div class="username" @click="changename">
                {{ username }}
            </div>
            <input type="text" :value="username" ref="changename" class="changename" @keyup.enter="hidden" @blur="hidden"
                name="username">
            <div class="userid">
                UID：{{ uid }}
            </div>
            <button class="signout" @click="signout">退出登录</button>
            <div class="changepwd">修改密码</div>
        </div>
        <Modal :show.sync="isShowimg" :title="'头像'">
            <template v-slot:content>
                <div class="modalContent">
                    <img :src="img" alt="头像" v-if="img">
                    <input type="file" @change="handleFileChange" accept="image/*" ref="file" style="display: none;">
                </div>
            </template>
            <template v-slot:footer>
                <div class="modalFooter" @click="upload">
                    上传头像
                </div>
            </template>
        </Modal>
    </div>
</template>

<script>
import bus from '../../utils/bus'
import http from '@/utils/http';
export default {
    name: 'User',

    data() {
        return {
            isShowimg: false,
            title: '头像'
        };
    },

    props: {
        username: {
            type: String
        },
        uid: {
            type: Number | String
        },
        img: {
            type: String
        }
    },

    mounted() {

    },

    methods: {
        changename(e) {
            this.$refs.changename.style.display = 'block';
            this.$refs.changename.focus();
            e.stopPropagation(); // 阻止事件冒泡，防止无法触发
        },
        hidden(e) {
            bus.$emit('changename', this.$refs.changename.value);
            this.$refs.changename.style.display = 'none';
            e.stopPropagation(); // 阻止事件冒泡，防止无法触发
        },
        signout() {
            this.$emit('signout');
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                http.post('/serve/headshot', { uid: this.uid, img: reader.result }).then(res => {
                    this.$emit('update:img', reader.result);
                    localStorage.setItem('img', res.img);
                })
            };
            reader.readAsDataURL(file);
            this.isShowimg = false;
        },
        upload() {
            this.$refs.file.click();
        }
    },
};
</script>

<style scoped>
#modal>>>.modalContent>img {
    margin: 0 auto;
    width: 400px;
    height: 400px;
    display: block;
}

#modal>>>.modalFooter {
    margin: 0 auto;
    width: 300px;
    height: 30px;
    border-radius: 5px;
    text-align: center;
    font-size: 20px;
    background-color: #aaccee;
}

#user {
    width: 230px;
    height: 400px;
    margin: 10px auto;
    text-align: center;
    background-color: #363648;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
}

#user>.head {
    height: 150px;
}

#user>.head>img {
    width: 100px;
    height: 100px;
    margin: 20px auto;
    border-radius: 50px;
}

#user>.username {
    font-size: 30px;
    width: 200px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    margin: 0 auto;
}

#user>.changename {
    width: 200px;
    height: 40px;
    font-size: 20px;
    position: absolute;
    left: 15px;
    top: 150px;
    border: none;
    outline: none;
    border-radius: 5px;
    display: none;
    text-align: center;
}

#user>.userid {
    margin: 20px auto;
}

#user>.signout {
    margin: 60px auto 0;
    width: 200px;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #aaccee;
    color: white;
}

#user>.changepwd {
    margin: 20px auto;
    color: #aaccee;
    font-size: 12px;
}
</style>