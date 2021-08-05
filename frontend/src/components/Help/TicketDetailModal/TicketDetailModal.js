//Author: Jay Patel (B00881906)
import React, { useEffect, useRef } from "react";
import "./TicketDetailModal.scss";
import { Button, Form, Modal } from "react-bootstrap";
import { updateTicketApi } from "../../../utils/Api";
import { getDisplayDate } from "../../../utils/dateUtils";

const TicketDetailModal = ({
  show,
  ticket,
  onClose,
  showToast,
  userEmail,
  firstName,
}) => {
  const [showModal, setShowModal] = React.useState(show);
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [currentTicket, setCurrentTicket] = React.useState(ticket);
  const messageRef = useRef(null);

  useEffect(() => {
    setCurrentTicket(ticket);
    if (show !== showModal) {
      setShowModal(show);
    }
    scrollToBottom();
  }, [show, ticket]);

  const scrollToBottom = () => {
    // scroll to the end of the chat
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    } else {
      if (messageRef) setTimeout(scrollToBottom, 1000);
    }
  };

  const hideModal = () => {
    setDescription("");
    setShowModal(false);
    setLoading(false);
    onClose();
  };

  const handleDescriptionOnChange = (e) => setDescription(e.target.value);

  const hasValidValues = () => {
    if (description.length > 0 && !loading) {
      return true;
    }
    return false;
  };

  const saveData = () => {
    // save ticket data
    const newTicket = {
      ...currentTicket,
      messages: [
        ...currentTicket.messages,
        {
          text: description,
          author: userEmail,
          name: firstName,
          date: new Date().toString(),
        },
      ],
    };
    setDescription("");
    setCurrentTicket(newTicket);
    setTimeout(scrollToBottom, 100);

    // call update ticket api
    updateTicketApi(newTicket)
      .then((res) => {
        showToast("Data saved successfully", "success");
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(false);
      });
  };

  const markAsCloseHandler = () => {
    // mark ticket as closed
    const newTicket = {
      ...currentTicket,
      status: "Closed",
    };
    setCurrentTicket(newTicket);
    updateTicketApi(newTicket)
      .then((res) => {
        showToast("Ticket marked as closed", "success");
        hideModal();
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(false);
      });
  };

  if (!currentTicket) return <></>;

  return (
    <Modal
      className="ticket-detail-modal"
      show={showModal}
      onHide={hideModal}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {currentTicket.reason}{" "}
          <span className="status">({currentTicket.status})</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <div className="message-list">
            {currentTicket.messages.map((msg, index) => {
              return (
                <div className="slide" ref={messageRef} key={index}>
                  <div className="title">
                    <div className="author">{msg.name}</div>
                    <div className="date">
                      {getDisplayDate(new Date(msg.date))}
                    </div>
                  </div>
                  <div className="message">{msg.text}</div>
                </div>
              );
            })}
          </div>
          {currentTicket.status.toLowerCase() === "open" ? (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Add new message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={description}
                  onChange={handleDescriptionOnChange}
                />
              </Form.Group>
            </Form>
          ) : null}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Close
        </Button>
        {currentTicket.status.toLowerCase() === "open" ? (
          <Button variant="danger" onClick={markAsCloseHandler}>
            Mark as Close
          </Button>
        ) : null}
        {currentTicket.status.toLowerCase() === "open" ? (
          <Button
            variant="primary"
            onClick={saveData}
            disabled={!hasValidValues()}
          >
            Save
          </Button>
        ) : null}
      </Modal.Footer>
    </Modal>
  );
};

export default TicketDetailModal;
