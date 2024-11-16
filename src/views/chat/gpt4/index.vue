<template>
  <div class="input-card">
    <div class="chat" id="chat">
      <gptMain :infoList="infoList" @getrefreshSend="send"></gptMain>
    </div>

    <footerMain ref="footerref" :gptStatus="4" @childSend="send" :loading="loading" @childBreakSend="breakSend"
      :breakSpanStatus="breakSpanStatus"></footerMain>
  </div>
</template>
<script>
  import {
    mapGetters
  } from "vuex";
  import marked from "marked";
  import Vue from 'vue'
  import gptMain from "../components/gptMain.vue";
  import footerMain from "./components/footer.vue";
  import pako from 'pako';
  export default {
    name: "Index",

    computed: {
      ...mapGetters(['token', 'roles']),
    },
    components: {
      gptMain,
      footerMain
    },
    data: function () {
      return {
        infoList: [],
        own_avatar: '',
        visible: false,
        loading: false,
        uuid_str: '',
        sendCount: 0,
        breakSpanStatus: false,
        connectStatus: true,
        answerID: ''
      }
    },
    created() {},
    mounted() {
      this.getOwnAvar()

    },
    methods: {
      getOwnAvar() {
        //获取用户的头像 
        this.own_avatar = 'https://www.wandou.online/' + this.$store.getters.avatar;
        console.log(' this.$store.getters.avatar', this.own_avatar)

        this.own_avatar = (this.own_avatar == "" || this.own_avatar == null) ? require("@/assets/images/profile.png") :
          this.own_avatar;
      },
      copyF(item) {
        console.log('复制', item)
        let content = item.answerText
        const textarea = document.createElement('textarea') // 创建文本域对象
        textarea.value = content // 设置复制内容
        document.body.appendChild(textarea) // 添加临时实例
        textarea.select() // 选择实例内容
        document.execCommand('Copy') // 执行复制
        document.body.removeChild(textarea) // 删除临时实例
        this.$notify({
          message: '复制成功',
          type: 'success'
        });
      },


      uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        let uuid = s.join("");
        return uuid
      },
      breakSend() {
        this.connectStatus = false
      },
      send(refreshValue) {
        this.connectStatus = true
        // 判断是否有权限
        if (!(this.roles.includes('admin') || this.roles.includes('vip'))) {
          this.$message({
            type: 'warning',
            message: ` 因GPT-4成本高昂,需开通使用，详见菜单<GPT4开通流程>,3.5版本永久免费！`
          })
          return false
        }



        if (this.loading) {
          return
        }
        let searchValue
        if (refreshValue) {
          searchValue = refreshValue
        }

        this.loading = true
        let chat = document.getElementById("chat");
        let sse;
        this.sendCount++
        if (!this.uuid_str) {
          this.uuid_str = this.uuid();
        }
        this.answerID = this.uuid_str + this.sendCount
        // console.log('this.$store.getters.userid',( parseInt(this.$store.getters.userid) * 10 + 8 ) / 2)
        // const eventSource = new EventSourcePolyfill("http://localhost:8081/chat?message=" + encodeURIComponent(
          
        let compressed = pako.gzip(encodeURIComponent(searchValue), {
          to: 'string'
        });
        // const eventSource = new EventSourcePolyfill("https://www.wandou.online/gpt4chat?message=" +
        // compressed, {
        const eventSource = new EventSourcePolyfill("https://www.wandou.online/gpt4chat?message=" +
        encodeURIComponent(searchValue), {
            headers: {
              'uid': this.uuid_str,
              'tagid': (parseInt(this.$store.getters.userid) * 10 + 8) / 2
            }
          });

        eventSource.onopen = (event) => {
          sse = event.target;
          let data = {
            seachValue: searchValue,
            answerText: '...',
            mdAnswer: '...',
            btnStatus: false
          }
          this.infoList.push(data)
          this.$refs.footerref.clearText()
          chat.scrollTop = chat.scrollHeight;
        };

        let resText = ''
        eventSource.onmessage = (event) => {
          this.breakSpanStatus = true
          if (event.data == "[DONE]" || !this.connectStatus) {
            resText = '';
            if (sse) {
              sse.close();
            }
            this.loading = false
            this.breakSpanStatus = false
            this.infoList[this.infoList.length - 1].btnStatus = true

            return;
          }
          let json_data = JSON.parse(event.data)
          if (json_data.content == null || json_data.content == 'null') {
            json_data.content = '';
            return;
          }
          resText = resText + json_data.content;
          this.infoList[this.infoList.length - 1].answerText = resText
          marked.setOptions({
            headerIds: false,
            "async": false,
            "baseUrl": null,
            "breaks": false,
            "extensions": null,
            "gfm": true,
            "headerPrefix": "",
            "highlight": null,
            "hooks": null,
            "langPrefix": "language-",
            "mangle": false,
            "pedantic": false,
            "sanitize": false,
            "sanitizer": null,
            "silent": false,
            "smartypants": false,
            "tokenizer": null,
            "walkTokens": null,
            "xhtml": false
          });
          this.infoList[this.infoList.length - 1].mdAnswer = marked.parse(resText)

          if (this.infoList[this.infoList.length - 1].mdAnswer.includes('<input')) {
            this.infoList[this.infoList.length - 1].mdAnswer = this.infoList[this.infoList.length - 1].mdAnswer
              .replaceAll('<input', '&lt;input')
          }
          if (resText.length < 7 || resText.length % 100 == 0) {
            chat.scrollTop = chat.scrollHeight;
          }
        };
        eventSource.onerror = (event) => {
          alert("服务异常请重试并联系开发者！")
          this.loading = false
          if (event.readyState === EventSource.CLOSED) {
            console.log('connection is closed');
          } else {
            console.log("Error occured", event);
          }
          event.target.close();
        };
        eventSource.addEventListener("customEventName", (event) => {
          console.log("Message id is " + event.lastEventId);
        });
      },
      refreshSend(item) {
        console.log('item', item)
        // if (this.infoList.length < 1) {
        //   this.$message({
        //     type: 'warning',
        //     message: '请您先提问~~'
        //   })
        //   return false;
        // }
        // 数组有回答
        // 取出最后一个数字

        // let lastData = this.infoList.pop()
        // console.log('lastData', item) //seachValue
        this.send(item.seachValue)
      }
    }

  }

</script>

<style lang="scss">
  .gpt_4png {
    background: #444654 url("../../assets/images/gpt4.png") no-repeat;
  }

  @import "@/style/chart4.scss"

</style>
