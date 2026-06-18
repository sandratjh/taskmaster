function TaskItem({
                      task,
                      toggleTask,
                      deleteTask,
                  }) {
    return (
        <div
            className={`task-card ${
                task.completed ? "completed" : ""
            }`}
        >
            <span>{task.title}</span>

            <div>
                <button
                    onClick={() =>
                        toggleTask(task.id)
                    }
                >
                    ✓
                </button>

                <button
                    onClick={() =>
                        deleteTask(task.id)
                    }
                >
                    X
                </button>
            </div>
        </div>
    );
}

export default TaskItem;