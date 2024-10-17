import {Article} from "./postdata"

export function initTags(post: Article[]) {
    const data: any = {}
    for (let index = 0; index < post.length; index++) {
        const element = post[index]
        const tags = element.frontMatter.tags
        if (tags) {
            tags.forEach((item) => {
                if (data[item]) {
                    data[item].push(element)
                } else {
                    data[item] = []
                    data[item].push(element)
                }
            })
        }
    }
    return data
}

export function initCategory(posts: Article[]) {
    const data: { [key: string]: Article[] } = {}; // 使用更明确的类型声明
    for (let index = 0; index < posts.length; index++) {
        const element = posts[index];
        const category = element.frontMatter.category; // 获取分类

        if (category) {
            // 如果该分类在 data 中不存在，则初始化为空数组
            if (!data[category]) {
                data[category] = [];
            }
            // 将文章添加到对应的分类中
            data[category].push(element);
        }
    }
    return data;
}


interface Article {
    frontMatter: {
      date: string;
    };
    // 其他字段...
  }
  
export function useYearSort(post: Article[]) {
  const yearMap = new Map<string, Article[]>()

  post.forEach(article => {
    const date = article.frontMatter.date;
    if (date) {
      const year = date.split('-')[0];
      if (!yearMap.has(year)) {
        yearMap.set(year, []);
      }
      yearMap.get(year)?.push(article);
    }
  });
  const ret = Array.from(yearMap.entries()).sort(([a], [b]) => parseInt(b) - parseInt(a));
  // 转换 Map 为数组或对象格式返回，按年份排序
  return ret
}
  
