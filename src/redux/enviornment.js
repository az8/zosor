export const BASE_URL = `${window.location.origin.toString()}`.includes('localhost') ? "https://zosor.com" : `${window.location.origin.toString()}`;


export const environment = {
  production: false,
  baseUrl: BASE_URL,

  videoFeed: '/videoFeed',
  musicSubmission: '/musicSubmission',
  datingFeed: '/datingFeed',
  datingWave: '/datingWave',
};
