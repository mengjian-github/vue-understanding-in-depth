module.exports = {
  title: "深入理解Vue.js",
  description: "市面上最清晰的Vue原理分析教程，辅以最新版本的源码分析。",
  base: "/vue-understanding-in-depth/",
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  themeConfig: {
    nav: [
      {
        text: "开始阅读",
        link: "/history/naive_implementation"
      }
    ],
    displayAllHeaders: true,
    sidebar: [
      {
        title: "追寻历史的脚步",
        collapsable: true,
        children: ["/history/naive_implementation", "/history/first_milestone"]
      }
    ],
    lastUpdated: "Last Updated",
    repo: "erasermeng/vue-understanding-in-depth",
    docsDir: "docs"
  },
  markdown: {
    // lineNumbers: true
  }
};
