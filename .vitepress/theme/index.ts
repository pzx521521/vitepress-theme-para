// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import type { Theme } from 'vitepress'
import Archives from './layout/ArchivesView.vue'
import Category from './layout/CategoryView.vue'
import Tags from './layout/TagsView.vue'
import Pages from './layout/PagesView.vue'
import './css/style.css'

export default {
  Layout: Layout,
  enhanceApp({ app, router, siteData }) {
    // register global compoment
    app.component('Tags', Tags)
    app.component('Category', Category)
    app.component('Archives', Archives)
    app.component('Pages', Pages)

  }
} satisfies Theme

