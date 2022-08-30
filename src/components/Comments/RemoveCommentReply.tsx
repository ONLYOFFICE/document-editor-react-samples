type RemoveCommentReplyProps = {
  connector: any;
  comment: any;
  replyId: string;
};


const RemoveCommentReply = (props: RemoveCommentReplyProps) => {
  const {
    connector,
    comment,
    replyId,
  } = props;

  function RemoveReply () {
    let commentData = comment["Data"];
    commentData["Replies"].splice(replyId, 1);

    connector.executeMethod("ChangeComment", [comment["Id"], commentData]);
  }

  return (
    <div className="comment-del-div">
      <span className="comment-del" onClick={RemoveReply}></span>
    </div>
  );
}

export default RemoveCommentReply;
