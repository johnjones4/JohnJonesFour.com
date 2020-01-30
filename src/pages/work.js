import React from 'react'
import Page from '../components/page'
import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
} from 'reactstrap'
import { graphql } from 'gatsby'
import _ from 'lodash'
import './work.scss'

export default ({data}) => {
  data.allWorkJson.edges.sort((a, b) => {
    return a.node.sort - b.node.sort
  })
  return (
    <Page slug='work' title="What I've Done">
      <Container>
        <h1>What I've Done</h1>
        {
          _.chunk(data.allWorkJson.edges, 2).map((row, i) => (
            <Row key={i}>
              { row.map((section, j) => (
                <Col key={j}>
                  <Card>
                    <CardBody>
                      <h2>{section.node.label}</h2>
                      { section.node.items.map((item, k) => (
                        <div>
                          <a href={item.url} target='_blank' rel='noopener noreferrer'>
                            <h4>{item.label}</h4>
                          </a>
                          <h5 className='text-muted'>{ item.note && (<span> ({item.note})</span>) }</h5>
                          { item.teaser && (<p>{item.teaser}</p>) }
                        </div>
                      ))}
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          ))
        }
      </Container>
    </Page>
  )
}

export const query = graphql`
  query Query {
    allWorkJson {
      edges {
        node {
          label,
          sort,
          items {
            url,
            label,
            note,
            teaser
          }
        }
      }
    }
  }
`
