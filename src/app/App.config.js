const config = {
  apiUrl: process.env.REACT_APP_API_URL
};

if (!config.apiUrl) {
  console.error('ENV apiUrl is not set');
}

export default config;
