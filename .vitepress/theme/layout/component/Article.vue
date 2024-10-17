<template>
    <a
        v-for="(article, index) in articleList"
        :href="withBase(article.regularPath)"
        :key="index"
        class="article-container"
    >
        <div class="title-container">
            <div class="mr-1">{{ article.frontMatter.title }}</div>
        </div>
        <div class="date">{{ article.frontMatter.date }}</div>
    </a>
</template>

<script setup>
    import { withBase } from "vitepress";
    const props = defineProps({
        articleList: {
            type: Array,
            required: true
        }
    });
</script>

<style scoped>
.article-container {
    padding: 8px 15px; /* 增加内边距 */
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    border-bottom: 1px solid var(--vp-c-gray-soft); /* 使用柔和的灰色分隔线 */
    transition: background-color 0.3s; /* 背景色变化 */
}

.title-container {
    color: var(--vp-c-indigo-2); /* 使用靛蓝色 */
    font-size: 1rem; /* 增加字体大小 */
    font-weight: 500; /* 加粗字体 */
}

.title-container:hover {
    color: var(--vp-c-indigo-3); /* 悬停时变为更深的靛蓝色 */
}

.article-container .date {
    color: var(--vp-c-gray-3); /* 使用深灰色日期文本 */
    font-family: 'Arial', sans-serif; /* 修改字体 */
    font-size: 0.875rem; /* 调整字体大小 */
    transition: color 0.3s; /* 日期文本颜色变化 */
}

.article-container:hover .date {
    color: var(--vp-c-yellow-2); /* 悬停时日期变为黄色 */
}

/* mobile */
@media screen and (max-width: 768px) {
    .article-container {
        padding: 8px 10px; /* 调整移动设备上的内边距 */
    }

    .title-container {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%; /* 适应屏幕宽度 */
    }
}
</style>
