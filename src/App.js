import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Todo from "./Todo";
import "./App.css";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [selectedDate, handleDateChange] = useState(new Date());

  useEffect(() => {
    // listening to updates, changes to database and fires
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            deadline: doc.data().deadline,
          }))
        );
      });
  }, []);

  todos.map((todo) => console.log(todo.deadline?.toDate()));
  const addTodo = (event) => {
    // fire off when button clicked
    event.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      deadline: selectedDate,
    });

    setTodos([...todos, input]);
    setInput("");
    handleDateChange(new Date());
  };

  return (
    <div className="app">
      <div className="app__form">
        <h1>Todo List</h1>
        <form>
          <FormControl className="app__formControl">
            <InputLabel className="app__inputLabel">
              Write your todos
            </InputLabel>
            <Input
              className="app__input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </FormControl>

          <MuiPickersUtilsProvider
            className="dateTimePicker"
            utils={DateFnsUtils}
          >
            <DateTimePicker value={selectedDate} onChange={handleDateChange} />
          </MuiPickersUtilsProvider>
          <Button
            className="app__button"
            disabled={!input}
            variant="contained"
            color="primary"
            onClick={addTodo}
            type="submit"
          >
            Add Todo
          </Button>
        </form>
      </div>
      <ul>
        {todos.map((todo, i) => (
          <Todo todo={todo} key={i} deadline={todo.deadline?.toDate()} />
        ))}
      </ul>
    </div>
  );
}

export default App;
