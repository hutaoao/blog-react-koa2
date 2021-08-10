const {override, addLessLoader} = require('customize-cra');

process.env.GENERATE_SOURCEMAP = "false";//去除打包生成的map文件

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@primary-color': '#bf89f1', // 全局主色
        '@link-color': '#f645ce', // 链接色
        '@success-color': '#0abb87', // 成功色
        '@warning-color': '#ffb822', // 警告色
        '@error-color': '#fd397a', // 错误色
        '@border-radius-base': '5px', // 组件/浮层圆角
      }, //自定义主题颜色
    }
  }),
);
