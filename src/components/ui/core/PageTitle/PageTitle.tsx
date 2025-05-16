import Link from 'next/link'
import React from 'react'

type PageTitle = {
  title:string;
  link:string;
}

const PageTitle = ({title,link}:PageTitle) => {
  return (
    <div>
       <div
      style={{
        backgroundImage: 'url("/teambg.jpg")',
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      backgroundSize: "cover"
      }}
      className="py-[200px] flex justify-center items-center flex-col"
    >
      <h2 className="text-5xl flex justify-center text-white gap-2 items-center font-bold mb-4 text-center">
        <span>
          Our <span className="text-yellow-500">{title}</span>
        </span>
      </h2>
      <div className="text-white flex gap-3">
        <Link href={link} className="text-white hover:text-green-500">
          HOME
        </Link>
        <span>/</span>
        <span className="uppercase">{title}</span>
      </div>
    </div>
    </div>
  )
}

export default PageTitle
