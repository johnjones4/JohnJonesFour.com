import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import Page from '../../components/Page/Page'
import './photography.css'

interface Photo {
  filename: string
  categories: string[]
  caption: string
}

interface Selection {
  index: number
  category: string | null
}

const Photography = () => {
  const [photos, setPhotos] = useState([] as Photo[])
  const [selection, setSelection] = useState({
    index: 0,
    category: null
  } as Selection)
  const [categories, setCategories] = useState([] as string[])

  const loadPhotos = async () => {
    try {
      const resp = await fetch('/data/photos/metadata.json')
      const photos = await resp.json() as Photo[]
      setPhotos(photos)
      const categories: string[] = []
      photos.forEach(p => {
        const img = new Image()
        img.src = `/data/photos/${p.filename}`
        p.categories.forEach(c => {
          if (categories.indexOf(c) < 0) {
            categories.push(c)
          }
        })
      })
      setCategories(categories)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadPhotos()
  }, [])

  const filteredPhotos = (() => {
    if (!selection.category) {
      return photos
    }
    return photos.filter(p => p.categories.indexOf(selection.category as string) >= 0)
  })()

  if (selection.index >= filteredPhotos.length) {
    return null
  }
  const photo = filteredPhotos[selection.index]
  const next = selection.index < filteredPhotos.length - 1 ? filteredPhotos[selection.index + 1] : null
  const previous = selection.index > 0 ? filteredPhotos[selection.index - 1] : null

  
  return (
    <Page slug='photography' title='Photography'>
      <Container fluid className='container-photography'>
        <Row className='photography-gallery'>
          <Col sm={{ size: 12, order: 1 }} md={{ size: 10, order: 2 }} className='photography-col' >
            <img className='photography-photo' src={`/data/photos/${photo.filename}`} alt={photo.caption} />
          </Col>
          <Col xs={{ size: 6, order: 2 }} sm={{ size: 6, order: 2 }}  md={{ size: 1, order: 1 }} className='photography-col'>
            { previous && (<button
              className='photography-button photography-button-previous'
              onClick={() => setSelection({
                ...selection,
                index: selection.index - 1
              })} 
              style={{
                backgroundImage: previous ? `url('/data/photos/${previous.filename}')` : ''
              }}
            >
              Previous
            </button>) }
          </Col>
          <Col xs={{ size: 6, order: 2 }}  sm={{ size: 6, order: 2 }}  md={{ size: 1, order: 3 }} className='photography-col'>
            {next && (<button
              className='photography-button photography-button-next'
              onClick={() => setSelection({
                ...selection,
                index: selection.index + 1
              })} 
              style={{
                backgroundImage: next ? `url('/data/photos/${next.filename}')` : ''
              }}
            >
              Next
            </button>) }
          </Col>
        </Row>
        <div className='photography-counter'>
          { selection.index + 1 } / { filteredPhotos.length }
        </div>
        <div className='photography-categories'>
          <button className={`photography-category${!selection.category ? ' active' : ''}`} onClick={() => setSelection({
            index: 0,
            category: null
          })}>
            All
          </button>
          { categories.map((c) => (
            <button className={`photography-category${c === selection.category ? ' active' : ''}`} key={c} onClick={() => setSelection({
              index: 0,
              category: c
            })}>
              {c}
            </button>
          ))}
        </div>
      </Container>
    </Page>
  )
}

export default Photography
