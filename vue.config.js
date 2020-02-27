module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('storysource')
      .test(/\.stories\.js?$/)
      .post()
      .use('storysource')
      .loader(require.resolve('@storybook/source-loader'));
  },
  css: {
    extract: false,
  },
};

// @storybook/addon-storysource/loader addon-storysource/loader

// 27% building 144/175 modules 31 active ...ex.js??vue-loader-options!/Users/Jorge/Playground/poc/atomic_design/node_modules/eslint-loader/index.js??ref--13-0!/Users/Jorge/Playground/poc/atomic_design/src/components/atoms/MButton/index.vuestorybook-addon-vue-info/loader is deprecated. Please consider using vue-docgen-loader instead.
// 69% building 1882/1906 modules 24 active ...?vue-loader-options!/Users/Jorge/Playground/poc/atomic_design/node_modules/eslint-loader/index.js??ref--13-0!/Users/Jorge/Playground/poc/atomic_design/src/components/atoms/MDatepicker/index.vuestorybook-addon-vue-info/loader is deprecated. Please consider using vue-docgen-loader instead.
