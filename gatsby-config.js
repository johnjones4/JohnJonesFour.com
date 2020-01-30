/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://www.johnjonesfour.com`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `./src/posts`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `json`,
        path: `./src/data/`
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: 'gatsby-source-flickr',
      options: {
        api_key: process.env.FLICKR_API_KEY,
        user_id: '28315761@N06',
        method: 'flickr.photosets.getPhotos',
        photoset_id: '72157712896159468',
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-23892666-1',
      },
    }
  ]
}
