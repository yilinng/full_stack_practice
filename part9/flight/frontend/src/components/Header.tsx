import React from 'react'

interface HeaderProps {
  name: string;
}

export default function Header(props: HeaderProps ) {
  return <h1>{props.name}</h1>
}
