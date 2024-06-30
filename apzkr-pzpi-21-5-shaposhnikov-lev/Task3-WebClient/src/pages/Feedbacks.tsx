import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { FeedbackCreateModal } from '../components/Models/Feedback/FeedbackCreateModal';
import { FeedbackEditModal } from '../components/Models/Feedback/FeedbackEditModal';
import { deleteFeedback, getFeedbacks } from '../http/feedbackApi';
import { IFeedback } from '../interfaces/IFeedback';

export const Feedbacks = () => {
    const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IFeedback>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IFeedback) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getFeedbacks()
        .then((data) => {
            setFeedbacks(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteFeedback(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <FeedbackCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></FeedbackCreateModal>
  
        <FeedbackEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></FeedbackEditModal>
        <h1>Feedbacks</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Customer</th>
              <th>Rental id</th>
              <th>Date</th>
              <th>Rating</th>
              <th>Comments</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.id}</td>
                <td>{feedback.customer?.email}</td>
                <td>{feedback.rentalId}</td>
                <td>{feedback.feedbackDate}</td>
                <td>{feedback.rating}</td>
                <td>{feedback.comments}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(feedback)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(feedback.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
