import React from 'react'
import { Row, Col, Container, Card, CardTitle, CardBody, CardText } from 'reactstrap'
import Page from '../../components/Page/Page'

const Experience = () => {
  return (
    <Page slug='experience' title='Experience'>
      <Container className='container-content' tag='article'>
        <h1>Experience</h1>
        <Row>
          <Col md='8'>
            <h2>Work</h2>
            <section>
              <h3>The Capital One Lab</h3>
              <ul>
                <li>2021 - Present: Senior Engineering Manager</li>
                <li>2020 - 2021: Engineering Manager</li>
              </ul>
            </section>
            <section>
              <h3>The Case Foundation</h3>
              <ul>
                <li>2017-2019: VP, Technology</li>
              </ul>
            </section>
            <section>
              <h3>Adfero</h3>
              <ul>
                <li>2015 - 2016: Director, Technology</li>
                <li>2012 - 2015: Senior Technologist</li>
                <li>2011 - 2012: Developer</li>
              </ul>
            </section>
            <h2>Education</h2>
            <section>
              <h3>Dickinson College</h3>
              <ul>
                <li>2011: BS, Computer Science</li>
              </ul>
            </section>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <CardTitle tag="h2">
                  Skills
                </CardTitle>
                <ul>
                  <li>Technical team leadership</li>
                  <li>Strong writer and presenter, with both peers and executive audiences</li>
                  <li>Full-stack engineer, with some hardware experience</li>
                  <li>Proficient in multiple languages including: Javascript, Python, Java, Swift, Kotlin, Go, HTML/CSS</li>
                  <li>AWS Certified Solutions Architect</li>
                </ul>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <CardTitle tag="h2">
                  Media &amp; Publications
                </CardTitle>
                <ul>
                  <li>
                    <a href='https://www.youtube.com/watch?v=JH-MxnDnmGw' target='_blank' rel="noreferrer">
                      The Pi Cast: Pi-powered Rockets, Cyberpunk 2077 Pi Mod, Pi Gifting
                    </a>
                  </li>
                  <li>
                    <a href='https://hackernoon.com/open-source-will-define-this-era-as-a-modern-renaissance-011e2g0y' target='_blank' rel="noreferrer">
                      Open Source Will Define This Era as A Modern Renaissance
                    </a>
                  </li>
                  <li>
                    <a href='https://ssir.org/articles/entry/open_source_software_is_philanthropy' target='_blank' rel="noreferrer">
                      Open Source Software Is Philanthropy
                    </a>
                  </li>
                  <li>
                    <a href='https://www.technative.io/_theinitialcommit-exploring-the-people-behind-the-open-source-projects' target='_blank' rel="noreferrer">
                    _TheInitialCommit: Exploring the People Behind the Open Source Projects
                    </a>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Page>
  )
}

export default Experience
