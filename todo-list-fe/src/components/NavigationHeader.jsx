import { createStyles, Header, Text, Container, rem, Input, Group } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: "space-between",
    alignItems: 'left',
    height: rem(56),


    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },

    [theme.fn.largerThan('xs')]: {
      justifyContent: 'center',
    },
  },

  links: {
    width: rem(260),

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
      justifyContent: 'flex-end'
    },
  },

  social: {
    width: rem(260),

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },

  burger: {
    marginRight: theme.spacing.md,


    [theme.fn.largerThan('sm')]: {
      display: 'none',

    },
  },

  link: {
    display: 'block',
    border: "none",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,


    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

function NavigationHeader({ search, onSearch }) {
  const { classes, cx } = useStyles();

  return (
    <Header bg="grey.7" height={60} >
      <Container className={classes.inner}>

        <Group w="100%" mx="auto" position="apart" >

          <Text weight="500" size={23}>Your Board</Text>

          <Input
            onChange={(event) => onSearch(event.target.value)}
            value={search}
            placeholder="Search"
            icon={<IconSearch size="1rem" />}
          />
        </Group>

      </Container>
    </Header>
  );
}

export default NavigationHeader