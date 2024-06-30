import React, {useEffect} from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from "react-hook-form";
import { editCar } from '../../../http/carApi';
import { ICarEditData } from "../../../interfaces/EditModels/ICarEditData";
import { ICar } from "../../../interfaces/ICar";

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: ICar,
}

export const CarEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<ICarEditData>();
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: ICarEditData) => {
        await editCar(data.id, data)
          .then(() => {
            onHide();
            fetch();
          })
          .catch(() => alert("Error"));
      };

      
      return (
        <Modal show={show} onHide={onHide}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Car</Modal.Title>
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