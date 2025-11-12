import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  framework: { name: '@storybook/angular', options: {} },
  core: { builder: '@storybook/builder-vite' },
  docs: { autodocs: 'tag' },
};
export default config;

