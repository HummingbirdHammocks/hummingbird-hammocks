import SingleHammockBackground from "../assets/images/product-backgrounds/SingleHammockBackground.jpg"
import SinglePlusHammockBackground from "../assets/images/product-backgrounds/SinglePlusHammockBackground.jpg"
import LongHammockBackground from "../assets/images/product-backgrounds/LongHammockBackground.jpg"
import DoubleHammockBackground from "../assets/images/product-backgrounds/DoubleHammockBackground.jpg"
import TreeStrapsBackground from "../assets/images/product-backgrounds/TreeStrapsBackground.jpg"
import TreeStraps2InchBackground from "../assets/images/product-backgrounds/TreeStraps2InchBackground.jpg"
import TreeStrapsPlusBackground from "../assets/images/product-backgrounds/TreeStrapsPlusBackground.jpg"
import TreeStrapsPlus2InchBackground from "../assets/images/product-backgrounds/TreeStrapsPlus2InchBackground.jpg"
import ExtensionsBackground from "../assets/images/product-backgrounds/ExtensionsBackground.jpg"
import WallHangingKitBackground from "../assets/images/product-backgrounds/WallHangingKitBackground.jpg"

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
    case "tree-straps":
      return `url(${TreeStrapsBackground})`
    case "tree-straps-2-inch":
      return `url(${TreeStraps2InchBackground})`
    case "tree-straps-plus":
      return `url(${TreeStrapsPlusBackground})`
    case "tree-straps-plus-2-inch":
      return `url(${TreeStrapsPlus2InchBackground})`
    case "tree-strap-extensions":
      return `url(${ExtensionsBackground})`
    case "wall-hanging-kit":
      return `url(${WallHangingKitBackground})`
    default:
      return null
  }
}
