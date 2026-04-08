export type TransactionType =
  | 'wallet_funding'
  | 'p2p_transfer'
  | 'bill_payment'
  | 'airtime_purchase'
  | 'data_purchase'
  | 'withdrawal'
  | 'request_payment';

export type TransactionStatus = 'pending' | 'processing' | 'successful' | 'failed';

export type BillType = 'electricity' | 'cable' | 'internet';

export type VerificationLevel = 'unverified' | 'basic' | 'verified';

export interface WalletUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  bvn?: string | null;
  nin?: string | null;
  walletBalance: number;
  verificationLevel: VerificationLevel;
}

export interface WalletTransaction {
  id: string;
  senderId?: string | null;
  receiverId?: string | null;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  reference: string;
  createdAt: string;
}

