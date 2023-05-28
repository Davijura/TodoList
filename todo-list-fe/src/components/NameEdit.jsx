import { Text, Group } from '@mantine/core'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from "../api"
import { notifications } from '@mantine/notifications';
import { useState } from "react"

const NameEdit = ({ todo }) => {
    const [name, setName] = useState(todo.attributes.name)

    const queryClient = useQueryClient();

    const editTodoMutation = useMutation(async ({ id, name }) => {
        return api.put(`/api/todos/${id}`, {
            data: {
                name: name
            }
        })
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
            notifications.show({
                title: 'Success!',
                message: `Todo has been edited.`,
                color: 'green',
                autoClose: 5000,
            });
        }
    })

    const onChange = (data) => {
        setName(data.target.innerText)
    }

    const onBlur = () => {
        if (name !== todo.attributes.name) {
            editTodoMutation.mutate({ id: todo.id, name: name })
        }
    }


    return (
        <Group>
            <Text
                onInput={onChange}
                fz="lg"
                contentEditable="true"
                weight={500}
                onBlur={onBlur}
                dangerouslySetInnerHTML={{ __html: todo.attributes.name }}
            />
        </Group>

    )
}

export default NameEdit