import { Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

type Props = {
    products: Product[];
};

export default function ProductList(props: Readonly<Props>) {
    return (
        <Fragment>
            <Typography variant='h3' gutterBottom>Catalog</Typography>
            <Grid container spacing={4}>
                {props.products.map(product => (
                    <Grid item xs={3} key={product.id}>
                        <ProductCard key={product.id} product={product} />
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );
}