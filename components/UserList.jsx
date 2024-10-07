import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
//import UserForm from './UserForm';
import constants from "../config/constants.json";
import DataTable from "react-data-table-component";

function UserList() {
  const [users, setUsers] = useState([]);
  const [newUserCount, setNewUserCount] = useState(0);
 const [filteredUsers, setFilteredUsers] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});
  const url = constants.host + constants.port;
  
  const [records, setRecords] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // Fonction pour gérer le clic sur une ligne du tableau
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({ username: "", orgName: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [datax, setDatax] = useState([]);
  const columns = [
    {
      name: "Login",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Noms",
      selector: (row) => row.fullname,
      sortable: true,
    },{
      name: "Organisation",
      selector: (row) => row.orgName,
      sortable: true,
    },
   {
      name: "Centre",
      selector: (row) => row.centre,
      sortable: true,
    }, {
      name: "email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Statut",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          {" "}
          <button
            onClick={() => handleRowClick(`${row.username}`, `${row.orgName}`)}
            disabled={row.status === "enrolled"}
            className="btn btn-sm btn-primary"
          >
            Enroller
          </button>{" "}
          ,<button className="btn btn-sm btn-danger"  disabled={row.status === "new"} >Revoquer</button>{" "}
        </>
      ),
    },
  ];

  function handleFilter(event) {
    const newData = users.filter((user) => {
      return user.username
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(`${url}/users/list`);
        setUsers(response.data);
        setRecords(response.data);
        setFilteredUsers(response.data); // Mettre à jour les utilisateurs filtrés
        updateStatusCounts(response.data);
        updateNewUserCount(response.data);
        // setDatax(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        );
      }
    }

    fetchUsers();
  }, [url]);

  const updateStatusCounts = (users) => {
    const counts = users.reduce((acc, user) => {
      acc[user.status] = (acc[user.status] || 0) + 1;
      return acc;
    }, {});
    setStatusCounts(counts);
  };

  const updateNewUserCount = (users) => {
    const count = users.filter((user) => user.status === "new").length;
    setNewUserCount(count);
  };

  const filterUsersByStatus = (status) => {
    if (status === "all") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => user.status === status);
      setFilteredUsers(filtered);
    }
  };

  // Fonction pour gérer le clic sur une ligne du tableau
  const handleRowClick = (username, orgName) => {
    setFormData({ username: username, orgName: orgName });
    handleShow();
  };



  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axios.post(`${url}/users`, formData);

    try {
      if (response.data.success) {
        setSuccessMessage(response.data.message);
        //Mettre a jour le status de l'utilisateur

        setTimeout(() => {
          setSuccessMessage("");
          // Rediriger vers la page d'authentification après un délai de 2 secondes
          // window.location.href = '/login'; // Adapté à votre chemin d'accès réel
        }, 3000);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage(
        "Une erreur s'est produite lors de l'enregistrement de l'utilisateur.",
        error.message
      );
      console.error(
        "Une erreur s'est produite lors de l'enregistrement de l'utilisateur:",
        error
      );
    }
  }
  return (
    <div className="alert alert-alert-info">
      <div className="container">
       <div className="text-end form-control"> 
        <div className="d-flex justify-content-between">
          <Link
            to="/"
            className="btn btn-secondary rounded-3 m-1"
          >{` Retour à l'accueil `}</Link>
          <button
            onClick={() => filterUsersByStatus("all")}
            className="btn btn-secondary m-1"
          >
            Tous ({users.length})
          </button>
          {Object.keys(statusCounts).map((status) => (
            <button
              key={status}
              onClick={() => filterUsersByStatus(status)}
              className="btn btn-secondary m-1"
            >
              {status} ({statusCounts[status]})
            </button>
          ))}
          <button onClick={()=>filterUsersByStatus("new")} className="btn btn-info m-1">
            Nouveaux utilisateurs ({newUserCount})
          </button>
          <input className="m-1"
            type="text"
            onChange={handleFilter}
            placeholder="Rechercher..."
          />
        </div>
       </div>
        <DataTable
          title="Liste des utilisateurs"
          columns={columns}
          data={records}
          selectableRows
          fixedHeader
          pagination
          striped
          highlightOnHover
        ></DataTable>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="bg-dark bg-gradient text-light">
          <Modal.Title>Enroller un utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-primary-subtle">
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                disabled
              />
              <label htmlFor="username">{`Nom d'utilisateur:`}</label>
            </div>

            <div className="form-floating mb-3">
              <select
                id="orgName"
                name="orgName"
                className="form-select"
                value={formData.orgName}
                onChange={handleChange}
                disabled
              >
                <option value="">
                  --- Veuillez sélectionner une organisation ---
                </option>
                <option value="Org1">Org1</option>
                <option value="Org2">Org2</option>
              </select>
              <label
                htmlFor="orgName"
                className="form-label"
              >{`Nom de l'organisation:`}</label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="bg-dark bg-gradient text-light">
          <Button variant="secondary rounded-5" onClick={handleClose}>
            Close
          </Button>
          <button
            type="submit"
            className="btn btn-primary rounded-5"
            onClick={handleSubmit}
          >
            Enregistrer
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserList;
