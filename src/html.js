import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
        {/* Judge Me start */}
        {/* <script>
          jdgm = window.jdgm || {};jdgm.SHOP_DOMAIN =
          'hummingbirdhammocks.com';jdgm.PLATFORM = 'shopify';jdgm.PUBLIC_TOKEN
          = 'Yc8UD8ErSdTRRpdNomoaN6i1MQo';
        </script>
        <script
          data-cfasync="false"
          type="text/javascript"
          async
          src="https://cdn.judge.me/widget_preloader.js"
        ></script>
        <script
          data-cfasync="false"
          type="text/javascript"
          async
          src="https://cdn.judge.me/assets/installed.js"
        ></script>

        <link
          rel="stylesheet"
          type="text/css"
          media="all"
          href="https://cdn.judge.me/shopify_v2.css"
        />
        <script
          data-cfasync="false"
          type="text/javascript"
          async
          src="https://cdn.judge.me/shopify_v2.js"
        ></script>
        <link
          rel="stylesheet"
          type="text/css"
          media="nope!"
          href="https://cdn.judge.me/shopify_v2.css"
          onload="this.media='all',function(){var d=document,e=d.createEvent('Event');e.initEvent('jdgm.doneLoadingCss',!0,!0),d.dispatchEvent(e)}();"
        /> */}
      </head>
      <body
        style={{
          margin: "0",
          padding: "0",
          backgroundColor: "#fdfdf5",
        }}
        {...props.bodyAttributes}
      >
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
