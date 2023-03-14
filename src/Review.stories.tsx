import { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DocumentEditor } from "@onlyoffice/document-editor-react";
import Review from "./components/Review/Review";
import config from "./../config/config.json";

export default {
    title: "Samples/Work with review",
    component: Review,
    parameters: {},
    decorators: [
        (Story) => (
            <div style={{ height: "400px" }}>
                <Story />
            </div>
        ),
    ]
} as ComponentMeta<typeof Review>;

const Template: ComponentStory<any> = (args) => {
  const[connector, setConnector] = useState(null);

  const onDocumentReady = () => {
    var editor = window.DocEditor.instances[args.id];
    var connector = editor.createConnector();

    setConnector(connector);
  };

  return(
      <div>
        <Review connector={connector} />

        <DocumentEditor {...args}
          id={args.id}
          documentServerUrl={args.documentServerUrl}
          config={{
              document: {
                  fileType: "docx",
                  key: "docx" + Math.random(),
                  title: "demo.docx",
                  url: config.demoStorage + "review.docx",
                  permissions: {
                    edit: false,
                    review: true
                  }
              },
              editorConfig: {
                mode: "edit"
              },
              documentType: "word"
        }}
        height="600px"
        events_onDocumentReady={onDocumentReady}
        />
      </div>
  )}

export const CommentsTemplate = Template.bind({});
CommentsTemplate.storyName = "Work with review";
CommentsTemplate.args = {
    id: "docxForReview",
    documentServerUrl: config.documentServerUrl
};
