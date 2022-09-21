import { useState, useEffect } from "react";
import "./ContentControls.css";

type InputControlProps = {
  id: string;
  value: string;
  label: string
  setFormValue: (id: string, value: string) => void;
};

const InputControl = (props: InputControlProps) => {
  const {
    id,
    value,
    label,
    setFormValue,
  } = props;

  const [inputValue, setInputValue] = useState<string>(value);

  useEffect(() => {
    setInputValue(value);
  }, [ value ]);

  const onCangeInput = (event: any) => {
    setInputValue(event.target.value);
    setFormValue(event.target.id, event.target.value)
  };

  return (
    <div className="control">
      <label>{label}</label>
      <input id={id} value={inputValue} onChange={onCangeInput}/>
    </div>
  );

}

export default InputControl;