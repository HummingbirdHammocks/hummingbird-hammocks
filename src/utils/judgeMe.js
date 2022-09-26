import axios from "axios"
import { toast } from "react-toastify"


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