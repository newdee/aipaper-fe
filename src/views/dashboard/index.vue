<template>
  <div class="page-container">
    <header class="header">
      <h1 class="success-message">支付成功</h1>
    </header>
    <main class="content">
      <section class="message">
        <p>您好，您已成功支付。</p>
        <p>请关闭当前页面，回到官网点击下一步，生成论文正文。</p>
      </section>
      <section class="actions">
        <a href="#" @click.prevent="closePage" class="btn-close">关闭页面</a>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "PaymentSuccess",
  created() {
    // 添加 beforeunload 事件监听器
    window.addEventListener("beforeunload", this.handleBeforeUnload);
    let _this = this;
    setTimeout(() => {
      _this.closePage();
    }, 5000);
  },
  beforeDestroy() {
    // 移除 beforeunload 事件监听器
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  },
  methods: {
    handleBeforeUnload(event) {
      // 设置默认的提示信息
      // const message = "您确定要离开吗？";
      // // 兼容不同浏览器
      // event.returnValue = message; // 标准浏览器
      // return message; // 其他浏览器
    },
    closePage() {
      // 尝试关闭当前窗口
      if (window.opener) {
        window.opener = null;
        window.close();
      } else {
        // 如果无法关闭窗口，提示用户手动关闭
        alert("请手动关闭当前标签页或窗口。");
      }
    },
  },
};
</script>

<style scoped>
.page-container {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.header {
  margin-bottom: 20px;
}

.success-message {
  background-color: #4caf50; /* 绿色背景 */
  color: #ffffff; /* 白色文字 */
  padding: 20px;
  border-radius: 8px;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.message {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  text-align: left;
}

.message p {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #333;
}

.actions {
  display: flex;
  justify-content: center;
}

.btn-close {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
  text-decoration: none;
}

.btn-close:hover {
  background-color: #0056b3;
}
</style>
