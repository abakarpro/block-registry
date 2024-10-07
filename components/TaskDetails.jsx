//import React from 'react';
import PropTypes from "prop-types";
import ActeDetails from "./ActeDetails ";
import {
  FaCheckDouble,
  FaFilePdf,
  FaHandPointLeft,
  FaPaperPlane,
  FaShareSquare,
} from "react-icons/fa";
import constants from "../config/constants.json";

const TaskDetails = ({ task, handleSubmit, handleActePdf, role }) => {
  if (!task) {
    return (
      <div className="task-details">
        <span className=" fs-4 text-center">
          <FaHandPointLeft /> Sélectionnez une tâche pour voir les détails
        </span>
      </div>
    );
  }

  return (
    <div className="task-details ">
      <form onSubmit={() => handleSubmit(task.Key)}>
        <div className="d-flex  justify-content-between m-3">
          <div className="fs-3 fw-bold">
            {" "}
            {task.Record.surname + " " + task.Record.givenName}{" "}
          </div>
<div>
 {task.Record.status === constants.role.secretary.instance &&
            role === constants.ROLES.SECRETARY && (
              <button type='submit' 
              onClick={() => handleSubmit()}
              className="btn btn-outline-primary rounded-5 fs-5 fs-bold">
                {" "}
                <FaPaperPlane /> Transmettre{" "}
              </button>
            )}

          {task.Record.status === constants.role.officer.instance &&
            role === constants.ROLES.OFFICER && (
              <button
                type="button"
                onClick={() => handleSubmit(task.Key, "3")}
                className="btn btn-outline-danger rounded-5 fs-5 fs-bold"
              >
                {" "}
                <FaShareSquare /> REJETER{" "}
              </button>
            )}

          {task.Record.status === constants.role.officer.instance &&
            role === constants.ROLES.OFFICER && (
              <button
                type="submit"
                className="btn btn-outline-primary rounded-5 fs-5 fs-bold"
              >
                {" "}
                <FaCheckDouble /> Valider {" "}
              </button>
            )}
            <button type="button" className="btn btn-outline-secondary rounded-5"
            onClick={() => handleActePdf(task)}>
              <FaFilePdf /> PDF
            </button>
</div>
         
        </div>
        <div className="card-body alert bg-secondary-subtle">
          <ActeDetails docInfo={task} />

          <div>
            <div className="card-footer d-flex justify-content-between bg-dark bg-gradient mt-0">
              {/* <button
                            onClick={() => setShowDialog(false)}
                            className="btn btn-secondary rounded-5"
                            aria-label="Close"
                          >{`Fermer`}</button> */}
              {/* <button
                            type="button"
                            className="btn btn-outline-primary rounded-5"
                          >{`Obtenir l'historique`}</button> */}
              {/* <button
                            type="button"
                            className="btn btn-outline-secondary rounded-5"
                            onClick={() => handleActePdf(selectedActe)}
                          >
                            Generer PDF
                          </button> */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

TaskDetails.propTypes = {
  selectedActe: PropTypes.shape({}),
  task: PropTypes.shape({
    Key: PropTypes.string.isRequired,
    Record: PropTypes.shape({
      surname: PropTypes.string,
      givenName: PropTypes.string,
      status: PropTypes.string,
    }),
  }),
  handleSubmit: PropTypes.func.isRequired,
  handleActePdf: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  role: PropTypes.string.isRequired,
};

export default TaskDetails;
