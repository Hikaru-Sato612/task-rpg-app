import { useState, useEffect } from "react";

type Task = {
  id: number;
  title: string;
  status: string;
  description?: string;
  estimatedTime?: number;
  dueDate?: string;
};

type Props = {
  modalId?: string;
  onAdd: (task: Task) => void;
  defaultStatus: string;
};

function TaskModal({ modalId = "task_modal", onAdd, defaultStatus }: Props) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(defaultStatus);
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(0);

  useEffect(() => {
    setStatus(defaultStatus);
  }, [defaultStatus]);

  const closeModal = () => {
    setTitle("");
    setStatus(defaultStatus);
    setDescription("");
    setDueDate("");
    setEstimatedTime(0);
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal.close();
  };

  const handleAdd = () => {
    if (!title) return;

    const newTask: Task = {
      id: Date.now(),
      title,
      status,
      description,
      dueDate,
      estimatedTime,
    };

    onAdd(newTask);
    setTitle("");
    closeModal();
  };

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">タスク編集</h3>
          <button onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 font-bold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
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
            onChange={(e) => setStatus(e.target.value)}
            className="select select-primary select-sm"
          >
            <option>Done</option>
            <option>Doing</option>
            <option>Next</option>
            <option>Icebox</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="input input-primary input-sm"
          />

          <label className="input input-primary input-sm w-40">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

            <input
              type="number"
              step="0.5"
              className="grow"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(Number(e.target.value))}
            />
          </label>
        </div>

        <textarea
          placeholder="説明"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-primary w-full"
        ></textarea>

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
