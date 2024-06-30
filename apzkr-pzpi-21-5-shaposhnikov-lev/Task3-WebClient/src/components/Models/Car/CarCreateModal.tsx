import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { createCar } from '../../../http/carApi';
import { ICarCreateData } from '../../../interfaces/CreateModels/ICarCreateData';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
}

export const CarCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<ICarCreateData>();

      const handleClose = () => {
        reset({})
        onHide();
      }
      
      const onSubmit = async (data: ICarCreateData) => {
        await createCar(data)
          .then(() => {
            handleClose();
            fetch();
          }).catch(() => alert("Error"));
      };

      return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Header closeButton>
                <Modal.Title>Create Car</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="form-group">
                  <label className="control-label">Make</label>
                  <Controller
                    control={control}
                    name={"make"}
                    rules={{
                      required: "Enter make",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.make?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Model</label>
                  <Controller
                    control={control}
                    name={"model"}
                    rules={{
                      required: "Enter model",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.model?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Year</label>
                  <Controller
                    control={control}
                    name={"year"}
                    rules={{
                      required: "Enter year",
                      min: {
                        value: 1886,
                        message: "Minimum year is 1886"
                      },
                      max: {
                        value: new Date().getFullYear(),
                        message: `Maximum year is ${new Date().getFullYear()}`
                      }
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.year?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">VIN</label>
                  <Controller
                    control={control}
                    name={"vin"}
                    rules={{
                      required: "Enter VIN",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.vin?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">License Plate</label>
                  <Controller
                    control={control}
                    name={"licensePlate"}
                    rules={{
                      required: "Enter license plate",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.licensePlate?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Color</label>
                  <Controller
                    control={control}
                    name={"color"}
                    rules={{
                      required: "Enter color",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.color?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Transmission</label>
                  <Controller
                    control={control}
                    name={"transmission"}
                    rules={{
                      required: "Enter transmission",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.transmission?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Location X</label>
                  <Controller
                    control={control}
                    name={"locationX"}
                    rules={{
                      required: "Enter location X",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.locationX?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Location Y</label>
                  <Controller
                    control={control}
                    name={"locationY"}
                    rules={{
                      required: "Enter location Y",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.locationY?.message}</p>
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