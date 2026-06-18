import { useState, useRef, useEffect } from "react";

function TaskForm({ addTask }) {
    const [text, setText] = useState("");

    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleSubmit = () => {
        if (text.trim() === "") return;

        addTask(text);

        setText("");
    };

    return (
        <div className="task-form">
            <input
                ref={inputRef}
                type="text"
                placeholder="Sisesta ülesanne..."
                value={text}
                onChange={(e) =>
                    setText(e.target.value)
                }
            />

            <button onClick={handleSubmit}>
                Lisa
            </button>
        </div>
    );
}

export default TaskForm;