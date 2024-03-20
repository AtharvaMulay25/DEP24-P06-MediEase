const baseUrl = import.meta.env.VITE_API_URL;
export const apiRoutes = {
  baseUrl,
  purchase: `${baseUrl}/purchase`,
  supplier: `${baseUrl}/supplier`,
  medicine: `${baseUrl}/medicine`,
  stock: `${baseUrl}/stock`,
  patient: `${baseUrl}/patient`,
  category: `${baseUrl}/category`,
  admin: `${baseUrl}/admin`,
    otp: `${baseUrl}/otp`,
    auth: `${baseUrl}/auth`,
};