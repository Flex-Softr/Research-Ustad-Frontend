"use client";

import { ReactNode } from 'react';
import { useUserStatus } from '@/hooks/useUserStatus';

interface UserDashboardLayoutProps {
  children: ReactNode;
}

export const UserDashboardLayout = ({ children }: UserDashboardLayoutProps) => {
  // Use the user status hook to check for account deletion
  useUserStatus();

  return <>{children}</>;
};
