//Author: Jay Patel (B00881906)
import React, { Component } from "react";
import "./AdminSupport.scss";
import { Col, Row } from "react-bootstrap";
import { fetchAllTicketsApi } from "../../utils/Api";
import { Redirect } from "react-router-dom";
import TicketListView from "../../components/Help/TicketListView/TicketListView";

class AdminSupport extends Component {
  state = {
    tickets: [],
    isLoading: true,
  };

  componentDidMount() {
    // fetch support tickets
    this.fetchTickets();
  }

  fetchTickets = () => {
    // fetch support tickets
    // call fetch ticket api
    fetchAllTicketsApi()
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

  render() {
    if (!localStorage.hasOwnProperty("isAdmin")) {
      return <Redirect to="/admin/login" />;
    }

    const { tickets, isLoading } = this.state;

    return (
      <div className="admin-support-container container">
        <Row>
          <Col>
            <h1 className="text-center">Admin Support Requests</h1>
          </Col>
        </Row>

        <TicketListView
          isLoading={isLoading}
          tickets={tickets}
          fetchTickets={this.fetchTickets}
          userEmail={this.props.userEmail}
          firstName={this.props.firstName}
        />
      </div>
    );
  }
}

export default AdminSupport;
