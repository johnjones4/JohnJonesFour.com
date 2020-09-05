import React, {Component} from 'react'
import Page from '../components/page'
import { graphql } from 'gatsby'
import './photography.scss'
import {
  Container,
  Row,
  Col
} from 'reactstrap'
import prefetchImages from 'prefetch-image'

export default class Photography extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedPhotoIndex: 0,
      category: null,
      categories: []
    }
    prefetchImages(this.props.data.allPhotographyJson.edges.map(({ node }) => `/photography/${node.filename}`))
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.categories || state.categories.length === 0) {
      state.categories = []
      props.data.allPhotographyJson.edges.forEach(({ node }) => {
        node.categories.forEach(category => {
          if (state.categories.indexOf(category) < 0) {
            state.categories.push(category)
          }
        })
      })
      state.categories.sort()
      return state
    }
    return null
  }

  getAvailablePhotos () {
    if (!this.state.category) {
      return this.props.data.allPhotographyJson.edges.map(({ node }) => node)
    }
    return this.props.data.allPhotographyJson.edges.filter(({ node }) => node.categories.indexOf(this.state.category) >= 0).map(({ node }) => node)
  }

  render () {
    const photos = this.getAvailablePhotos()
    const index = this.state.selectedPhotoIndex
    if (index >= photos.length) {
      return null
    }
    const photo = photos[index]
    const next = index < photos.length - 1 ? photos[index + 1] : null
    const previous = index > 0 ? photos[index - 1] : null
    return (
      <Page slug='photography' title='Photography'>
        <Container fluid>
          <Row className='photography-gallery'>
            <Col sm={{ size: 12, order: 1 }} md={{ size: 10, order: 2 }} className='photography-col' >
              <img className='photography-photo' src={`/photography/${photo.filename}`} alt={photo.caption} />
            </Col>
            <Col xs={{ size: 6, order: 2 }} sm={{ size: 6, order: 2 }}  md={{ size: 1, order: 1 }} className='photography-col'>
              { previous && (<button
                className='photography-button photography-button-previous'
                onClick={() => this.setState({selectedPhotoIndex: this.state.selectedPhotoIndex - 1})} 
                style={{
                  backgroundImage: previous ? `url('/photography/${previous.filename}')` : null
                }}
              >
                Previous
              </button>) }
            </Col>
            <Col xs={{ size: 6, order: 2 }}  sm={{ size: 6, order: 2 }}  md={{ size: 1, order: 3 }} className='photography-col'>
              {next && (<button
                className='photography-button photography-button-next'
                onClick={() => this.setState({selectedPhotoIndex: this.state.selectedPhotoIndex + 1})} 
                style={{
                  backgroundImage: next ? `url('/photography/${next.filename}')` : null
                }}
              >
                Next
              </button>) }
            </Col>
            <div className='photography-counter'>
              { index + 1 } / { photos.length }
            </div>
          </Row>
          <div className='photography-categories'>
            <button className={`photography-category${!this.state.category ? ' active' : ''}`} onClick={() => this.setState({
              category: null,
              selectedPhotoIndex: 0
            })}>
              All
            </button>
            { this.state.categories.map((category) => (
              <button className={`photography-category${category === this.state.category ? ' active' : ''}`} key={category} onClick={() => this.setState({
                category,
                selectedPhotoIndex: 0
              })}>
                {category}
              </button>
            ))}
          </div>
        </Container>
      </Page>
    )
  }
}

export const query = graphql`
  query {
    allPhotographyJson {
      edges {
        node {
          caption
          categories
          filename
        }
      }
    }
  }
`
