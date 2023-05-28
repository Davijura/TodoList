import { Grid, Progress } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import api from "../api"
import TodosColumn from './TodosColumn'

const Todos = ({ search }) => {

  const todos = useQuery({
    queryKey: ["todos"],
    queryFn: () => {
      return api.get("/api/todos/").then(({ data }) => data.data)
    }
  })

  const filteredTodos = search.length > 0 ? todos.data?.filter((item) => item.attributes.name.toLowerCase().includes(search.toLowerCase())) : todos.data

  const todoItems = filteredTodos?.filter((item) => item.attributes.status === "todo")
  const todoInProgressItems = filteredTodos?.filter((item) => item.attributes.status === "in_progress")
  const todoDoneItems = filteredTodos?.filter((item) => item.attributes.status === "done")

  const allTodoCount = todos.data?.length ?? 0
  const doneTodoCount = todoDoneItems?.length ?? 0
  const donePercentage = doneTodoCount / allTodoCount * 100


  return (

    <div>

      <Progress value={donePercentage} size="sm" animate />

      <Grid mx={16}>
        <Grid.Col span={12} lg={4}>
          <TodosColumn todos={todoItems} title="TODO" status="todo" />
        </Grid.Col>
        <Grid.Col span={12} lg={4}>
          <TodosColumn todos={todoInProgressItems} title="IN PROGRESS" status="in_progress" />
        </Grid.Col>
        <Grid.Col span={12} lg={4}>
          <TodosColumn todos={todoDoneItems} title="DONE" status="done" />
        </Grid.Col>
      </Grid>


    </div>

  )

}

export default Todos