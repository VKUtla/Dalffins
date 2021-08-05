//Author: Jay Patel (B00881906)
import React, { Component } from "react";
import "./ReviewModal.scss";
import { Button, Modal } from "react-bootstrap";
import { saveReviewApi } from "../../../utils/Api";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";

export const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

class ReviewModal extends Component {
  state = {
    isLoading: false,
    showModal: false,
    rating: 3,
    review: "",
  };

  componentDidMount() {
    this.setState({ showModal: this.props.show });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.show !== prevProps.show) {
      this.setState({ showModal: this.props.show });
    }
  }

  hasValidValues = () => {
    const { rating, review, isLoading } = this.state;
    if (rating !== null && review.trim().length > 0 && !isLoading) {
      return true;
    }
    return false;
  };

  saveReview = () => {
    this.setState({ isLoading: true });
    const { rating, review } = this.state;
    const { orderId, email } = this.props;
    orderId.forEach((productId, index) => {
      const data = {
        productId,
        rating,
        review,
        email,
      };

      // call save review api
      saveReviewApi(data)
        .then((res) => {
          if (index === orderId.length - 1) {
            this.hideModal();
          }
        })
        .catch((err) => {
          console.error(err.message);
          this.setState({ isLoading: false });
        });
    });
  };

  hideModal = () => {
    this.setState({
      showModal: false,
      isLoading: false,
      rating: 3,
      review: "",
    });
    this.props.onClose();
  };

  render() {
    const { showModal, rating, review } = this.state;
    const { title, subTitle } = this.props;
    return (
      <Modal show={showModal} onHide={this.hideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="review-modal-body">
            {subTitle ? (
              <Typography component="legend" className="mb-2">
                {subTitle}
              </Typography>
            ) : null}
            <Box component="fieldset" mb={1} borderColor="transparent">
              <Typography component="legend">Overall Rating:</Typography>
              <StyledRating
                name="customized-color"
                value={rating}
                onChange={(event, newValue) => {
                  this.setState({ rating: newValue || 0 });
                }}
                getLabelText={(value) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                precision={1}
                icon={<FavoriteIcon fontSize="inherit" />}
              />
            </Box>
            <Typography component="legend">Feedback:</Typography>
            <textarea
              rows={4}
              placeholder="Please write your valuable review"
              value={review}
              onChange={(e) => this.setState({ review: e.target.value })}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.hideModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={this.saveReview}
            disabled={!this.hasValidValues()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ReviewModal.defaultProps = {
  title: "Rating & Review",
  subTitle: undefined,
};

export default ReviewModal;
