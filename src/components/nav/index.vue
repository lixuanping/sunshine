<template>
  <div>
    <div class="box">
      <ul :class="{'box--transition': transition}" :style="{'left': positionLeft + 'px'}"
      @touchstart="start" @touchmove='move' @touchend='end' ref='box' class="box_header">
        <li ref='li' class="header_title" v-for='(item,index) in data' :key='index'
        :class="{'header_title--bottom': idx == index}" @click="toggle(index)">
          {{item.BLDNAME}}
        </li>
      </ul> 
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: '',
    },
    data: {
      type: Array,
      default: [],
    },
  },
  watch: {
    value(val) {
      this.idx = val;
    },
    data(val) {
      this.positionLeft = 0;
    }
  },
  data() {
    return {
      positionLeft: 0,
      idx: '',
      startPageX: '',
      endPageX: '',
      startTime: '',
      endtTime: '',
      transition: false, // 是否启用动画 (缓慢拖拽的时候不需要使用)
      dragAndDrop: '', // 结束时候的拖拽距离
    };
  },
  methods: {
    // 针对拖拽到开始和结束位置的限制
    auto() {
      // 超出在0到70区间
      if (this.positionLeft > 0 && this.positionLeft < 70) {
        this.positionLeft = 0;
        this.transition = true;
      }
      // 超出70 松手的时候重置为0
      if (this.positionLeft > 70) {
        this.positionLeft = 70;
        this.transition = true;
      }
      let width = -this.positionLeft - (this.$refs.box.offsetWidth - window.outerWidth);
      if (width > 0 && width < 70) {
        this.positionLeft = -(this.$refs.box.offsetWidth - window.outerWidth);
        this.transition = true;
      }
      if (width > 70) {
        this.positionLeft = -(this.$refs.box.offsetWidth - window.outerWidth) - 70;
        this.transition = true;
      }
    },
    start(e) {
      if (this.$refs.box.offsetWidth >= window.outerWidth) {
        const data = new Date();
        this.startTime = data.getTime();
        this.startPageX = e.changedTouches[0].pageX;
      }
    },
    move(e) {
      e.preventDefault();
      if (this.$refs.box.offsetWidth >= window.outerWidth) {
        this.transition = false;
        this.positionLeft = e.changedTouches[0].pageX - this.startPageX + Number(this.dragAndDrop);
        this.auto();
      }
    },
    end(e) {
      if (this.$refs.box.offsetWidth >= window.outerWidth) {
        const data = new Date();
        this.endtTime = data.getTime();
        this.endPageX = e.changedTouches[0].pageX;
        // 针对小于0.7秒且拖拽距离小于150的给一个加速度
        if ((this.endtTime - this.startTime) < 700 && this.startPageX > this.endPageX && (this.startPageX - this.endPageX) < 150 && (this.startPageX - this.endPageX) > 0) {
          this.transition = true;
          this.positionLeft -= 150;
        }
        if ((this.endtTime - this.startTime) <= 700 && this.endPageX > this.startPageX && (this.endPageX - this.startPageX) < 150) {
          this.transition = true;
          this.positionLeft += 150;
        }
        this.auto();
        this.dragAndDrop = this.positionLeft; // 每次缓慢拖拽时候的拖拽距离
        if (this.positionLeft === 70) {
          this.positionLeft = 0;
          this.transition = true;
        }
        if (this.positionLeft === -(this.$refs.box.offsetWidth - window.outerWidth) - 70) {
          this.positionLeft = -(this.$refs.box.offsetWidth - window.outerWidth);
          this.transition = true;
        }
      }
    },
    toggle(index) {
      this.idx = index;
      this.$emit('input', this.idx);
    },
    // 计算初始位置
    init() {
      if (this.data.length <= 0) {
        this.idx = '';
      } else {
        this.idx = this.value;
        let total = 0;
        let arr = Array.from(this.$refs.li);
        if (this.idx === 0) {
          this.positionLeft = 0;
        } else if (this.idx === arr.length - 1) {
          this.positionLeft = -(this.$refs.box.offsetWidth - window.outerWidth);
        } else {
          let list = arr.slice(0, this.idx);
          list.forEach(item => {
            total += item.offsetWidth;
          });
          const index = parseInt(total / window.outerWidth);
          // 如果计算超出最小值的时候 就等于最小值 否则就按计算的值
          if (-index * window.outerWidth - (total % window.outerWidth) <= -(this.$refs.box.offsetWidth - window.outerWidth)) {
            this.positionLeft = -(this.$refs.box.offsetWidth - window.outerWidth);
          } else {
            this.positionLeft = -index * window.outerWidth - (total % window.outerWidth);
          }
        }
        this.dragAndDrop = this.positionLeft; // 有个默认的初始拖拽值也需要赋值
      }
    },
  },
  mounted() {
    this.init();
  },
}
</script>

<style scoped>
  .box {
    position: relative;
    width: 100%;
    overflow: hidden;
    height: 52px;
    background: #ffffff;
    border-bottom: 1px solid #0069F0;
  }
  .box_header {
    white-space: nowrap;
    position: absolute;
    top: 0;
    color: #ffffff;
    cursor: pointer;
    padding-top: 5px;
  }
  .header_title {
    display: inline-block;
    cursor: pointer;
    text-align: center;
    background: #ECF2F9;
    border-radius: 14px;
    margin: 8px;
    color:#333333;
    padding: 5px 12px;
    font-size: 12px;
  }
  .header_title--bottom {
    background: #0069f0;
    color: #ffffff;
  }
  .box--transition {
    transition: left .5s;
  }
</style>
