import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const midLinks = [
    { title: 'Catalog', path: '/catalog' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' }
];

const rightLinks = [
    { title: 'Login', path: '/login' },
    { title: 'Register', path: '/register' }
];

const navstyles = {
    color: 'inherit',
    typography: 'h6',
    textDecoration: 'none',
    '&:hover': {
        color: 'primary.light'
    },
    '&.active': {
        color: 'primary.light'
    }
}

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

export default function Header(props: Readonly<Props>) {
    return (
        <AppBar position='static' sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='h6' component={NavLink} to='/' sx={{ ...navstyles }}>
                        REACARTFUL
                    </Typography>
                    <Switch checked={props.darkMode} onChange={props.handleThemeChange} />
                </Box>

                <List sx={{ display: 'flex', justifyContent: 'center' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={{ ...navstyles }}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
                        <Badge badgeContent={4} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    {rightLinks.map(({ title, path }) => (
                        <Button color='inherit' key={path} sx={{ ...navstyles }}>
                            {title}
                        </Button>
                    ))}
                </Box>

            </Toolbar>
        </AppBar>
    )
}