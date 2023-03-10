export interface LigthningNetworkInvoiceRequest {
    paymentId: string;
    amount: number;
    description?: string;
    chainAddresses?: string[];
}
export interface LigthningNetworkInvoiceData {
    chain_addresses?: string[];
    cltv_delta: number;
    created_at?: string;
    description?: string;
    description_hash?: string;
    destination: string;
    expires_at: string;
    features?: {
        bit: number;
        is_required: boolean;
        type: string;
    }[];
    id: string;
    is_expired: boolean;
    metadata?: string;
    mtokens: string;
    network: string;
    payment?: string;
    routes?: {
        base_fee_mtokens: string;
        channel?: string;
        cltv_delta?: number;
        fee_rate?: number;
        public_key: string;
    }[];
    safe_tokens: number;
    tokens: number;
}
export declare class LigthningNetworkService {
    generateInvoice(privateKey: string, destination: string, { paymentId, amount, description, chainAddresses, }: LigthningNetworkInvoiceRequest): string;
    readInvoice(lnInvoice: string): LigthningNetworkInvoiceData;
}
