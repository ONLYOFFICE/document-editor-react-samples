import { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DocumentEditor } from "@onlyoffice/document-editor-react";
import config from "../config/config.json";

export default {
    title: "Samples/CallCommand",
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
  const[connector, setConnector] = useState(null);

  const onDocumentReady = () => {
    var editor = window.DocEditor.instances[args.id];
    var connector = editor.createConnector();

    setConnector(connector);
  };

  const callCommand = () => {
    //@ts-ignore
    connector.callCommand(function() {
      //@ts-ignore
      var oDocument = Api.GetDocument();
      //@ts-ignore
      var oParagraph = Api.CreateParagraph();
      oParagraph.AddText("Hello world!");
      oDocument.InsertContent([oParagraph]);
    }, function(a: any){
        console.log('CallCommand')
  });
  };

  return(
      <div>
        <div className="reviewBlock">
          <button onClick={callCommand}>Add Hello World!</button>
        </div>

        <DocumentEditor {...args}
          id={args.id}
          documentServerUrl={args.documentServerUrl}
          config={{
              document: {
                  fileType: "docx",
                  key: args.key,
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
CommentsTemplate.storyName = "CallCommand";
CommentsTemplate.args = {
    id: "docxForCallComand",
    documentServerUrl: config.documentServerUrl,
    key: "docx" + Math.random()
};
