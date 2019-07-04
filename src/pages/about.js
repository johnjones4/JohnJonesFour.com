import React from 'react'
import Page from '../components/page'
import {
  Container
} from 'reactstrap'

export default () => {
  return (
    <Page slug='about'>
      <Container>
        <h1>About</h1>
        <img src='/headshot.png' className='img-fluid img-content' alt='Headshot of me' />
        <p>John Jones is the Vice President of Interactive Strategies at the Case Foundation in Washington D.C. There, John leads technical strategy, interactive campaign development and the digital execution for the Foundation’s programs and movements. Digital pioneers Jean and Steve Case founded the Case Foundation in the 90s to invest in people and ideas that can change the world. Today, the Foundation focuses on three key pillars: revolutionizing the philanthropic sector, unleashing the power of entrepreneurship to create social change and igniting civic engagement through citizen-driven solutions.</p>
        <p>Prior to the Case Foundation, John was the director of technology at Adfero. At Adfero, he lead a development team who produced work for the firm’s private and public sector clients. At Adfero, John grew the development capabilities of the firm from small WordPress sites to enterprise-grade builds using technologies such as Drupal and Node.JS. In addition to his work lead the firm’s technical strategy, John also helped shape the long-term vision of the company through his role as a member of the firm’s execute team.</p>
        <p>Prior to Adfero, John was at EXTOL, International, a business integration firm located in his hometown of Pottsville, PA. There he was a member of the development team producing features for products in their core business line of Java EE based data integration tools.</p>
        <p>John is an avid public speaker and thought leader in the DC tech community. He has presented at Drupal GovCon, General Assembly, Campaigns & Elections CampaignTech and Adfero’s getSmart series. John maintains an app, Chef’s Hat, which was featured on Lifehacker and blog featuring notable open source contributors called _theInitialCommit.</p>
      </Container>
    </Page>
  )
}
