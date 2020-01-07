import React from 'react'
import Page from '../components/page'
import {
  Container
} from 'reactstrap'

export default ({data}) => {
  return (
    <Page slug='archive' title='Archive'>
      <Container>
        {
          data.allMarkdownRemark.edges.map(({node}) => {
            console.log(node)
            const dateparts = node.fields.date.split('-').map(d => parseInt(d,10))
            const date = new Date(dateparts[0], dateparts[1] - 1, dateparts[2])
            return (
              <article>
                <h2>
                  <a href={`${node.fields.slug}`}>
                    { node.frontmatter.title }
                  </a>
                </h2>
                <h3 className='small'>
                  { date.toLocaleDateString() }
                </h3>
                <p>
                  { node.frontmatter.description }
                </p>
              </article>
            )
          })
        }
      </Container>
    </Page>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [fields___date] }) {
      edges {
        node {
          fields {
            slug,
            date
          },
          frontmatter {
            title,
            description
          }
        }
      }
    }
  }
`
