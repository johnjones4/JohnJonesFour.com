import React, { useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import {DefaultDescription, DefaultTitle} from '../../consts'
import { ping } from '../../util'

interface OuterPageProps {
  children: any
  title?: string
  description?: string
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
          name="description"
          content={props.description ? props.description : DefaultDescription}
        />
      </Helmet>
      {props.children}
    </HelmetProvider>
  )
}

export default OuterPage
