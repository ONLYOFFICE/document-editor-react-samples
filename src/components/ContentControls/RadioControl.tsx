import { useState, useEffect } from "react";
import "./ContentControls.css";

type RadioControlProps = {
  id: string;
  label: string;
  options: any [];
  setSelectedOption: any;
  connector: any;
};

const RadioControl = (props: RadioControlProps) => {
  const {
    id,
    label,
    options,
    setSelectedOption,
    connector,
  } = props;

  let checkedOption = "";

  for (var i = 0; i < options.length; i++) {
    if (options[i].checked == true) {
      checkedOption = options[i].Tag;
    }
  }

  const [checkedOptionState, setCheckedOptionState] = useState<string>(checkedOption);

  useEffect(() => {
    setCheckedOptionState(checkedOption);
  }, [ options ]);

  const onRadioControl = (event: any) => {
    setCheckedOptionState(event.target.id);
    setFormValue(event.target.id, "true");
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
    <div id={id} className="control">
      <label>{label}</label>
      <div className="radioControl">
        {options.map((option) =>
          <span key={option.Tag}>
            <input type="radio" id={option.Tag} checked={checkedOptionState == option.Tag} onChange={onRadioControl}/>
            <label className="radioLabel">{option.Tag.replace(/([a-z])([A-Z])/g, '$1 $2')}</label>
          </span>
        )}
      </div>
    </div>
  );

}

export default RadioControl;