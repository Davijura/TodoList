import { Button } from '@mantine/core';
import { TbTrash } from "react-icons/tb"
import api from "../api"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';


const TodosColumnListDelete = ({ todo }) => {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation(async (id) => {
    await api.delete(`/api/todos/${id}`);
    return id;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      notifications.show({
        title: 'Success!',
        message: `Todo has been deleted.`,
        color: 'red',
        autoClose: 5000,
      });
    }
  })

  const handleDeleteTodo = () => {
    deleteTodoMutation.mutate(todo.id);
  }

  return (
    <Button onClick={handleDeleteTodo} variant='white' bg="white" bg:hover="white"><TbTrash color='red' fontSize={25} /></Button>
  )
}

export default TodosColumnListDelete