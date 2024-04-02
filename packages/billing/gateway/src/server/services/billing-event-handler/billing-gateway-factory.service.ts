import { z } from 'zod';

import {
  BillingProviderSchema,
  BillingWebhookHandlerService,
} from '@kit/billing';

export class BillingEventHandlerFactoryService {
  static async GetProviderStrategy(
    provider: z.infer<typeof BillingProviderSchema>,
  ): Promise<BillingWebhookHandlerService> {
    switch (provider) {
      case 'stripe': {
        const { StripeWebhookHandlerService } = await import('@kit/stripe');

        return new StripeWebhookHandlerService();
      }

      case 'lemon-squeezy': {
        const { LemonSqueezyWebhookHandlerService } = await import(
          '@kit/lemon-squeezy'
        );

        return new LemonSqueezyWebhookHandlerService();
      }

      case 'paddle': {
        throw new Error('Paddle is not supported yet');
      }

      default:
        throw new Error(`Unsupported billing provider: ${provider as string}`);
    }
  }
}
