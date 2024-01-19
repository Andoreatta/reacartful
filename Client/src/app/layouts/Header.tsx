import { AppBar, Toolbar, Typography, Button, Switch } from "@mui/material";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

export default function Header(props: Readonly<Props>) {
    return (
        <AppBar position='static' sx={{ mb: 4 }}>
            <Toolbar>                
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    Reacartful
                    <Switch checked={props.darkMode} onChange={props.handleThemeChange} />
                </Typography>
                <Button color='inherit'>Login</Button>
            </Toolbar>
        </AppBar>
    )
}