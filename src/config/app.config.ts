export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    MONGO_URI: process.env.MONGO_URI,
  },
  auth: {
    connectionURI: process.env.AUTH_URI,
    appInfo: {
      appName: 'eivydas',
      apiDomain: 'http://localhost:3001',
      websiteDomain: 'http://localhost:3000',
      apiBasePath: '/auth',
      websiteBasePath: '/auth',
    },
  },
});
