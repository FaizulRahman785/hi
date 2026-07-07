import { auth } from '@/firebase/config';

export interface CloudinaryUploadResult {
  secureUrl: string;
  publicId: string;
  resourceType: string;
  bytes: number;
  format: string;
  originalFilename: string;
}

export async function uploadToCloudinary(file: File, folder = 'mb-career-connect'): Promise<CloudinaryUploadResult> {
  const token = await auth.currentUser?.getIdToken();
  if (!token) {
    throw new Error('You must be signed in before uploading files.');
  }

  const apiBase = import.meta.env.VITE_API_BASE_URL ?? '';
  const response = await fetch(`${apiBase}/api/uploads/cloudinary-sign`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ folder }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || 'Failed to get Cloudinary upload signature from backend.');
  }

  const { cloudName, apiKey, timestamp, signature } = await response.json();

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp.toString());
  formData.append('signature', signature);
  formData.append('folder', folder);

  const uploadResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!uploadResponse.ok) {
    const errorData = await uploadResponse.json();
    throw new Error(errorData?.error?.message || 'Failed to upload file to Cloudinary.');
  }

  const data = await uploadResponse.json();
  return {
    secureUrl: data.secure_url,
    publicId: data.public_id,
    resourceType: data.resource_type,
    bytes: data.bytes ?? file.size,
    format: data.format ?? '',
    originalFilename: data.original_filename ?? file.name,
  };
}
