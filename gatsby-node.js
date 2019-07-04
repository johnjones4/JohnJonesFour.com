const path = require('path')
const slugify = require('slug')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    const [, date, title] = slug.match(/^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/)
    const value = `/${slugify([date].join('-'), '/')}/${title}/`
    createNodeField({ node, name: `slug`, value })
    createNodeField({ node, name: `date`, value: date })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blog.js`)

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug,
              date
            },
            frontmatter {
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      console.log(result)
      return Promise.reject(result.errors)
    }

    return result.data.allMarkdownRemark.edges.forEach(({node}) => {
      createPage({
        path: node.fields.slug,
        component: blogPostTemplate,
        context: {
          // Data passed to context is available in page queries as GraphQL variables.
          slug: node.fields.slug,
          date: node.fields.date
        },
})
    })
  })
}
