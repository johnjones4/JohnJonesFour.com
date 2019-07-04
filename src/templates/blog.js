import React from 'react'
import Page from '../components/page'
import {
  Container
} from 'reactstrap'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export default ({ data, pathContext }) => {
  console.log(pathContext)
  const post = data.markdownRemark
  const { date } = pathContext
  const dateObj = new Date(Date.parse(date))
  console.log(post)
  return (
    <Page slug='blog' title={post.frontmatter.title} description={post.frontmatter.description}>
      <Container>
        <article>
          <h1>{post.frontmatter.title}</h1>
          { post.frontmatter.description && (<h2>{post.frontmatter.description}</h2>) }
          <h3>
            <small class="text-muted">
              {months[dateObj.getMonth()]} {dateObj.getDate()}, {dateObj.getFullYear()}
            </small>
          </h3>
          <div
            className="post__body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <hr/>
          { post.frontmatter.links && (
            <div>
              <h4>Links:</h4>
              <ul>
                { post.frontmatter.links.map(({src, name}, i) => (<li>
                  <a href={src} target='_blank' rel='noopener noreferrer'>{name}</a>
                </li>)) }
              </ul>
            </div>
          ) }
          { post.frontmatter.github && (
            <div>
              <p>
                <strong>GitHub Project: </strong>
                <a href={'https://github.com/' + post.frontmatter.github} rel='noopener noreferrer'>
                  {'https://github.com/' + post.frontmatter.github}
                </a>
              </p>
            </div>
          ) }
          { post.frontmatter.githubs && (
            <div>
              <h4>GitHub Projects:</h4>
              <ul>
                { post.frontmatter.githubs.map((github, i) => (<li>
                  <a href={'https://github.com/' + github} target='_blank' rel='noopener noreferrer'>
                    {'https://github.com/' + github}
                  </a>
                </li>)) }
              </ul>
            </div>
          ) }
        </article>
      </Container>
    </Page>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title,
        description,
        links {
          src,
          name
        },
        github,
        githubs
      }
    }
  }
`
