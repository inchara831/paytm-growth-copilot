import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';

const BackendContext = createContext(null);

export function BackendProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [healthData, setHealthData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState(null);
  const [error, setError] = useState(null);

  const checkHealth = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiService.getHealth();
      if (data && data.status === 'ok') {
        setIsConnected(true);
        setHealthData(data);
        setError(null);
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
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, [checkHealth]);

  return (
    <BackendContext.Provider
      value={{
        isConnected,
        healthData,
        isLoading,
        lastChecked,
        error,
        checkHealth,
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
