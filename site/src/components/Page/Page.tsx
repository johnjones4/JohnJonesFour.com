import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import OuterPage from '../OuterPage/OuterPage'

interface PageProps {
  children: any
  slug: string
  title?: string
  description?: string
  canonical?: string
}

const Page = (props: PageProps) => {
  return (
    <OuterPage title={props.title} description={props.description} canonical={props.canonical}>
      <div className={['page', `page-${props.slug}`].join(' ')}>
        <Header />
        <div role='main'>
          {props.children}
        </div>
        <Footer />
      </div>
    </OuterPage>
  )
}

export default Page
