export async function uploadToCloudinary(file: File, folder = 'mb-career-connect'): Promise<string> {
  const apiBase = import.meta.env.VITE_API_BASE_URL ?? '';
  const response = await fetch(`${apiBase}/api/uploads/cloudinary-sign`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ folder }),
  });

  if (!response.ok) {
    throw new Error('Failed to get Cloudinary upload signature from backend.');
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
  return data.secure_url;
}
