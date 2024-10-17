<template>
    <Page :posts="posts" :pageCurrent="1" :pagesNum="1" />
    <div style="padding-top:20px;" class='post-info' v-if="!$frontmatter.page">
                {{ $frontmatter.date?.substring(0,10) }} &nbsp;&nbsp; 
                <span v-for="item in $frontmatter.tags">
                    <a :href="withBase(`/pages/tags.html?tag=${item}`)"> {{ item }}</a>
                </span>
    </div>
</template>
<script setup>
import Page from "./component/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts
</script>
