import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';

const BackendContext = createContext(null);

export function BackendProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [healthData, setHealthData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState(null);
  const [error, setError] = useState(null);

  // Dynamic Merchant Profile loaded from backend / database
  const [merchant, setMerchantState] = useState(() => {
    const saved = localStorage.getItem('paytm_merchant_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    const customName = localStorage.getItem('paytm_merchant_name');
    return {
      merchant_id: 'M001',
      merchant_name: customName || 'Sri Lakshmi Tea & Snacks',
      business_type: 'Tea & Snacks Shop',
      city: 'Bengaluru',
      area: 'BTM Layout',
    };
  });

  const setMerchantName = useCallback((newName) => {
    if (!newName) return;
    setMerchantState((curr) => {
      const updated = { ...curr, merchant_name: newName };
      localStorage.setItem('paytm_merchant_name', newName);
      localStorage.setItem('paytm_merchant_profile', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const fetchMerchant = useCallback(async () => {
    try {
      const m = await apiService.getMerchant();
      if (m && m.merchant_name) {
        // If a user has specifically overridden the name in localStorage, respect that, otherwise use backend
        const customName = localStorage.getItem('paytm_merchant_name');
        const finalMerchant = customName ? { ...m, merchant_name: customName } : m;
        setMerchantState(finalMerchant);
        localStorage.setItem('paytm_merchant_profile', JSON.stringify(finalMerchant));
      }
    } catch (err) {
      // Keep existing merchant state
    }
  }, []);

  const checkHealth = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiService.getHealth();
      if (data && data.status === 'ok') {
        setIsConnected(true);
        setHealthData(data);
        setError(null);
        if (data.merchant) {
          const customName = localStorage.getItem('paytm_merchant_name');
          const finalMerchant = customName
            ? { ...data.merchant, merchant_name: customName }
            : data.merchant;
          setMerchantState(finalMerchant);
          localStorage.setItem('paytm_merchant_profile', JSON.stringify(finalMerchant));
        }
      } else {
        setIsConnected(false);
        setError('Unexpected backend response');
      }
    } catch (err) {
      setIsConnected(false);
      setHealthData(null);
      setError(err.message || 'Unable to connect to backend');
    } finally {
      setIsLoading(false);
      setLastChecked(new Date());
    }
  }, []);

  useEffect(() => {
    checkHealth();
    fetchMerchant();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, [checkHealth, fetchMerchant]);

  const merchantName = merchant?.merchant_name || 'Sri Lakshmi Tea & Snacks';

  return (
    <BackendContext.Provider
      value={{
        isConnected,
        healthData,
        isLoading,
        lastChecked,
        error,
        checkHealth,
        merchant,
        merchantName,
        setMerchantName,
      }}
    >
      {children}
    </BackendContext.Provider>
  );
}

export function useBackend() {
  const context = useContext(BackendContext);
  if (!context) {
    throw new Error('useBackend must be used within a BackendProvider');
  }
  return context;
}
