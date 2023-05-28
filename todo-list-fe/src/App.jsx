import { MantineProvider } from '@mantine/core'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Todos from './components/Todos'
import NavigationHeader from './components/NavigationHeader'
import { Notifications } from '@mantine/notifications';
import { useState } from "react"


const queryClient = new QueryClient()

const App = () => {
  const [searchValue, setSearchValue] = useState("")

  return (

    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{
        globalStyles: (theme) => ({
          body: {
            ...theme.fn.fontStyles(),
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black
          },
        })
      }} >

        <Notifications />

        <NavigationHeader search={searchValue} onSearch={setSearchValue} />

        <Todos search={searchValue}  />

      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App