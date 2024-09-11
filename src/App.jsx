import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
    setFilteredTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    setFilteredTodos(
      todos.filter((eachTodo) =>
        eachTodo.text.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [todos, search]);

  const addTodo = (e) => {
    e.preventDefault();
    if (todo.trim()) {
      setTodos([...todos, { text: todo, completed: false }]);
      setTodo("");
    }
  };

  const toggleTodo = (index) => {
    const newTodos = todos.map((item, idx) => {
      if (idx === index) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((eachTodo, idx) => idx !== index);
    setTodos(newTodos);
  };

  const clearCompleted = () => {
    const activeTodos = todos.filter((todo) => !todo.completed);
    setTodos(activeTodos);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const applyFilter = (filterType) => {
    setFilter(filterType);
    let filtered = todos;

    if (filterType === "Active") {
      filtered = todos.filter((item) => !item.completed);
    } else if (filterType === "Completed") {
      filtered = todos.filter((item) => item.completed);
    }

    filtered = filtered.filter((item) =>
      item.text.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTodos(filtered);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      applyFilter(filter);
    }
  };

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <>
      <div className="bg-[url('https://react-todo-app-pi-eight.vercel.app/assets/bg-desktop-dark-DzAvO98h.jpg')] h-screen object-cover bg-no-repeat">
        <h1 className="text-center text-4xl font-bold text-white pt-28">
          Todo task completed by Rabbi
        </h1>
        <div className="mx-52 px-36 mt-12">
          <form onSubmit={addTodo}>
            <input
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              className="w-[610px] h-[70px] rounded-md text-center text-3xl outline-[#FF204E]"
              type="text"
              name="add"
              placeholder="Create a new todo"
            />
          </form>
          <input
            value={search}
            onChange={handleSearch}
            onKeyPress={handleSearchKeyPress}
            className="w-[610px] h-[50px] outline-[#FFBB5C] mt-4 rounded-md text-center text-2xl bg-[#FF204E] text-white"
            type="text"
            placeholder="Search task by name"
          />
          <div className="w-[610px] mt-5 h-auto rounded-md text-center text-md bg-slate-200">
            <div className="upper flex justify-between items-center px-8">
              <p className="text-neutral-700">{remainingTodos} Items Left</p>
              <ul className="flex justify-center items-center gap-x-3">
                <li
                  className={`cursor-pointer ${
                    filter === "All" ? "font-bold" : ""
                  }`}
                  onClick={() => applyFilter("All")}
                >
                  All
                </li>
                <li
                  className={`cursor-pointer ${
                    filter === "Active" ? "font-bold" : ""
                  }`}
                  onClick={() => applyFilter("Active")}
                >
                  Active
                </li>
                <li
                  className={`cursor-pointer ${
                    filter === "Completed" ? "font-bold" : ""
                  }`}
                  onClick={() => applyFilter("Completed")}
                >
                  Completed
                </li>
              </ul>
              <button
                onClick={clearCompleted}
                className="btn my-2 bg-green-400 rounded-xl px-4 py-2 text-white font-semibold"
              >
                Clear Completed
              </button>
            </div>
            <ul>
              {filteredTodos.map((item, index) => (
                <li
                  key={index}
                  className={`cursor-pointer text-lg py-2 px-4 flex justify-between items-center ${
                    item.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  <span onClick={() => toggleTodo(index)}>{item.text}</span>
                  <button
                    onClick={() => deleteTodo(index)}
                    className="ml-4 bg-red-500 text-white font-semibold px-2 py-1 rounded-xl"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
