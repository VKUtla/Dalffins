//Author: Jay Patel (B00881906)
import React, { Component } from "react";
import "./TicketListView.scss";
import { Row } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import TicketDetailModal from "../TicketDetailModal/TicketDetailModal";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { getDisplayDate } from "../../../utils/dateUtils";

class TicketListView extends Component {
  state = {
    openTicketDetailDialog: false,
    selectedTicket: undefined,
    showSnackbar: false,
    snackbarMessage: "",
    snackbarType: "",
  };

  onTicketClickHandler = (ticket) => {
    this.setState({
      openTicketDetailDialog: true,
      selectedTicket: ticket,
    });
  };

  handleOnTicketDialogClose = () => {
    this.props.fetchTickets();
    this.setState({ openTicketDetailDialog: false, selectedTicket: undefined });
  };

  showToastHandler = (message, type) => {
    this.setState({
      showSnackbar: true,
      snackbarMessage: message,
      snackbarType: type,
    });
  };

  render() {
    const { tickets, isLoading } = this.props;
    const {
      openTicketDetailDialog,
      selectedTicket,
      showSnackbar,
      snackbarMessage,
      snackbarType,
    } = this.state;

    if (isLoading) {
      return (
        <div className="d-flex align-items-center justify-content-center mt-3">
          <CircularProgress />
        </div>
      );
    }

    return (
      <div className="ticket-list-view-content container mt-3">
        <Row className="cards">
          {tickets.length > 0 ? (
            tickets.map((item, index) => (
              <div
                className="card"
                onClick={() => this.onTicketClickHandler(item)}
              >
                <h5>{`${index + 1}. ${item.reason}`}</h5>
                <span className="desc">{item.description}</span>
                <div className="d-flex mt-2 justify-content-between">
                  <span className="s">{item.status}</span>
                  <span className="c">
                    {getDisplayDate(new Date(item.createdAt))}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No support tickets found.</p>
          )}
        </Row>

        <TicketDetailModal
          show={openTicketDetailDialog}
          ticket={selectedTicket}
          onClose={this.handleOnTicketDialogClose}
          showToast={this.showToastHandler}
          userEmail={this.props.userEmail}
          firstName={this.props.firstName}
        />

        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={() => this.setState({ showSnackbar: false })}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => this.setState({ showSnackbar: false })}
            severity={snackbarType}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </div>
    );
  }
}

export default TicketListView;
