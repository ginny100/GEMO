export enum GiftAssetReceivedStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  CLAIMABLE = 'CLAIMABLE',
  CLAIMED = 'CLAIMED',
  DISABLED = 'DISABLED'
}

export interface GiftAssetReceived {
  user_id: string;
  quantity: number | null;
  last_price: number | null;
  amount: number | null;
  created_at: string;
  updated_at: string;
}