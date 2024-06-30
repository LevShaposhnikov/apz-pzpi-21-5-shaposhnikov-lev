import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { InsuranceCreateModal } from '../components/Models/Insurance/InsuranceCreateModal ';
import { InsuranceEditModal } from '../components/Models/Insurance/InsuranceEditModal';
import { deleteInsurance, getInsurances } from '../http/insuranceApi';
import { IInsurance } from '../interfaces/IInsurance';

export const Insurances = () => {
    const [insurances, setInsurances] = useState<IInsurance[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IInsurance>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IInsurance) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getInsurances()
        .then((data) => {
            setInsurances(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteInsurance(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <InsuranceCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></InsuranceCreateModal>
  
        <InsuranceEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></InsuranceEditModal>
        <h1>Insurances</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Car</th>
              <th>Policy number</th>
              <th>Provider</th>
              <th>StartDate</th>
              <th>EndDate</th>
              <th>CoverageAmount</th>
              <th>Premium</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {insurances.map((insurance) => (
              <tr key={insurance.id}>
                <td>{insurance.id}</td>
                <td>{insurance.car?.licensePlate}</td>
                <td>{insurance.policyNumber}</td>
                <td>{insurance.provider}</td>
                <td>{insurance.startDate}</td>
                <td>{insurance.endDate}</td>
                <td>{insurance.coverageAmount}</td>
                <td>{insurance.premium}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(insurance)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(insurance.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
