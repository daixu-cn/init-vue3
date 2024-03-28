<template>
  <div id="Home">
    <HelloWorld />
  </div>
</template>

<script lang="ts" setup name="Home">
import HelloWorld from "@/components/HelloWorld.vue"
</script>

<style lang="scss">
#Home {
  width: 100vw;
  height: 100vh;

  @include flex-center;
}
</style>
