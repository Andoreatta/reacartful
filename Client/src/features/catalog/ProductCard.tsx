import { Link } from 'react-router-dom';
import { Product } from '../../app/models/product';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, CardHeader, Avatar } from '@mui/material';
import { useState } from 'react';
import agent from '../../app/api/agent';
import { LoadingButton } from '@mui/lab';
import { useStoreContext } from '../../app/context/StoreContext';
import { currencyFormat } from '../../app/util/util';

interface Props {
    product: Product;
}

export default function ProductCard(props: Readonly<Props>) {
    const [loading, setLoading] = useState(false);
    const { setBasket } = useStoreContext();

    function handleAddItemToBasket(productId: number) {
        setLoading(true);
        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    return (
        <Card>

            <CardHeader avatar={
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
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
                    {currencyFormat(props.product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.product.description}
                </Typography>
            </CardContent>

            <CardActions>
                <LoadingButton loading={loading} onClick={() => handleAddItemToBasket(props.product.id)} size="small">Add to cart</LoadingButton>
                <Button component={Link} to={`/catalog/${props.product.id}`} size="small">View</Button>
            </CardActions>

        </Card>
    )
}