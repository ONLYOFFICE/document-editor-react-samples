import { useState } from "react";

type AddCommentProps = {
    connector: any;
    userName: string;
  };

const AddComment = (props: AddCommentProps) => {
    const {
        connector,
        userName,
      } = props;

    const[comment, setComment] = useState('');

    function addComment () {
      if(Boolean(comment)) {
        var currentdate = Date.now(); 
        var datetime = "" + currentdate;

        connector.executeMethod("AddComment",[{Text: comment, UserName: userName, Time: datetime}]);

        setComment("");
      }
    }

    return (
        <div style={{ textAlign: "right" }}>
            <span style={{display: "block", textAlign: "left" }}>Enter your comment:</span>
            <textarea value={comment} onChange={ function(event) {
                setComment(event.target.value);
            }}></textarea>

            <button onClick={addComment}>Send</button>
        </div>
    );
 }

export default AddComment;
