import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseAdminAuthOptions {
  redirectTo?: string;
  checkInterval?: number;
}

export function useAdminAuth(options: UseAdminAuthOptions = {}) {
  const navigate = useNavigate();
  const { redirectTo = '/admin/login', checkInterval = 0 } = options;

  const checkAdminAuth = useCallback(() => {
    const token = localStorage.getItem('login');
    
    if (!token) {
      navigate(redirectTo);
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        localStorage.removeItem('login');
        navigate(redirectTo);
        return false;
      }

      if (payload.role !== 'ADMIN') {
        navigate(redirectTo);
        return false;
      }

      return true;
    } catch {
      localStorage.removeItem('login');
      navigate(redirectTo);
      return false;
    }
  }, [navigate, redirectTo]);

  useEffect(() => {
    const isAuthenticated = checkAdminAuth();
    
    if (isAuthenticated && checkInterval > 0) {
      const interval = setInterval(checkAdminAuth, checkInterval);
      return () => clearInterval(interval);
    }
  }, [checkAdminAuth, checkInterval]);

  return { checkAdminAuth };
}

export default useAdminAuth;