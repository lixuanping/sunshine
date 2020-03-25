import Loading from '../components/loading/index.vue';
import Vue from 'vue';
export default ()=> {
  let LoadingComponent = Vue.extend(Loading);
  let child = new LoadingComponent({ // 动态创建挂载点
    el:document.createElement("div"),
    data:{
      flag:false,
    },
    methods:{
      handlemount(){
        this.flag=true;
      },
      handleDestory(){
        this.flag=false;
      }
    }
  })
  document.body.appendChild(child.$mount().$el)
  return child;
}