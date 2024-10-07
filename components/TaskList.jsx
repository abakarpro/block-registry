//import React from 'react';
import PropTypes from "prop-types";
import {  FaExclamationTriangle, FaFilePdf,  } from "react-icons/fa";


const TaskList = ({ tasks, onSelectTask, title,  handlePdf }) => { 

  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list">
         <span className="cardTitle fw-bold fs-2 "> { title }</span>
         <hr />
         <br />
         <p></p>
        <span className="alert alert-warning fs-4 container"> <FaExclamationTriangle /> {`Aucune tâche à afficher`}</span>
      </div>
      );
  }
 

  return (
    <div className="task-list">
    
      <span className="d-flex justify-content-between">
        
          <span className="cardTitle fw-bold fs-2"> { title }</span>
      
        <span className="badge rounded-pill bg-primary m-3" >  {tasks.length}</span> 
        <button   onClick={handlePdf} className=" btn btn-outline-secondary rounded-3 btn-sm">  <FaFilePdf className="fs-5" />   </button> 
      </span>
<hr />

      {tasks && (
        <ul className="list-group">
          {tasks.map((person) => (
            <li key={person.Key} onClick={() => onSelectTask(person)} className="list-group-item list-striped">
              <div className="row g-0">
                <div className="col-3">
                  <b> {person.Key} </b> <br />
                  {person.Record.registrationDate}
                </div>
                <div className="col-7">
                  <b>{person.Record.surname + " " + person.Record.givenName}</b>
                  <br />
                  <cite> {person.Record.secretary}  </cite>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* <table className="table table-striped ">
                <thead style={{ backgroundColor: '#343a40', color: '#fff' }}>
                  <tr>
                    <th>Numero</th>
                    <th>{`Nom de l'enfant`}</th>
                    <th>date de naissance</th>
                    <th>Edition</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks && (
                    tasks.map((person, index) => (
                      <tr key={index}>
                        <td>{person.Key}</td>
                        <td>{person.Record.lastName}</td>
                        <td>{person.Record.dateBirth}</td>                        
                        <td>{person.Record.registrationDate}</td>
                        <td>

                          <button type="button" onClick={() => onSelectTask(person)} className='btn btn-sm btn-secondary'>Details</button>
                        </td>
                      </tr>
                    )))}
                </tbody>
      </table> */}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      Key: PropTypes.string.isRequired,
      title: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  onSelectTask: PropTypes.func.isRequired,
  handlePdf: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  role: PropTypes.string,
};

export default TaskList;
