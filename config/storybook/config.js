import { configure, addParameters } from '@storybook/vue';
import Vue from 'vue';
import './style.scss';


addParameters({
  options: {
    hierarchyRootSeparator: / - /,
    hierarchySeparator: /\/|\./, // matches a . or /
  },
});

// Require all the .stories.js files from all components
const req = require.context('@/components', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach((filePath) => {
    const componentName = filePath.replace(/^.+\/([^/]+)\/index.stories.js/, '$1');
    const component = req(filePath);
    Vue.component(componentName, component);
    return component;
  });
}


configure(loadStories, module);
