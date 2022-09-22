import { useState, useEffect } from "react";
import "./ContentControls.css";

type RadioControlProps = {
  id: string;
  label: string;
  options: any [];
  setFormValue: (id: string, value: string) => void;
};

const RadioControl = (props: RadioControlProps) => {
  const {
    id,
    label,
    options,
    setFormValue,
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
    console.log(event);
    setCheckedOptionState(event.target.id);
    setFormValue(event.target.id, "true");
  };

  return (
    <div id={id} className="control">
      <label>{label}</label>
      <div className="radioControl">
        {options.map((option) =>
          <span>
            <input type="radio" id={option.Tag} checked={checkedOptionState == option.Tag} onChange={onRadioControl}/>
            <label className="radioLabel">{option.Tag.replace(/([a-z])([A-Z])/g, '$1 $2')}</label>
          </span>
        )}
      </div>
    </div>
  );

}

export default RadioControl;