import Select from "react-select";

type SelectDataControlProps = {
  selectedOption: any;
  setSelectedOption: any;
  options: any;
  connector: any;
};

const SelectDataControl = (props: SelectDataControlProps) => {
  const {
    selectedOption,
    setSelectedOption,
    options,
    connector,

  } = props;

  const onChange = (option: any) => {
    setSelectedOption(option);

    for (var [key, value] of Object.entries<string>(option.value)) {
      if (key == "Sex") {
        key = value == "Male" ? "Male" : "Female";
        value = "true";
      }

      setFormValue(key, value || "");
    }
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
    <Select
      value={selectedOption}
      onChange={onChange}
      options={options}
    />
  );

}

export default SelectDataControl;