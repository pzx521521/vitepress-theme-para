<template>
    <Page :posts="posts" :pageCurrent="1" :pagesNum="1" />
</template>
<script setup>
import Page from "./component/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(0,theme.value.pageSize)
</script>
