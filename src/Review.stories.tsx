import { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DocumentEditor } from "@onlyoffice/document-editor-react";
import config from "./../config/config.json";

export default {
    title: "Samples/Work with review",
    component: DocumentEditor,
    parameters: {},
    decorators: [
        (Story) => (
            <div style={{ height: "400px" }}>
                <Story />
            </div>
        ),
    ]
} as ComponentMeta<typeof DocumentEditor>;

const Template: ComponentStory<any> = (args) => {
  const[comments, setComments] = useState<any[]>([]);
  const[connector, setConnector] = useState(null);

  const onDocumentReady = () => {
    var editor = window.DocEditor.instances["docxForComments"];
    var connector = editor.createConnector();

    connector.executeMethod("GetAllComments", null, function(comments: any) {
      let commentsRevers = [];
      for (var i = 0; i < comments.length; i++){
        commentsRevers[i] = comments[(comments.length - 1) - i];
      }
      setComments(commentsRevers);
    });

    setConnector(connector);
  };

  const nextReview = () => {
    //@ts-ignore
    connector.executeMethod("MoveToNextReviewChange", {"isForward": false},  function(data: any) { console.log(data) });
  };

  const acceptReview = () => {
    //@ts-ignore
    connector.executeMethod("AcceptReviewChanges", null,  function(data: any) { console.log(data) });
  };

  const rejectReview = () => {
    //@ts-ignore
    connector.executeMethod("RejectReviewChanges", null,  function(data: any) { console.log(data) });
  };

  return(
      <div>
        <DocumentEditor {...args.editor}
          id="docxForComments"
          documentserverUrl={args.editor.documentserverUrl}
          config={{
              document: {
                  fileType: "docx",
                  title: "demo.docx",
                  url: config.demoStorage + "demo.docx",
              },
              documentType: "word"
        }}
        height="600px"
        width="70%"
        events_onDocumentReady={onDocumentReady}
        />

        <button onClick={nextReview}>Next Review</button>
        <button onClick={acceptReview}>Accept Review</button>
        <button onClick={rejectReview}>Reject Review</button>
      </div>
  )}

export const CommentsTemplate = Template.bind({});
CommentsTemplate.storyName = "Work with review";
CommentsTemplate.args = {
    editor: {
      documentserverUrl: config.documentserverUrl
    }
};
