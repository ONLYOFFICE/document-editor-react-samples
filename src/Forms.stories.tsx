import { useState } from "react";
import AsyncSelect from "react-select/async";
import { SingleValue } from "react-select/dist/declarations/src/types";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DocumentEditor } from "@onlyoffice/document-editor-react";
import config from "./../config/config.json";

interface OptionType {
  label: string;
  value: string;
}

export default {
    title: "Sample/Forms",
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

const Template: ComponentStory<typeof DocumentEditor> = (args) => {
  const [selectedOption1, setSelectedOption1] = useState<
    SingleValue<OptionType>
  >(null);

  const loadOptions = async () => {
    try {
      const res = await fetch(
        config.oformsUrl
      );
      const jData = await res.json();

      const fileOforms = jData.data.map(
        (item: { attributes: { file_oform: { data: any[] } } }) =>
          item.attributes.file_oform.data.find(
            (f) => f.attributes.ext === ".oform"
          )
        );
      const options = fileOforms
        .map((form: { attributes: { url: any; name: any } }) => {
          return form && form.attributes
            ? { value: form.attributes.url, label: form.attributes.name }
            : null;
          })
        .filter((o: any) => o != null);

      return options;
    } catch (e) {
      console.error(e);
    }
  };

  const load = (
    inputValue: string,
    callback: (options: OptionType[]) => void
  ) => {
    loadOptions()
      .then((opts: OptionType[]) => callback(opts))
      .catch((e) => console.error(e));
  };

  const handleChange1 = (option: SingleValue<OptionType>) => {
    setSelectedOption1(option);
  };

  return (
    <div>
      <AsyncSelect
        key={1}
        value={selectedOption1}
        onChange={handleChange1}
        cacheOptions
        defaultOptions
        loadOptions={load}
        />

      <DocumentEditor {...args}
        id="oformEditor"
        config={{
            document: {
                fileType: "oform",
                title: selectedOption1
                  ? selectedOption1.label
                  : "demo.oform",
                url: selectedOption1
                  ? selectedOption1.value
                  : config.demoStorage + "demo.oform",
            },
            documentType: "word",
        }}
        height="600px"
        />
    </div>
  )
}

export const FormsTemplate = Template.bind({});
FormsTemplate.storyName = "Forms";
FormsTemplate.args = {
    documentserverUrl: config.documentserverUrl,
};
