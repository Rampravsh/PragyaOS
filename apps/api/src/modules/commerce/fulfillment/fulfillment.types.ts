export interface TraceContext {
  correlationId: string;
  orderId: string;
  paymentAttemptId: string;
  userId: string;
}

export interface FulfillmentJobData extends TraceContext {
  courseId?: string;
  amount: number;
  currency: string;
}

export interface EnrollmentJobData extends TraceContext {
  courseId: string;
}

export interface InvoiceJobData extends TraceContext {
  amount: number;
  currency: string;
}

export interface NotificationJobData extends TraceContext {
  email: string;
  customerName: string;
  courseTitle: string;
}

export interface AnalyticsJobData extends TraceContext {
  amount: number;
  currency: string;
}
