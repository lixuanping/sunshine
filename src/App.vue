<template>
  <div id="app">
    <!-- <router-view v-wechat-title='$route.meta.title'/> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('./assets/style/common.css');
html,body {
  height: 100%;
  background: #ffffff;
}
#app {
  height: 100%;
  overflow: auto;
}

.followName {
  border: none;
  margin-left: 10px;
}

::-webkit-input-placeholder{
 color:#C8C9CC
}    /* 使用webkit内核的浏览器 */
:-moz-placeholder{
color:#C8C9CC
}                  /* Firefox版本4-18 */
::-moz-placeholder{
color:#C8C9CC
}                  /* Firefox版本19+ */
:-ms-input-placeholder{
color:#C8C9CC
}           /* IE浏览器 */
</style>
