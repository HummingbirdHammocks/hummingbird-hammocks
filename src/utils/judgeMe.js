import React from 'react';
import { Helmet } from 'react-helmet';

export function ReviewWidgetScripts() {
  const scriptString =
    "jdgm = window.jdgm || { };jdgm.SHOP_DOMAIN = 'hummingbird-hammocks.myshopify.com';jdgm.PLATFORM = 'shopify';jdgm.PUBLIC_TOKEN = 'Yc8UD8ErSdTRRpdNomoaN6i1MQo';";

  return (
    <Helmet>
      <script>{scriptString}</script>
      <script
        data-cfasync="false"
        type="text/javascript"
        async
        src="https://cdn.judge.me/widget_preloader.js"></script>
      <script
        data-cfasync="false"
        type="text/javascript"
        async
        src="https://cdn.judge.me/assets/installed.js"></script>
    </Helmet>
  );
}
