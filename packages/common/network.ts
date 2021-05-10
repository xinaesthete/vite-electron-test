const devMode = import.meta.env.MODE === 'development';

export const apiPort = 8101;
export const htmlPort = devMode ? 3000 : 8101;