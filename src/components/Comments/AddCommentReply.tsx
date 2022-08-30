import { useState } from "react";

type AddCommentReplyProps = {
  connector: any;
  userName: string;
  comment: any;
};

const AddCommentReply = (props: AddCommentReplyProps) => {
  const {
    connector,
    userName,
    comment
  } = props;

  const[reply, setReply] = useState('');
  const[displayAddReply, setDisplayAddReply] = useState(false);

  function addReply () {
    if (Boolean(reply)) {
      var currentdate = Date.now(); 
      var datetime = "" + currentdate;

      comment["Data"]["Replies"].push({ Text: reply, Time: datetime, UserName: userName });

      connector.executeMethod("ChangeComment", [comment["Id"], comment["Data"]]);

      setReply("");
      setDisplayAddReply(false);
    }
  }

  return (
      displayAddReply
      ?
        <div>
          <textarea style={{ width:"270px", marginRight: "8px" }} value={reply} onChange={ function(event) {
            setReply(event.target.value);
          }} ></textarea>
          <button onClick={addReply}>Add</button>
          <button onClick={ function(event) { setDisplayAddReply(false) } }>Cancel</button>
        </div>
      :
        <button onClick={ function(event) { setDisplayAddReply(true) } }>Add reply</button>
  );
}

export default AddCommentReply;
