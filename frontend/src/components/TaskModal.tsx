import { useState,  useEffect} from "react"

type Task = {
    id: number
    title: string
    status: string
}

type Props = {
    modalId?: string
    onAdd: (task: Task) => void
    defaultStatus: string
}

function TaskModal({ modalId = "task_modal", onAdd, defaultStatus}: Props) {
    const [title, setTitle] = useState("")
    const [status, setStatus] = useState(defaultStatus)

    useEffect(() => {
        setStatus(defaultStatus)
    }, [defaultStatus])

    const handleAdd = () => {
        if (!title) return

        const newTask: Task = {
        id: Date.now(),
        title,
        status,
        }

    onAdd(newTask)

    setTitle("")

    const modal = document.getElementById(modalId) as HTMLDialogElement
    modal.close()
    }

return (
    <dialog id={modalId} className="modal">
        <div className="modal-box">

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

                <input type="date" className="input input-primary input-sm" />
            </div>

            <textarea
                placeholder="説明"
                className="textarea textarea-primary w-full"
            ></textarea>

            <div className="modal-action">
                <button className="btn btn-primary" onClick={handleAdd}>
                    追加
                </button>
            </div>

        </div>
    </dialog>
    )
}

export default TaskModal