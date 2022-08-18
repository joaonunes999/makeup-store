import React, { useEffect, useState } from "react"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './Products.css';
import star from '../assets/star.png';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import ModalProduct from '../components/Modal';
import Link from '@mui/material/Link';

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
    { name: "80-100", value: "4", checked: "false" },
    { name: "60-79", value: "3", checked: "false" },
    { name: "40-59", value: "2", checked: "false" },
    { name: "20-39", value: "1", checked: "false" },
    { name: "0-19", value: "0", checked: "false" },
]

const GetProducts = () => {
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(15); // initial count to show initial valid items
    const [productTypes, setProductTypes] = useState([]);
    const [rating, setRating] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [previewProduct, setPreviewProduct] = useState({ product: {}, i: null });
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = (url) => {
        setIsLoading(true);
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setProducts(data);
                setIsLoading(false)
            })
    }

    const chooseProductType = (event) => {
        initialProductTypes.forEach(element => {
            if (element.name === event.target.value) {
                if (element.checked === "true") {
                    element.checked = "false";
                    setProductTypes(initialProductTypes);
                    fetchData("http://makeup-api.herokuapp.com/api/v1/products.json");
                } else {
                    element.checked = "true";
                    setProductTypes(initialProductTypes);
                    fetchData("http://makeup-api.herokuapp.com/api/v1/products.json?product_type=" + element.value);
                }
            }
        });
    }

    const chooseRating = (event) => {
        initialRating.forEach(element => {
            if (event.target.value === "All") {
                element.checked = "false";
                fetchData("https://makeup-api.herokuapp.com/api/v1/products.json");
            } else if (element.name === event.target.value) {
                element.checked = "true";
                setRating(rating);
                var twoElement = parseInt(element.value) + 1;
                fetchData("https://makeup-api.herokuapp.com/api/v1/products.json?rating_greater_than=" + element.value + "&rating_less_than=" + twoElement);
            } else {
                element.checked = "false";
            }
        })
    }

    const handlePreview = (index) => {
        setPreviewProduct({ product: products[index], i: index });
        setOpenModal(true);
    }

    const showMoreProducts = () => {  // function that will make count add by 10 to show 10 more items  
        setCount(count + 20);
    }

    useEffect(() => {
        fetchData("http://makeup-api.herokuapp.com/api/v1/products.json");
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
                                return <FormControlLabel key={item.id} value={item.name} onChange={chooseProductType} control={<Checkbox checked />} label={item.name} />
                            else {
                                return <FormControlLabel key={item.id} value={item.name} onChange={chooseProductType} control={<Checkbox />} label={item.name} />
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
                                if (item.checked === "true") {
                                    return <FormControlLabel key={item.id} value={item.name} onChange={chooseRating} control={<Radio checked />} label={item.name} />
                                }
                                else {
                                    return <FormControlLabel key={item.id} value={item.name} onChange={chooseRating} control={<Radio />} label={item.name} />
                                }
                            })
                        }
                    </RadioGroup>
                </FormControl>
            </div>

        );
    }

    const checkLoading = () => {
        if (isLoading) {
            return (
                <div className="spinner">
                    <div className="loading-spinner_1">
                    </div>
                </div>
            );
        } else {
            if (products.length === 0) {
                return (<h2 className="no-products">No products found</h2>);
            };
        }
    }

    return (

        <div className="ProductsPage">

            <div className="Filters">
                <h2>Filters</h2>
                {
                    displayRating()
                }
                {
                    displayProductTypes()
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
                                <Grid  container spacing={2} justifyContent="center">
                                    {products.slice(0, count).map((product, index) => {
                                        if (product.price !== "0.0") {
                                            return (
                                                < Grid key={product.id}
                                                    item direction="row"
                                                    justifyContent="center"
                                                >
                                                    <Item>
                                                        <Grid item>
                                                            <ButtonBase sx={{ width: 128, height: 128, marginBottom: "1rem" }}>
                                                                <Img alt="complex" src={product.api_featured_image} onClick={() => handlePreview(index)} />
                                                            </ButtonBase>
                                                        </Grid>
                                                        <ModalProduct
                                                            open={openModal}
                                                            close={() => setOpenModal(false)}
                                                            product={previewProduct.product}
                                                        />
                                                        <Grid item container direction="column" spacing={2}>
                                                            <Grid item >
                                                                <Typography sx={{ textDecoration: "none" }} gutterBottom variant="title" component={Link}>
                                                                </Typography>
                                                                <Link sx={{
                                                                    textDecoration: "none",
                                                                    fontWeight: "bold",
                                                                    color: "black"
                                                                }} href={`/product/${product.id}`}>
                                                                    {product.name}
                                                                </Link>

                                                                <Typography variant="subtitle2" gutterBottom>
                                                                    {product.brand}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    <img className="rating_img" src={star} alt="rating"></img>
                                                                    {product.rating === null ? " N/A" : " " + Math.round((product.rating) * 100) / 5}
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
                                        } else return null;
                                    })}
                                </Grid>
                            </Paper>

                        </React.Fragment>
                    </div>

                )}
                {checkLoading()}
                <Button sx={{
                    backgroundColor: "purple", marginLeft: "43%", '@media screen and (max-width: 768px)': {
                        marginLeft: "37%", zIndex: "-1"
                    }
                }} className="showMore" variant="contained" onClick={showMoreProducts}>Show More</Button>

            </div>

        </div >
    );
}

export default GetProducts;