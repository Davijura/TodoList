import { Select } from '@mantine/core'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from "../api"
import { notifications } from '@mantine/notifications'

const TodosColumnListDone = ({ todo }) => {
    const queryClient = useQueryClient();

    const updateTodoMutation = useMutation(async ({ id, status }) => {
        return api.put(`/api/todos/${id}`, {
            data: {
                status: status
            }
        });

    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
            notifications.show({
                title: 'Success!',
                message: `Status changed`,
                color: 'blue',
                autoClose: 5000,
            });
        }
    })

    const setStatus = (status) => {
        updateTodoMutation.mutate({ id: todo.id, status: status })
    }

    return (

        <Select
            dropdownPosition="bottom"
            withinPortal
            mt={15}
            radius="lg"
            value={todo.attributes.status}
            data={[
                { value: 'todo', label: 'Todo' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'done', label: 'Done' }
            ]}
            onChange={setStatus}
        />

    )
}

export default TodosColumnListDone