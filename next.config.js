//env's in env.local are loaded server, env's here are loaded to client

const path = require("path");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

// import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

module.exports = {
  webpack: (config) => {
    //   // this is natively supported by next .js now. in jsconfig.json
    //   config.resolve.alias["@"] = path.resolve(__dirname, "src");
    // },

    // e dont need env varible package anymore. next.js handles it
    // config.plugins.push(new MonacoWebpackPlugin());
    return config;
  },
  // this will pass the env variable to the client side
  // trailingSlash: true,
  env: {
    AUTH0_NAMESPACE: process.env.AUTH0_NAMESPACE,
    BASE_URL: process.env.BASE_URL,
    PORTFOLIO_API_URL: process.env.PORTFOLIO_API_URL,
    EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
    EMAILJS_USER_ID: process.env.EMAILJS_USER_ID,
    BASE_URL: process.env.BASE_URL,
    // NODE_ENV: process.env.NODE_ENV,
    // AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    // AUTH0_CLIENT: process.env.AUTH0_CLIENT,
    // AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    // AUTH0_REDIRECT_URI: process.env.AUTH0_REDIRECT_URI,
    // AUTHO_POST_LOGOUT_REDIRECT_URI: process.env.AUTHO_POST_LOGOUT_REDIRECT_URI,
    // AUTH0_COOKIE_SECRET: process.env.AUTH0_COOKIE_SECRET,
  },
  // pwa: {
  //   dest: "public",
  //   // runtimeCaching,
  //   swSrc: "service-worker.js",
  // },
};
