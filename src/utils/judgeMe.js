import { Script } from 'gatsby';
import React from 'react';

export function ReviewWidgetScripts() {
  const jdgm = window.jdgm || {};
  jdgm.SHOP_DOMAIN = 'hummingbird-hammocks.myshopify.com';
  jdgm.PLATFORM = 'shopify';
  jdgm.PUBLIC_TOKEN = 'Yc8UD8ErSdTRRpdNomoaN6i1MQo';

  return (
    <>
      <Script id="judgeMeWidgetPreloader" src="https://cdn.judge.me/widget_preloader.js" />
      <Script id="judgeMeAssets" src="https://cdn.judge.me/assets/installed.js" />
    </>
  );
}
