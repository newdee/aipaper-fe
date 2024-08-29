<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
   
  <div>
  

    <el-button size="small" type="primary"  onclick="document.getElementById('file-input').click()">选择路径</el-button>
        <input type="file" id="file-input" @change="preview()" /> 

  </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
       
  },
  
  data() {
    return {
      driver: null,
      imgDataUrl: '',
      id:'gao_input',
    }
  },
  mounted() {
  },
  methods: {
    preview(even){
      // let files = document.getElementById(this.id).files[0]
      // this.imgDataUrl =this.getObjectURL(files)
      // this.$emit('sendImgUrl',this.imgDataUrl,this.id)
      console.log('image',even)
    },
    getObjectURL (file) {
      let url = null ;
      if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
      }else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
      }else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
      }
      return url ;
    },
    
  }
}


  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
