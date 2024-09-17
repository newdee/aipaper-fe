<template>
  <div class="input-box">
    <div
      class="input-content"
      @keydown="keydown"
      @keyup="keyup"
      @paste="paste"
      @mousewheel="mousewheel"
      @input="inputEvent"
    >
      <input
        max="9"
        min="0"
        maxlength="1"
        data-index="0"
        v-model.trim.number="input[0]"
        type="number"
        ref="firstinput"
      />
      <input
        max="9"
        min="0"
        maxlength="1"
        data-index="1"
        v-model.trim.number="input[1]"
        type="number"
      />
      <input
        max="9"
        min="0"
        maxlength="1"
        data-index="2"
        v-model.trim.number="input[2]"
        type="number"
      />
      <input
        max="9"
        min="0"
        maxlength="1"
        data-index="3"
        v-model.trim.number="input[3]"
        type="number"
      />
      <input
        max="9"
        min="0"
        maxlength="1"
        data-index="4"
        v-model.trim.number="input[4]"
        type="number"
      />
      <input
        max="9"
        min="0"
        maxlength="1"
        data-index="5"
        v-model.trim.number="input[5]"
        type="number"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 存放粘贴进来的数字
      pasteResult: [],
    };
  },
  props: ["code", "phone"],
  computed: {
    input() {
      // code 是父组件传进来的默认值，必须是6位长度的数组，这里就不再做容错判断处理
      // 最后空数组是默认值
      console.log("ddd", this.pasteResult);
      return this.code || this.pasteResult.length === 6
        ? this.pasteResult
        : ["", "", "", "", "", ""];
    },
  },
  // watch: {
  //   input: {
  //     handler(newVal, oldVal) {
  //       alert("asd");
  //       console.log("Person object has changed:", newVal, oldVal);
  //     },
  //     deep: true, // 启用深度监听
  //   },
  // },
  methods: {
    // 解决一个输入框输入多个字符
    inputEvent(e) {
      var index = e.target.dataset.index * 1;
      var el = e.target;
      this.$set(this.input, index, el.value.slice(0, 1));
      console.log("this.", this.input);
      let inputStatus = this.checkArray(this.input);
      console.log("this", inputStatus);
      if (inputStatus) {
        this.sendCode();
      }
    },
    sendCode() {
      // this.input
      this.$emit("codeChange", "loading");
      let _this = this;
      let data = {
        phone: this.phone,
        sms_code: this.input.join(""),
      };
      this.$store
        .dispatch("user/login", data)
        .then(() => {
          this.$message({
            type: "success",
            message: "登录成功！",
          });
          _this.$emit("codeChange", "success");
          // try {
          // // get user info
          //   console.log('11', )

          //   next()
          // } catch (error) {
          //   // remove token and go to login page to re-login
          //    store.dispatch('user/resetToken')
          //   Message.error( 'Has Error')
          //   next(`/login?redirect=${to.path}`)
          //   NProgress.done()
          // }
        })
        .catch(() => {
          _this.$emit("codeChange", "error");
        });
      // login(data)
      //   .then((res) => {
      //     console.log("res", res);

      //   })
      //   .catch((error) => {
      //   });
    },
    checkArray(arr) {
      // 检查数组中是否有空字符串
      let hasEmptyString = arr.some((element) => element === "");

      // 如果存在空字符串，则数组未填满
      if (hasEmptyString) return false;

      // 检查数组中的所有值是否大于等于0
      let allValuesAreValid = arr.every((element) => element >= 0);

      // 返回检查结果
      return allValuesAreValid;
    },
    keydown(e) {
      var index = e.target.dataset.index * 1;
      var el = e.target;
      if (e.key === "Backspace") {
        if (this.input[index].length > 0) {
          this.$set(this.input, index, "");
        } else {
          if (el.previousElementSibling) {
            el.previousElementSibling.focus();
            this.$set(this.input, index - 1, "");
          }
        }
      } else if (e.key === "Delete") {
        if (this.input[index].length > 0) {
          this.$set(this.input, index, "");
        } else {
          if (el.nextElementSibling) {
            this.$set(this.input, (index = 1), "");
          }
        }
        if (el.nextElementSibling) {
          el.nextElementSibling.focus();
        }
      } else if (e.key === "Home") {
        el.parentElement.children[0] && el.parentElement.children[0].focus();
      } else if (e.key === "End") {
        el.parentElement.children[this.input.length - 1] &&
          el.parentElement.children[this.input.length - 1].focus();
      } else if (e.key === "ArrowLeft") {
        if (el.previousElementSibling) {
          el.previousElementSibling.focus();
        }
      } else if (e.key === "ArrowRight") {
        if (el.nextElementSibling) {
          el.nextElementSibling.focus();
        }
      } else if (e.key === "ArrowUp") {
        if (this.input[index] * 1 < 9) {
          this.$set(this.input, index, (this.input[index] * 1 + 1).toString());
        }
      } else if (e.key === "ArrowDown") {
        if (this.input[index] * 1 > 0) {
          this.$set(this.input, index, (this.input[index] * 1 - 1).toString());
        }
      }
    },
    keyup(e) {
      var index = e.target.dataset.index * 1;
      var el = e.target;
      if (/Digit|Numpad/i.test(e.code)) {
        this.$set(this.input, index, e.code.replace(/Digit|Numpad/i, ""));
        el.nextElementSibling && el.nextElementSibling.focus();
        if (index === 5) {
          if (this.input.join("").length === 6) {
            document.activeElement.blur();
            this.$emit("complete", this.input);
          }
        }
      } else {
        if (this.input[index] === "") {
          this.$set(this.input, index, "");
        }
      }
    },
    mousewheel(e) {
      var index = e.target.dataset.index;
      if (e.wheelDelta > 0) {
        if (this.input[index] * 1 < 9) {
          this.$set(this.input, index, (this.input[index] * 1 + 1).toString());
        }
      } else if (e.wheelDelta < 0) {
        if (this.input[index] * 1 > 0) {
          this.$set(this.input, index, (this.input[index] * 1 - 1).toString());
        }
      } else if (e.key === "Enter") {
        if (this.input.join("").length === 6) {
          document.activeElement.blur();
          this.$emit("complete", this.input);
        }
      }
    },
    paste(e) {
      // 当进行粘贴时
      e.clipboardData.items[0].getAsString((str) => {
        if (str.toString().length === 6) {
          this.pasteResult = str.split("");
          document.activeElement.blur();
          this.$emit("complete", this.input);
        }
      });
    },
  },
  mounted() {
    // 等待dom渲染完成，在执行focus,否则无法获取到焦点
    this.$nextTick(() => {
      this.$refs.firstinput.focus();
    });
  },
};
</script>
<style lang="scss" scoped>
.input-box {
  .input-content {
    width: 400px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
      width: 50px;
      height: 60px;
      border-radius: 6px;
      background: #f9fafb;
      box-sizing: border-box;
      border: 2px solid #2878ff;
      font-size: 32px;
      font-weight: 400;
      color: #3d3d3d;
      text-align: center;
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
}
</style>
