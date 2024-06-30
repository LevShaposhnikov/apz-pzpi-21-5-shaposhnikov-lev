import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { CarCreateModal } from '../components/Models/Car/CarCreateModal';
import { CarEditModal } from '../components/Models/Car/CarEditModal';
import { deleteCar, getCars } from '../http/carApi';
import { ICar } from '../interfaces/ICar';

export const Cars = () => {
    const [cars, setCars] = useState<ICar[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<ICar>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: ICar) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getCars()
        .then((data) => {
            setCars(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteCar(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <CarCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></CarCreateModal>
  
        <CarEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></CarEditModal>
        <h1>Cars</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>VIN</th>
              <th>License plate</th>
              <th>Color</th>
              <th>Transmission</th>
              <th>LocationX</th>
              <th>LocationY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.vin}</td>
                <td>{car.licensePlate}</td>
                <td>{car.color}</td>
                <td>{car.transmission}</td>
                <td>{car.locationX}</td>
                <td>{car.locationY}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(car)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(car.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
