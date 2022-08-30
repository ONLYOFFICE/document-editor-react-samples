import "./Comments.css";
import AddComment from "./AddComment";
import ListComments from "./ListComments";

type CommentsProps = {
  userName: string;
  comments: any[];
  setComments: any;
  connector: any;
};

const Comments = (props: CommentsProps) => {
  const {
    userName,
    comments,
    setComments,
    connector
  } = props;

  if (connector) {
    connector.attachEvent("onAddComment",  function (comment:any) {
      console.log("onAddComment");
      setComments([comment, ...comments]);
    });

    connector.attachEvent("onRemoveComment",  function (val:any) {
      let copyComments = [...comments];
      const index = copyComments.findIndex(comment => comment.Id === val.Id);

      if (index !== -1) {
        copyComments.splice(index, 1);
        setComments(copyComments);
      }
    });

    connector.attachEvent("onChangeCommentData",  function (val:any) {
      let copyComments = [...comments];
      const index = copyComments.findIndex(comment => comment.Id === val.Id);
      copyComments[index].Data = val.Data;
      setComments(copyComments);
    });
  }

  return (
    <div id="blockComments">
      <h3 style={{textAlign: "left"}}>Comments</h3>
      <AddComment connector={connector} userName={userName}/>
      <ListComments connector={connector} userName={userName} comments={comments} />
    </div>
  );

}

export default Comments;