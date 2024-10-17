<template>
    <div v-for="yearList in data">
        <div class="year">
            {{yearList[0]}}
        </div>
        <Article :articleList="yearList[1]"/>
    </div>
</template>

<script setup>
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'
import { useYearSort } from '../js/functions.ts'
import Article from './component/Article.vue';

const { theme } = useData()
const data = computed(() => useYearSort(theme.value.posts))
</script>

<style scoped>
.year {
    padding: 14px 0 8px 0;
    font-size: 1.25rem;
    font-weight: 500;
    font-family: var(--date-font-family),serif;
}
</style>
