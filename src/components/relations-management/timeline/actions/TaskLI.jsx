import React from "react";
import SelectPanelLI from "../../../ui/select-panel/SelectPanelLI";

const TaskLI = (props) => {
  return (
    <SelectPanelLI
      component={props.component}
      primary={props.data.title}
      secondary={props.data.taskType}
    ></SelectPanelLI>
  );
};

export default TaskLI;