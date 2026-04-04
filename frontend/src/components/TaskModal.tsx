import { useState, useEffect } from "react";

type Status = "Done" | "Doing" | "Next" | "Icebox";

type Props = {
  modalId?: string;
  onAdd: () => void;
  defaultStatus: Status;
};

function TaskModal({ modalId = "task_modal", onAdd, defaultStatus }: Props) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<Status>(defaultStatus);
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimatedTime, setEstimatedTime] = useState<number | "">("");

  useEffect(() => {
    setStatus(defaultStatus);
  }, [defaultStatus]);

  const closeModal = () => {
    setTitle("");
    setStatus(defaultStatus);
    setDescription("");
    setDueDate("");
    setEstimatedTime("");

    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal.close();
  };

  const handleAdd = async () => {
    if (!title) return;

    const newTask = {
      title,
      status,
      description: description || null,
      dueDate: dueDate || null,
      estimatedTime: estimatedTime === "" ? null : estimatedTime,
    };

    await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    onAdd();
    closeModal();
  };

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">タスク追加</h3>
          <button onClick={closeModal}>✕</button>
        </div>

        <input
          type="text"
          placeholder="タスク名"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-primary mb-4 w-full"
        />

        <div className="flex gap-2 mb-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            className="select select-primary select-sm"
          >
            <option value="Done">Done</option>
            <option value="Doing">Doing</option>
            <option value="Next">Next</option>
            <option value="Icebox">Icebox</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="input input-primary input-sm"
          />

          <input
            type="number"
            step="0.5"
            min="0"
            placeholder="時間"
            className="input input-primary input-sm w-24"
            value={estimatedTime}
            onChange={(e) =>
              setEstimatedTime(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
          />
        </div>

        <textarea
          placeholder="説明"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-primary w-full"
        />

        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleAdd}>
            追加
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default TaskModal;
