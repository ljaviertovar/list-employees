import React, { useEffect, useState, Fragment } from 'react';
import MaterialTable from 'material-table';
import { Modal, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'

const {columns, dataEmployees} = require('./localData');

const useStyles = makeStyles({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#fff',
    border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    padding: '1rem',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  }
});

function App() {

  const styles = useStyles();

  const [employees, setEmployees] = useState(dataEmployees);
  const [inserModal, setInserModal] = useState(false);


  const toggleModal = () => {
    setInserModal(!inserModal);
  }

  const bodyInsert = (
    <div className={styles.modal}>
      <h3>Agregar Nuevo Empleado</h3>
      <TextField className={styles.inputMaterial} label="Nombre" name="name" />
      <br />
      <TextField className={styles.inputMaterial} label="Apellido" name="surname" />
      <br />
      <TextField className={styles.inputMaterial} label="Edad" name="age" />
      <br />
      <TextField className={styles.inputMaterial} label="Empresa" name="company" readonly value="Brivé"/>
      <br />
      <TextField className={styles.inputMaterial} label="Salario" name="salary" />
      <br />
      <TextField className={styles.inputMaterial} label="Moneda" name="current" />
      <br /><br />
      <div align="right">
        <Button color="primary" >Agregar</Button>
        <Button onClick={() => toggleModal()}>Cancelar</Button>
      </div>
    </div>
  )

  return (
    <Fragment>
      <br />
      <Button
        onClick={() => toggleModal()}
      >Agregar Empleado
      </Button>
      <br />
      <br />
      <MaterialTable
        columns={columns}
        data={employees}
        title="Lista de empleados"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar empleado',
            onClick: (event, rowData) => alert('editando' + rowData.name)
          },
          {
            icon: 'delete',
            tooltip: 'Eliminar empleado',
            onClick: (event, rowData) => alert('eliminando' + rowData.name)
          }
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
        localization={{
          header: {
            actions: "Acciones"
          }
        }}
      />

      <Modal
      open={inserModal}
      onClose={toggleModal}
      >
        {bodyInsert}
      </Modal>
    </Fragment>
  );
}

export default App;
