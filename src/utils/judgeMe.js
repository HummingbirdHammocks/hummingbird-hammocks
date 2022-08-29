import axios from "axios"

export default class JudgeMe {
  constructor(handle) {
    this.handle = handle
  }

  async getReviewWidget() {
    try {
      const { data } = await axios.get(
        `https://judge.me/api/v1/widgets/product_review?api_token=${process.env.JUDGEME_API_TOKEN}&shop_domain=${process.env.GATSBY_SHOPIFY_STORE_URL}&handle=${this.handle}`
      )

      return data
    } catch (error) {
      console.log(error)
    }
  }

  async getPreviewBadge() {
    const { data } = await axios.get(
      `https://judge.me/api/v1/widgets/preview_badge?api_token=${process.env.JUDGEME_API_TOKEN}&shop_domain=${process.env.GATSBY_SHOPIFY_STORE_URL}&handle=${this.handle}`
    )

    return data
  }
  catch(error) {
    console.log(error)
  }
}
