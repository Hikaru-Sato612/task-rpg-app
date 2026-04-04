import { useState, useEffect } from "react";

type Status = "Done" | "Doing" | "Next" | "Icebox";

type Task = {
  id: number;
  title: string;
  status: Status;
  description?: string | null;
  dueDate?: string | null;
  estimatedTime?: number | null;
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
  const [status, setStatus] = useState<Status>("Next");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimatedTime, setEstimatedTime] = useState<number | "">("");

  // タスク反映
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setStatus(task.status);
      setDescription(task.description || "");
      setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
      setEstimatedTime(task.estimatedTime ?? "");
    }
  }, [task]);

  const closeModal = () => {
    if (task) {
      setTitle(task.title);
      setStatus(task.status);
      setDescription(task.description || "");
      setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
      setEstimatedTime(task.estimatedTime ?? "");
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
      description: description || null,
      dueDate: dueDate || null,
      estimatedTime: estimatedTime === "" ? null : estimatedTime,
    });

    console.log("更新押した", {
      title,
      status,
      description,
      dueDate,
      estimatedTime,
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
          <button onClick={closeModal}>✕</button>
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

        <div className="modal-action justify-between">
          <button className="btn btn-error" onClick={handleDelete}>
            削除
          </button>

          <button className="btn btn-primary" onClick={handleUpdate}>
            更新
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default TaskEditModal;
