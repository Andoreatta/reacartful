import { Link } from 'react-router-dom';
import { Product } from '../../app/models/product';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, CardHeader, Avatar } from '@mui/material';

interface Props {
    product: Product;
}

export default function ProductCard(props: Readonly<Props>) {
    return (
        <Card>

            <CardHeader avatar={
                <Avatar sx={{bgcolor: 'secondary.main'}}>
                    {props.product.name.charAt(0).toUpperCase()}
                </Avatar>
            }
                title={props.product.name}
                titleTypographyProps={{
                    sx: {
                        fontWeight: 'bold',
                        color: 'primary.main'
                    }
                }}
            />

            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.main' }}
                image={props.product.pictureUrl}
                title={props.product.name}
            />

            <CardContent>
                <Typography gutterBottom color='secondary' variant="h5">
                    ${(props.product.price / 100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.product.description}
                </Typography>
            </CardContent>

            <CardActions>
                <Button size="small">Add to cart</Button>
                <Button component={Link} to={`/catalog/${props.product.id}`} size="small">View</Button>
            </CardActions>

        </Card>
    )
}