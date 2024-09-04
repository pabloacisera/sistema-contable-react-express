import React from 'react'
import { useParams } from 'react-router-dom'

function Ventas() {

  const {id} = useParams()

  console.log("Este es el id que vino de otro componente: ", id)

  return (
    <div>Ventasid</div>
  )
}

export default Ventas