import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

interface PageProps {
  children: any
  slug: string
}

const Page = (props: PageProps) => {
  return (
    <div className={['page', `page-${props.slug}`].join(' ')}>
      <Header />
      <div role='main'>
        {props.children}
      </div>
      <Footer />
    </div>
  )
}

export default Page
