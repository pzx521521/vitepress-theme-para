import { defineConfig } from 'vitepress'
import { getPosts } from './theme/js/postdata'
//每页的文章数量
const pageSize = 10
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Para's",
  ignoreDeadLinks: true,
  description: "A VitePress Site",
  themeConfig: {
    pageSize: pageSize,
    posts: await getPosts(pageSize),
    logo: "/v-logo.png",
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Pages', link: '/pages/' },
      { text: 'Category', link: '/pages/category' },
      { text: 'Archives', link: '/pages/archives' },
      { text: 'Tags', link: '/pages/tags' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
