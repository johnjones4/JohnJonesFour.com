import React, {Component} from 'react'
import Page from '../components/page'
import { graphql } from 'gatsby'
import './photography.scss'

export default class Photography extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedPhoto: null
    }
  }

  componentWillReceiveProps (newProps) {
    console.log(newProps)
  }

  render () {
    const selectedPhoto = this.state.selectedPhoto || this.props.data.allFlickrPhoto.edges[0].node
    return (
      <Page slug='photography'>
        <div className='photography-selected-photo-wrapper'>
          <img width={selectedPhoto.width_l} height={selectedPhoto.height_l} src={selectedPhoto.url_l} className='photography-selected-photo' />
        </div>
        <div className='photography-photos'>
          {
            this.props.data.allFlickrPhoto.edges.map((row, i) => {
              return (
                <button key={i} className='photography-photo-button' onClick={() => this.setState({selectedPhoto: row.node})} style={{backgroundImage: 'url(' + row.node.url_z + ')'}}>
                  <span className='sr-only'>{row.node.title}</span>
                </button>
              )
            })
          }
        </div>
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