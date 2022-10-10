import { useState, useEffect } from "react";
import "./ContentControls.css";

type InputControlProps = {
  id: string;
  value: string;
  label: string;
  setSelectedOption: any;
  connector: any;
};

const InputControl = (props: InputControlProps) => {
  const {
    id,
    value,
    label,
    setSelectedOption,
    connector,
  } = props;

  const [inputValue, setInputValue] = useState<string>(value);

  useEffect(() => {
    setInputValue(value);
  }, [ value ]);

  const onCangeInput = (event: any) => {
    setInputValue(event.target.value);
    setFormValue(event.target.id, event.target.value);
    setSelectedOption({label: "Custom Data"});
  };

  const setFormValue = (formId: string, value: string) => {
    connector.current.executeMethod(
      "GetFormsByTag",
      [formId],
      (forms: any) => {
        connector.current.executeMethod(
          "SetFormValue",
          [forms[0]["InternalId"], value],
          null
        );
      }
    );
  };

  return (
    <div className="control">
      <label>{label}</label>
      <input id={id} value={inputValue} onChange={onCangeInput}/>
    </div>
  );

}

export default InputControl;