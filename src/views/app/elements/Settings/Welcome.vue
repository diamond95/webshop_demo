
<script>
export default {
  created() {
    this.openNotification('top-center', "#030303");
  },
  methods: {
    openNotification(position = null, color) {
      this.$vs.notification({
        color,
        position,
        title: "Hi",
        text: "Welcome back!"
      });
    }
  }
};
</script>