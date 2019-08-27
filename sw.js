/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "0a27a4163254fc8fce870c8cc3a3f94f"
  },
  {
    "url": "android-chrome-192x192.png",
    "revision": "844ec296e452f6974e05cb7dc60cc40b"
  },
  {
    "url": "android-chrome-512x512.png",
    "revision": "2924a5e3105726326324c0d722a47198"
  },
  {
    "url": "apple-touch-icon.png",
    "revision": "1e0a1966c61826321bafa802ce5a2277"
  },
  {
    "url": "browserconfig.xml",
    "revision": "88f53a1ce093fc4c923974a60d2e06f9"
  },
  {
    "url": "cart.html",
    "revision": "7a78f095b1720092d90cd80c34971492"
  },
  {
    "url": "cart/scripts/cart.js",
    "revision": "4453f51b19ff9e4db8024827e9f72ac6"
  },
  {
    "url": "cart/styles/cart.css",
    "revision": "278927c623a82b0c11cc5859158684e2"
  },
  {
    "url": "cart/styles/cart.scss",
    "revision": "2a2e2dd0ce0cfd319eb994ef783f77ad"
  },
  {
    "url": "current_orders.html",
    "revision": "f868200e7cc5fc7486b83ee9b8fe8463"
  },
  {
    "url": "current_orders/images/purplebaseball.png",
    "revision": "e8cb483bf7a89550f71a0c54547935c4"
  },
  {
    "url": "current_orders/scripts/current_orders.js",
    "revision": "6122cbcc002ffcafa3c21a73c2eed055"
  },
  {
    "url": "current_orders/styles/current_orders.css",
    "revision": "8231cd32c909ae7a05bb1c09f708e388"
  },
  {
    "url": "current_orders/styles/current_orders.scss",
    "revision": "3330ea558ca39ba089f2495a48b0307a"
  },
  {
    "url": "favicon-16x16.png",
    "revision": "d1d34238da8c385bc7e29f9b7fec1e09"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "ced2776136f2415576ba402fe64dca44"
  },
  {
    "url": "favicon.ico",
    "revision": "5806284004767d41bba6012150d3ad52"
  },
  {
    "url": "home.html",
    "revision": "14946fe917779e40faf882a8377b9c85"
  },
  {
    "url": "home/images/purplebaseball.png",
    "revision": "e8cb483bf7a89550f71a0c54547935c4"
  },
  {
    "url": "home/scripts/home.js",
    "revision": "30eb7b2a0aef7d60c5f518bbd8066c94"
  },
  {
    "url": "home/styles/home.css",
    "revision": "26769dd68cde8938898b586010215816"
  },
  {
    "url": "home/styles/home.scss",
    "revision": "93e2020191c99e1ec606eb757809ab7a"
  },
  {
    "url": "login.html",
    "revision": "8560ef543185ecdc9d92b68fb1a83a5a"
  },
  {
    "url": "login/scripts/login.js",
    "revision": "b5617277c7dc5dc3d309bd4612457e66"
  },
  {
    "url": "login/styles/login.css",
    "revision": "3e90e749267a3fed6061ceea904133d8"
  },
  {
    "url": "login/styles/login.scss",
    "revision": "e2b9637af6abfc9055a6f16de07d7e35"
  },
  {
    "url": "mstile-150x150.png",
    "revision": "8699f2e3a022a7e31fbb97355b78a615"
  },
  {
    "url": "readme.md",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "safari-pinned-tab.svg",
    "revision": "250d7c61a98bd5145f8fa3e8a61a17b2"
  },
  {
    "url": "site.webmanifest",
    "revision": "f187f30610b54bac23b149abda83eb9c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
