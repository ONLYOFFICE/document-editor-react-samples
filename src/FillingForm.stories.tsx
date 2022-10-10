import { useState, useRef } from "react";
import { SingleValue } from "react-select/dist/declarations/src/types";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DocumentEditor } from "@onlyoffice/document-editor-react";
import config from "./../config/config.json";
import SelectDataControl from "./components/ContentControls/SelectDataControl";
import ContentControls from "./components/ContentControls/ContentControls";
import persons from "./data/persons.json";

interface Person {
  label: string;
  value?: any;
}

function getPersonsOptions(){
  let personsOptions = [];
  for(let i = 0; i < persons.length; i++) {
    personsOptions[i] = {
      label: persons[i].FirstName +" "+ persons[i].LastName,
      value: persons[i]
    }
  }

  return personsOptions;
}

export default {
    title: "Samples/Work with forms",
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
  const [selectedPerson, setSelectedPerson] = useState<
    SingleValue<Person>
  >(null);

  const [contentControls, setContentControls] = useState<any[]>([]);

  const connectorRef = useRef<any>();

  const onDocumentReady = () => {
    try {
      var editor = window.DocEditor.instances["oformEditor"];
      var connector = editor.createConnector();

      connectorRef.current = connector;
      connector.connect();

      getAllContentControls();

      connector.attachEvent("onChangeContentControl", onChangeContentControl);
      connector.attachEvent("onBlurContentControl", onBlurContentControl);
    } catch (err) {
      console.error(err);
    }
  };

  const getAllContentControls = () => {
    connectorRef.current.executeMethod ("GetAllContentControls", null, function(data: any) {
      for (let i = 0; i < data.length; i++) {
        switch (data[i].Tag) {
          case "Male":
            data[i].GroupKey = "Sex";
            data[i].Type = "radio";
            break;
          case "Female":
            data[i].GroupKey = "Sex";
            data[i].Type = "radio";
            break;
          default:
            data[i].Type = "input";
        }

        connectorRef.current.executeMethod("GetFormValue", [data[i].InternalId], (value: any) => {
            data[i].Value = value ? value : "";
            if (data.length - 1 == i) {
              setContentControls(data);
            }
        });
      }
    });
  }

  const onChangeContentControl = (oPr: { Tag?: string; InternalId?: string }) => {
    getAllContentControls();
  };

  const onBlurContentControl = (oPr: { Tag?: string; InternalId?: string }) => {
    setSelectedPerson({ label: "Custom Data" });
  };

  return (
    <div>
      <SelectDataControl selectedOption={selectedPerson} setSelectedOption={setSelectedPerson} options={args.selector.persons} connector={connectorRef} />
      <br />

      <ContentControls contentControls={contentControls} connector={connectorRef} setSelectedOption={setSelectedPerson}/>

      <DocumentEditor {...args.DocumentEditor}
        id="oformEditor"
        config={{
            document: {
                fileType: "oform",
                title: "demo.oform",
                url: config.demoStorage + "withtags.oform",
            },
            documentType: "word",
        }}
        width="70%"
        height="700px"
        events_onDocumentReady={onDocumentReady}
        />
    </div>
  )
}

export const FillingFormTemplate = Template.bind({});
FillingFormTemplate.storyName = "Work with forms";
FillingFormTemplate.args = {
  DocumentEditor: {
    documentserverUrl: config.documentserverUrl,
  },
  selector: {
    persons: getPersonsOptions()
  }
};
