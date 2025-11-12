import type { Meta, StoryObj } from '@storybook/angular';
import { ProductCardComponent } from './product-card';
import { applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';

const meta: Meta<ProductCardComponent> = {
  title: 'Shop/Product Card',
  component: ProductCardComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  args: {
    name: 'Stylo Bleu',
    price: 2.5,
    created_at: '2025-01-10',
    avgRating: 4,
  },
};
export default meta;

type Story = StoryObj<ProductCardComponent>;
export const Default: Story = {};
