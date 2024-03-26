import React from 'react'
import { Alert } from 'react-bootstrap'

//Component who alerts to the end user when the interaction with db is realized
const Alerts = (props) => {
  return (
    <>
      <Alert variant={props.config.variant} dismissible onClose={props.cerrar}>
        <Alert.Heading>{props.config.textHeader}</Alert.Heading>
        <p>
          {props.config.textBody}
        </p>
      </Alert>
    </>
  )
}

//List of assets default responses, you can change or add anothers
function AlertConfigAssets() {
  let AlertAssets = [{
    "NewRegisterOk": {
      'textHeader': "Felicidades",
      'variant': 'success',
      'textBody': 'Has creado un nuevo registro satisfactoriamente',
    },
  },
  {
    "NewRegisterError": {
      'textHeader': "Error",
      'variant': 'danger',
      'textBody': 'Hubo un error, intentalo nuevamente por favor',
    },
  },
  {
    "EditRegister": {
      'textHeader': "Felicidades",
      'variant': 'success',
      'textBody': 'Has editado el registro satisfactoriamente',
    },
  },
  {
    "DeleteRegister": {
      'textHeader': "Felicidades",
      'variant': 'success',
      'textBody': 'Has Eliminado el registro satisfactoriamente',
    },
  },
  {
    "UnesptedError": {
      'textHeader': "Lo sentimos mucho",
      'variant': 'danger',
      'textBody': 'Hubo un problema, favor de contactactate con el administrador',
    },
  }]
  return AlertAssets
}

export { Alerts, AlertConfigAssets };