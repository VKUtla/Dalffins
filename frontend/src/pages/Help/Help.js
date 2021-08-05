//Author: Jay Patel (B00881906)
import React, { Component } from "react";
import "./Help.scss";
import { Button, Col, Row } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import NewSupportTicketModal from "../../components/Help/NewSupportTicketModal/NewSupportTicketModal";
import { fetchTicketsApi } from "../../utils/Api";
import TicketListView from "../../components/Help/TicketListView/TicketListView";
import { withRouter } from "react-router-dom";

class Help extends Component {
  state = {
    newSupportTicketModalVisibility: false,
    tickets: [],
    isLoading: true,
  };

  componentDidMount() {
    if (!this.props.userEmail) {
      // if user not logged-in, redirect to root
      this.props.history.push("/");
    } else {
      // fetch support tickets
      this.fetchTickets();
    }
  }

  fetchTickets = () => {
    // fetch support tickets
    const data = {
      params: {
        email: this.props.userEmail,
      },
    };

    // call fetch ticket api
    fetchTicketsApi(data)
      .then((res) => {
        let tickets = res.data.map((item) => {
          return { ...item, description: item.messages[0].text };
        });
        this.setState({ tickets, isLoading: false });
      })
      .catch((err) => {
        console.error(err.message);
        this.setState({ isLoading: false });
      });
  };

  openNewSupportTicketModal = () => {
    this.setState({ newSupportTicketModalVisibility: true });
  };

  handleOnModalClose = () => {
    this.fetchTickets();
    this.setState({ newSupportTicketModalVisibility: false });
  };

  render() {
    const { tickets, newSupportTicketModalVisibility, isLoading } = this.state;

    return (
      <div className="help-container container">
        <Row>
          <Col>
            <h1>Support Requests</h1>
          </Col>
          <Col className="text-right my-auto">
            <Button
              className="btn-new-request"
              onClick={this.openNewSupportTicketModal}
            >
              <AddIcon /> Raise a new support request
            </Button>
          </Col>
        </Row>

        <TicketListView
          isLoading={isLoading}
          tickets={tickets}
          fetchTickets={this.fetchTickets}
          userEmail={this.props.userEmail}
          firstName={this.props.firstName}
        />

        <NewSupportTicketModal
          show={newSupportTicketModalVisibility}
          onClose={this.handleOnModalClose}
          userEmail={this.props.userEmail}
          firstName={this.props.firstName}
        />
      </div>
    );
  }
}

export default withRouter(Help);
