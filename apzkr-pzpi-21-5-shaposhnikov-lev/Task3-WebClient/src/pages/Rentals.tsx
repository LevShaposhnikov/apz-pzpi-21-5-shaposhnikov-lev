import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { RentalCreateModal } from '../components/Models/Rental/RentalCreateModal';
import { RentalEditModal } from '../components/Models/Rental/RentalEditModal';
import { deleteRental, getRentals } from '../http/rentalApi';
import { IRental } from '../interfaces/IRental';

export const Rentals = () => {
    const [rentals, setRentals] = useState<IRental[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IRental>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IRental) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getRentals()
        .then((data) => {
            setRentals(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteRental(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <RentalCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></RentalCreateModal>
  
        <RentalEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></RentalEditModal>
        <h1>Rentals</h1>
  
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
              <th>Customer</th>
              <th>RentalStartDate</th>
              <th>RentalEndDate</th>
              <th>IsActive</th>
              <th>RentalCost</th>
              <th>MileageStart</th>
              <th>MileageEnd</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => (
              <tr key={rental.id}>
                <td>{rental.id}</td>
                <td>{rental.car?.licensePlate}</td>
                <td>{rental.customer?.email}</td>
                <td>{rental.rentalStartDate}</td>
                <td>{rental.rentalEndDate}</td>
                <td>{rental.isActive.toString()}</td>
                <td>{rental.rentalCost}</td>
                <td>{rental.mileageStart}</td>
                <td>{rental.mileageEnd}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(rental)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(rental.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
