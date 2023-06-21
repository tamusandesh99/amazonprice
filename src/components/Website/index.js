import React from 'react'
import './index.scss'

const SingleWebsite = ({websiteUrl}) => {
  return (
    <>
    <div className='single-website-owner'>
    <iframe
        src={websiteUrl}
      />
    </div>
    </>
  )
}

export default SingleWebsite