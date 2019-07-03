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
    return (
      <Page slug='photography'>
        <div className='photography-selected-photo-wrapper'>
          <img src={this.state.selectedPhoto || this.props.data.allFlickrPhoto.edges[0].node.url_c} className='photography-selected-photo' />
        </div>
        <div className='photography-photos'>
          {
            this.props.data.allFlickrPhoto.edges.map((row, i) => {
              return (
                <button key={i} className='photography-photo-button' onClick={() => this.setState({selectedPhoto: row.node.url_c})} style={{backgroundImage: 'url(' + row.node.url_c + ')'}}>
                  <span className='sr-only'>Image {i}</span>
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
          description
          tags
          url_c
          width_c
          height_c
        }
      }
    }
  }
`