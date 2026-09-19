import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const apiService = {
  // Health check
  getHealth: async () => {
    const res = await apiClient.get('/health');
    return res.data;
  },

  // Merchant Profile (Dynamic Shop Info)
  getMerchant: async () => {
    const res = await apiClient.get('/merchant');
    return res.data;
  },

  // Analytics Overview (Revenue, Profit, Transactions, Avg Line Amount)
  getOverview: async () => {
    const res = await apiClient.get('/analytics/overview');
    return res.data;
  },

  // Hourly Performance
  getHourly: async () => {
    const res = await apiClient.get('/analytics/hourly');
    return res.data;
  },

  // Top Products Analytics
  getProducts: async () => {
    const res = await apiClient.get('/analytics/products');
    return res.data;
  },

  // Growth Opportunities
  getOpportunities: async () => {
    const res = await apiClient.get('/opportunities');
    return res.data;
  },

  // ProfitGuard Simulation
  simulateProfitGuard: async (productId, discountPct = 10) => {
    const res = await apiClient.post('/profitguard/simulate', null, {
      params: {
        product_id: productId,
        discount_pct: discountPct,
      },
    });
    return res.data;
  },

  // AI Recommendation (Proactive Growth Copilot)
  getRecommendation: async () => {
    const res = await apiClient.get('/ai/recommendation');
    return res.data;
  },

  // Offers
  getOffers: async () => {
    const res = await apiClient.get('/offers');
    return res.data;
  },

  createOffer: async (offerData) => {
    const res = await apiClient.post('/offers', offerData);
    return res.data;
  },

  // Network Intelligence
  getNetworkIntelligence: async () => {
    const res = await apiClient.get('/network/intelligence');
    return res.data;
  },

  // Assistant Insights (4-part multi-lingual proactive recommendations)
  getAssistantInsights: async (lang = 'en') => {
    const res = await apiClient.get('/assistant/insights', { params: { lang } });
    return res.data;
  },

  // Suggested Offers (ready to activate)
  getSuggestedOffers: async (lang = 'en') => {
    const res = await apiClient.get('/offers/suggested', { params: { lang } });
    return res.data;
  },

  // Products needing attention (slow moving)
  getProductsAttention: async () => {
    const res = await apiClient.get('/analytics/products-attention');
    return res.data;
  },

  // Likely Companion Items / Basket Associations
  getBasketSuggestions: async () => {
    const res = await apiClient.get('/analytics/basket-suggestions');
    return res.data;
  },

  // Mock Paytm Action
  triggerMockPaytmAction: async (actionData) => {
    const res = await apiClient.post('/mock-paytm/action', actionData);
    return res.data;
  },

  // Real LLM Copilot Chat
  chatCopilot: async (payload) => {
    const res = await apiClient.post('/copilot/chat', payload);
    return res.data;
  },

  // Cognee Business Memory Status
  getMemoryStatus: async () => {
    const res = await apiClient.get('/memory/status');
    return res.data;
  },
};

export default apiService;
