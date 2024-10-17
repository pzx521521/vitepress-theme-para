---
page: true
title: home
aside: false
---
Hello Index!
<button @click="click" >test</button>
<script setup>
function click(){
    getPosts(10)
}
import { getPosts } from './.vitepress/theme/js/postdata'
</script>

