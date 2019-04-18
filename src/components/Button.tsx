import React from 'react'

export default function Button(props: any) {
  return (
    <div>
      <a
        href={props.url}
        className={
          'bg-' +
          props.color +
          ' inline-block text-xs px-6 py-3 leading-none rounded-full uppercase text-white mt-4 md:mt-0'
        }
      >
        {props.children}
      </a>
    </div>
  )
}
