import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-actions'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  core: { builder: '@storybook/builder-vite' },   // <-- important
  docs: { autodocs: 'tag' },
};
export default config;
