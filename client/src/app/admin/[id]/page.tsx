import React from 'react'

interface PageProps {params: any}

const Page: React.FC<PageProps>  = ({params}) => {
  return (
    <div>
      admin home : {params.id} 
    </div>
  )
}

export default Page
