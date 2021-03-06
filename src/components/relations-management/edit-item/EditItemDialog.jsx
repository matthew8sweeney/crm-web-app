import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteForever";

import { uiActions } from "../../../store/ui-slice";
import EditLeadForm from "./EditLeadForm";
import EditAccountForm from "./EditAccountForm";
import EditInteractionForm from "./EditInteractionForm";
import EditTaskForm from "./EditTaskForm";
import EditNoteForm from "./EditNoteForm";
import classes from "./EditItemDialog.module.css";

const Transition = React.forwardRef((props, ref) => (
  <Slide ref={ref} direction="up" unmountOnExit {...props} />
));

const itemTypeInfo = {
  leads: { itemName: "Lead", EditItemForm: EditLeadForm },
  accounts: { itemName: "Account", EditItemForm: EditAccountForm },
  interactions: { itemName: "Interaction", EditItemForm: EditInteractionForm },
  tasks: { itemName: "Task", EditItemForm: EditTaskForm },
  notes: { itemName: "Note", EditItemForm: EditNoteForm },
  "": { itemName: "", EditItemForm: "" },
};

const EditItemDialog = (props) => {
  const dispatch = useDispatch();
  const { isOpen, itemType, itemId } = useSelector(
    (state) => state.ui.editItemDialog
  );
  const formRef = useRef();
  const deleteRef = useRef();
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

  const deleteAlertHandler = (event) => {
    setDeleteAlertOpen(true);
  };

  const deleteAlertCancelHandler = (event) => {
    setDeleteAlertOpen(false);
  };

  const deleteHandler = (event) => {
    deleteRef.current.requestSubmit();
    setDeleteAlertOpen(false);
    dispatch(uiActions.hideEditItemDialog());
  };

  const cancelHandler = (event) => {
    dispatch(uiActions.hideEditItemDialog());
  };

  const submitHandler = () => {
    formRef.current.requestSubmit();
  };

  const { itemName, EditItemForm } = itemTypeInfo[itemType];
  return (
    <Dialog
      open={isOpen}
      onClose={cancelHandler}
      TransitionComponent={Transition}
      PaperProps={{ className: classes.dialog }}
    >
      <DialogTitle>Edit {itemName}</DialogTitle>
      <DialogContent className={classes.content}>
        <EditItemForm
          id={itemId}
          ref={formRef}
          deleteRef={deleteRef}
          className={classes.form}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={deleteAlertHandler}
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          style={{ marginRight: "auto" }}
        >
          Delete
        </Button>
        <Dialog open={deleteAlertOpen} onClose={deleteAlertCancelHandler}>
          <DialogTitle>Delete this {itemName}?</DialogTitle>
          <DialogActions>
            <Button
              onClick={deleteAlertCancelHandler}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={deleteHandler}
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Button onClick={cancelHandler} variant="outlined">
          Cancel
        </Button>
        <Button type="submit" onClick={submitHandler} variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditItemDialog;
