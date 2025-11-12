import type { Meta, StoryObj } from '@storybook/angular';
import { LoginFormComponent } from './login-form.component';
import { action } from '@storybook/addon-actions';

const meta: Meta<LoginFormComponent> = {
  component: LoginFormComponent,
  title: 'Auth/Login Form',
  args: { submitForm: action('submit') },
};
export default meta;

export const Default: StoryObj<LoginFormComponent> = {};
