type RemoveCommentProps = {
    connector: any;
    commentId: string;
  };


const RemoveComment = (props: RemoveCommentProps) => {
    const {
        connector,
        commentId
    } = props;

    function removeComment () {
        connector.executeMethod("RemoveComments", [[commentId]]);
    }

    return (
        <div className="comment-del-div">
            <span className="comment-del" onClick={removeComment}></span>
        </div>
    );
 }

export default RemoveComment;
