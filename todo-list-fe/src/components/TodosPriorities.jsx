import { Group, Chip } from '@mantine/core'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from "../api"
import { notifications } from '@mantine/notifications'

const TodosPriorities = ({ todo }) => {
    const queryClient = useQueryClient();
    const updateTodoMutation = useMutation(async ({ id, priority }) => {
        return api.put(`/api/todos/${id}`, {
            data: {
                priority: priority
            }
        });
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
            notifications.show({
                title: 'Success!',
                message: `Status set`,
                color: 'yellow',
                autoClose: 5000,
            });
        }
    })

    const setPriority = (priority) => {
        updateTodoMutation.mutate({ id: todo.id, priority: priority })
    }

    return (

        <Chip.Group onChange={setPriority} value={todo.attributes.priority}>
            <Group position="center" mt={15}>
                <Chip variant="filled" color='yellow' value="low">Low</Chip>
                <Chip variant="filled" color='orange' value="medium">Medium</Chip>
                <Chip variant="filled" color='red' value="high">High</Chip>
            </Group>
        </Chip.Group>

    )
}

export default TodosPriorities