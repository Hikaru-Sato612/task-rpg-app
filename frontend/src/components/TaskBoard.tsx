import TaskModal from "./TaskModal";
import TaskEditModal from "./TaskEditModal";
import { useState } from "react";

function TaskBoard() {
  const openModal = () => {
    const modal = document.getElementById("task_modal") as HTMLDialogElement;
    modal.showModal();
  };

  type Task = {
    id: number;
    title: string;
    status: string;
    description?: string;
    dueDate?: string;
    estimatedTime?: number;
    isRetry?: boolean;
  };

  const [tasks, setTasks] = useState<Task[]>([]);
  const [archives, setArchives] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalStatus, setModalStatus] = useState("Next");
  

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  // 指定したタスクのstatusだけ変更する
  const updateTaskStatus = (id: number, newStatus: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task,
      ),
    );
  };

  // タスク更新
  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  // タスク削除
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // 編集モーダルを開く
  const openEditModal = (task: Task) => {
    setSelectedTask(task);

    const modal = document.getElementById("edit_modal") as HTMLDialogElement;
    modal.showModal();
  };

  // Done時の条件分岐
  const retryTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: "Doing", isRetry: true } : task,
      ),
    );
  };

  //アーカイブ
  const handleArchive = (id: number) => {
    const target = tasks.find((task) => task.id === id);

    if (!target) return;

    // EXP
    alert("+100 EXP ❤️");

    // アーカイブに追加
    setArchives([...archives, target]);

    // tasksから削除
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-[1080px] w-full mx-auto">
        <div className="cards flex flex-wrap gap-2 justify-center">
          {/* Done */}
          <div className="card w-full max-w-[260px] bg-base-100 shadow-sm">
            <div className="card-body p-0 h-[500px] flex flex-col">
              <div className="bg-purple-500 rounded-md px-4 py-2 relative">
                <h2 className="flex justify-center text-3xl font-bold text-white relative">
                  <span className="badge badge-soft badge-primary absolute left-0 top-1/2 -translate-y-1/2">
                    時間
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
                        className="card-body p-3 flex-row justify-between"
                        onClick={() => openEditModal(task)}
                      >
                        <div className="">{task.title}</div>
                        <div className="flex gap-1">
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
                              retryTask(task.id);
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
                    時間
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
                        className="card-body p-3 flex-row justify-between"
                        onClick={() => openEditModal(task)}
                      >
                        <div className="">{task.title}</div>
                        <button
                          className="btn btn-primary btn-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateTaskStatus(task.id, "Done");
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
                    時間
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
                        className="card-body p-3 flex-row justify-between"
                        onClick={() => openEditModal(task)}
                      >
                        <div className="">{task.title}</div>
                        <button
                          className="btn btn-soft btn-xs text-gray-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateTaskStatus(task.id, "Doing");
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
                    時間
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
                        className="card-body p-3 flex-row justify-between"
                        onClick={() => openEditModal(task)}
                      >
                        <div className="">{task.title}</div>
                        <button
                          className="btn btn-dash btn-primary btn-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateTaskStatus(task.id, "Next");
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
        <TaskModal
          modalId="task_modal"
          onAdd={addTask}
          defaultStatus={modalStatus}
        />

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
