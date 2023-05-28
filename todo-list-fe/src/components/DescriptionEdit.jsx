import { Text, Group } from '@mantine/core'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from "../api"
import { notifications } from '@mantine/notifications';
import { useState } from "react"

const DescriptionEdit = ({ todo }) => {
    const [description, setDescription] = useState(todo.attributes.description)

    const queryClient = useQueryClient();

    const editTodoMutation = useMutation(async ({ id, description }) => {
        return api.put(`/api/todos/${id}`, {
            data: {
                description: description
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
        setDescription(data.target.innerText)
    }

    const onBlur = () => {
        if (description !== todo.attributes.description) {
            editTodoMutation.mutate({ id: todo.id, description: description })
        }
    }


    return (
        <Group >
            <Text
                onInput={onChange}
                fz="lg"
                contentEditable="true"
                weight={500}
                onBlur={onBlur}
                dangerouslySetInnerHTML={{ __html: todo.attributes.description }}
            />
        </Group>

    )
}

export default DescriptionEdit