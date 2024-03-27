import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { removeItem, setBasket } from "./basketSlice";
import { BasketItem } from "../../app/models/basket";

export default function BasketPage() {
    const { basket} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const [status, setStatus] = useState({
        loading: false,
        name: ''
    });

    function handleAddItemToBasket(productId: number, name: string) {
        setStatus({ loading: true, name });
        agent.Basket.addItem(productId)
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }));
    }

    function handleRemoveItemFromBasket(productId: number, quantity = 1, name: string) {
        setStatus({ loading: true, name });
        agent.Basket.removeItem(productId, quantity)
            .then(() => dispatch(removeItem({ productId, quantity })))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }));
    }

    if (!basket) return <Typography variant="h3" align="center">No items in the basket</Typography>

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography variant="h6">Product</Typography></TableCell>
                                <TableCell align="right"><Typography variant="h6">Price</Typography></TableCell>
                                <TableCell align="right"><Typography variant="h6">Quantity</Typography></TableCell>
                                <TableCell align="right"><Typography variant="h6">Total</Typography></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {basket.items.map((item: BasketItem) => (
                                <TableRow key={item.productId}>
                                    <TableCell component="th" scope="row">
                                        <Box display='flex' alignItems='center'>
                                            <img src={item.pictureUrl} alt={item.productName} style={{ width: 50, height: 50, objectFit: 'cover', marginRight: 10 }} />
                                            <Typography variant="body1">{item.productName}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right"><Typography variant="body1">${(item.price / 100).toFixed(2)}</Typography></TableCell>
                                    <TableCell align="right"><Typography variant="body1">
                                        <LoadingButton
                                            loading={status.loading && status.name === 'remove' + item.productId}
                                            onClick={() => handleRemoveItemFromBasket(item.productId, 1, 'remove' + item.productId)}
                                            color="secondary"
                                        >
                                            <Remove />
                                        </LoadingButton>
                                        {item.quantity}
                                        <LoadingButton
                                            loading={status.loading && status.name === 'remove' + item.productId}
                                            onClick={() => handleAddItemToBasket(item.productId, 'add' + item.productId)}
                                            color="secondary"
                                        >
                                            <Add />
                                        </LoadingButton>
                                    </Typography></TableCell>
                                    <TableCell align="right"><Typography variant="body1">${(item.price * item.quantity / 100).toFixed(2)}</Typography></TableCell>
                                    <TableCell align="right">
                                        <LoadingButton
                                            loading={status.loading && status.name === 'delete' + item.productId}
                                            onClick={() => handleRemoveItemFromBasket(item.productId, item.quantity, 'delete' + item.productId)}
                                            color="error"
                                        >
                                            <Delete />
                                        </LoadingButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6} />
                <BasketSummary />
                <Button component={Link} to='/checkout' variant="contained" color="primary" sx={{ mt: 2, ml: 'auto' }}>Checkout</Button>
            </Grid>
        </>
    )
}