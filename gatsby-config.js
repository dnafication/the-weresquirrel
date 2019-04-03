module.exports = {
  siteMetadata: {
    title: `Jacques' journal`,
    description: `The journal of Jacques, the weresquirrel`,
    author: `@dnafication`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // {
    //   resolve: `@wapps/gatsby-plugin-fonts`,
    //   options: {
    //     googleFonts: {
    //       families: ["Germania One", "Merriweather", "Inconsolata"],
    //     },
    //   },
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `jacques-the-weresquirrel`,
        short_name: `the-weresquirrel`,
        start_url: `/`,
        background_color: `#f2cb13`,
        theme_color: `#f2cb13`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    "gatsby-plugin-offline",
  ],
}
