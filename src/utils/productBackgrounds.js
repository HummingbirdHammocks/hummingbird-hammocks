import SingleHammockBackground from "../assets/images/product-backgrounds/SingleHammockBackground.jpg"

export const productBackgrounds = (handle) => {
  console.log(handle)

  switch (handle) {
    case "single-hammock":
      return `url(${SingleHammockBackground})`
    default:
      return null
  }
}
