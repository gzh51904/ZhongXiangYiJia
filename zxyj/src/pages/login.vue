<template>
  <div>亲，请登录！</div>
</template>
<script>
import rem from "../rem/rem.js";
export default {
  data() {
    return {};
  },
  created() {
 
        console.log(this.$router.history.current.path );
        
  }
};
</script>