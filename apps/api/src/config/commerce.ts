export interface CommerceConfig {
  gateway: {
    razorpay: {
      keyId: string;
      keySecret: string;
      webhookSecret: string;
    };
    stripe: {
      secretKey: string;
      webhookSecret: string;
    };
  };
  invoice: {
    prefix: string;
    billingEntity: string;
    billingAddress: string;
    gstin: string;
  };
  tax: {
    defaultRate: number; // Stored as multiplier (e.g. 0.18 for 18% GST)
  };
}

export const commerceConfig: CommerceConfig = {
  gateway: {
    razorpay: {
      keyId: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder_key",
      keySecret: process.env.RAZORPAY_KEY_SECRET || "rzp_test_placeholder_secret",
      webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || "rzp_test_placeholder_webhook_secret",
    },
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_key",
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "whsec_placeholder_secret",
    },
  },
  invoice: {
    prefix: "INV",
    billingEntity: "PragyaOS Learning Platform Private Limited",
    billingAddress: "123 Innovation Boulevard, Tech Park, Bangalore, KA, 560001",
    gstin: process.env.BUSINESS_GSTIN || "29AAAAA0000A1Z5", // Default placeholder GSTIN
  },
  tax: {
    defaultRate: 0.18, // 18% standard taxation rate
  },
};

export default commerceConfig;
