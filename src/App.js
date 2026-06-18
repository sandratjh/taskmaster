import { useState, useEffect, useReducer, useContext } from "react";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import { ThemeContext } from "./context/ThemeContext";
import { taskReducer, initialState } from "./reducers/taskReducer";

function App() {
    const [tasks, setTasks] = useState([]);

    const [state, dispatch] = useReducer(
        taskReducer,
        initialState
    );

    const { darkMode, setDarkMode } =
        useContext(ThemeContext);

    useEffect(() => {
        fetch(
            "https://jsonplaceholder.typicode.com/todos?_limit=5"
        )
            .then((response) => response.json())
            .then((data) => setTasks(data));
    }, []);

    const addTask = async (title) => {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    completed: false,
                }),
            }
        );

        const data = await response.json();

        setTasks([
            {
                ...data,
                id: Date.now(),
            },
            ...tasks,
        ]);
    };

    const toggleTask = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        completed: !task.completed,
                    }
                    : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks(
            tasks.filter((task) => task.id !== id)
        );
    };

    const filteredTasks = tasks.filter((task) => {
        if (state.filter === "completed")
            return task.completed;

        if (state.filter === "active")
            return !task.completed;

        return true;
    });

    return (
        <div className={darkMode ? "app dark" : "app"}>
            <Header />

            <button
                className="theme-btn"
                onClick={() => setDarkMode(!darkMode)}
            >
                Vaheta teemat
            </button>

            <TaskForm addTask={addTask} />

            <div className="filters">
                <button
                    onClick={() =>
                        dispatch({ type: "SHOW_ALL" })
                    }
                >
                    Kõik
                </button>

                <button
                    onClick={() =>
                        dispatch({ type: "SHOW_ACTIVE" })
                    }
                >
                    Aktiivsed
                </button>

                <button
                    onClick={() =>
                        dispatch({
                            type: "SHOW_COMPLETED",
                        })
                    }
                >
                    Tehtud
                </button>
            </div>

            <TaskList
                tasks={filteredTasks}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
            />

            <Footer />
        </div>
    );
}

export default App;