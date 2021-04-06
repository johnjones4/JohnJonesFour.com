import React, { Component } from 'react'
import Page from '../components/page'
import {
  Container,
  Row,
  Col,
  Alert
} from 'reactstrap'
import './blog.scss'
import 'prismjs/themes/prism-solarizedlight.css'
// import 'github-repo-widget.js'

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

export default class Blog extends Component {

  componentDidMount() {
    // window.GithubRepoWidget.init()
  }

  render () {
    const { data, pathContext } = this.props
    const post = data.markdownRemark
    const { date } = pathContext
    const dateparts = date.split('-').map(d => parseInt(d,10))
    const dateObj = new Date(dateparts[0], dateparts[1] - 1, dateparts[2])
    return (
      <Page slug='blog' title={post.frontmatter.title} description={post.frontmatter.description}>
        <Container>
          <Row className='justify-content-md-center'>
            <Col lg='8'>
              <article className='blogpost'>
                <h1>{post.frontmatter.title}</h1>
                { post.frontmatter.description && (<h2>{post.frontmatter.description}</h2>) }
                <h3>
                  <small className="text-muted">
                    {months[dateObj.getMonth()]} {dateObj.getDate()}, {dateObj.getFullYear()}
                  </small>
                </h3>
                { post.frontmatter.note && (
                  <Alert color='dark'>
                    <span dangerouslySetInnerHTML={{ __html: post.frontmatter.note }} />    
                  </Alert>
                ) }
                { post.frontmatter.youtube && (
                  <div className='embed-responsive embed-responsive-16by9'>
                    <iframe title='Embedded video' className='embed-responsive-item' src={`https://www.youtube.com/embed/${post.frontmatter.youtube}?rel=0`} allowFullScreen></iframe>
                  </div>
                ) }
                <div
                  className='post__body'
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
                  <div className='github-widget' data-repo={post.frontmatter.github} />
                ) }
                { post.frontmatter.githubs && (
                  <div>
                    { post.frontmatter.githubs.map((github, i) => (<li>
                      <div className='github-widget' data-repo={github} key={i} />
                    </li>)) }
                  </div>
                ) }
              </article>
            </Col>
          </Row>
        </Container>
      </Page>
    )
  }
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
        githubs,
        youtube,
        note
      }
    }
  }
`
