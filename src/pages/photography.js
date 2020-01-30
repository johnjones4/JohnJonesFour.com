import React, {Component} from 'react'
import Page from '../components/page'
import { graphql } from 'gatsby'
import './photography.scss'
import _ from 'lodash'
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

  // setNextPhoto (index) {
  //   this.loadImages(index)
  //   if (index < 0 || index >= this.props.data.allFlickrPhoto.edges.length) {
  //     return
  //   }
  //   const nextPhoto = this.state.activePhoto === 'a' ? 'b' : 'a'
  //   const newSelectedPhotos = {}
  //   newSelectedPhotos[nextPhoto] = index
  //   this.setState({
  //     selectedPhotos: Object.assign({}, this.state.selectedPhotos, newSelectedPhotos),
  //     activePhoto: nextPhoto
  //   })
  //   const button = this.photographyPhotos.current.querySelectorAll('.photography-photo-button')[index]
  //   this.photographyPhotos.current.scroll({
  //     top: 0,
  //     left: button.offsetLeft - (window.innerWidth / 2) + (button.offsetWidth / 2),
  //     behavior: 'smooth'
  //   })
  // }

  // loadImages (baseIndex) {
  //   for (let i = Math.max(0, baseIndex - 10); i < Math.min(this.props.data.allFlickrPhoto.edges.length, baseIndex + 10); i++) {
  //     const url = this.props.data.allFlickrPhoto.edges[i].node.url_l
  //     if (this.preloadedImages.indexOf(url) <= 0) {
  //       const image = new Image()
  //       image.src = url
  //       this.preloadedImages.push(url)
  //     }
  //   }
  // }

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
                  <Col lg='1' md='2' sm='3' xs='6'>
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
            <div class='selected-photo' style={{backgroundImage: 'url(' + this.state.selectedPhoto.node.url_z + ')'}}></div>
          </div>
        )}
        {/* <div className='photography-selected-photo-wrapper'>
          <button onClick={() => this.setNextPhoto(this.state.selectedPhotos[this.state.activePhoto] - 1)} className={['photography-page-button','photography-page-button-previous','photography-page-button-' + (this.state.selectedPhotos[this.state.activePhoto] > 0 ? 'active' : 'inactive')].join(' ')}>
            <i className='fas fa-angle-left'>
              <span className='sr-only'>Page Left</span>
            </i>
          </button>
          <img width={selectedPhotoA && selectedPhotoA.width_l} 
              height={selectedPhotoA && selectedPhotoA.height_l} 
              src={selectedPhotoA && selectedPhotoA.url_l} 
              alt={selectedPhotoA && selectedPhotoA.title}
              className={['photography-photo','photography-selected-photo','photography-selected-photo-a','photography-selected-photo-' + (this.state.activePhoto === 'a' ? 'active' : 'inactive')].join(' ')} />
          <img 
              width={selectedPhotoB && selectedPhotoB.width_l} 
              height={selectedPhotoB && selectedPhotoB.height_l} 
              src={selectedPhotoB && selectedPhotoB.url_l} 
              alt={selectedPhotoB && selectedPhotoA.title}
              className={['photography-photo','photography-selected-photo','photography-selected-photo-b','photography-selected-photo-' + (this.state.activePhoto === 'b' ? 'active' : 'inactive')].join(' ')} />
          <button onClick={() => this.setNextPhoto(this.state.selectedPhotos[this.state.activePhoto] + 1)} className={['photography-page-button','photography-page-button-next','photography-page-button-' + (this.state.selectedPhotos[this.state.activePhoto] < this.props.data.allFlickrPhoto.edges.length - 1 ? 'active' : 'inactive')].join(' ')}>
            <i className='fas fa-angle-right'>
              <span className='sr-only'>Page Right</span>
            </i>
          </button>
        </div>
        <div className='photography-photos' id='photography-photos' ref={this.photographyPhotos}>
          {
            this.props.data.allFlickrPhoto.edges.map((row, i) => {
              return (
                <button key={i} className={['photography-photo','photography-photo-button','photography-photo-button-' + (this.state.selectedPhotos[this.state.activePhoto] === i ? 'active' : 'inactive')].join(' ')} onClick={() => this.setNextPhoto(i)} style={{backgroundImage: 'url(' + row.node.url_z + ')'}}>
                  <span className='sr-only'>{row.node.title}</span>
                </button>
              )
            })
          }
        </div> */}
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
