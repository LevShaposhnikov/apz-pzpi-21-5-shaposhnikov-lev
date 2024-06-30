import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { MaintenanceCreateModal } from '../components/Models/Maintenance/MaintenanceCreateModal';
import { MaintenanceEditModal } from '../components/Models/Maintenance/MaintenanceEditModal';
import { deleteMaintenance, getMaintenances } from '../http/maintenanceApi';
import { IMaintenance } from '../interfaces/IMaintenance';

export const Maintenances = () => {
    const [maintenances, setMaintenances] = useState<IMaintenance[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IMaintenance>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IMaintenance) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getMaintenances()
        .then((data) => {
            setMaintenances(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteMaintenance(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <MaintenanceCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></MaintenanceCreateModal>
  
        <MaintenanceEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></MaintenanceEditModal>
        <h1>Maintenances</h1>
  
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
              <th>Maintenance date</th>
              <th>Description</th>
              <th>Cost</th>
              <th>Service center</th>
              <th>Mileage</th>
              <th>IsCompleted</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {maintenances.map((maintenance) => (
              <tr key={maintenance.id}>
                <td>{maintenance.id}</td>
                <td>{maintenance.car?.licensePlate}</td>
                <td>{maintenance.maintenanceDate}</td>
                <td>{maintenance.description}</td>
                <td>{maintenance.cost}</td>
                <td>{maintenance.serviceCenter}</td>
                <td>{maintenance.mileage}</td>
                <td>{maintenance.isCompleted.toString()}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(maintenance)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(maintenance.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
