import React from 'react'

interface PageProps {params: any}

const Page: React.FC<PageProps>  = ({params}) => {
  return (
    <div>
      user home : {params.id}
    </div>
  )
}

export default Page
