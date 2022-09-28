import React from "react"
import { Helmet } from 'react-helmet';
import axios from "axios"
import { toast } from "react-toastify"


export function ReviewWidgetScripts() {
  const scriptString = "jdgm = window.jdgm || { };jdgm.SHOP_DOMAIN = 'hummingbird-hammocks.myshopify.com';jdgm.PLATFORM = 'shopify';jdgm.PUBLIC_TOKEN = 'Yc8UD8ErSdTRRpdNomoaN6i1MQo';"
  return (
    <Helmet>
      <script>{scriptString}</script>
      <script data-cfasync='false' type='text/javascript' async src='https://cdn.judge.me/widget_preloader.js'></script>
      <script data-cfasync='false' type='text/javascript' async src='https://cdn.judge.me/assets/installed.js'></script>
    </Helmet>
  )
}


export async function getProductReviewWidget(handle) {
  if (!handle) {
    toast.error("Error getting reviews, handle is required")
    return false
  }

  const url = `https://judge.me/api/v1/widgets/product_review?api_token=${process.env.GATSBY_JUDGE_ME_PUBLIC_API_TOKEN}&shop_domain=${process.env.GATSBY_SHOPIFY_STORE_URL}&handle=${handle}`

  return await axios.get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.log("getProductReviewWidget", error)
      toast.error("Error getting reviews, please try again")
    });
}

export async function getProductPreviewBadge(handle) {
  if (!handle) {
    toast.error("Error getting reviews, handle is required")
    return false
  }

  const url = `https://judge.me/api/v1/widgets/preview_badge?api_token=${process.env.GATSBY_JUDGE_ME_PUBLIC_API_TOKEN}&shop_domain=${process.env.GATSBY_SHOPIFY_STORE_URL}&handle=${handle}`

  return await axios.get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.log("getProductPreviewBadge", error)
      toast.error("Error getting reviews, please try again")
    });
}

export async function getVerifiedReviewsCountBadge() {

  const url = `https://judge.me/api/v1/widgets/verified_badge?api_token=${process.env.GATSBY_JUDGE_ME_PUBLIC_API_TOKEN}&shop_domain=${process.env.GATSBY_SHOPIFY_STORE_URL}`

  return await axios.get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.log("getVerifiedReviewsCountBadge", error)
      toast.error("Error getting reviews, please try again")
    });
}

export async function getFeaturedReviewsCarousel() {

  const url = `https://judge.me/api/v1/widgets/featured_carousel?api_token=${process.env.GATSBY_JUDGE_ME_PUBLIC_API_TOKEN}&shop_domain=${process.env.GATSBY_SHOPIFY_STORE_URL}&per_page=5&review_type=product-reviews`

  return await axios.get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.log("getFeaturedReviewsCarousel", error)
      toast.error("Error getting reviews, please try again")
    });
}