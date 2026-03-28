function Dashboard() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="cards flex gap-1">
        <div className="card w-96 bg-base-100 shadow-sm">
          {/* Done */}
          <div className="card-body p-0 h-[500px] flex flex-col">
            {/* card header */}
            <div className="bg-purple-500 rounded-md px-4 py-2 relative">
              <h2 className="flex justify-center text-3xl font-bold text-white relative">
                <span className="badge badge-soft badge-primary absolute left-0 top-1/2 -translate-y-1/2">時間</span>
                Done
              </h2>
              <button className="btn absolute right-0 top-1/2 -translate-y-1/2 bg-transparent border-none shadow-none" onClick={()=>document.getElementById('my_modal_1').showModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
              {/* modal */}
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <input type="text" placeholder="タスク名" className="input input-primary mb-4 w-full" />
                  <div className="flex gap-2 mb-4">
                    <select defaultValue="Doing" className="select select-primary select-sm">
                    <option>Done</option>
                    <option>Doing</option>
                    <option>Next</option>
                    <option>Icebox</option>
                    </select>
                    <input type="date" className="input input-primary input-sm" />
                  </div>
                  <textarea placeholder="説明" className="textarea textarea-primary w-full"></textarea>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">追加</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
            
            <div className="flex-1 overflow-y-auto">
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 shadow-sm">
          {/* Doing */}
          <div className="card-body p-0 h-[500px] flex flex-col">
            {/* card header */}
            <div className="bg-purple-500 rounded-md px-4 py-2 relative">
              <h2 className="flex justify-center text-3xl font-bold text-white relative">
                <span className="badge badge-soft badge-primary absolute left-0 top-1/2 -translate-y-1/2">時間</span>
                Doing
              </h2>
              <button className="btn absolute right-0 top-1/2 -translate-y-1/2 bg-transparent border-none shadow-none" onClick={()=>document.getElementById('my_modal_1').showModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
              {/* modal */}
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <input type="text" placeholder="タスク名" className="input input-primary mb-4 w-full" />
                  <div className="flex gap-2 mb-4">
                    <select defaultValue="Doing" className="select select-primary select-sm">
                    <option>Done</option>
                    <option>Doing</option>
                    <option>Next</option>
                    <option>Icebox</option>
                    </select>
                    <input type="date" className="input input-primary input-sm" />
                  </div>
                  <textarea placeholder="説明" className="textarea textarea-primary w-full"></textarea>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">追加</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
            
            <div className="flex-1 overflow-y-auto">
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 shadow-sm">
          {/* Next */}
          <div className="card-body p-0 h-[500px] flex flex-col">
            {/* card header */}
            <div className="bg-purple-500 rounded-md px-4 py-2 relative">
              <h2 className="flex justify-center text-3xl font-bold text-white relative">
                <span className="badge badge-soft badge-primary absolute left-0 top-1/2 -translate-y-1/2">時間</span>
                Next
              </h2>
              <button className="btn absolute right-0 top-1/2 -translate-y-1/2 bg-transparent border-none shadow-none" onClick={()=>document.getElementById('my_modal_1').showModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
              {/* modal */}
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <input type="text" placeholder="タスク名" className="input input-primary mb-4 w-full" />
                  <div className="flex gap-2 mb-4">
                    <select defaultValue="Doing" className="select select-primary select-sm">
                    <option>Done</option>
                    <option>Doing</option>
                    <option>Next</option>
                    <option>Icebox</option>
                    </select>
                    <input type="date" className="input input-primary input-sm" />
                  </div>
                  <textarea placeholder="説明" className="textarea textarea-primary w-full"></textarea>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">追加</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
            
            <div className="flex-1 overflow-y-auto">
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 shadow-sm">
          {/* Icebox */}
          <div className="card-body p-0 h-[500px] flex flex-col">
            {/* card header */}
            <div className="bg-purple-500 rounded-md px-4 py-2 relative">
              <h2 className="flex justify-center text-3xl font-bold text-white relative">
                <span className="badge badge-soft badge-primary absolute left-0 top-1/2 -translate-y-1/2">時間</span>
                Icebox
              </h2>
              <button className="btn absolute right-0 top-1/2 -translate-y-1/2 bg-transparent border-none shadow-none" onClick={()=>document.getElementById('my_modal_1').showModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
              {/* modal */}
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <input type="text" placeholder="タスク名" className="input input-primary mb-4 w-full" />
                  <div className="flex gap-2 mb-4">
                    <select defaultValue="Doing" className="select select-primary select-sm">
                    <option>Done</option>
                    <option>Doing</option>
                    <option>Next</option>
                    <option>Icebox</option>
                    </select>
                    <input type="date" className="input input-primary input-sm" />
                  </div>
                  <textarea placeholder="説明" className="textarea textarea-primary w-full"></textarea>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">追加</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
            
            <div className="flex-1 overflow-y-auto">
            </div>
          </div>
        </div>
      </div>
    </div>

    
  );
}

export default Dashboard;
