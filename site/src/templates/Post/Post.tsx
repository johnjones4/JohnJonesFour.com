import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Page from '../../components/Page/Page'
import {
  Alert,
  Container
} from 'reactstrap'
import Prism from 'prismjs'
import { Helmet, HelmetProvider } from 'react-helmet-async'

interface PostMetadata {
  title: string
  description: string
  content: string
  date: string
  note?: string
  youtube?: string
  links?: {
    src: string
    name: string
  }[]
  preview?: string
}

const Post = () => {
  const [post, setPost] = useState({} as PostMetadata);
  const {
    year,
    month,
    day,
    slug
  } = useParams()
  const fetchPost = async (postSlug: string) => {
    try {
      const post = await fetch(`/data/posts/${postSlug}.json`)
      setPost(await post.json())
      setTimeout(() => Prism.highlightAll(), 1000)
    } catch(e) {
      console.error(e)
    }
  }
  useEffect(() => {
    fetchPost(`${year}-${month}-${day}-${slug}`)
  }, [year, month, day, slug])
  return (
    <HelmetProvider>
      <Helmet>
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@johnjones4' />
        <meta name='twitter:creator' content='@johnjones4' />
        <meta name='twitter:title' content={post.title} />
        <meta name='twitter:description' content={post.description} />
        { post.preview && (
          <meta name='twitter:image' content={`https://johnjonesfour.com${post.preview}`} />
        )}
        <meta property='og:title' content={post.title} />
        <meta property='og:description' content={post.description} />
        { post.preview && (
          <meta property='og:image' content={`https://johnjonesfour.com${post.preview}`} />
        )}
      </Helmet>
      <Page slug='post' title={post.title} description={post.description} canonical={`/${year}/${month}/${day}/${slug}`}>
        <div className='py-5 mb-5 text-center bg-light'>
          <h1 className='col-lg-6 mx-auto display-5'>{post.title}</h1>
          <h4>{new Date(Date.parse(post.date)).toLocaleDateString()}</h4>
          <div className='col-lg-6 mx-auto'>
            <p>{post.description}</p>
          </div>
        </div>
        <Container tag='article' fluid='sm' className='container-content'>
          { post.note && (
            <div>
              <Alert color='dark'>
                <span dangerouslySetInnerHTML={{ __html: post.note }} />    
              </Alert>
            </div>
          ) }
          { post.youtube && (
            <div>
              <div className='ratio ratio-16x9'>
                <iframe title='Embedded video' className='embed-responsive-item' src={`https://www.youtube.com/embed/${post.youtube}?rel=0`} allowFullScreen></iframe>
              </div>
            </div>
          ) }
          <div dangerouslySetInnerHTML={{__html: post.content}} />
          { post.links && (
            <div>
              <h5>Links:</h5>
              <ul>
                { post.links.map(({src, name}, i) => (<li>
                  <a href={src} target='_blank' rel='noopener noreferrer'>{name}</a>
                </li>)) }
              </ul>
            </div>
          ) }
        </Container>
      </Page>
    </HelmetProvider>
  )
}

export default Post
