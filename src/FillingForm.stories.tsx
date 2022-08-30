import { useState, useRef } from "react";
import Select from "react-select";
import { SingleValue } from "react-select/dist/declarations/src/types";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DocumentEditor } from "@onlyoffice/document-editor-react";

interface Person {
  label: string;
  value?: {
    firstname: string;
    lastname: string;
    birthday: string;
  };
}

export default {
    title: "Sample/Filling form",
    component: DocumentEditor,
    parameters: {},
    decorators: [
        (Story) => (
            <div style={{ height: "400px" }}>
                <Story />
            </div>
        ),
    ],
    argTypes: {
        events_onAppReady: { action: 'onAppReady' },
        events_onDocumentReady: { action: 'onDocumentReady' },
        events_onDocumentStateChange: { action: 'onDocumentStateChange' },
        events_onError: { action: 'onError' }
    },
} as ComponentMeta<typeof DocumentEditor>;

const Template: ComponentStory<any> = (args) => {
  const [selectedPerson, setSelectedPerson] = useState<
    SingleValue<Person>
  >(null);

  const handleSelect = (option: SingleValue<Person>) => {
    setSelectedPerson(option);

    setFormValue("FirstName", option?.value?.firstname || "");
    setFormValue("LastName", option?.value?.lastname || "");
    setFormValue("Birthday", option?.value?.birthday || "");
  };

  const connectorRef = useRef<any>();

  const onDocumentReady = () => {
    try {
      var editor = window.DocEditor.instances["oformEditor"];
      var connector = editor.createConnector();

      connectorRef.current = connector;
      connector.connect();

      connector.attachEvent("onBlurContentControl", onBlurContentControl);
    } catch (err) {
      console.error(err);
    }
  };

  const setFormValue = (formId: string, value: string) => {
    connectorRef.current.executeMethod(
      "GetFormsByTag",
      [formId],
      (forms: any) => {
        connectorRef.current.executeMethod(
          "SetFormValue",
          [forms[0]["InternalId"], value],
          null
        );
      }
    );
  };

  const onBlurContentControl = (oPr: { Tag?: string; InternalId?: string }) => {
    let sTag = oPr!["Tag"];
    const sensTags = [
      "FirstName",
      "LastName",
      "Birthday"
    ];

    if (sensTags.indexOf(sTag || "") !== -1) {
      setSelectedPerson({ label: "Custom data" });
    }
  };

  console.log({args})
  return (
    <div>
      <Select
        value={selectedPerson}
        onChange={handleSelect}
        options={args.selector.persons}
        />
      <br />
      <DocumentEditor {...args.DocumentEditor}
        id="oformEditor"
        config={{
            document: {
                fileType: "oform",
                title: "demo.oform",
                url: "https://kim.teamlab.info/example/download?fileName=sample.oform",
            },
            documentType: "word",
        }}
        height="500px"
        events_onDocumentReady={onDocumentReady}
        />
    </div>
  )
}

export const FillingFormTemplate = Template.bind({});
FillingFormTemplate.storyName = "Filling form";
FillingFormTemplate.args = {
  DocumentEditor: {
    documentserverUrl: "http://192.168.1.102:8095/",
  },
  selector: {
    persons: [
      {
        label:"John Smith",
        value: { 
          firstname: "John",
          lastname: "Smith",
          birthday: "07081988"
        }
      },
      {
        label: "Kate Cage",
        value: { 
          firstname: "Kate",
          lastname: "Cage",
          birthday: "13011988"
        }
      }
    ]
  }
};
