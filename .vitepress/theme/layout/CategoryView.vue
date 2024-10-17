<template>
    <div v-for="(posts, key) in data">
        <div class="category">
            {{ key }}
        </div>
        <Article :articleList="posts"/>
    </div>
</template>
<script setup>
import { useData} from 'vitepress'
import { computed } from 'vue'
import { initCategory } from '../js/functions'
import Article from './component/Article.vue';

const { theme } = useData()
const data = computed(() => initCategory(theme.value.posts))
</script>

<style scoped>
.category {
    padding: 14px 0 8px 0;
    font-size: 1.25rem;
    font-weight: 500;
    font-family: var(--date-font-family),serif;
}

</style>
