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
                      <ul>
                        { section.node.items.map((item, k) => (
                          <li key={k}>
                            <a href={item.url} target='_blank' rel='noopener noreferrer'>{item.label}</a>
                            { item.note && (<span> ({item.note})</span>) }
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                  </Card>
                </Col>
              )) }
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
          items {
            url,
            label,
            note
          }
        }
      }
    }
  }
`
