<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  page() {
    return {
      title: 'Flishuset',
    }
  },
}
</script>

<style>
   @import url('https://rsms.me/inter/inter.css');
   html { font-family: 'Inter', sans-serif; }
</style>