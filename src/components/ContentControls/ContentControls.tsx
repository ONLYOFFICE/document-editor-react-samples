import "./ContentControls.css";
import InputControl from  "./InputControl";
import RadioControl from "./RadioControl";

type ContentControlsProps = {
  contentControls: any[];
  setFormValue: (id: string, value: string) => void;
};

const ContentControls = (props: ContentControlsProps) => {
  const {
    contentControls,
    setFormValue,
  } = props;

  let groupsRadioControls: any[] = contentControls.filter(contentControl => contentControl.Tag != "" && contentControl.Type == "radio").reduce((r, a) => {
    r[a.GroupKey] = r[a.GroupKey] || [];
    r[a.GroupKey].push({Tag: a.Tag, checked: a.Value});
    return r;
  }, {});

  for (const [key, value] of Object.entries(groupsRadioControls)) {
    let index = [];
    let first = true;

    for (var i = 0; i < contentControls.length; i++) {
      if (contentControls[i].GroupKey && contentControls[i].GroupKey == key) {
        index.push(i);
      } 
    }

    for (var i = 0; i < index.length; i++) {
      if (first) {
        contentControls[index[i]].Tag = key;
        contentControls[index[i]].Value = value;
        first = false;
      } else {
        contentControls.splice(index[i], 1);
      }
    }
  }

  const getComponent = (contentControl: any) => {
    switch (contentControl.Type) {
      case "input":
        return <InputControl
            key={contentControl.InternalId}
            id={contentControl.Tag}
            label={contentControl.Tag.replace(/([a-z])([A-Z])/g, '$1 $2')}
            value={contentControl.Value}
            setFormValue={setFormValue}
            />
      case "radio": 
        return <RadioControl
          key={contentControl.InternalId}
          id={contentControl.Tag}
          label={contentControl.Tag.replace(/([a-z])([A-Z])/g, '$1 $2')}
          options={contentControl.Value}
          setFormValue={setFormValue}
        />
    }
  }

  return (
    <div className="controlBlock">
      {contentControls.filter(contentControl => contentControl.Tag != "").map((contentControl) => getComponent(contentControl))}
    </div>
  );

}

export default ContentControls;