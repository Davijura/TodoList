import { useForm } from '@mantine/form';
import { TextInput, createStyles, Button, Modal, Group } from '@mantine/core';
import api from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useFocusTrap } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  card: {
    width: 500,
    marginLeft: 'auto',
    marginRight: 'auto',

  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))

const TodosCreateForm = ({ opened, onClose, status = "todo" }) => {
  const queryClient = useQueryClient()
  const focusTrapRef = useFocusTrap()
  const createTodoMutation = useMutation({
    mutationFn: (data) => {
      return api.post("/api/todos", {
        data: {
          ...data,
          status
        }

      }).then((response) => response.data.data)
    }
  })

  const form = useForm({
    initialValues: {
      name: '',
      description: "",
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      description: (value) => (value.length < 2 ? 'Description must have at least 2 letters' : null),
    },
  });

  const onSubmit = (values) => {
    if (form.isValid()) {
      createTodoMutation.mutate(values, {
        onSuccess: () => {
          form.reset()
          queryClient.invalidateQueries(["todos"])
          notifications.show({
            title: 'Success',
            message: 'New todo has been added.',
            color: 'green',
            autoClose: 5000,
          });
          onClose()
        }
      })
    }
  }

  const handleError = (errors) => {
    if (errors.name) {
      notifications.show({ message: 'Please fill name field', color: 'red' });
    } else if (errors.description) {
      notifications.show({ message: 'Please fill description field', color: 'red' });
    }
  };

  const close = () => {
    onClose()
    form.reset()
  }

  return (
    <Modal radius="md" opened={opened} onClose={close} title="New Task" centered>
      <form onSubmit={form.onSubmit(onSubmit, handleError)} ref={focusTrapRef}>

        <TextInput
          withAsterisk
          data-autofocus
          label="Title:"
          title="title"
          radius="md"
          placeholder={'Task Title'}
          {...form.getInputProps('name')}
        />

        <TextInput
          withAsterisk
          label="Description:"
          radius="md"
          mt={'md'}
          placeholder='Task Description'
          {...form.getInputProps('description')}
        />

        <Group mt={'md'} position={'apart'}>
          <Button
            onClick={close}
            variant={'subtle'}>
            Cancel
          </Button>
          <Button type="submit" loading={createTodoMutation.isLoading}
          >

            Create Task
          </Button>
        </Group>

      </form>
    </Modal>
  );
}


export default TodosCreateForm;
