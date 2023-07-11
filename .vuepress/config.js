const path = require('path')
const rootPath = path.dirname(__dirname)

//导入生成侧边栏的工具类
const { sideBarTool } = require(path.join(__dirname, './utils/index.js'))

// 需要排除的一些目录
let unDirIncludes = ['node_modules', 'assets', 'public', 'images', 'media']
// 只需要处理后缀的文件类型
let SuffixIncludes = ['md', 'html']

//使用方法生生成侧边栏

let sidebar = sideBarTool.genSideBarGroupRecursion(path.join(rootPath, 'docs/'), path.join(rootPath, 'docs/'), unDirIncludes, SuffixIncludes, {})
let sidebar2 = sideBarTool.genSideBarGroupRecursion(path.join(rootPath, 'docs-java/'), path.join(rootPath, 'docs-java/'), unDirIncludes, SuffixIncludes, {})

module.exports = {
    title: '📖Documents',
    description: 'hello world',
    base: '/',
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
                text: '技术栈',
                link: '/docs/'
            },
            {
                text: 'Forks',
                items: [
                    {
                        text: 'funtl',
                        link: '/docs-funtl/index.html'
                    },
                    {
                        text: 'meowv',
                        link: '/docs-meowv/'
                    },
                    {
                        text: 'install-kubernetes-cluster',
                        link: '/follow-me-install-kubernetes-cluster/'
                    },
                    {
                        text: 'Designing and Deploying Microservices',
                        link: '/Designing and Deploying Microservices/'
                    },
                    {
                        text: 'docs-java',
                        link: '/docs-java/'
                    }
                ]
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
            '/docs/': sidebar,
            '/docs-java/': sidebar2,
            '/docs-meowv/': [
                {
                    title: '.NET Core',
                    children: [
                        'dotnetcore/abp-template',
                        'dotnetcore/autoapi',
                        'dotnetcore/import-and-export-excel',
                        'dotnetcore/captcha',
                        'dotnetcore/mailkit',
                        'dotnetcore/qrcode',
                        'dotnetcore/swagger',
                        'dotnetcore/json-web-token',
                        'dotnetcore/spider',
                        'dotnetcore/apollo-in-dotnet',
                        'dotnetcore/grpc-in-dotnet',
                        'dotnetcore/elasticsearch-in-dotnet',
                        'dotnetcore/rabbitmq-in-dotnet',
                        'dotnetcore/kafka-in-dotnet',
                        'dotnetcore/log4net-in-dotnet',
                        'dotnetcore/nlog-in-dotnet',
                        'dotnetcore/serilog-in-dotnet',
                        'dotnetcore/exceptionless-in-dotnet',
                        'dotnetcore/consul',
                        'dotnetcore/api-gateway',
                        'dotnetcore/mta-package',
                        'dotnetcore/operate-git-auto-publish-to-github',
                        'dotnetcore/epplus-wps-error',
                        'dotnetcore/publish-to-centos'
                    ]
                },
                {
                    title: 'Blazor',
                    children: [
                        'blazor/gomoku-games-based-on-blazor'
                    ]
                },
                {
                    'title': 'Python',
                    children: [
                        {
                            title: '网络请求',
                            children: [
                                'python/network-request/http',
                                'python/network-request/urllib',
                                'python/network-request/requests'
                            ]
                        },
                        {
                            title: '数据提取',
                            children: [
                                'python/data-extraction/xpath',
                                'python/data-extraction/lxml',
                                'python/data-extraction/beautifulsoup',
                                'python/data-extraction/regex',
                                'python/data-extraction/python-re'
                            ]
                        },
                        {
                            title: '数据存储',
                            children: [
                                'python/data-storage/json',
                                'python/data-storage/csv',
                                'python/data-storage/pymysql',
                                'python/data-storage/mongodb'
                            ]
                        },
                        {
                            title: '爬虫进阶',
                            children: [
                                'python/spider/multithreading',
                                'python/spider/selenium',
                                'python/spider/tesseract',
                                'python/spider/scrapy',
                                'python/spider/scrapy-redis'
                            ]
                        }
                    ]
                },
                {
                    title: 'Docker',
                    children: [
                        {
                            title: '安装 Docker',
                            children: [
                                'docker/install/ubuntu',
                                'docker/install/debian',
                                'docker/install/fedora',
                                'docker/install/centos',
                                'docker/install/raspberry-pi',
                                'docker/install/offline',
                                'docker/install/mac',
                                'docker/install/windows',
                                'docker/install/mirror',
                                'docker/install/experimental'
                            ]
                        },
                        {
                            title: 'Docker 简介',
                            children: [
                                'docker/introduction/what',
                                'docker/introduction/why'
                            ]
                        },
                        {
                            title: 'Docker 基本概念',
                            children: [
                                'docker/basic_concept/image',
                                'docker/basic_concept/container',
                                'docker/basic_concept/repository',
                            ]
                        },
                        {
                            title: 'Docker 仓库',
                            children: [
                                'docker/repository/',
                                'docker/repository/dockerhub',
                                'docker/repository/registry',
                                'docker/repository/registry_auth',
                                'docker/repository/nexus3_registry',
                            ]
                        },
                        {
                            title: '使用 Docker 镜像',
                            children: [
                                'docker/image/pull',
                                'docker/image/list',
                                'docker/image/rm',
                                'docker/image/commit',
                                'docker/image/build',
                                'docker/image/other',
                                'docker/image/internal'
                            ]
                        },
                        {
                            title: 'Dockerfile',
                            children: [
                                'docker/dockerfile/copy',
                                'docker/dockerfile/add',
                                'docker/dockerfile/cmd',
                                'docker/dockerfile/entrypoint',
                                'docker/dockerfile/env',
                                'docker/dockerfile/arg',
                                'docker/dockerfile/volume',
                                'docker/dockerfile/expose',
                                'docker/dockerfile/workdir',
                                'docker/dockerfile/user',
                                'docker/dockerfile/healthcheck',
                                'docker/dockerfile/onbuild',
                                'docker/dockerfile/references',
                                'docker/dockerfile/multistage-builds',
                                'docker/dockerfile/manifest'
                            ]
                        },
                        {
                            title: '操作 Docker 容器',
                            children: [
                                'docker/container/run',
                                'docker/container/daemon',
                                'docker/container/stop',
                                'docker/container/attach_exec',
                                'docker/container/import_export',
                                'docker/container/rm'
                            ]
                        },
                        {
                            title: 'Docker 数据管理',
                            children: [
                                'docker/data_management/volume',
                                'docker/data_management/bind-mounts'
                            ]
                        },
                        {
                            title: 'Docker 网络配置',
                            children: [
                                'docker/network/port_mapping',
                                'docker/network/linking',
                                'docker/network/dns'
                            ]
                        },
                        {
                            title: 'Swarm mode',
                            children: [
                                'docker/swarm_mode/overview',
                                'docker/swarm_mode/create',
                                'docker/swarm_mode/deploy',
                                'docker/swarm_mode/stack',
                                'docker/swarm_mode/secret',
                                'docker/swarm_mode/config',
                                'docker/swarm_mode/rolling_update'
                            ]
                        },
                        'docker/linuxkit/',
                        'docker/podman/',
                        'docker/faq/',
                        {
                            title: 'Docker 常用镜像',
                            children: [
                                'docker/repo/consul',
                                'docker/repo/elasticsearch',
                                'docker/repo/kibana',
                                'docker/repo/grafana',
                                'docker/repo/zookeeper',
                                'docker/repo/kafka',
                                'docker/repo/rabbitmq',
                                'docker/repo/memcached',
                                'docker/repo/sqlserver',
                                'docker/repo/postgres',
                                'docker/repo/ubuntu',
                                'docker/repo/centos',
                                'docker/repo/nginx',
                                'docker/repo/php',
                                'docker/repo/nodejs',
                                'docker/repo/mysql',
                                'docker/repo/wordpress',
                                'docker/repo/mongodb',
                                'docker/repo/redis',
                                'docker/repo/minio'
                            ]
                        },
                        {
                            title: 'Docker 命令',
                            children: [
                                'docker/command/docker',
                                'docker/command/dockerd',
                            ]
                        },
                        'docker/best_practices/',
                        'docker/debug/',
                        'docker/resources/',
                        {
                            title: 'CI/CD',
                            children: [
                                'docker/cicd/',
                                'docker/cicd/github-actions',
                                'docker/cicd/drone',
                                'docker/cicd/drone-install',
                                'docker/cicd/travis'
                            ]
                        },
                        {
                            title: 'Compose',
                            children: [
                                'docker/compose/introduction',
                                'docker/compose/install',
                                'docker/compose/usage',
                                'docker/compose/commands',
                                'docker/compose/compose_file'
                            ]
                        }
                    ]
                },
                {
                    title: 'Kubernetes',
                    children: [
                        'kubernetes/intro',
                        'kubernetes/concepts',
                        'kubernetes/design',
                        {
                            title: '部署 Kubernetes',
                            children: [
                                'kubernetes/setup/',
                                'kubernetes/setup/kubeadm',
                                'kubernetes/setup/docker-desktop',
                                'kubernetes/setup/systemd',
                                'kubernetes/setup/dashboard'
                            ]
                        },
                        'kubernetes/kubectl'
                    ]
                },
                {
                    title: 'Storage',
                    children: [
                        {
                            title: 'Elasticsearch',
                            children: [
                                'storage/elasticsearch/'
                            ]
                        },
                        {
                            title: 'Redis',
                            children: [
                                'storage/redis/redis-knowledge',
                                'storage/redis/quick-start-with-redis'
                            ]
                        },
                        {
                            title: 'MongoDB',
                            children: [
                                'storage/mongodb/mongodb-shell'
                            ]
                        },
                        {
                            title: 'SqlServer',
                            children: [
                                'storage/sql/query',
                                'storage/sql/execute-big-sql',
                                'storage/sql/cursor-loop-processing-data',
                                'storage/sql/sql-to-model'
                            ]
                        },
                        {
                            title: 'MySQL',
                            children: [
                                'storage/mysql/mysql-install'
                            ]
                        },
                        {
                            title: 'SQLite',
                            path: 'storage/sqlite/'
                        }
                    ]
                },
                {
                    title: 'Git',
                    children: [
                        'git/git-commit-emojis',
                        'git/git-scripts'
                    ]
                },
                {
                    title: 'Web',
                    children: [
                        'web/http-content-type',
                        'web/html-escape-characters',
                        'web/ascii-table',
                        'web/http-statuscode',
                        'web/js-minimize-code'
                    ]
                },
                {
                    title: 'Planning Analytics',
                    children: [
                        'pa/rules-functions'
                    ]
                },
                {
                    title: 'Other',
                    children: [
                        'other/erp-code-specification-summary',
                        'other/smart-questions',
                        'other/why-is-kafka-so-fast',
                        'other/kafka-install',
                        'other/nginx',
                        'other/zabbix',
                        'other/batch-rename-with-powershell',
                        'other/revoke-wechart-msg-patcher',
                        'other/visual-studio-keys',
                        'other/windows10-run-android-emulator-bsod-solution',
                        'other/remove-windows-shortcuts'
                    ]
                },
            ],
        }
    }
}