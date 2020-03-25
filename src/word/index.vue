<template>
  <div>
    <van-radio-group v-model="radio" direction="horizontal" class="radioBox">
      <van-radio name="0">English</van-radio>
      <van-radio name="1">Chinese</van-radio>
      <van-radio name="2">Random</van-radio>
    </van-radio-group>
    <van-button round class="button" type="info" @click="previous">
      上一个
    </van-button>
    <van-button round class="button" type="info" @click="random">
      随机
    </van-button>
    <van-button  round type="info" class="button" @click="translate">
      翻译
    </van-button>
    <van-button class="button" round type="info" @click="next">
      下一个
    </van-button>
    <br>
    <p class="word">{{indexList[Number(radio)]+1}}/{{show}}/{{word[Number(radio)].length}}</p>
  </div>
</template>
<script>
import word from '@/word'
import md5 from 'js-md5'
import sha256 from 'js-sha256'

export default {
  data() {
    return {
      radio: '0',
      word: word,
      indexList: [],
      list: [],
      show: word[0][0],
      q: "", // 需要翻译的文本
      from: 'auto', // 源语言
      to: 'auto', // 目标语言
      signType: 'V3', // 签名类型
      appKey: '53f0506bf0a470ac', // 应用 ID
      salt: (new Date).getTime(),
      curtime: Math.round(new Date().getTime()/1000), // 随机数
      secret_key: 'AhoHlSsDzZGkTSyvSg8JSM26N8NKAj0F', // 密钥 
    }
  },
  watch: {
    radio(val) {
      this.show = this.word[Number(val)][this.indexList[Number(val)]]
      if (val == 2) this.random();
    }
  },
  methods: {
    showFonction() {
      return this.word[Number(this.radio)][this.indexList[Number(this.radio)]];
    },
    previous() {
      if (this.indexList[Number(this.radio)] <= 0) {
        this.indexList[Number(this.radio)] = this.word[Number(this.radio)].length - 1
      } else {
        this.indexList[Number(this.radio)]--
      }
      if (this.radio == 2) this.random();
      this.show = this.showFonction();
    },
    next() {
      if (this.indexList[Number(this.radio)] >= this.word[Number(this.radio)].length - 1) {
        this.indexList[Number(this.radio)] = 0
      } else {
        this.indexList[Number(this.radio)]++
      }
      if (this.radio == 2) this.random();
      this.show = this.showFonction();
    },
    random() {
      let randomNumber = Math.ceil(Math.random()*this.word[Number(this.radio)].length - 1);
      if (randomNumber < 0) randomNumber = 0;
      this.indexList[Number(this.radio)] = randomNumber;
      this.show = this.showFonction();
    },
    translate() {
      this.q = encodeURIComponent(this.show, "UTF-8");
      // this.q = encodeURIComponent(this.show)
      // console.log(this.q)
      // lastedword=URLEncoder.encode(word, "UTF-8");
      // this.to = 'zh-CHS';
      // this.q = encodeURI(this.show);
      // this.q = encodeURIComponent(this.show);
      this.sign = sha256(this.appKey+this.q+this.salt+this.curtime+this.secret_key);
      let postData = {
        q: this.show,
        appKey: '53f0506bf0a470ac',
        salt: (new Date).getTime(),
        from: 'auto',
        to: 'auto',
        sign: this.sign,
        signType: "v3",
        curtime: Math.round(new Date().getTime()/1000),
      }
      this.$axios.post('/api/',postData).then((data) =>{
        console.log(data)
      })
      // this.$axios.get('/api/?q='+this.q+'&appKey='+this.appKey+'&salt='+this.salt+'&from='+this.from+'&to='+this.to+'&sign='+md5(this.appKey+this.q+this.salt+this.curtime+this.secret_key)+'&signType=v3&curtime='+this.curtime)
      // .then((data) =>{
      //   console.log(data)
      // })
      // this.$axios.get('/api?q='+this.q+'&appKey='+this.appKey+'&salt='+this.salt+'&from='+this.from+'&to='+this.to+'&sign='+md5(this.appKey+this.q+this.salt+this.secret_key))
      // .then((data) =>{   
      //   console.log(data)
      // })
    },
    writeUTF  (str, isGetBytes) {
      var back = [];
      var byteSize = 0;
      for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        if (0x00 <= code && code <= 0x7f) {
          byteSize += 1;
          back.push(code);
        } else if (0x80 <= code && code <= 0x7ff) {
          byteSize += 2;
          back.push((192 | (31 & (code >> 6))));
          back.push((128 | (63 & code)))
        } else if ((0x800 <= code && code <= 0xd7ff) || (0xe000 <= code && code <= 0xffff)) {
          byteSize += 3;
          back.push((224 | (15 & (code >> 12))));
          back.push((128 | (63 & (code >> 6))));
          back.push((128 | (63 & code)))
        }
      }
      for (i = 0; i < back.length; i++) {
        back[i] &= 0xff;
      }
      if (isGetBytes) {
        return back
      }
      if (byteSize <= 0xff) {
        return [0, byteSize].concat(back);
      } else {
        return [byteSize >> 8, byteSize & 0xff].concat(back);
      }
    }
  },
  created() {
    // this.md5 = require('js-md5');
    this.word.forEach(() => {
      this.indexList.push(0)
    });
    // console.log(this.writeUTF('中'))
  }
}
</script>

<style scoped>
.radioBox {
  justify-content: center;
  height: 100px;
  line-height: 100px;
}
.radioBox /deep/ .van-radio__icon {
  font-size: 30px;
}
.radioBox /deep/ .van-radio__label {
  font-size: 18px;
}
.word {
  text-align: center;
  height: 100px;
  line-height: 100px;
  font-size: 30px;
}
.button {
  width: 20%;
  margin-left: 3.5%;
}
</style>