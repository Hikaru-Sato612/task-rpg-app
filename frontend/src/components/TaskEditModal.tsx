import { useState, useEffect } from "react";

type Task = {
  id: number;
  title: string;
  status: string;
  description?: string;
  dueDate?: string;
  isRetry?: boolean;
};

type Props = {
  modalId?: string;
  task: Task | null;
  onUpdate: (task: Task) => void;
  onDelete: (id: number) => void;
};

function TaskEditModal({
  modalId = "edit_modal",
  task,
  onUpdate,
  onDelete,
}: Props) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Next");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // タスクが変わったら反映
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setStatus(task.status);
      setDescription(task.description || "");
      setDueDate(task.dueDate || "");
    }
  }, [task]);

  const closeModal = () => {
    if (task) {
      setTitle(task.title);
      setStatus(task.status);
      setDescription(task.description || "");
      setDueDate(task.dueDate || "");
    }

    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal.close();
  };

  const handleUpdate = () => {
    if (!task || !title) return;

    onUpdate({
      ...task,
      title,
      status,
      description,
      dueDate,
    });

    closeModal();
  };

  const handleDelete = () => {
    if (!task) return;

    onDelete(task.id);
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
        </div>

        <textarea
          placeholder="説明"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-primary w-full"
        ></textarea>

        <div className="modal-action justify-between">
          {/* 削除 */}
          <button className="btn btn-error" onClick={handleDelete}>
            削除
          </button>

          {/* 更新 */}
          <button className="btn btn-primary" onClick={handleUpdate}>
            更新
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default TaskEditModal;
