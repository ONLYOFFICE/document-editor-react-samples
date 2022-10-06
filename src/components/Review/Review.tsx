import "./Review.css";

type ReviewProps = {
  connector: any;
};

const Review = (props: ReviewProps) => {
  const {
    connector
  } = props;

  function prevReview() {
    connector.executeMethod("MoveToNextReviewChange", [false]);
  };

  function nextReview() {
    connector.executeMethod("MoveToNextReviewChange");
  };

  function acceptReview() {
    connector.executeMethod("AcceptReviewChanges");
  };

  function rejectReview() {
    connector.executeMethod("RejectReviewChanges");
  };

  return (
    <div className="reviewBlock">
      <button onClick={prevReview}>Prev</button>
      <button onClick={nextReview}>Next</button>
      <button onClick={acceptReview}>Accept</button>
      <button onClick={rejectReview}>Reject</button>
    </div>
  );

}

export default Review;