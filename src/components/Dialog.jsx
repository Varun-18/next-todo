import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Edit } from "@mui/icons-material";
import Fab from "@mui/material/Fab";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import axios from "axios";

function AlertDialog({ setData }) {
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ task }) => {
    const { data } = await axios.post("/api/addTask", { task });
    handleClose();
    if (data[0]) {
      setData(data[0].taskList);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Fab variant="outlined" onClick={handleClickOpen}>
        <Edit />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="alert-dialog-title">{"Add Task..!!"}</DialogTitle>
          <DialogContent >
              <TextField   type="text" {...register("task")} />
          </DialogContent>
          <DialogActions>
            <Button type="submit">ADD</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AlertDialog;
