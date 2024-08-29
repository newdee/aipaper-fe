<template>
  <div class="cron">
    <button @click="changeCron">点击</button>
    <grid-layout
            :layout.sync="layout"
            :col-num="12"
            :row-height="30"
            :max-rows="100"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
    >

        <grid-item v-for="item in layout"
                  :x="item.x"
                  :y="item.y"
                  :w="item.w"
                  :h="item.h"
                  :i="item.i"
                  :isDraggable="item.isDraggable"
                  :isResizable="item.isResizable"
                  :key="item.i">
            {{item.i}}
        </grid-item>
    </grid-layout>
  </div> 
</template>

<script>
  // import {cron} from 'vue-cron';
  import VueGridLayout from 'vue-grid-layout';
 
  export default {
      // components: { cron },
      components: {
           GridLayout: VueGridLayout.GridLayout,
           GridItem: VueGridLayout.GridItem
       },
      data(){
          return {
            layout: [
          {"x":0,"y":0,"w":12,"h":2,"i":"0",isResizable: false},
                {"x":2,"y":0,"w":2,"h":4,"i":"1",},
                {"x":4,"y":0,"w":2,"h":5,"i":"2"},
                {"x":6,"y":0,"w":2,"h":3,"i":"3"},
                {"x":8,"y":0,"w":2,"h":3,"i":"4"},
                {"x":10,"y":0,"w":2,"h":3,"i":"5"},
                {"x":0,"y":2,"w":2,"h":2,"i":"6"},
          ],
          }
      },                  
                                                                                                                                                                                                                                                                              
      // mounted() {
      //   let strData = localStorage.getItem('layoutData')
      //   console.log('strData',strData)
      //   if(strData) {
      //     console.log('strData',strData)
      //     this.layout = JSON.parse(strData)
      //   } else {
      //     this.layout = [
      //     {"x":0,"y":0,"w":1,"h":2,"i":"0",isResizable: false},
      //           {"x":2,"y":0,"w":2,"h":4,"i":"1",},
      //           {"x":4,"y":0,"w":2,"h":5,"i":"2"},
      //           {"x":6,"y":0,"w":2,"h":3,"i":"3"},
      //           {"x":8,"y":0,"w":2,"h":3,"i":"4"},
      //           {"x":10,"y":0,"w":2,"h":3,"i":"5"},
      //           {"x":0,"y":2,"w":2,"h":2,"i":"6"},
      //     ]
      //   }
      // },
      methods: {
          changeCron(){
              console.log('this.layout', this.layout);
              // localStorage.getItem('layoutData')
              localStorage.setItem('layoutData', JSON.stringify(this.layout))

          },
      },
  }
</script>
<style scope>
  .vue-grid-item .vue-grid-placeholder {
    background: red;
    opacity: 0.2;
    transition-duration: 100ms;
    z-index: 2;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
}  
.vue-grid-item {
  background: #ccc;
}
</style> 