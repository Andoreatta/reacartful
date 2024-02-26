import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Container component={Paper} sx={{ height: 110 }}>
            <Typography variant="h3" gutterBottom sx={{ textAlign: 'center' }}>
                The page you requested wasnt found!
            </Typography>
            <Divider />
            <Button fullWidth component={Link} to='/catalog'>Go back to the shop catalog</Button>
        </Container>
    )
}