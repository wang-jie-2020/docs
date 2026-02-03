const path = require('path')
const rootPath = path.dirname(__dirname)

//导入生成侧边栏的工具类
const { sideBarTool } = require(path.join(__dirname, './utils/index.js'))

// 需要排除的一些目录
let unDirIncludes = ['node_modules', 'assets', 'public', 'images', 'media']
// 只需要处理后缀的文件类型
let SuffixIncludes = ['.md', '.html']

//使用方法生生成侧边栏
let sidebar_go = sideBarTool.genSideBarGroupRecursion(path.join(rootPath, 'go/'), path.join(rootPath, 'go/'), unDirIncludes, SuffixIncludes, {})
let sidebar_java = sideBarTool.genSideBarGroupRecursion(path.join(rootPath, 'java/'), path.join(rootPath, 'java/'), unDirIncludes, SuffixIncludes, {})
let sidebar_net = sideBarTool.genSideBarGroupRecursion(path.join(rootPath, 'net/'), path.join(rootPath, 'net/'), unDirIncludes, SuffixIncludes, {})
let sidebar_other = sideBarTool.genSideBarGroupRecursion(path.join(rootPath, 'other/'), path.join(rootPath, 'other/'), unDirIncludes, SuffixIncludes, {})
let sidebar_python = sideBarTool.genSideBarGroupRecursion(path.join(rootPath, 'python/'), path.join(rootPath, 'python/'), unDirIncludes, SuffixIncludes, {})
let sidebar_vue = sideBarTool.genSideBarGroupRecursion(path.join(rootPath, 'vue/'), path.join(rootPath, 'vue/'), unDirIncludes, SuffixIncludes, {})
let sidebar_theory = sideBarTool.genSideBarGroupRecursion(path.join(rootPath, '理论/'), path.join(rootPath, '理论/'), unDirIncludes, SuffixIncludes, {})

console.log(sidebar_theory)

module.exports = {
    title: '📖Documents',
    description: 'hello world',
    base: '/docs/',
    host: '127.0.0.1',
    port: '8080',
    head: [
        ['script', { src: '/live2d/L2Dwidget.min.js' }],
        ['script', {}, `
            const models = [
                '/live2d/live2d-widget-model-epsilon2_1/assets/Epsilon2.1.model.json',
                '/live2d/live2d-widget-model-haru/01/assets/haru01.model.json',
                '/live2d/live2d-widget-model-haru/02/assets/haru02.model.json',
                '/live2d/live2d-widget-model-haruto/assets/haruto.model.json',
                '/live2d/live2d-widget-model-koharu/assets/koharu.model.json',
                '/live2d/live2d-widget-model-hijiki/assets/hijiki.model.json',
                '/live2d/live2d-widget-model-tororo/assets/tororo.model.json',
                '/live2d/live2d-widget-model-izumi/assets/izumi.model.json',
                '/live2d/live2d-widget-model-miku/assets/miku.model.json',
                '/live2d/live2d-widget-model-shizuku/assets/shizuku.model.json',
                '/live2d/live2d-widget-model-wanko/assets/wanko.model.json',
                '/live2d/live2d-widget-model-z16/assets/z16.model.json'
            ];
            L2Dwidget.init({
                "model": {
                    jsonPath: models[parseInt(Math.random() * (models.length))]
                },
                "display": {
                    "position": "left",
                    "width": 150,
                    "height": 210,
                    "hOffset": 5,
                    "vOffset": 5,
                    "superSample": 1,
                },
                "mobile": {
                    "scale": 1,
                    "show": true,
                    "motion": true,
                },
                "react": {
                    "opacityDefault": .5,
                    "opacityOnHover": .2
                }
            });
        `]
    ],
    plugins: [
        'cursor-effects',
        '@vuepress/back-to-top',
        '@vuepress/nprogress',
        'vuepress-plugin-smooth-scroll',
        'reading-progress',
        [
            '@vuepress/search', {
                searchMaxSuggestions: 10
            }
        ],
        '@vuepress/active-header-links', {
            sidebarLinkSelector: '.sidebar-link',
            headerAnchorSelector: '.header-anchor'
        },
        '@vuepress/medium-zoom', {
            selector: 'img.zoom-custom-imgs',
            options: {
                margin: 16
            }
        },
        //[
        // 评论
        // '@vssue/vuepress-plugin-vssue', {
        //     platform: 'github',
        //     owner: 'Meowv',
        //     repo: 'docs',
        //     clientId: 'dfcb3e4078504d07ccbf',
        //     clientSecret: 'f182d64e6d5063e0b137c0d039d4a99a5cebda00',
        // }
        //],
        [
            "vuepress-plugin-code-copy", {
                align: "top",
                color: "#5a9600",
                backgroundColor: "#5a9600",
                successText: "复制成功"
            }
        ],
        [
            '@vuepress/last-updated', {
                transformer: (timestamp, lang) => {
                    const moment = require('moment');
                    moment.locale(lang);
                    return moment(timestamp).fromNow();
                }
            }
        ]
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        //repo: 'meowv/docs',
        //repoLabel: 'GitHub',
        //docsRepo: 'meowv/docs',
        docsDir: '/',
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        sidebarDepth: 2,
        smoothScroll: true,
        nav: [
            {
                text: '编程语言',
                items: [
                    {
                        text: 'net',
                        link: '/net/'
                    },
                    {
                        text: 'java',
                        link: '/java/'
                    },
                    {
                        text: 'python',
                        link: '/python/'
                    },
                    {
                        text: 'go',
                        link: '/go/'
                    },
                    {
                        text: 'vue',
                        link: '/vue/'
                    },
                    {
                        text: 'other',
                        link: '/other/'
                    },
                    {
                        text: 'note',
                        link: '/note/'
                    },

                ]
            },
            {
                text: '数据库',
                link: '/db/'
            },
            {
                text: '理论',
                link: '/理论/'
            },
            {
                text: 'github',
                items: [
                    {
                        text: 'github.com',
                        link: 'https://github.com/wang-jie-2020/docs'
                    }
                ]
            }
        ],
        sidebar: {
            '/net/': sidebar_net,
            '/java/': sidebar_java,
            '/python/': sidebar_python,
            '/go/': sidebar_go,
            '/vue/': sidebar_vue,
            '/other/': sidebar_other,
            '/note/': [
                {
                    title: 'note',
                    children: [
                        ['2022-11-07','2022-11-07'],
                        ['2023-05-11','2023-05-11']
                    ]
                }
            ],
            '/db/': sidebar_db,
            '/理论/': sidebar_theory,
        }
    }
}
