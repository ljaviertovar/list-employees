import React, { useEffect, useState, Fragment } from 'react';
import MaterialTable from 'material-table';
import { Modal, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'

const { columns, dataEmployees } = require('./localData');

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

  const [employees, setEmployees] = useState([]);
  const [inserModal, setInserModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({
    "name": "",
    "surname": "",
    "age": "",
    "company": "Brivé",
    "salary": "",
    "current": ""
  });

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    setEmployees(dataEmployees);
  }

  const handleEmployee = e => {

    const { name, value } = e.target;

    setSelectedEmployee(prveState => ({
      ...prveState,
      [name]: value
    }));

  }

  const selectEmployee = (employee, type) => {
    setSelectedEmployee(employee);
    (type === 'Edit')
      ? toggleUpdateModal()
      : toggleDeleteModal();
  }

  const postData = (lastEmp) => {

    setEmployees(employees.concat(selectedEmployee));
    toggleInsertModal();
  }

  const putData = () => {

    let newDataEmployees = employees;

    newDataEmployees.map(emp => {

      if (emp.tableData.id === selectedEmployee.tableData.id) {
        emp.name = selectedEmployee.name;
        emp.surname = selectedEmployee.surname;
        emp.age = selectedEmployee.age;
        emp.company = selectedEmployee.company;
        emp.salary = selectedEmployee.salary;
        emp.current = selectedEmployee.current;

      }
    });

    setEmployees(newDataEmployees);
    toggleUpdateModal();
  }

  const deleteData = () => {

    let newDataEmployees = employees;

    setEmployees(newDataEmployees.filter(emp => emp.tableData.id !== selectedEmployee.tableData.id));
    toggleDeleteModal();
  }

  const toggleInsertModal = () => {
    setInserModal(!inserModal);
  }

  const toggleUpdateModal = () => {
    setUpdateModal(!updateModal);
  }

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  }

  const bodyInsert = (
    <div className={styles.modal}>
      <h3>Agregar Nuevo Empleado</h3>
      <br />
      <TextField className={styles.inputMaterial} label="Nombre" name="name" onChange={handleEmployee} />
      <br />
      <TextField className={styles.inputMaterial} label="Apellido" name="surname" onChange={handleEmployee} />
      <br />
      <TextField className={styles.inputMaterial} label="Edad" name="age" onChange={handleEmployee} />
      <br />
      <TextField className={styles.inputMaterial} label="Empresa" name="company" readOnly value="Brivé" />
      <br />
      <TextField className={styles.inputMaterial} label="Salario" name="salary" onChange={handleEmployee} />
      <br />
      <TextField className={styles.inputMaterial} label="Moneda" name="current" onChange={handleEmployee} />
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => postData()}>Agregar</Button>
        <Button onClick={() => toggleInsertModal()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyUpdate = (
    <div className={styles.modal}>
      <h3>Editar Empleado</h3>
      {/* <TextField className={styles.inputMaterial} label="ID" name="id" readOnly value={selectedEmployee&&selectedEmployee.id}/> */}
      <br />
      <TextField className={styles.inputMaterial} label="Nombre" name="name" onChange={handleEmployee} value={selectedEmployee && selectedEmployee.name} />
      <br />
      <TextField className={styles.inputMaterial} label="Apellido" name="surname" onChange={handleEmployee} value={selectedEmployee && selectedEmployee.surname} />
      <br />
      <TextField className={styles.inputMaterial} label="Edad" name="age" onChange={handleEmployee} value={selectedEmployee && selectedEmployee.age} />
      <br />
      <TextField className={styles.inputMaterial} label="Empresa" name="company" readOnly value="Brivé" />
      <br />
      <TextField className={styles.inputMaterial} label="Salario" name="salary" onChange={handleEmployee} value={selectedEmployee && selectedEmployee.salary} />
      <br />
      <TextField className={styles.inputMaterial} label="Moneda" name="current" onChange={handleEmployee} value={selectedEmployee && selectedEmployee.current} />
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => putData()}>Editar</Button>
        <Button onClick={() => toggleUpdateModal()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyDelete = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar al empleado: <b>{selectedEmployee && selectedEmployee.name}</b>?</p>
      <div align="right">
        <Button color="secondary" onClick={() => deleteData()}>Sí</Button>
        <Button onClick={() => toggleDeleteModal()}>No</Button>
      </div>
    </div>
  )

  return (
    <Fragment>
      <br />
      <Button
        onClick={() => toggleInsertModal()}
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
            onClick: (event, rowData) => selectEmployee(rowData, 'Edit')
          },
          {
            icon: 'delete',
            tooltip: 'Eliminar empleado',
            onClick: (event, rowData) => selectEmployee(rowData, 'Delete')
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
        onClose={toggleInsertModal}
      >
        {bodyInsert}
      </Modal>

      <Modal
        open={updateModal}
        onClose={toggleUpdateModal}
      >
        {bodyUpdate}
      </Modal>

      <Modal
        open={deleteModal}
        onClose={toggleDeleteModal}
      >
        {bodyDelete}
      </Modal>

    </Fragment>
  );
}

export default App;
