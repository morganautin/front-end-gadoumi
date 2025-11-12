import type { Meta, StoryObj } from '@storybook/angular';
import { LoginFormComponent } from './login-form';
import { applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
// ou provideNoopAnimations() si tu veux désactiver les anims

const meta: Meta<LoginFormComponent> = {
  title: 'Auth/Login Form',
  component: LoginFormComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  args: {
    submitForm: (payload: unknown) => console.log('submit', payload),
  },
};
export default meta;

type Story = StoryObj<LoginFormComponent>;
export const Default: Story = {};
