import { buildApiUrl } from '../config/api.js';

const getAuthHeaders = (includeJson = false) => {
  const headers = {};
  const token = localStorage.getItem('token');

  if (includeJson) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const getMyCertificates = async () => {
  const response = await fetch(buildApiUrl('/api/certificates/my-certificates'), {
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to load certificates');
  }

  return data.certificates || [];
};

export const issueCourseCertificate = async (courseId) => {
  const response = await fetch(buildApiUrl(`/api/certificates/issue/${courseId}`), {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify({}),
  });

  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || 'Failed to issue certificate');
    error.details = data;
    throw error;
  }

  return data;
};

export const verifyCertificate = async (certificateId) => {
  const response = await fetch(buildApiUrl(`/api/certificates/verify/${certificateId}`));
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to verify certificate');
  }

  return data;
};
