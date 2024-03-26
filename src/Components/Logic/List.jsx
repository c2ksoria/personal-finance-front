import React, { useEffect, useState } from 'react'
import { Delete, Edit} from '@mui/icons-material'
import { Query, addMovement, updateMovement, deleteMovement, getRandom, getConfig } from '../Logic/Query'
import { Alerts, AlertConfigAssets } from '../Logic/Alerts'
import { Table, Button, Modal, Form, InputGroup, Row, Col, Card } from 'react-bootstrap'
import FormatDate from '../Logic/Auxiliar'

//This component has all the logic of CRUD proccess movements. Include verifications of errors. All data are shower in a table.
function List() {
    let AlertAssets = AlertConfigAssets()
    
    //Function to calculate and show the mathematical balance of movements
    function Balance({ data }) {
        let total = 0.0;
        
        data.forEach((item) => {
            if (item['Type'] === 'Gasto') {
                total = total - (+item['Qty']);
            } else if (item['Type'] === 'Ingreso') {
                total= total + (+item['Qty']);
            }
        });
    
        let h4;
        if (total > 0) {
            h4 = <Card.Body style={{ backgroundColor: 'green' }}>{total.toFixed(2)}</Card.Body>;
        } else {
            h4 = <Card.Body style={{ backgroundColor: 'red' }}>{total.toFixed(2)}</Card.Body>;
        }
        return (
            <Card>
                <Card.Header>Balance</Card.Header>
                {h4}
            </Card>
        );
    }

    //Function called from buttons by each row of movement, who setup Alert componente
    async function deleteItem (id) {
        setAlert(false)
        await deleteOneItem(id).then(resp => SetAlertConfig(resp)).then(setAlert(true))
        await updateMovements()
    }

    //Async Function for delete individual item, return the correct response in case of succefully or not
    async function deleteOneItem(id){
        let alertNewStatus = AlertAssets[3].DeleteRegister
        await deleteMovement(id).then(response => {
            if (response.success) {
                alertNewStatus.textBody= response.message 
            }
            else {
                alertNewStatus = AlertAssets[4].UnesptedError
                alertNewStatus.textBody = response.message
            }
        })
    return alertNewStatus
    }

    //Main function for update all movements in List. Handle of errors are included
    async function updateMovements () {
        await Query().then(response => {
            if (response.success) {
                setData(response.data)
            }
            else {
                AlertAssets[4].UnesptedError.textBody = response.message
                SetAlertConfig(AlertAssets[4].UnesptedError)
            }
        })
    }

    //This function is used for initialize the modal component with the correct data for update each movement individualy. It called from buttons by each row of movement. 
    function updateItem(id) {
        let temp = {}
        setAlert(false)
        setIsNew(false)
        temp = data.filter(function (item) {
            return item.id === id
        })
        setModalShow(true)
        setTemporal(temp[0])
        temp ={}
    }
    const [modalShow, setModalShow] = useState(false)
    const [temporal, setTemporal] = useState(null)
    const [config, setConfig] = useState([])
    const [isNew, setIsNew] = useState(true)
    const [alert, setAlert] = useState(false)
    const [alertConfig, SetAlertConfig] = useState("")
    const [data, setData] = useState(null)
    
    //
    const newRegister = () => {
        setAlert(false)
        setIsNew(true)
        setTemporal({})
        setModalShow(true)
    }

    //ESTO lo tengo que revisar....
    async function generateRandom (qty) {
        await getRandom(qty).then(resp => {
            if (resp.success) {
                updateMovements()
            }
        })
    }

    //This function is only for testing proccess, it must be deleted o disabled on production
    const checkEstados = () => {
        console.log("Modal: ", modalShow)
        console.log("Temporal: ", temporal)
        console.log("Config: ", config)
        console.log("isNew: ", isNew)
        console.log("alert: ", alert)
        console.log("alertConfig: ", alertConfig)
        console.log("data: ", data)
    }

    //Component Modal that can add or update movements
    const MyVerticallyCenteredModal = (props) => {
        const [toSave, setToSave] = useState(initState)
        const categories = config[0].Categories
        const types = config[1].Type
        function initState() {
            let actualDate = FormatDate(new Date())
            if (isNew) {
                return { qty: 0.1, date: actualDate, details: "", type: 1, category: 1 }
            }
            else {
                return { qty: temporal.Qty, date: temporal.Date, details: temporal.Details, type: temporal.movType, category: temporal.movCategory, id: temporal.id }
            }
        }

        const updateData = (info) => {
            setToSave({ ...toSave, [info.name]: info.value })
        }
        async function proccessUpdateOrDelete() {
            let alertNewStatus = AlertAssets[0].NewRegisterOk
            if (isNew) {
                await addMovement(toSave).then(response => {
                    if (response.success) {
                        alertNewStatus.textBody = response.message
                    }
                    else {
                        alertNewStatus = AlertAssets[1].NewRegisterError
                        alertNewStatus.textBody = response.message
                    }
                })
            }
            else if (!isNew) {
                await updateMovement(toSave).then(response => {
                    if (response.success) {    
                        alertNewStatus = AlertAssets[2].EditRegister
                        alertNewStatus.textBody = response.message
                        
                    }
                    else {
                        alertNewStatus = AlertAssets[1].NewRegisterError
                        alertNewStatus.textBody = "No fue posible almacenar la información debido a uno o más errores. "+response.message.sqlMessage
                    }
                })
            }
            return alertNewStatus
        }

        async function saveData(event) {
            event.preventDefault()
            setModalShow(false)
            await proccessUpdateOrDelete().then(resp => SetAlertConfig(resp)).then(setAlert(true))
            await updateMovements()
            setTemporal({})
        }
        const handleSubmit = (event) => {
            event.preventDefault()
        }
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                className="bg-dark text-dark "
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {isNew ? "Nuevo Registro" : "Editar registro"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={handleSubmit}>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">Fecha</InputGroup.Text>
                            <Form.Control type="date" name='date' onChange={(e) => updateData(e.target)} value={toSave.date} />
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3" >
                            <InputGroup.Text id="inputGroup-sizing-sm">Categoría</InputGroup.Text>
                            <Form.Select name='category' onChange={(e) => updateData(e.target)} value={toSave.category}>
                                {
                                    categories.map((item) => {
                                        return (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3" >
                            <InputGroup.Text id="inputGroup-sizing-sm">Tipo de Gasto</InputGroup.Text>
                            <Form.Select name='type' onChange={(e) => updateData(e.target)} value={toSave.type}>
                                {
                                    types.map((item) => {
                                        return (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">Monto</InputGroup.Text>
                            <Form.Control type="number" min={0} step={0.01} name='qty' defaultValue={toSave.qty} onChange={(e) => updateData(e.target)} />
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">Detalle</InputGroup.Text>
                            <Form.Control as="textarea" rows={3} name='details' onChange={(e) => updateData(e.target)} value={toSave.details} />
                        </InputGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={(event) => saveData(event)}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    useEffect(() => {

        getConfig().then(response => {
            if (response.success) {
                setConfig(response.data)
            }
            else {
                AlertAssets[4].UnesptedError.textBody = response.message
                SetAlertConfig(AlertAssets[4].UnesptedError)
                setAlert(true)
            }
        })
            .then(updateMovements())

    }, [])
    return (
        <div className='container'>
            {
                alert && <Alerts config={alertConfig} cerrar={() => setAlert(false)} />
            }

            <Row>
                <Col sm={2}>
                    <Button onClick={() => newRegister()}>
                        Agregar Registro 
                    </Button>
                    <br/>
                    <Button onClick={() => generateRandom(15)}>
                        Generar Registros
                    </Button>
                    <br/>
                    <Button onClick={() => checkEstados()}>
                        Chequear estados 
                    </Button>
                </Col>
                <Col xs={8}>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Detalle</th>
                                <th>Categoría</th>
                                <th>Tipo</th>
                                <th>Fecha</th>
                                <th>Montos</th>
                                <th>Acciones</th>

                            </tr>
                        </thead>

                        <tbody>
                            {
                                data && data.map((item, key) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>
                                                {item.id}
                                            </td>
                                            <td>
                                                {item.Details}
                                            </td>
                                            <td>
                                                {item.Category}
                                            </td>
                                            <td>
                                                {item.Type}
                                            </td>
                                            <td>
                                                {item.Date}
                                            </td>
                                            <td>
                                                {item.Qty}
                                            </td>
                                            <td>
                                                <Row>
                                                    <Col>
                                                        <Delete onClick={() => deleteItem(item.id)} />
                                                    </Col>
                                                    <Col>
                                                        <Edit onClick={() => updateItem(item.id)} />
                                                    </Col>
                                                </Row>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
                <Col xs={2}>
                    <>
                    {
                        data &&  <Balance data={data} /> 
                    }
                    </>
                </Col>
            </Row>

            <>
                {
                    temporal &&
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                }
            </>
        </div>
    )
}
export default List