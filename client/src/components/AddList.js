export function AddList ({addList, newList, setNewList}) {
  const handleSubmit = (event) => {
      event.preventDefault();
      addList();
  }

  return (
    <section className='submitForm'>
      <form onSubmit={handleSubmit}>
          <textarea 
            value={newList} 
            placeholder="Type Content Here" 
            cols="70" rows="5" 
            onChange={(event) => setNewList(event.target.value)}>
          </textarea>
          <button type="submit">
              Submit
          </button>
      </form>
    </section>
  )
}