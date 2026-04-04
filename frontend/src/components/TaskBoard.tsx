import TaskModal from "./TaskModal";
import TaskEditModal from "./TaskEditModal";
import { useEffect, useState } from "react";

type Props = {
  setExp: React.Dispatch<React.SetStateAction<number>>;
};

function TaskBoard({ setExp }: Props) {
  const openModal = () => {
    const modal = document.getElementById("task_modal") as HTMLDialogElement;
    modal.showModal();
  };

  type Status = "Done" | "Doing" | "Next" | "Icebox";

  type Task = {
    id: number;
    title: string;
    status: Status;
    description?: string | null;
    dueDate?: string | null;
    estimatedTime?: number | null;
    isRetry?: boolean;
  };

  const [tasks, setTasks] = useState<Task[]>([]);
  const [archives, setArchives] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalStatus, setModalStatus] = useState<Status>("Next");
  const [expMessage, setExpMessage] = useState("");

  const fetchTasks = () => {
    fetch("http://localhost:3001/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 指定したタスクのstatusだけ変更する
  const updateTaskStatus = async (task: Task, newStatus: Status) => {
    await fetch(`http://localhost:3001/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        status: newStatus,
        description: task.description ?? null,
        dueDate: task.dueDate || null,
        estimatedTime: task.estimatedTime ?? null,
      }),
    });

    fetchTasks();
  };

  // タスク更新
  const updateTask = async (task: Task) => {
    await fetch(`http://localhost:3001/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        status: task.status,
        description: task.description ?? null,
        dueDate: task.dueDate ?? null,
        estimatedTime: task.estimatedTime ?? null,
      }),
    });
    console.log("API送信前", task);
    fetchTasks();
  };

  // タスク削除
  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
    });

    fetchTasks();
  };

  // 編集モーダルを開く
  const openEditModal = (task: Task) => {
    setSelectedTask(task);

    const modal = document.getElementById("edit_modal") as HTMLDialogElement;
    modal.showModal();
  };

  // Done時の条件分岐
  const retryTask = async (task: Task) => {
    await fetch(`http://localhost:3001/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        status: "Doing",
        description: task.description ?? null,
        dueDate: task.dueDate ?? null,
        estimatedTime: task.estimatedTime ?? null,
      }),
    });

    fetchTasks();
  };

  //アーカイブ
  const handleArchive = async (id: number) => {
    const target = tasks.find((task) => task.id === id);
    if (!target) return;

    const exp = 100;

    setExp((prev) => prev + exp);
    setExpMessage(`+${exp} EXP ❤️`);

    setTimeout(() => {
      setExpMessage("");
    }, 2000);

    // DB削除に変更
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
    });

    fetchTasks();
  };

  // 日付を「4/2」の形で表示
  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "";

    const [year, month, day] = dateStr.split("T")[0].split("-");

    // ローカル日付として生成
    const date = new Date(Number(year), Number(month) - 1, Number(day));

    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  //各タスクの{getTotalTimeByStatus("Done")}hの集計
  const getTotalTimeByStatus = (status: Status) => {
    return tasks
      .filter((task) => task.status === status)
      .reduce((sum, task) => sum + (task.estimatedTime || 0), 0);
  };

  return (
    <div className="flex-1 overflow-y-auto py-9">
      <div className="max-w-[1080px] w-full mx-auto">
        <div className="cards flex flex-wrap gap-2 justify-center">
          {/* Done */}
          <div className="card w-full max-w-[260px] bg-base-100 shadow-sm relative">
            {expMessage && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-50 text-green-500 font-bold animate-bounce">
                {expMessage}
              </div>
            )}
            <div className="card-body p-0 h-[500px] flex flex-col">
              <div className="bg-purple-500 rounded-md px-4 py-2 relative overflow-visible">
                <h2 className="flex justify-center text-3xl font-bold text-white relative">
                  <span className="badge badge-soft badge-primary absolute left-0 top-1/2 -translate-y-1/2">
                    {getTotalTimeByStatus("Done")}h
                  </span>
                  Done
                </h2>

                <button
                  className="btn absolute right-0 top-1/2 -translate-y-1/2 bg-transparent border-none shadow-none text-white"
                  onClick={() => {
                    setModalStatus("Done");
                    openModal();
                  }}
                >
                  ＋
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2">
                {tasks
                  .filter((task) => task.status === "Done")
                  .map((task) => (
                    <div key={task.id} className="card bg-base-100 shadow mb-2">
                      <div
                        className="card-body px-2 py-3 flex-row justify-between"
                        onClick={() => openEditModal(task)}
                      >
                        <div className="flex justify-center items-center gap-2">
                          <div className="flex flex-col justify-center items-center">
                            <p className="badge badge-success badge-xs">
                              {task.estimatedTime}
                            </p>
                            <p className="text-[10px] text-green-600">
                              {formatDate(task.dueDate)}
                            </p>
                          </div>
                          <div className="text-xs">{task.title}</div>
                        </div>
                        <div className="flex gap-1 justify-center items-center">
                          <button
                            className="btn btn-xs btn-circle btn-outline btn-secondary text-pink-500 border-pink-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleArchive(task.id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                              />
                            </svg>
                          </button>
                          <button
                            className="btn btn-soft btn-xs text-gray-600 btn-circle"
                            onClick={(e) => {
                              e.stopPropagation();
                              retryTask(task);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Doing */}
          <div className="card w-full max-w-[260px] bg-base-100 shadow-sm">
            <div className="card-body p-0 h-[500px] flex flex-col">
              <div className="bg-purple-500 rounded-md px-4 py-2 relative">
                <h2 className="flex justify-center text-3xl font-bold text-white relative">
                  <span className="badge badge-soft badge-primary absolute left-0 top-1/2 -translate-y-1/2">
                    {getTotalTimeByStatus("Doing")}h
                  </span>
                  Doing
                </h2>
                <button
                  className="btn absolute right-0 top-1/2 -translate-y-1/2 bg-transparent border-none shadow-none text-white"
                  onClick={() => {
                    setModalStatus("Doing");
                    openModal();
                  }}
                >
                  ＋
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2">
                {tasks
                  .filter((task) => task.status === "Doing")
                  .map((task) => (
                    <div key={task.id} className="card bg-base-100 shadow mb-2">
                      <div
                        className="card-body px-2 py-3 flex-row justify-between"
                        onClick={() => openEditModal(task)}
                      >
                        <div className="flex justify-center items-center gap-2">
                          <div className="flex flex-col justify-center items-center">
                            <p className="badge badge-success badge-xs">
                              {task.estimatedTime}
                            </p>
                            <p className="text-[10px] text-green-600">
                              {formatDate(task.dueDate)}
                            </p>
                          </div>
                          <div className="text-xs">{task.title}</div>
                        </div>
                        <button
                          className="btn btn-primary btn-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateTaskStatus(task, "Done");
                          }}
                        >
                          完了
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Next */}
          <div className="card w-full max-w-[260px] bg-base-100 shadow-sm">
            <div className="card-body p-0 h-[500px] flex flex-col">
              <div className="bg-purple-500 rounded-md px-4 py-2 relative">
                <h2 className="flex justify-center text-3xl font-bold text-white relative">
                  <span className="badge badge-soft badge-primary absolute left-0 top-1/2 -translate-y-1/2">
                    {getTotalTimeByStatus("Next")}h
                  </span>
                  Next
                </h2>
                <button
                  className="btn absolute right-0 top-1/2 -translate-y-1/2 bg-transparent border-none shadow-none text-white"
                  onClick={() => {
                    setModalStatus("Next");
                    openModal();
                  }}
                >
                  ＋
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2">
                {tasks
                  .filter((task) => task.status === "Next")
                  .map((task) => (
                    <div key={task.id} className="card bg-base-100 shadow mb-2">
                      <div
                        className="card-body px-2 py-3 flex-row justify-between"
                        onClick={() => openEditModal(task)}
                      >
                        <div className="flex justify-center items-center gap-2">
                          <div className="flex flex-col justify-center items-center">
                            <p className="badge badge-success badge-xs">
                              {task.estimatedTime}
                            </p>
                            <p className="text-[10px] text-green-600">
                              {formatDate(task.dueDate)}
                            </p>
                          </div>
                          <div className="text-xs">{task.title}</div>
                        </div>
                        <button
                          className="btn btn-soft btn-xs text-gray-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateTaskStatus(task, "Doing");
                          }}
                        >
                          始める
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Icebox */}
          <div className="card w-full max-w-[260px] bg-base-100 shadow-sm">
            <div className="card-body p-0 h-[500px] flex flex-col">
              <div className="bg-purple-500 rounded-md px-4 py-2 relative">
                <h2 className="flex justify-center text-3xl font-bold text-white relative">
                  <span className="badge badge-soft badge-primary absolute left-0 top-1/2 -translate-y-1/2">
                    {getTotalTimeByStatus("Icebox")}h
                  </span>
                  Icebox
                </h2>
                <button
                  className="btn absolute right-0 top-1/2 -translate-y-1/2 bg-transparent border-none shadow-none text-white"
                  onClick={() => {
                    setModalStatus("Icebox");
                    openModal();
                  }}
                >
                  ＋
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2">
                {tasks
                  .filter((task) => task.status === "Icebox")
                  .map((task) => (
                    <div key={task.id} className="card bg-base-100 shadow mb-2">
                      <div
                        className="card-body px-2 py-3 flex-row justify-between"
                        onClick={() => openEditModal(task)}
                      >
                        <div className="flex justify-center items-center gap-2">
                          <div className="flex flex-col justify-center items-center">
                            <p className="badge badge-success badge-xs">
                              {task.estimatedTime}
                            </p>
                            <p className="text-[10px] text-green-600">
                              {formatDate(task.dueDate)}
                            </p>
                          </div>
                          <div className="text-xs">{task.title}</div>
                        </div>
                        <button
                          className="btn btn-dash btn-primary btn-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateTaskStatus(task, "Next");
                          }}
                        >
                          受ける
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* modal */}
        <TaskModal onAdd={fetchTasks} defaultStatus={modalStatus} />

        <TaskEditModal
          modalId="edit_modal"
          task={selectedTask}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}

export default TaskBoard;
