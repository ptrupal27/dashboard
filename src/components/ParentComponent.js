import TaskForm from './TaskForm'

function ParentComponent() {
  const handleSubmit = (newTask) => {
    // Your logic to handle form submission and newTask object
    console.log('New task created:', newTask)
  }

  return (
    <div>
      <h1>Parent Component</h1>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  )
}

export default ParentComponent;