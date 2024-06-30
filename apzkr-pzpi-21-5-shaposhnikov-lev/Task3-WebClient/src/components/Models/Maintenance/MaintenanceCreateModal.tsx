import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { createMaintenance } from '../../../http/maintenanceApi';
import { getCars } from '../../../http/carApi';
import { ISelect } from '../../../interfaces/ISelect';
import { ICar } from '../../../interfaces/ICar';
import { IMaintenanceCreateData } from '../../../interfaces/CreateModels/IMaintenanceCreateData';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
}

export const MaintenanceCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<IMaintenanceCreateData>();
      const [cars, setCars] = useState<ICar[]>([]);

      const handleClose = () => {
        reset({})
        onHide();
      }
      
      const onSubmit = async (data: IMaintenanceCreateData) => {
        await createMaintenance(data)
          .then(() => {
            handleClose();
            fetch();
          }).catch(() => alert("Error"));
      };

      const fetchCars = async () => {
        await getCars().then((data) => setCars(data));
      };

      useEffect(() => {
        fetchCars();
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

      return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Header closeButton>
                <Modal.Title>Create Maintenance</Modal.Title>
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
                  <label className="control-label">Maintenance Date</label>
                  <Controller
                    control={control}
                    name={"maintenanceDate"}
                    rules={{
                      required: "Enter maintenance date",
                    }}
                    render={({ field }) => (
                      <input type="date" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.maintenanceDate?.message}</p>
                </div>
                <div className="form-group">
                <label className="control-label">Description</label>
                  <Controller
                    control={control}
                    name={"description"}
                    rules={{
                      required: "Enter description",
                    }}
                    render={({ field }) => (
                      <textarea className="form-control" {...field}></textarea>
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.description?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Cost</label>
                  <Controller
                    control={control}
                    name={"cost"}
                    rules={{
                      required: "Enter cost",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.cost?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Service Center</label>
                  <Controller
                    control={control}
                    name={"serviceCenter"}
                    rules={{
                      required: "Enter service center",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.serviceCenter?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Mileage</label>
                  <Controller
                    control={control}
                    name={"mileage"}
                    rules={{
                      required: "Enter mileage",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.mileage?.message}</p>
                </div>
                <div className="form-group">
            <label className="control-label">Is Completed</label>
            <Controller
              control={control}
              name={"isCompleted"}
              rules={{
                required: "Select status",
              }}
              render={({ field }) => (
                <select
                  className="form-control"
                  value={field.value ? "true" : "false"}
                  onChange={(e) => field.onChange(e.target.value === "true")}
                >
                  <option value="true">Completed</option>
                  <option value="false">Not Completed</option>
                </select>
              )}
            ></Controller>
            <p style={{ color: "red" }}>{errors.isCompleted?.message}</p>
          </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
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