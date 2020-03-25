<template>
  <div>
    <div class="address">
      <van-cell-group class="product" @click="region">
        <van-field :required='required' v-model="area" readonly label="所在地区" placeholder="请选择" maxlength="150" />
        <van-icon name="arrow" color="#969799FF" />
      </van-cell-group>
    </div>
    <div class="mask" v-show="mark" @click="mask"></div>
    <!-- 地址所在地区 -->
    <div class="address-content" style="background:#FFF" @click.stop v-show="address">
      <div class="title-box" style="height:38px">选择地址</div>
      <div class="select">
        <van-tabs v-model="active">
          <van-tab :title="province">
            <div class="area-list">
              <!-- <div style="height:47px;line-height:47px;font-size:14px;">选择省区</div> -->
              <div
                class="area-item"
                @click="clickProvince(area)"
                v-for="(area,key) in areaJson"
                :key="key"
              >{{area.aname}}</div>
            </div>
          </van-tab>
          <van-tab :title="city">
            <div class="area-list">
              <!-- <div style="height:47px;line-height:47px;font-size:14px;">选择城市</div> -->
              <div
                class="area-item"
                @click="clickCity(area)"
                v-for="(area,key) in cityData"
                :key="key"
              >{{area.aname}}</div>
            </div>
          </van-tab>
          <van-tab :title="district">
            <div class="area-list">
              <!-- <div style="height:47px;line-height:47px;font-size:14px;">选择区域</div> -->
              <div
                class="area-item"
                @click="clickDistrict(area)"
                :key="key"
                v-for="(area,key) in districtData"
              >{{area.aname}}</div>
            </div>
          </van-tab>
          <!-- <van-tab :title="street">
            <div class="area-list">
              <div style="height:47px;line-height:47px">选择街道</div>
              <div
                class="area-item"
                @click="clickStree(area)"
                v-for="(area,key) in streetData"
                :key="key"
              >{{area}}</div>
            </div>
          </van-tab> -->
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: ''
    },
    index: {
      type: Number,
      default: 0
    },
    required: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      address: false, // 所在地区弹窗
      area: '', // 所在地区
      mark: false, // 蒙层
      cstpost: '', // 邮政编码
      active: 1,
      province: "选择省份",
      city: "选择城市",
      district: "选择区域",
      street: "",
      areaJson: [],
      cityData: [], // 当前城市的json数据
      districtData: [], // 当前区域的json数据
      streetData: {}, // 当前街道的json数据
    }
  },
  methods: {
    
    // 点击蒙层
    mask() {
      this.address = false;
      this.mark = false;
    },
    // 获取三级联动数据
    getAddress(index,val) {
      let obj = {
        rtype: 1,
        aid: index === 2 || index === 3 ? val.aid : ''
      }
      if (index === 3) obj.rtype = 3;
      if (index === 2) obj.rtype = 2;
      let postData = {
        areaid: this.areaid,
        className: 'OnlineSale',
        methodName: 'GetAreaInfo',
        package: JSON.stringify(obj)
      };
      this.$axios.post(this.$http.currency, postData).then((res) => {
        let data = JSON.parse(res.data.package);
        if (index === 2) {
          this.cityData = data;
        } else if (index === 3) {
          this.districtData = data;
          if (data.length === 0) {
            this.getFilled();
            this.address = false;
            this.mark = false;
          }
        } else {
          this.areaJson = data;
        }
        if (index) {
          this.$emit('toggleAddress', {
            province: this.province,
            city: this.city,
            district: this.district,
            cstpost: this.cstpost,
            index: this.index
          });
        }
      },(err)=>{
        console.log(err)
      });
    },
    // 点击所在地区
    region() {
      this.active = 0;
      this.address = true;
      this.mark = true;
      this.getAddress();
    },
    clickProvince(name) {
      this.province = name.aname; // 把选中的省份赋值给之前绑定好的tab栏上显示省的值
      this.area = name.aname;
      this.active = 1; // 当前的tab栏切换到市
      this.city = "选择城市";
      this.district = "选择区域";
      this.getAddress(2, name);
    },
    clickCity(city) {
      this.city = city.aname;
      this.active = 2;
      this.area = this.province + this.city;
      this.getAddress(3, city);
    },
    clickDistrict(district) {
      // this.active = 3;
      this.district = district.aname;
      this.area += this.district;
      this.mark = false;
      this.address = false;
      this.area = this.province + this.city + this.district
      this.getFilled();
    },
    getFilled() {
      // 根据选择的区来获取邮政编码
      let obj = {
        "cityName": this.city === '澳门半岛' || this.city === '离岛' ? this.province : this.city,
        "areaName": this.city === '澳门半岛' || this.city === '离岛' ? this.city : this.district === '选择区域' ? '' : this.district,
      };
      let postData = {
        className: 'InfoPreFilled',
        methodName: 'GetCstpostEx',
        areaid: this.areaid,
        package: JSON.stringify(obj)
      };
      this.$axios.post(this.$http.currency, postData).then((res) => {
        this.cstpost = res.data.package;
        this.$emit('toggleAddress', {
          province: this.province,
          city: this.city,
          district: this.district,
          cstpost: this.cstpost,
          index: this.index
        });
      },(err)=>{
        console.log(err)
      });
    },
  },
  mounted() {
    if (this.value.length > 0) {
      this.area = this.value[0] + this.value[1] + (this.value.length > 2 ? this.value[2] : '');
      this.province = this.value[0];
      this.city = this.value[1];
      this.district = this.value.length > 2 ? this.value[2] : '';
    }
  }
}
</script>

<style scoped>
.van-tab__pane {
  height: 350px;
}
.product {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 66;
}
.product,
.van-icon,
.van-icon-arrow {
  margin-right: 17px;
}
.mask {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  z-index: 99;
}
.mask-content {
  width: 100%;
  height: 200px;
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.title-box {
  line-height: 38px;
  padding-left: 16px;
  box-sizing: border-box;
  font-size: 18px;
}
.address-content {
  width: 100%;
  height: 418px;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #fff;
  z-index: 99;
}
.address-content >>> .van-tabs__content {
  width: 100%;
  padding: 0 0 0 16px;
  box-sizing: border-box;
  height: 100%;
}
.address-content >>> .van-tab__pane {
  overflow-y: scroll !important;
}
.address-content >>> .van-tabs__line {
  background-color: #3388ffff;
}
.area-list {
  width: 100%;
  height: 100%;
}
.area-item {
  width: 100%;
  height: 47px;
  line-height: 47px;
  font-size: 16px;
  text-align: left;
}
</style>
