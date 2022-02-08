import React, { useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import {DefaultDescription, DefaultTitle} from '../../consts'
import { ping } from '../../util'

interface OuterPageProps {
  children: any
  title?: string
  description?: string
  canonical?: string
}

const OuterPage = (props: OuterPageProps) => {
  useEffect(() => {
    ping()
  }, [])
  return (
    <HelmetProvider>
      <Helmet>
        <title>{props.title ? `${props.title} | ` : ''}{DefaultTitle}</title>
        <meta
          name='description'
          content={props.description ? props.description : DefaultDescription}
        />
        <link 
          rel='canonical' 
          href={props.canonical ? `https://johnjonesfour.com${props.canonical}` : window.location.href}
        />
      </Helmet>
      {props.children}
    </HelmetProvider>
  )
}

export default OuterPage
