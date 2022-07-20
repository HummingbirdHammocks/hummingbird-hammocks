import axios from "axios"

export default class JudgeMe {
  constructor(handle) {
    this.handle = handle
  }

  async getReviewWidget() {
    try {
      const { data } = await axios.get(
        `https://judge.me/api/v1/widgets/product_review?api_token=aDRUmgKuaN2wmnpgAdI9lTV-azU&shop_domain=${process.env.GATSBY_SHOPIFY_STORE_URL}&handle=${this.handle}`
      )

      return data
    } catch (error) {
      console.log(error)
    }
  }
}
