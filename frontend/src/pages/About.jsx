import React from 'react'
import { Navbar } from '../components/Navbar'

export const About = ({mail,name,photo}) => {
  return (
    <div>
      <Navbar loc="About" name={name} photo={photo} />

    </div>
  )
}
