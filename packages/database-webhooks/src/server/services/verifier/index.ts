const WEBHOOK_SENDER_PROVIDER =
  process.env.WEBHOOK_SENDER_PROVIDER ?? 'postgres';

export async function getDatabaseWebhookVerifier() {
  switch (WEBHOOK_SENDER_PROVIDER) {
    case 'postgres': {
      const { PostgresDatabaseWebhookVerifierService } = await import(
        './postgres-database-webhook-verifier.service'
      );

      return new PostgresDatabaseWebhookVerifierService();
    }

    default:
      throw new Error(
        `Invalid WEBHOOK_SENDER_PROVIDER: ${WEBHOOK_SENDER_PROVIDER}`,
      );
  }
}
