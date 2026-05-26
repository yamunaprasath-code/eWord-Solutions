export const CONFIG = {
  apiUrl:  import.meta.env.VITE_API_URL,
  siteUrl: import.meta.env.VITE_SITE_URL ?? 'https://eword.com',
  isDev:   import.meta.env.DEV,
  isProd:  import.meta.env.PROD,
};
