import React, { useState } from "react";
import "./Todo.css";
import { Modal, Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import db from "./firebase";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "#fff",
    border: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    textAlign: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = () => {
    // update to do with new input text
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );

    setOpen(false);
  };

  return (
    <>
      <Modal className="todo__modal" open={open} onClose={handleClose}>
        <div className={classes.paper}>
          <h3>Edit Item</h3>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button onClick={updateTodo}>Update todo</Button>
        </div>
      </Modal>
      <div className="todo__item">
        <div className="todo__details">
          <h3>{props.todo.todo}</h3>
          <p className="todo__deadline">
            {props.deadline?.getHours()}:{props.deadline?.getMinutes()}
            &nbsp; {props.deadline?.getMonth() + 1}-{props.deadline?.getDate()}-
            {props.deadline?.getFullYear()}
          </p>
        </div>
        <div className="todo__editDelete">
          <Button className="todo__editButton" onClick={handleOpen}>
            Edit
          </Button>
          <DeleteForeverIcon
            className="todo__deleteButton"
            onClick={(event) =>
              db.collection("todos").doc(props.todo.id).delete()
            }
          />
        </div>
      </div>
    </>
  );
}

export default Todo;
