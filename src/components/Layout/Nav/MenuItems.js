// Menu Item
const menuItems = [
  {
    title: "Hammocks",
    url: "/collections/hammocks",
  },
  {
    title: "Tree Straps",
    url: "/collections/tree-straps",
  },
  {
    title: "Shelters",
    url: "/collections/shelter",
  },
  {
    title: "More Gear",
    url: "/collections/parts-and-accessories",
    submenu: [
      {
        title: "Accessories",
        url: "/collections/parts-and-accessories",
        submenu: [
          {
            title: "Hammock Accessories",
            url: "/collections/hammock-accessories",
          },
          {
            title: "Tree Strap Accessories",
            url: "/collections/tree-strap-accessories",
          },
          {
            title: "Shelter Accessories",
            url: "/collections/shelter-accessories",
          },
        ],
      },
      {
        title: "Care & Repair",
        url: "/collections/care-and-repair",
      },
      {
        title: "Apparel & Merch",
        url: "/collections/merchandise",
      },
      {
        title: "Bargain Bin",
        url: "/collections/bargain-bin",
      },
    ],
  },
  {
    title: "Explore",
    url: "/explore/",
    submenu: [
      {
        title: "About us",
        url: "/explore",
      },
      {
        title: "Contact us",
        url: "/contact-us",
      },
      {
        title: "Knowledgebase",
        otherUrl: "https://help.hummingbirdhammocks.com/",
      },

      {
        title: "Returns",
        otherUrl: "https://returns.hummingbirdhammocks.com/",
      },
    ],
  },
]

export default menuItems
