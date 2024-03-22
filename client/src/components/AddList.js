export function AddList ({addList, newList, setNewList}) {
  const handleSubmit = (event) => {
      event.preventDefault();
      addList();
  }

  return (
    <section className="sm:h-20 sm:w-4/5 md:h-40 md:w-2/3 lg:h-60 lg:w-2/3 bg-green-100 rounded-3xl">
      <div className="flex justify-center items-center h-full rounded-3xl">
        <div className="relative w-4/5 bg-green-100"> 
          <form className="" onSubmit={handleSubmit}>
              <input
                className="w-full caret-green-500 pl-3 rounded-3xl placeholder-custom focus:outline-none"
                value={newList}
                placeholder="add todos..." 
                onChange={(event) => setNewList(event.target.value)}>
              </input>
            <button className="absolute inset-y-0 right-0 mr-4 flex items-center justify-center rounded-3xl" type="submit">
              add
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}