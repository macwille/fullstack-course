<<<<<<< HEAD
import 'dotenv/config'

export default {
  name: 'rate-repository-app',
  slug: 'rate-repository-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
=======
import 'dotenv/config';

export default {
  name: 'rate-repository-app',
  extra: {
    env: process.env.ENV
  },
  slug: "rate-repository-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
>>>>>>> c6e86e71869049c8bafb86261dd303cb28d6c764
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
<<<<<<< HEAD
    '**/*'
=======
    "**/*"
>>>>>>> c6e86e71869049c8bafb86261dd303cb28d6c764
  ],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
<<<<<<< HEAD
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF'
    }
  },
  web: {
    favicon: './assets/favicon.png'
  },
  extra: {
    env: process.env.ENV,
    uri: process.env.APOLLO_URI
  }
}
=======
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF"
    }
  },
  web: {
    favicon: "./assets/favicon.png"
  }
}

>>>>>>> c6e86e71869049c8bafb86261dd303cb28d6c764
