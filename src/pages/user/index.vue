<template>
    <div ref="user" @click="$event.stopPropagation()">
        <div id="user">
            <div class="head">
                <img :src="img" alt="" @click="isShowimg = true" />
            </div>
            <div class="username" @click="changename">
                {{ username }}
            </div>
            <input type="text" :value="username" ref="changename" class="changename" @keyup.enter="hidden($event, false)"
                @blur="hidden($event, true)" name="username" />
            <div class="userid">UID：{{ uid }}</div>
            <button class="signout" @click="signout">退出登录</button>
            <div class="changepwd" @click="changepwd">修改密码</div>
        </div>
        <Modal :show.sync="isShowimg" :title="'头像'">
            <template v-slot:content>
                <div class="modalContent">
                    <img :src="img" alt="头像" v-if="img" />
                    <input type="file" @change="handleFileChange" accept="image/*" ref="file" style="display: none" />
                </div>
            </template>
            <template v-slot:footer>
                <div class="modalFooter" @click="upload">上传头像</div>
            </template>
        </Modal>
        <Modal :show.sync="isShowChangepwd" :title="'修改密码'" :width="'400px'">
            <template v-slot:content>
                <div>
                    <ChangePwd :show.sync="isShowChangepwd" v-if="isShowChangepwd"></ChangePwd>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script>
import bus from "../../utils/bus";
import ChangePwd from "./changePwd.vue";
import { changeUsername, headshot } from "@/api/user";
export default {
    name: "User",

    data() {
        return {
            isShowimg: false,
            isShowChangepwd:false,
            title: "头像",
        };
    },

    components:{
        ChangePwd
    },

    props: {
        username: {
            type: String,
        },
        uid: {
            type: Number | String,
        },
        img: {
            type: String,
        },
    },

    mounted() { },

    methods: {
        changename(e) {
            this.$refs.changename.style.display = "block";
            this.$refs.changename.focus();
            e.stopPropagation(); // 阻止事件冒泡，防止无法触发
        },
        async hidden(e, flg) {
            // flg 表示触发事件的类型
            bus.$emit("changename", this.$refs.changename.value);

            if (flg) {
                let params = {
                    uid: this.uid,
                    username: this.$refs.changename.value,
                };
                let res = await changeUsername(params);
                if (res == "success") {
                    localStorage.setItem("username", this.$refs.changename.value);
                    this.$store.commit("setUserInfo", {
                        uid: this.uid,
                        username: this.$refs.changename.value,
                        img: this.img,
                    });
                    this.$refs.changename.style.display = "none";
                }
            } else {
                this.$refs.changename.blur();
            }

            e.stopPropagation(); // 阻止事件冒泡，防止无法触发
        },
        signout() {
            this.$emit("signout");
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = async () => {
                let res = await headshot({
                    uid: this.uid,
                    img: reader.result,
                });
                this.$emit("update:img", reader.result);
                localStorage.setItem("img", res.img);
            };
            reader.readAsDataURL(file);
            this.isShowimg = false;
        },
        upload() {
            this.$refs.file.click();
        },
        changepwd() {
            this.isShowChangepwd?this.isShowChangepwd = false:this.isShowChangepwd = true;
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