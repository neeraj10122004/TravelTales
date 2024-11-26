import React from 'react'
import { Navbar } from '../components/Navbar'

export const Userpage = ({mail,name,photo}) => {
  return (
    <div>
      <Navbar loc="Userpage" name={name} photo={photo}/>
    </div>
  )
}
