import React, {useEffect, useState, useMemo} from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { getCars } from '../../../http/carApi';
import { getCustomers } from '../../../http/customerApi';
import { editRental } from '../../../http/rentalApi';
import { IRentalEditData } from '../../../interfaces/EditModels/IRentalEditData';
import { ICar } from '../../../interfaces/ICar';
import { ICustomer } from '../../../interfaces/ICustomer';
import { IRental } from '../../../interfaces/IRental';
import { ISelect } from '../../../interfaces/ISelect';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: IRental,
}

export const RentalEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IRentalEditData>();
      const [cars, setCars] = useState<ICar[]>([]);
      const [customers, setCustomers] = useState<ICustomer[]>([]);
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: IRentalEditData) => {
        await editRental(data.id, data)
          .then(() => {
            onHide();
            fetch();
          })
          .catch(() => alert("Error"));
      };

      const fetchCars = async () => {
        await getCars().then((data) => setCars(data));
      };
    
      const fetchCustomers = async () => {
        await getCustomers().then((data) => setCustomers(data));
      };
    
      useEffect(() => {
        fetchCars();
        fetchCustomers();
      }, []);
    
      const selectCars = useMemo<ISelect[]>(() => {
        return [
          { value: "0", label: "Select car..." },
          ...cars.map((car) => {
            return {
              value: car.id.toString(),
              label: `${car.make} ${car.model}`,
            };
          }),
        ];
      }, [cars]);
    
      const selectCustomers = useMemo<ISelect[]>(() => {
        return [
          { value: "0", label: "Select customer..." },
          ...customers.map((customer) => {
            return {
              value: customer.id.toString(),
              label: `${customer.firstName} ${customer.lastName}`,
            };
          }),
        ];
      }, [customers]);
    
      return (
        <Modal show={show} onHide={onHide}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Rental</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label className="control-label">Car</label>
                <Controller
                  control={control}
                  name={"carId"}
                  rules={{
                    required: "Select car",
                    validate: (data) => (data != 0 ? undefined : "Select car"),
                  }}
                  render={({ field }) => (
                    <select className="form-control" {...field}>
                      {selectCars.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.carId?.message}</p>
              </div>
              <div className="form-group">
                <label className="control-label">Customer</label>
                <Controller
                  control={control}
                  name={"customerId"}
                  rules={{
                    required: "Select customer",
                    validate: (data) => (data != 0 ? undefined : "Select customer"),
                  }}
                  render={({ field }) => (
                    <select className="form-control" {...field}>
                      {selectCustomers.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.customerId?.message}</p>
              </div>
              <div className="form-group">
                <label className="control-label">Rental Start Date</label>
                <Controller
                  control={control}
                  name={"rentalStartDate"}
                  rules={{
                    required: "Enter rental start date",
                  }}
                  render={({ field }) => (
                    <input type="datetime-local" className="form-control" {...field} />
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.rentalStartDate?.message}</p>
              </div>
              <div className="form-group">
                <label className="control-label">Rental End Date</label>
                <Controller
                  control={control}
                  name={"rentalEndDate"}
                  rules={{
                    required: "Enter rental end date",
                  }}
                  render={({ field }) => (
                    <input type="datetime-local" className="form-control" {...field} />
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.rentalEndDate?.message}</p>
              </div>
              <div className="form-group">
                <label className="control-label">Rental Cost</label>
                <Controller
                  control={control}
                  name={"rentalCost"}
                  rules={{
                    required: "Enter rental cost",
                  }}
                  render={({ field }) => (
                    <input type="number" className="form-control" {...field} />
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.rentalCost?.message}</p>
              </div>
              <div className="form-group">
                <label className="control-label">Mileage Start</label>
                <Controller
                  control={control}
                  name={"mileageStart"}
                  rules={{
                    required: "Enter starting mileage",
                  }}
                  render={({ field }) => (
                    <input type="number" className="form-control" {...field} />
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.mileageStart?.message}</p>
              </div>
              <div className="form-group">
                <label className="control-label">Mileage End</label>
                <Controller
                  control={control}
                  name={"mileageEnd"}
                  rules={{
                    required: "Enter ending mileage",
                  }}
                  render={({ field }) => (
                    <input type="number" className="form-control" {...field} />
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.mileageEnd?.message}</p>
              </div>
              <div className="form-group">
                <label className="control-label">Is Active</label>
                <Controller
                  control={control}
                  name={"isActive"}
                  rules={{
                    required: "Select status",
                  }}
                  render={({ field }) => (
                    <select
                      className="form-control"
                      value={field.value ? "true" : "false"}
                      onChange={(e) => field.onChange(e.target.value === "true")}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.isActive?.message}</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      )
}