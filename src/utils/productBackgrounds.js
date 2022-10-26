import SingleHammockBackground from "../assets/images/product-backgrounds/SingleHammockBackground.jpg"
import SinglePlusHammockBackground from "../assets/images/product-backgrounds/SinglePlusHammockBackground.jpg"
import LongHammockBackground from "../assets/images/product-backgrounds/LongHammockBackground.jpg"
import DoubleHammockBackground from "../assets/images/product-backgrounds/DoubleHammockBackground.jpg"

export const productBackgrounds = (handle) => {
  console.log(handle)

  switch (handle) {
    case "single-hammock":
      return `url(${SingleHammockBackground})`
    case "single-plus-hammock":
      return `url(${SinglePlusHammockBackground})`
    case "long-hammock":
      return `url(${LongHammockBackground})`
    case "double-hammock":
      return `url(${DoubleHammockBackground})`
    default:
      return null
  }
}
