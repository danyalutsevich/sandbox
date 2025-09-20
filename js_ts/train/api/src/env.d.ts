// I made this file to see env variables in TypeScript
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      DB_URL: string;
    }
  }
}

export {};
