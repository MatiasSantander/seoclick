import { Database } from '@kit/supabase/database';

type UpsertSubscriptionParams =
  Database['public']['Functions']['upsert_subscription']['Args'];

type UpsertOrderParams =
  Database['public']['Functions']['upsert_order']['Args'];

/**
 * @name BillingWebhookHandlerService
 * @description Represents an abstract class for handling billing webhook events.
 */
export abstract class BillingWebhookHandlerService {
  // Verifies the webhook signature - should throw an error if the signature is invalid
  abstract verifyWebhookSignature(request: Request): Promise<unknown>;

  abstract handleWebhookEvent(
    event: unknown,
    params: {
      // this method is called when a checkout session is completed
      onCheckoutSessionCompleted: (
        subscription: UpsertSubscriptionParams | UpsertOrderParams,
        customerId: string,
      ) => Promise<unknown>;

      // this method is called when a subscription is updated
      onSubscriptionUpdated: (
        subscription: UpsertSubscriptionParams,
        customerId: string,
      ) => Promise<unknown>;

      // this method is called when a subscription is deleted
      onSubscriptionDeleted: (subscriptionId: string) => Promise<unknown>;

      // this method is called when a payment is succeeded. This is used for
      // one-time payments
      onPaymentSucceeded: (sessionId: string) => Promise<unknown>;

      // this method is called when a payment is failed. This is used for
      // one-time payments
      onPaymentFailed: (sessionId: string) => Promise<unknown>;
    },
  ): Promise<unknown>;
}
