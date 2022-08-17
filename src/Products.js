import React, { useEffect, useState } from "react"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './Products.css';
import star from './assets/star.png';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

const initialProductTypes = [
    { name: "Blush", value: "blush", checked: "false" },
    { name: "Bronzer", value: "bronzer", checked: "false" },
    { name: "Eyebrow", value: "eyebrow", checked: "false" },
    { name: "Eyeliner", value: "eyeliner", checked: "false" },
    { name: "Eyeshadow", value: "eyeshadow", checked: "false" },
    { name: "Foundation", value: "foundation", checked: "false" },
    { name: "Lip liner", value: "lip_liner", checked: "false" },
    { name: "Lipstick", value: "lipstick", checked: "false" },
    { name: "Mascara", value: "mascara", checked: "false" },
    { name: "Nail polish", value: "nail_polish", checked: "false" },
]

const initialRating = [
    { name: "All", value: "all", checked: "true" },
    { name: "80-100", value: "80", checked: "false" },
    { name: "60-79", value: "60", checked: "false" },
    { name: "40-59", value: "40", checked: "false" },
    { name: "20-39", value: "20", checked: "false" },
    { name: "0-19", value: "0", checked: "false" },
]

const GetProducts = () => {
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(15); // initial count to show initial valid items
    const [productTypes, setProductTypes] = useState([]);

    const fetchData = (url) => {
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setProducts(data);
            })
    }

    const chooseProductType = (event) =>{
        initialProductTypes.forEach(element => {
            if(element.name === event.target.value){
                element.checked = "true";
                setProductTypes(initialProductTypes);
                fetchData("http://makeup-api.herokuapp.com/api/v1/products.json?product_type=" + element.value);
            }       
        });
    }

    const showMoreProducts = () => {  // function that will make count add by 10 to show 10 more items  
        setCount(count + 20);
    }

    useEffect(() => {
        fetchData("http://makeup-api.herokuapp.com/api/v1/products.json")
    }, [])

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,

    }));

    const displayProductTypes = () => {
        return (
            <div className="types">
                <h3>Types</h3>
                <FormGroup>
                    {
                        initialProductTypes.map((item) => {
                            if (item.checked === "true")
                                return <FormControlLabel value={item.name} control={<Checkbox defaultChecked />} label={item.name} />
                            else {
                                return <FormControlLabel value={item.name} onChange={chooseProductType} control={<Checkbox />} label={item.name} />
                            }
                        })
                    }
                </FormGroup>
            </div>
        );
    }
    
    const displayRating = () => {
        return (
            //Convert scale from 0 to 5 to 0 to 100 (y vezes 100 / 5)
            <div className="rating">
                <h3>Rating</h3>
                <FormControl sx={{ width: "100px" }}>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="all"
                        name="radio-buttons-group"
                    >
                        {
                            initialRating.map((item) => {
                                if (item.checked === "true")
                                    return <FormControlLabel value={item.value} control={<Radio defaultChecked />} label={item.name} />
                                else {
                                    return <FormControlLabel value={item.value} control={<Radio />} label={item.name} onChange={null} />
                                }
                            })
                        }
                    </RadioGroup>
                </FormControl>
            </div>
    
        );
    }

    return (
        <div className="ProductsPage">
            <div className="Filters">
                <h2>Filters</h2>
                {
                    displayProductTypes()
                }
                {
                    displayRating()
                }
            </div>
            <div className="showProducts">
                {products.length > 0 && (
                    <div className="Product">
                        <h1>Products</h1>
                        <React.Fragment>
                            <Paper
                                sx={{
                                    p: 2,
                                    flexGrow: 1,
                                    boxShadow: "none",
                                }}
                            >
                                <Grid container spacing={2} justifyContent="center">
                                    {products.slice(0, count).map(product => {
                                        if (product.price !== "0.0") {
                                            return (
                                                <Grid key={product.id}
                                                    item direction="row"
                                                    justifyContent="center"
                                                >
                                                    <Item>
                                                        <Grid item>
                                                            <ButtonBase sx={{ width: 128, height: 128, marginBottom: "1rem"}}>
                                                                <Img alt="complex" src={product.api_featured_image} />
                                                            </ButtonBase>
                                                        </Grid>

                                                        <Grid item container direction="column" spacing={2}>
                                                            <Grid item >
                                                                <Typography gutterBottom variant="title" component="div">
                                                                    {product.name}
                                                                </Typography>
                                                                <Typography variant="subtitle2" gutterBottom>
                                                                    {product.brand}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    <img className="rating_img" src={star} alt="rating"></img>
                                                                     {product.rating === null ? "N/A" : product.rating}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography variant="subtitle1" component="div">
                                                                    {product.price}$
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                            <Button sx={{ backgroundColor: "black" }} variant="contained">
                                                                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                                                    Buy
                                                                </Typography>
                                                                </Button>
                                                            </Grid>
                                                        </Grid>


                                                    </Item>
                                                </Grid>
                                            );
                                        }
                                    })}
                                </Grid>
                            </Paper>
                        </React.Fragment>
                    </div>
                )}

                <Button sx={{ backgroundColor: "purple", marginLeft: "43%" }} className="showMore" variant="contained" onClick={showMoreProducts}>Show More</Button>

            </div>
        </div>
    );
}

export default GetProducts;