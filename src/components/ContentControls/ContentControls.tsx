import "./ContentControls.css";
import InputControl from  "./InputControl";

type ContentControlsProps = {
  contentControls: any[];
  setFormValue: (id: string, value: string) => void;
};

const ContentControls = (props: ContentControlsProps) => {
  const {
    contentControls,
    setFormValue,
  } = props;

  return (
    <div className="controlBlock">
      {contentControls && contentControls.filter(contentControl => contentControl.Tag != "").map((contentControl:any) =>
        <InputControl
          key={contentControl.InternalId}
          id={contentControl.Tag}
          label={contentControl.Tag.replace(/([a-z])([A-Z])/g, '$1 $2')}
          value={contentControl.Value}
          setFormValue={setFormValue}
          />
      )}
    </div>
  );

}

export default ContentControls;