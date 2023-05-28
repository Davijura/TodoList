import { Card, Text, Group, Flex } from '@mantine/core'
import { BsCheckCircleFill } from "react-icons/bs";
import TodosColumnListDelete from "./TodosColumnListDelete"
import TodosColumnListDone from './TodosColumnListDone';
import { useState } from 'react';
import TodosPriorities from './TodosPriorities';
import NameEdit from './NameEdit';
import DescriptionEdit from './DescriptionEdit';

const TodosColumnListItem = ({ todo }) => {
    const [checked, setChecked] = useState(false);
    return (
        <Flex direction="column" gap={24} mt={10}>

            <Card opacity={todo.attributes.status === "done" ? "0.60" : "100"} bg="white" mx="auto" w="90%" shadow="sm" padding="lg" radius="md" withBorder key={todo.id}>

                <Group position="apart" mt="md" mb="xs">
                    <Flex direction="column">

                        <Group spacing="xs">
                            <BsCheckCircleFill fontSize={24} color={todo.attributes.status === "done" ? "green" : "grey"} />

                            <NameEdit todo={todo} />
                        </Group>

                        <Flex >

                            <TodosPriorities todo={todo} />

                        </Flex>
                    </Flex>
                </Group>


                <Group position="apart">
                    <Text fz="md" size="sm" color="dimmed" >

                        <DescriptionEdit todo={todo} />

                    </Text>
                    <TodosColumnListDelete todo={todo} />
                </Group>

                <TodosColumnListDone todo={todo} />

            </Card>
        </Flex>
    )
}

export default TodosColumnListItem