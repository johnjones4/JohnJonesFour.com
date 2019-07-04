import React from 'react'

export default ({ data, pathContext }) => {
  console.log(pathContext)
  const post = data.markdownRemark
  const { date } = pathContext
  return (
    <article>
      <header>
        <span className="fw3 gray f5">{date}</span>
        <h1 className="f3 fw3 f2-m fw2-m f1-l fw2-l mv1 db title-gradient">
          {post.frontmatter.title}{' '}
        </h1>
        <hr className="mv4 bb b--black-10" />
      </header>
      <section>
        <div
          className="post__body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </section>
    </article>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
