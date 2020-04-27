<template>
  <div>
    <h2>A secret message appears below...</h2>
    <br />
    <h3>{{ message }}</h3>
  </div>
</template>

<script>
import fetch from "node-fetch";
export default {
  data() {
    return { message: "" };
  },
  async mounted() {
    this.message = await this.makeRequest();
  },
  methods: {
    async makeRequest() {
      let response = await fetch(`http://localhost:3001/message`);
      let json = await response.json();
      return json.data;
    },
  },
};
</script>
