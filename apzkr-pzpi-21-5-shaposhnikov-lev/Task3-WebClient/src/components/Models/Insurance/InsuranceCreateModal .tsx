import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { createInsurance } from '../../../http/insuranceApi';
import { getCars } from '../../../http/carApi';
import { ISelect } from '../../../interfaces/ISelect';
import { ICar } from '../../../interfaces/ICar';
import { IInsuranceCreateData } from '../../../interfaces/CreateModels/IInsuranceCreateData';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
}

export const InsuranceCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<IInsuranceCreateData>();
      const [cars, setCars] = useState<ICar[]>([]);

      const handleClose = () => {
        reset({})
        onHide();
      }
      
      const onSubmit = async (data: IInsuranceCreateData) => {
        await createInsurance(data)
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
                <Modal.Title>Create Insurance</Modal.Title>
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
                  <label className="control-label">Policy Number</label>
                  <Controller
                    control={control}
                    name={"policyNumber"}
                    rules={{
                      required: "Enter policy number",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.policyNumber?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Provider</label>
                  <Controller
                    control={control}
                    name={"provider"}
                    rules={{
                      required: "Enter provider",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.provider?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Start Date</label>
                  <Controller
                    control={control}
                    name={"startDate"}
                    rules={{
                      required: "Enter start date",
                    }}
                    render={({ field }) => (
                      <input type="date" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.startDate?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">End Date</label>
                  <Controller
                    control={control}
                    name={"endDate"}
                    rules={{
                      required: "Enter end date",
                    }}
                    render={({ field }) => (
                      <input type="date" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.endDate?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Coverage Amount</label>
                  <Controller
                    control={control}
                    name={"coverageAmount"}
                    rules={{
                      required: "Enter coverage amount",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.coverageAmount?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Premium</label>
                  <Controller
                    control={control}
                    name={"premium"}
                    rules={{
                      required: "Enter premium",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.premium?.message}</p>
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