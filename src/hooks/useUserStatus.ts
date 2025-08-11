"use client";

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { GetMe } from '@/services/singleUser';
import { logout } from '@/services/AuthService';

export const useUserStatus = () => {
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const checkUserStatus = async () => {
    try {
      const result = await GetMe();
      
      // If GetMe returns null or fails, user might be deleted
      if (!result || !result.data) {
        console.log('User not found or deleted, logging out...');
        await logout();
        toast.error('Your account has been deleted. Please contact an administrator.');
        router.push('/login');
        return;
      }

      // Check if user is marked as deleted
      if (result.data.isDeleted) {
        console.log('User is marked as deleted, logging out...');
        await logout();
        toast.error('Your account has been deleted. Please contact an administrator.');
        router.push('/login');
        return;
      }

    } catch (error: any) {
      console.error('Error checking user status:', error);
      
      // Check for specific status codes
      const statusCode = error.status || (error.message?.match(/status: (\d+)/)?.[1]);
      
      // If we get a 401 (Unauthorized) or 404 (Not Found), user is likely deleted or unauthorized
      if (statusCode === 401 || statusCode === 404 || 
          error.message?.includes('401') || error.message?.includes('404')) {
        console.log('User unauthorized or not found, logging out...');
        await logout();
        toast.error('Your session has expired or account has been deleted. Please login again.');
        router.push('/login');
        return;
      }
    }
  };

  useEffect(() => {
    // Check user status immediately
    checkUserStatus();

    // Set up periodic checking every 30 seconds
    intervalRef.current = setInterval(checkUserStatus, 30000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [router]);

  return { checkUserStatus };
};
