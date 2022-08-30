import AddCommentReply from "./AddCommentReply";
import RemoveComment from "./RemoveComment";
import RemoveCommentReply from "./RemoveCommentReply";

type ListCommentsProps = {
    connector: any;
    userName: string;
    comments: any[];
  };

const ListComments = (props: ListCommentsProps) => {
    const {
        connector,
        comments,
        userName,
    } = props;

    function GoToComment (e: any) {
      if (e.target.parentElement.id) {
        connector.executeMethod("MoveToComment",[e.target.parentElement.id]);
      }
    }

    return (
        <div>
            {comments && comments.map((comment) =>
                <div className="comment-div" key={comment["Id"]}>
                    <RemoveComment connector={connector} commentId={comment["Id"]}/>
                    <div id={comment["Id"]} onClick={GoToComment}>
                      <span className="comment-span">Author: {comment["Data"]["UserName"]}</span>
                      <span className="comment-span">Date: {new Date(parseInt(comment["Data"]["Time"], 10)).toLocaleString()}</span>
                      <span className="comment-span">Message: {comment["Data"]["Text"]}</span>
                    </div>
                    <div className="comment-replies">
                        {comment["Data"]["Replies"].map((reply: any, index: any) =>
                            <div key={index} style={{ marginBottom: "10px" }}>
                                <RemoveCommentReply connector={connector} comment={comment} replyId={index} />
                                <span className="comment-span">Author: {reply["UserName"]}</span>
                                <span className="comment-span">Date: {new Date(parseInt(reply["Time"], 10)).toLocaleString()}</span>
                                <span className="comment-span">Message: {reply["Text"]}</span>
                            </div>
                        )}
                    </div>
                    <AddCommentReply connector={connector} userName={userName} comment={comment} />
                </div>
            )}
        </div>
    );
 }

export default ListComments;
