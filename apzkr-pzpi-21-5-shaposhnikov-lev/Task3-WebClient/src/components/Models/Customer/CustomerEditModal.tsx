import React, {useEffect} from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from "react-hook-form";
import { editCustomer } from '../../../http/customerApi';
import { ICustomerEditData } from '../../../interfaces/EditModels/ICustomerEditData';
import { ICustomer } from '../../../interfaces/ICustomer';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: ICustomer,
}

export const CustomerEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<ICustomerEditData>();
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: ICustomerEditData) => {
        await editCustomer(data.id, data)
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
                <Modal.Title>Edit Customer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="form-group">
                  <label className="control-label">First Name</label>
                  <Controller
                    control={control}
                    name={"firstName"}
                    rules={{
                      required: "Enter first name",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.firstName?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Last Name</label>
                  <Controller
                    control={control}
                    name={"lastName"}
                    rules={{
                      required: "Enter last name",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.lastName?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Date of Birth</label>
                  <Controller
                    control={control}
                    name={"dateOfBirth"}
                    rules={{
                      required: "Enter date of birth",
                    }}
                    render={({ field }) => (
                      <input className="form-control" type="datetime-local" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.dateOfBirth?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Email</label>
                  <Controller
                    control={control}
                    name={"email"}
                    rules={{
                      required: "Enter email",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Enter a valid email address"
                      }
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.email?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Phone Number</label>
                  <Controller
                    control={control}
                    name={"phoneNumber"}
                    rules={{
                      required: "Enter phone number",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.phoneNumber?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Address</label>
                  <Controller
                    control={control}
                    name={"address"}
                    rules={{
                      required: "Enter address",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.address?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Driver License Number</label>
                  <Controller
                    control={control}
                    name={"driverLicenseNumber"}
                    rules={{
                      required: "Enter driver license number",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.driverLicenseNumber?.message}</p>
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