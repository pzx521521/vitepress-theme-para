import fs from 'fs/promises'; // 使用异步文件系统
import path from 'path';

interface FrontMatter{
    title: string;
    description: string;
    category: string;
    date: string;
    size: number;
    modify: string;
    tags: string[];
}

export interface Article {
    regularPath: string;
    frontMatter: FrontMatter;
}

interface StringContainer {
    value: string;
}
// 获取所有 Markdown 文件路径
export async function getPosts(): Promise<Article[]> {
    const dir = "./posts"
    const postsDirectory = path.resolve(dir);
    const paths = await getMarkdownFiles(postsDirectory); // 异步获取文件路径

    const posts = await Promise.all(
        paths.map(async (item) => {
            try {
                //使用引用来避免多次字符串复制
                const content:StringContainer = {
                    value: await fs.readFile(item, 'utf-8')
                };
                const data = parseFrontMatter(content);
                await modifyFrontMatter(data, content, item, postsDirectory)
                var regularPath = path.relative(postsDirectory, item).replace('.md', '.html')
                regularPath = path.join("/posts", regularPath) 
                return {
                    frontMatter: data,
                    regularPath: regularPath,
                };
            } catch (error) {
                console.error(`Error reading file ${item}:`, error);
                return null; // 返回 null 以便过滤
            }
        })
    );

    // 过滤掉 null 值（读取错误的文件）
    const filteredPosts = posts.filter((post): post is Article => post !== null);

    // 按日期排序
    filteredPosts.sort(_compareDate);
    if(process.env.NODE_ENV === 'dev') console.log(filteredPosts);
    return filteredPosts; // 返回已排序的文章
}



async function modifyFrontMatter(data: { [key: string]: any }, content:StringContainer,filepath: string, dir: string) {
    const stats = await fs.stat(filepath);
    // 如果不存在 date，则添加文件的创建时间为 date
    if (!data.date) {
        data.date = stats.birthtime.toJSON().split('T')[0];
    } else {
        data.date = new Date(data.date).toJSON().split('T')[0];
    }

    // 如果不存在 modify，则添加文件的修改时间为 modify
    if (!data.modify) {
        data.modify = stats.mtime.toJSON().split('T')[0];
    }
    //添加文件大小信息
    data.size = stats.size;
    // 如果不存在 tags，则初始化为一个空数组
    if (!data.tags) {
        data.tags = [];
    }
    // 如果 tags 数组为空，提取文件夹路径中的标签
    if (data.tags.length === 0 || data.category) {
        // 从文件夹路径中提取标签
        const relativePath = path.relative(dir, filepath); // 获取相对于 dir 的相对路径
        const tagPaths = path.dirname(relativePath).split(path.sep); // 获取路径中的所有文件夹
        if(data.tags.length === 0){
            data.tags = tagPaths.filter(tag => tag); // 过滤掉空字符串作为标签
        } 
        if(!data.category && tagPaths.length > 0){
            data.category = tagPaths[0]
        }
    }
    if (!data.title) {
        data.title = path.basename(filepath.replace('.md', ''));
    }
    
    if (!data.description && content.value){
        const frontMatterRegex = /#.*\n([\s\S]*?)\n#+/;        
        const match = content.value.match(frontMatterRegex);
        if(match) { 
            data.description = match[1].trim();            
        }
    }
}

// 获取指定目录下所有 Markdown 文件路径
async function getMarkdownFiles(dir: string): Promise<string[]> {
    let results: string[] = [];
    const list = await fs.readdir(dir); // 异步读取目录内容
    for (const file of list) {
        const filePath = path.resolve(dir, file);
        const stat = await fs.stat(filePath); // 异步获取文件状态
        if (stat.isDirectory()) {
            const nestedFiles = await getMarkdownFiles(filePath); // 递归获取子目录文件
            results.push(...nestedFiles);
        } else if (file.endsWith('.md')) {
            results.push(filePath);
        }
    }
    return results;
}

// 解析FrontMatter
function parseFrontMatter(content: StringContainer): { [key: string]: any } {
    const frontMatterRegex = /^---\n([\s\S]+?)\n---/;
    const match = content.value.match(frontMatterRegex);
    const data: { [key: string]: any } = {};
    if(!match) {return data}
    const frontMatterContent = match[1];
    const lines = frontMatterContent.split('\n').filter(line => line.trim()); // 去掉空行

    let currentKey: string | null = null;
    let currentArray: string[] | null = null;

    lines.forEach((line) => {
        if (line.startsWith('-')) {
            // 当前行是数组元素
            const value = line.slice(1).trim();
            if (currentArray && currentKey) {
                currentArray.push(value);
            }
        } else {
            // 处理键值对
            const separatorIndex = line.indexOf(':');
            if (separatorIndex !== -1) {
                const key = line.slice(0, separatorIndex).trim();
                const value = line.slice(separatorIndex + 1).trim();

                // 检查下一个键值对时，如果有当前的数组，存入对象
                if (currentArray && currentKey) {
                    data[currentKey] = currentArray;
                    currentArray = null;
                }

                if (value.startsWith('[') && value.endsWith(']')) {
                    // 行内数组
                    const arrayValues = value.slice(1, -1).split(',').map(item => item.trim());
                    data[key] = arrayValues;
                } else if (value === '') {
                    // 如果值为空，下一行可能是数组的开始
                    currentKey = key;
                    currentArray = [];
                } else {
                    data[key] = value;
                }
            }
        }
    });

    // 如果最后一个键是数组，添加到结果
    if (currentArray && currentKey) {
        data[currentKey] = currentArray;
    }
    return data;
}

// 比较日期
function _compareDate(obj1: Article, obj2: Article) {
    return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1; // 降序排列
}
