import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { createFeedback } from '../../../http/feedbackApi';
import { getCustomers } from '../../../http/customerApi';
import { getRentals } from '../../../http/rentalApi';
import { ISelect } from '../../../interfaces/ISelect';
import { ICustomer } from '../../../interfaces/ICustomer';
import { IRental } from '../../../interfaces/IRental';
import { IFeedbackCreateData } from '../../../interfaces/CreateModels/IFeedbackCreateData';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
}

export const FeedbackCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<IFeedbackCreateData>();
      const [customers, setCustomers] = useState<ICustomer[]>([]);
      const [rentals, setRentals] = useState<IRental[]>([]);

      const handleClose = () => {
        reset({})
        onHide();
      }
      
      const onSubmit = async (data: IFeedbackCreateData) => {
        await createFeedback(data)
          .then(() => {
            handleClose();
            fetch();
          }).catch(() => alert("Error"));
      };

      const fetchCustomers = async () => {
        await getCustomers().then((data) => setCustomers(data));
      };

      const fetchRentals = async () => {
        await getRentals().then((data) => setRentals(data));
      };

      useEffect(() => {
        fetchCustomers();
        fetchRentals();
      }, []);

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

      const selectRentals = useMemo<ISelect[]>(() => {
        return [
          { value: "0", label: "Select rental..." },
          ...rentals.map((rental) => {
            return {
              value: rental.id.toString(),
              label: `Rental ID: ${rental.id}`,
            };
          }),
        ];
      }, [rentals]);

      return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Header closeButton>
                <Modal.Title>Create Feedback</Modal.Title>
              </Modal.Header>
              <Modal.Body>
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
                  <label className="control-label">Rental</label>
                  <Controller
                    control={control}
                    name={"rentalId"}
                    rules={{
                      required: "Select rental",
                      validate: (data) => (data != 0 ? undefined : "Select rental"),
                    }}
                    render={({ field }) => (
                      <select className="form-control" {...field}>
                        {selectRentals.map(({ value, label }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.rentalId?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Rating</label>
                  <Controller
                    control={control}
                    name={"rating"}
                    rules={{
                      required: "Enter rating",
                      min: {
                        value: 1,
                        message: "Minimum rating is 1"
                      },
                      max: {
                        value: 5,
                        message: "Maximum rating is 5"
                      }
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.rating?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Comments</label>
                  <Controller
                    control={control}
                    name={"comments"}
                    rules={{
                      required: "Enter comments",
                    }}
                    render={({ field }) => (
                      <textarea className="form-control" {...field}></textarea>
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.comments?.message}</p>
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