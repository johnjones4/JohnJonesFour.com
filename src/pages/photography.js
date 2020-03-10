import React, {Component} from 'react'
import Page from '../components/page'
import { graphql } from 'gatsby'
import './photography.scss'
import {
  Container,
  Col,
  Row,
} from 'reactstrap'

export default class Photography extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedPhoto: null
    }
  }

  selectPhoto (selectedPhoto) {
    this.setState({
      selectedPhoto
    })
  }

  render () {
    return (
      <Page slug='photography' title='Photography'>
        <Container fluid>
          <Row>
            {
              this.props.data.allFlickrPhoto.edges.map((row, i) => {
                return (
                  <Col lg='2' md='2' sm='3' xs='6' key={i}>
                    <button key={i} className='photography-photo-button' onClick={() => this.selectPhoto(this.props.data.allFlickrPhoto.edges[i])} style={{backgroundImage: 'url(' + row.node.url_z + ')'}}>
                      <span className='sr-only'>{row.node.title}</span>
                    </button>
                  </Col>
                )
              })
            }
          </Row>
        </Container>
        { this.state.selectedPhoto && (
          <div class='selected-photo-wrapper' onClick={() => this.selectPhoto(null)}>
            <button className='selected-photo-close' onClick={() => this.selectPhoto(null)}>&times;</button>
            <div class='selected-photo' style={{backgroundImage: 'url(' + this.state.selectedPhoto.node.url_l + ')'}}></div>
          </div>
        )}``
      </Page>
    )
  }
}

export const query = graphql`
  query PhotoQuery {
    allFlickrPhoto(limit:500) {
      edges {
        node {
          id
          title
          tags
          url_l
          url_z
          width_l
          height_l
        }
      }
    }
  }
`
