import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Container, Nav, NavItem } from 'reactstrap'
import Page from '../../components/Page/Page'
import './archive.css'

interface FeedItem {
  title: string,
  description: string,
  path: string,
  date: string
}

const perPage = 10

const Archive = () => {
  const [feed, setFeed] = useState([] as FeedItem[])
  const [page, setPage] = useState(0)
  const fetchFeed = async () => {
    try {
      const f = await fetch('/data/posts/feed.json')
      setFeed(await f.json())
    } catch(e) {
      console.error(e)
    }
  }
  useEffect(() => {
    fetchFeed()
  }, [])
  const getPage = (): FeedItem[] => {
    const start = perPage * page
    const end = start + perPage
    if (start >= feed.length) {
      return []
    }
    if (end > feed.length) {
      feed.slice(start)
    }
    return feed.slice(start, end)
  }
  const pages = Math.ceil(feed.length / perPage)
  return (
    <Page slug='archive'>
      <Container className='container-content'>
        <h1>Posts</h1>
        { getPage().map(item => {
          return (
            <Card key={item.path}>
              <CardBody>
                <CardTitle tag="h3">
                  <a href={item.path}>{item.title}</a>
                </CardTitle>
                <CardSubtitle tag='h4'>
                {new Date(Date.parse(item.date)).toLocaleDateString()}
                </CardSubtitle>
                <CardText>
                  <p>{item.description}</p>
                  <a href={item.path} className='btn btn-primary btn-sm'>Read More</a>
                </CardText>
              </CardBody>
            </Card>
          )
        }) }
        <Nav pills className='justify-content-center'>
          <NavItem>
            <button className={['nav-link', page === 0 ? 'disabled' : '' ].join(' ')} type='button' disabled={page === 0} onClick={() => setPage(page - 1)}>
              Previous
            </button>
          </NavItem>
          { Array.from({ length: pages }, (_, i) => i).map((pageN) => {
            return (
              <NavItem key={pageN}>
                <button className={['nav-link', page === pageN ? 'active disabled' : ''].join(' ')} type='button' disabled={page === pageN} onClick={() => setPage(pageN)}>
                  {pageN + 1}
                </button>
              </NavItem>
            )
          }) }
          <NavItem>
            <button className={['nav-link', page === pages - 1 ? 'disabled' : '' ].join(' ')} type='button' disabled={page === pages - 1} onClick={() => setPage(page + 1)}>
              Next
            </button>
          </NavItem>
        </Nav>
      </Container>
    </Page>
  )
}

export default Archive
