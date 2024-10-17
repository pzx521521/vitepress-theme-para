<template>
  <Layout>
      <Content /> <!-- 这个组件渲染当前页面的内容 -->
  </Layout>
  <Copyright class="footer" />
</template>
<script setup>
    import DefaultTheme from 'vitepress/theme'
    import Copyright from './layout/component/Copyright.vue'
    const { Layout } = DefaultTheme;
</script>
<style scoped>
.footer {
  position: relative;
  bottom: 0;
  text-align: center;
}
</style>