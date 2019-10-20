<template>
  <a-popconfirm
    title="Are you sure to logout?"
    @confirm="confirm"
    @cancel="cancel"
    okText="No"
    cancelText="Logout"
    placement="bottom"
  >
    <a-button id="logoutbtn">
      <a-icon type="robot" />log out
    </a-button>
  </a-popconfirm>
</template>
<script>
export default {
  name: "PopconfirmLogout",
  methods: {
    confirm(e) {
      this.$message.error("Yeayy!");
    },
    cancel(e) {
        setTimeout(() => {
            this.$store.dispatch("logout");
            this.$message.success("Logout");
        }, 1000);
    }
  }
};
</script>