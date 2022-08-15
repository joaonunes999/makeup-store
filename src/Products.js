import React, { useEffect, useState } from "react"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

const GetProducts = () => {
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(10); // initial count to show initial items

    const fetchData = () => {
        fetch("http://makeup-api.herokuapp.com/api/v1/products.json")
            .then(response => {
                return response.json()
            })
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].price === "0.0") {
                        data.splice(i, 1);
                    }
                }
                setProducts(data);
            })
    }

    const showMoreProducts = () => {  // function that will make count add by 10 to show 10 more items  
        setCount(count + 10);
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (

        <div className="showProducts">
            {products.length > 0 && (
                <div className="Product">
                    {products.slice(0, count).map(product => {
                        if (product.price !== "0.0") {
                            return (
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <ButtonBase sx={{ width: 128, height: 128 }}>
                                            <img alt="complex" src={product.image} />
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="subtitle1" component="div">
                                                    {product.name}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    {product.brand}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {product.rating}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                                    Buy
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" component="div">
                                                {product.price}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            );
                        }
                    })}
                </div>
            )}
            <button onClick={showMoreProducts}>
                Show More
            </button>
        </div>
    )
}

export default GetProducts;