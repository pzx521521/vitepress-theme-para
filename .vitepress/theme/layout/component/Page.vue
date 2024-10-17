<template>
    <div v-for="(article, index) in posts" :key="index" class="post-list">
        <div class="post-header">
            <div class="post-title">
                <a :href="withBase(article.regularPath)"> {{ article.frontMatter.title }}</a>
            </div>
        </div>
        <p class="describe" v-html="article.frontMatter.description"></p>
        <div class='post-info'>
            {{ article.frontMatter.date }} <span v-for="item in article.frontMatter.tags"><a :href="withBase(`/pages/tags.html?tag=${item}`)"> {{ item }}</a></span>
        </div>
    </div>

    <div class="pagination">
        <a
            class="link"
            :class="{ active: pageCurrent === i }"
            v-for="i in pagesNum"
            :key="i"
            :href="withBase(i === 1 ? '/index.html' : `/page_${i}.html`)"
        >{{ i }}</a>
    </div>
</template>

<script lang="ts" setup>

import { withBase } from 'vitepress'
import { PropType } from 'vue'
import { Article } from "../../js/postdata"
defineProps({
    posts: {
        type: Array as PropType<Article[]>,
        required: true
    },
    pageCurrent: {
        type: Number as PropType<number>,
        required: true
    },
    pagesNum: {
        type: Number as PropType<number>,
        required: true
    }
})
</script>

<style scoped>
.post-info {
    font-size: 12px;
    color: var(--vp-c-gray-2); /* 使用较暗的灰色文本 */
}

.post-info span {
    display: inline-block;
    padding: 0 8px;
    background-color: var(--vp-c-gray-soft); /* 使用灰色柔和背景 */
    margin-right: 10px;
    transition: background-color 0.3s, transform 0.2s;
    border-radius: 20px;
    color: var(--vp-c-gray-1); /* 使用较浅的灰色文本 */
}

.post-info span:hover {
    background-color: var(--vp-c-indigo-soft); /* 悬停时使用柔和的靛蓝色 */
    transform: scale(1.05);
}

.post-list {
    border-bottom: 1px solid var(--vp-c-gray-soft); /* 使用柔和的灰色分隔线 */
    padding: 20px 0;
    transition: background-color 0.3s;
}

.post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
}

.post-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--vp-c-purple-2); /* 使用紫色 */
    transition: color 0.3s;
}

.post-title a {
    text-decoration: none;
}

.post-title a:hover {
    color: var(--vp-c-red-2); /* 悬停时使用红色 */
}

.describe {
    font-size: 1rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: var(--vp-c-gray-1); /* 使用较深的灰色 */
    margin: 10px 0;
    line-height: 1.6rem;
}

.pagination {
    margin-top: 24px;
    display: flex;
    justify-content: center;
}

.link {
    display: inline-block;
    width: 32px;
    height: 32px;
    text-align: center;
    border: 1px solid var(--vp-c-gray-soft); /* 使用灰色柔和边框 */
    border-radius: 4px;
    font-weight: 500;
    color: var(--vp-c-green-2); /* 使用绿色文本 */
    margin: 0 4px;
    transition: background-color 0.3s, color 0.3s;
}

.link:hover {
    background-color: var(--vp-c-yellow-1); /* 悬停时使用黄色 */
    color: var(--vp-c-neutral-inverse); /* 悬停时反转文本颜色 */
}

.link.active {
    background: var(--vp-c-green-2); /* 当前页链接背景色 */
    color: var(--vp-c-neutral-inverse); /* 当前页链接字体颜色 */
    border: 1px solid var(--vp-c-green-3); /* 当前页链接边框 */
}

@media screen and (max-width: 768px) {
    .post-title {
        font-size: 1.25rem; /* 调整标题字体大小 */
    }

    .describe {
        font-size: 0.875rem; /* 调整描述字体大小 */
    }
}
</style>

