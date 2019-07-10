<template>
  <div>亲，请登录！</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
 
        console.log(this.$router.history.current.path );
        
  }
};
</script>