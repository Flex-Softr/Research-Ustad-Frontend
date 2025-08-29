import { api } from '@/config';
import { CreateContactData } from '@/type/contact';

// Create contact form submission (public)
export const CreateContact = async (data: CreateContactData): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(`${api.baseUrl}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to submit contact form');
  }

  const result = await response.json();
  return result.data;
};
