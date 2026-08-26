import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.wejobs.app',
  appName: 'Wejobs',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

