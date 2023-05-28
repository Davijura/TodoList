import TodosColumnListItem from "./TodosColumnListItem";
import { Text, Card, Group, Flex, createStyles } from '@mantine/core';
import { GrAdd, GrFormAdd } from 'react-icons/gr';
import { useDisclosure, useFocusTrap } from "@mantine/hooks";
import TodosCreateForm from "./TodosCreateForm";

const useStyles = createStyles(() => ({
    group: {
        cursor: "pointer",
        gap: "0",
        margin: "auto",
    },

    pointer: {
        cursor: "pointer"
    }
}))

const TodosColumn = ({ title, todos = [], status = "todo" }) => {
    const { classes } = useStyles();
    const [opened, { open, close }] = useDisclosure(false)
    const focusTrapRef = useFocusTrap();

    return (

        <Card bg="transparent" padding="lg" radius="md" pb={0} >

            <TodosCreateForm opened={opened} onClose={close} status={status} />

            <Group position="apart" mt="md" mb="sm" mx={40} >
                <Text weight={500}>{title}</Text>
                <GrAdd onClick={open} className={classes.pointer} />
            </Group>

            <Flex direction={"column"} gap={24}>

                {todos.map((item) => {
                    return (
                        <TodosColumnListItem key={item.id} todo={item} />
                    )
                })}
                <Group onClick={open} className={classes.group}>
                    <GrFormAdd fontSize={25} />
                    <Text>Add task</Text>
                </Group>

            </Flex>

        </Card>
    )
}

export default TodosColumn