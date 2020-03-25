<template>
  <div>
    <div class="emailListBox">
        <van-cell-group @keyup="keyupEmial">
          <van-field @clear='clearEmial' v-model="email" clearable :required='required' label="电子邮箱" placeholder="请输入" />
        </van-cell-group>
        <div class="emailBox" v-show="emailBoxShow">
          <p v-for="(i, idx) in emailList" :key='idx' @click="toggleEmail(i)">{{i}}</p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'email',
  props: {
    value: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      emailList: [],
      emailBoxShow: false,
      email: ''
    }
  },
  methods: {
    keyupEmial() {
      this.emailList = ['@qq.com','@163.com','@139.com','@126.com','@gmail.com','@sina.com','@hotmail.com','@189.cn','@yahoo.com','@foxmail.com','@wo.cn','@yahoo.com.hk','@outlook.com','@icloud.com','@sohu.com','@168.com','@vip.qq.com','@yeah.net','@aliyun.com','@sina.cn','@vip.163.com','@139.cn','@countrygarden.com.cn','@138.com','@21cn.com','@live.com','@wo.com','@186.com','@169.com','@162.com','@tcl.com','@wo.com.cn','@vip.sina.com','@183.com','@msn.com','@tom.com','@naver.com','@me.com','@huawei.com','@sinopec.com','@ymail.com','@chinaunicom.cn','@188.com','@126.cn','@tops001.com','@petrochina.com.cn'];
      if (this.email.includes('@')) {
        this.emailList = this.emailList.map(item => {
          return this.email.split('@')[0] + item;
        });
      } else {
        this.emailList = this.emailList.map(item => {
          return this.email + item;
        });
      }
      this.emailBoxShow = true;
      this.$forceUpdate();
      if (this.email === '') {
        this.emailBoxShow = false;
      }
      this.$emit('input', this.email);
    },
    toggleEmail(item) {
      this.emailBoxShow = false;
      this.email = item;
      this.$emit('input', this.email);
    },
    clearEmial() {
      this.emailBoxShow = false;
    },
  },
  created() {
    this.email = this.value;
  }
}
</script>

<style scoped>
.emailListBox {
  position: relative;
}
.emailListBox .emailBox {
  position: absolute;
  left: 0;
  top: 40px;
  width: 100%;
  z-index: 100;
  height: 200px;
  overflow-x:scroll;
  background: #ffffff;
  z-index: 99;
}
.emailListBox .emailBox p {
  padding-left: 10px;
  height: 30px;
  line-height: 30px;
  color: #cccccc;
  font-size: 14px;
}
</style>
