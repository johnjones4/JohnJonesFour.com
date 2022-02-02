import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import {DefaultDescription, DefaultTitle} from '../../consts'

interface PageProps {
  children: any
  slug: string
  title?: string
  description?: string
}

const Page = (props: PageProps) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{props.title ? `${props.title} | ` : ''}{DefaultTitle}</title>
        <meta
          name="description"
          content={props.description ? props.description : DefaultDescription}
        />
      </Helmet>
      <div className={['page', `page-${props.slug}`].join(' ')}>
        <Header />
        <div role='main'>
          {props.children}
        </div>
        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default Page
