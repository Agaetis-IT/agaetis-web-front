import React from 'react'

export default function Button(props: any) {
  return (
    <div>
      <a
        href="#"
        className="bg-black inline-block text-xs px-6 py-3 leading-none rounded-full uppercase text-white mt-4 lg:mt-0"
      >
        {props.children}
      </a>
    </div>
  )
}
