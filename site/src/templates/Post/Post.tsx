import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Page from '../../components/Page/Page'
import {
  Alert,
  Container
} from 'reactstrap'
import Prism from 'prismjs'

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
    <Page slug='post' title={post.title} description={post.description}>
      <div className='py-5 mb-5 text-center bg-light'>
        <h1 className='col-lg-6 mx-auto display-5'>{post.title}</h1>
        <h4>{new Date(Date.parse(post.date)).toLocaleDateString()}</h4>
        <div className='col-lg-6 mx-auto'>
          <p>{post.description}</p>
        </div>
      </div>
      <Container tag='article' fluid='sm' className='container-content'>
        { post.note && (
          <Alert color='dark'>
            <span dangerouslySetInnerHTML={{ __html: post.note }} />    
          </Alert>
        ) }
        { post.youtube && (
          <div className='ratio ratio-16x9'>
            <iframe title='Embedded video' className='embed-responsive-item' src={`https://www.youtube.com/embed/${post.youtube}?rel=0`} allowFullScreen></iframe>
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
  )
}

export default Post
