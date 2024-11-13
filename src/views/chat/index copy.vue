<template>
  <div>
    <input v-model="message" placeholder="Enter your message" />
    <button @click="sendMessage">Send</button>
    <div v-if="response">
      <h3>Response:</h3>
      <p>{{ response }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      message: "",
      response: null,
      token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJzdWIiOiIyIiwiZXhwIjoxNzMyMDI3NTMxfQ.TPxFM9NkghPZiGoYMvQ8XQwAxVRGjH5sveNwmEEdU2E`, // 替换为实际的用户 toke};

      sseSource: null,
    };
  },
  methods: {
    establishConnection() {
      const url = `/chat-api/createSse?token=${encodeURIComponent(this.token)}`;

      this.sseSource = new EventSource(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      this.sseSource.onmessage = (event) => {
        if (event.data === "[DONE]") {
          this.sseSource.close();
        } else {
          console.log("SSE Message:", event.data);
          // Handle incoming SSE data
        }
      };

      this.sseSource.onerror = (error) => {
        console.error("SSE Error:", error);
        this.sseSource.close();
      };
    },
    sendMessage() {
      const url = `/chat-api/chat?token=${encodeURIComponent(this.token)}`;

      axios
        .post(
          url,
          { msg: this.message },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          this.response = response.data;
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    },
  },
  mounted() {
    this.establishConnection();
  },
  beforeDestroy() {
    if (this.sseSource) {
      this.sseSource.close();
    }
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
