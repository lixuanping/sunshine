<template>
  <div>
    <!-- <navs :data='data' v-model="index"></navs> -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <div class="titleBox">
      <div class="title fl">测试</div>
      <div class="fr more">更多 ></div>
    </div>
    <van-radio-group v-model="radio" direction="horizontal" class="radioBox">
      <van-radio name="0">English</van-radio>
      <van-radio name="1">Chinese</van-radio>
      <van-radio name="2">theOther</van-radio>
    </van-radio-group>
    <van-button round class="button" type="info" @click="previous">
      上一个
    </van-button>
    <van-button round class="button" type="info" @click="random">
      随机
    </van-button>
    <van-button  round type="info" class="button" @click="translate">
      翻译
      associ
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
import navs from '@/components/nav/index.vue'
export default {
  components: {
    navs
  },
  data() {
    return {
      index: 0,
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
        this.indexList[Number(this.radio)] = this.word[Number(this.radio)].length - 1;
      } else {
        this.indexList[Number(this.radio)]--;
      }
      if (this.radio == 2) this.random();
      this.show = this.showFonction();
    },
    next() {
      if (this.indexList[Number(this.radio)] >= this.word[Number(this.radio)].length - 1) {
        this.indexList[Number(this.radio)] = 0;
      } else {
        this.indexList[Number(this.radio)]++;
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
      this.q = encodeURIComponent(this.show)
      lastedword = URLEncoder.encode(word, "UTF-8");
      this.q = encodeURI(this.show);
      this.q = this.writeUTF(this.show);
      this.sign = md5(this.appKey+this.show+this.salt+this.curtime+this.secret_key);
      let postData = {
        q: encodeURI(this.show),
        appKey: '53f0506bf0a470ac',
        salt: (new Date).getTime(),
        from: 'auto',
        to: 'auto',
        sign: this.sign,
        signType: "v3",
        curtime: Math.round(new Date().getTime()/1000),
      };
      this.$axios.post('/api/',postData).then((data) =>{
        console.log(data)
      });
      // this.$axios.get('/api/?q='+this.q+'&appKey='+this.appKey+'&salt='+this.salt+'&from='+this.from+'&to='+this.to+'&sign='+md5(this.appKey+this.q+this.salt+this.curtime+this.secret_key)+'&signType=v3&curtime='+this.curtime)
      // .then((data) =>{
      //   console.log(data)
      // })
      // this.$axios.get('/api?q='+this.q+'&appKey='+this.appKey+'&salt='+this.salt+'&from='+this.from+'&to='+this.to+'&sign='+md5(this.appKey+this.q+this.salt+this.secret_key))
      // .then((data) =>{   
      //   console.log(data)
      // })
    },
  },
  created() {
    // 265 今天我上班。 I am at work today
    // 266我昨天在家。 I at home yesterday
    // 267她每天通常6:10起床。She often get up six past ten
    // 268她昨天7点起床。 She w
    // 269 Jane 会弹钢琴。
    // 270 Jane去年会游泳。



    // 评估vt 资产n 分配vt 分配,指派n 吸收消化vt 协助,帮助vt 帮助n (帮助a-助手n) (联想,交往vt-伙伴n-联合的a) 联盟,协会
    // assess asset assign assignment assimilate assist assistance assistant associate association
    // 假装,假定vt 假定,设想n 使确定,使放心vt 保证,放心n 使惊讶,使吃惊vt 宇航员n 天文学n 运动员n 大气层,大气压n 原子n
    // assume assumption assure assurance astonish astronaut astronomy athlete atmosphere atom
    // this.md5 = require('js-md5');
    this.word.forEach(() => {
      this.indexList.push(0);
    });
    // 操作','考虑','条件','接待','设计','处理','咨询','进步','评审',
    // '加拿大','英格兰','美国','日本','橡皮擦','拼写','心愿','责任','年级','same','same look','early','熬夜','成双成对','昆虫','风筝','放风筝','参观','环绕','猜测','有趣的','足球','在操场上','健身房',
    // '小心,认真','执行,演出','图片,想象','上课','总是','通常','经常','有时','很少','从不','同班同学','骑','计划','一周两次','keep the book','think of best','科目','出生','只有一点点',
    // '模型','单独','千','前天','a moment a go','稍等一下,片刻','at the moment','此刻','伟大的','长城','担心','公司','攀爬','非常晚','看起来像','到','到达(大地方)','到达(小地方)','蜡烛',
    // '快点','成长','雨伞','参加','亮起','at-once,立刻','cause-cancer','回答','照顾好自己',
    // '蔬菜','非常确定','美味的','甜的','生气的','当然,of course','考试','变暗','变生气','兴奋的','踢',
    // '实践,练习','滑雪','溜冰','爬山','约会','聪明的','野炊','问题','迅速','安静','缺乏'exercise

    // sure exam dark angry excited match birthday hurry up kick practice skiing skating climb mountain appointment picnic problem quiet quickly
    // '当然','考试','变暗','变生气','兴奋的','比赛','生日','快点','踢','实践,练习','滑雪','溜冰','爬山','约会','聪明的','野炊','问题','安静','迅速',
    // clever brave fat popular lonely cute suddenly put up look shy feel nervous further study interpretation
    // '聪明的','勇敢的','肥','流行的','寂寞','可爱的','突然','提供','看起来很害羞','感到紧张','深造','解释'


    // '动物','马','牛','老鼠','翅膀','鸟','河马','山羊','鹿','长颈鹿','象','狮','豹','狐狸','狼','熊','兔子','猴子','大猩猩','考拉','刺猬','北极熊','骆驼','袋鼠','熊猫','交通','火车','卡车','自行车','小艇','船','轮胎','汽油','引擎','电车','有轨电车','无轨电车','(售货员,导体)','检查员','铁路','轨道','车厢','餐车','站台','食堂','自助餐','候车室','注册,登记','下船','起飞',
    // animal horse cow mouse wing bird hippopotamus(x) soat deer giraffe elephant lion leopard fox wolf bear rabbit monkey gorilla koala hedgehog(x) polar-bear camel kangaroo panda transportation(x) train truck bicycle bike boat ship tire gasoline engine streetcar tramcar trolleybus conductor(x) inspector(x) railway track carriage(x) dining-car platform(x) canteen(x) buffet(x) waiting-room registration(x) disembark(x) take-off
    // '地点','公寓','街道','机场','餐厅','农村','法院','城镇','大学','俱乐部','酒吧','公园','营地','剧院','图书馆','医院','教堂','市场','国家','建筑','地面','太空','银行','药店','部门,司,局','百货商店','博物馆','游乐园','邮电局','电影院','画廊','政府','码头','厕所','塔','寺庙','宿舍','牙科诊所,牙医','书房','城堡','自助洗衣店','植物园',
    // location apartment street airport restraurant farm court town university club bar park camp theater library hospital(x) church market country building ground space bank drugstore(x) department department-store museum fairground post-office cinema gallery(x) government(x) shipside toilet tower temple dormitory dentist(x) study castle laundromat(x) botanic-garden
    // '服装','帽子','连衣裙','西装','裙子','衬衫','裤子','鞋子','口袋','外套','污渍','棕色','灰色','白色','人物','女儿','丈夫','妻子','国王','女王','总统','邻居','成人','人类','受害者','人群','律师','医生','病人','秘书','牧师','军队','军人','艺术家','作者','经理','记者','演员',
    // clothink hot dress suit skirt shirt pants shoes pocket(x) coat stain brown(x) gray white peopel doughter husband wife king queen president neighbor adult human victim crowd(x) lawyer doctor patient secretary priest(x) army soldier artist author manager reporter actor
    // '社会','宗教','天堂','地狱','死亡','医学','金钱','美元','账单','婚姻','婚礼','团队','种族','性行为','谋杀','监狱','科技，技术','能源','战争','毒药','和平，平静','攻击','选举','杂志，弹药库','枪','体育','赛跑','运动','球','游戏','价格','合同','毒品','迹象','科学','上帝'
    // society religion heaven hell(x) death madicine money doller marriage wedding team Ethnicity sex murder prison technology energy(x) war prosin peace attack(x) election magazine gun sport race exercise(x) ball game price contract drug sign science god
    // ,'艺术','乐队','歌曲','乐器','饮料','咖啡','茶','葡萄酒','啤酒','果汁','水','牛奶','食物','奶酪','面包','汤','蛋糕','鸡肉','猪肉','牛肉','玉米','大米','油','种子','刀','勺子','盘子','杯子','早餐','午餐','晚餐','食糖','盐','瓶子','家内','桌子','椅子',
    // art band sing beverage drink coffee tea wine beer juice water milk food cheese break soup cake chicken pork beef corn rice oil seed knife spoon plate cup breakfast lunch dinner sugar(x) salt bottle home desk chair
    // '床','梦','窗口','门','卧室','厨房','浴室','铅笔','笔','相片','肥皂','油漆','信件','笔记','墙壁','纸张','地板','天花板','屋顶','游泳池','锁','电话','花园','院子','针','包','盒子','礼物','卡片','戒指','工具','电子产品','时钟','电灯','风扇','手机','网络','电脑程序','笔记本电脑','屏幕','照相机','电视',
    // bed dream window door bedroom kitchen bathroom(x) pencil(x) pen photograph paint letter note wall paper ceiling roof pool swin lock telephone garden yard nedeel bag box gift card ring tool electronics clock lamp fan cell-phone network program leptop screen camera televition(x)
    // '大自然','海','海洋','河','山','雨','树','太阳','月亮','世界','地球','树林','天空','植物','风','土地','花','山谷','根','湖','星星','草','叶子','空气','沙子','沙滩','波浪','冰','水','岛屿','山丘','热量','材料','金属','塑料','石头','钻石','黏土','灰尘','金','铜','银',
    // naturn sea ocean river mountain rain tree sun moon world earth forest sky plant wind soil flower valley(x) root lake star grass leaf air send beach wave fire ice(x) island hill heat materials metal plastic stone diamond clay dust gold copper(x) silver
    // '数学','测量','米','厘米','千克','公斤','英寸','英尺','磅','一半','圆形','正方形','温度','重量','边缘','角落','其他名称','点','辅音','元音','光','声音','一块','疼痛','伤害','洞','(花样,模式)','方向','前面','上面','直线','北部','南部','东部','西部','季节','春','夏','秋','东',
    // math measurement(x) meter centimeter kilo kilogram(x) inch foot pound half square temperature(x) weight corner the-nouns dot(x) consonant(x) vowel light voice piece pain injury hole pattern(x) direcion front up straight north south east west season spring summer fall winter
    // '月份','一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月','三','十一','十二','十三','十五','二十','三十','四十','五十','一百','一周中的几天','周一','周二','周三','周四','周五','周六','周日','小时','分钟','秒','早晨','下午','傍晚','晚上',
    // month january(x) february marth april May june july august september october november december three eleven twelve thirteen fifteen twenty thirty forty fifty hundred(x) the-days-for-week monday tuesday(x) wednesday thursday(x) friday saturday(x) sunday hour minute second morring afternoon evening night
    // '动词','工作','走路','跑步','驾驶','飞行','游泳','（跟随,关注）','（想,讲,说）','杀','死','微笑','笑','哭','付费','卖','学习','跳跃','闻','倾听-声音','聆听','品尝','触摸','观鸟','燃烧','融化','挖掘','爆炸','坐','站','路过','切割','战斗','躺下','跳舞','睡觉',
    // verbs work walk run drive fly swin follow think-speak-say kill(x) die(x) smile laugh(x) cry pay sell learn jump smell hear listen taste touch see-a-bird burn melt dig explode(x) sit stand pass-by cut fight lie-down dance sleep(x)
    // '醒来','唱歌','计算','结婚','祈祷','获胜','失败','混合-搅拌','弯身','清洗','烹饪','写作','呼叫','转动','建造','教导','生长','绘画','喂食','抓','扔','清理','寻找','摔倒','推','拉','携带','打破','穿','挂','摇晃','签','打','抬',
    // wake-up(x) sing count marry pray win lose max/stir bend wash cook write cell turn build teach grow draw feed catch throw clean find fall push pall carry break wear hang shake sign beat lift
    // '形容词','高','矮','窄','大','小','慢','快','热','冷','温','凉爽','旧','老','年轻','坏','湿','干','病','健康','响亮','安静','开心','伤心','美丽','丑陋','聋哑','失明','友好','意思是,刻薄','富有','贫穷','厚','薄','昂贵','广阔的，膨胀的','便宜','平','弯曲','雄','雌','紧','松','高','低','软','硬','深','浅','干净','肮脏','强大','软弱','死','活','重','轻','暗','亮','核能','著名'
    // tall short narrow big/large(x) little/small slow fast hot cold warm cool oid young(x) bed wet dry sick(x) healthy loud quiet happy sad beautiful ugly(x) deaf mute blank meau rich(x) poor thick thin expensive(x) expansive cheap flit bend male(X) female(x) tight loose tall low soft hard deep shallow(x) clean dirty strong weak(x) Dead alive heavy(x) light dark light nuclear(x) famous

    // practice skiing skating climb mountain appointment clever picnic problem quickly quiet lack
  }
}
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
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
.titleBox {
  overflow: hidden;
  padding: 20px;
}
.titleBox .title {
  font-size: 20px;
}
.titleBox .more {
  color: #cccccc;
  margin-top: 5px;
}
</style>