import React, { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import axios from "axios";
import { baseURL } from "./utils/constant";
import Popup from "./components/Popup";
import { useNavigate } from "react-router-dom";

const TodoPageWrapper = () => {
  const nav = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    nav("/login");
    return null;
  }

  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});

  useEffect(() => {
    axios
      .get(`${baseURL}/get`, { headers: { Authorization: token } })
      .then((res) => setToDos(res.data))
      .catch((err) => console.log(err));
  }, [updateUI]);

  const saveToDo = () => {
    if (!input.trim()) return;
    axios
      .post(
        `${baseURL}/save`,
        { toDo: input },
        { headers: { Authorization: token } }
      )
      .then(() => {
        setUpdateUI((prev) => !prev);
        setInput("");
      });
  };

  return (
    <div className="todo-layout">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Menu</h2>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            nav("/login");
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="todo-content">
        <h1 className="todo-title">Your Tasks</h1>

        <div className="todo-input-area">
          <input
            className="todo-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
          />
          <button className="add-btn" onClick={saveToDo}>
            Add
          </button>
        </div>

        {/* Todo List */}
        <div className="todo-list">
          {toDos.map((el) => (
            <ToDo
              key={el._id}
              text={el.toDo}
              id={el._id}
              setUpdateUI={setUpdateUI}
              setShowPopup={setShowPopup}
              setPopupContent={setPopupContent}
            />
          ))}
        </div>
      </div>

      {/* Edit Popup */}
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
        />
      )}
    </div>
  );
};

export default TodoPageWrapper;
