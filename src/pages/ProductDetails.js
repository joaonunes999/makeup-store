import React, { useEffect, useState } from "react"
import './ProductDetails.css';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import star from '../assets/star.png';
import next from '../assets/next.png';
import back from '../assets/back.png';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { View } from "react-native";
import ItemsCarousel from 'react-items-carousel';
import Link from '@mui/material/Link';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';

//Firebase
import '../Firebase.js';
import { getDatabase, ref, child, get, set } from "firebase/database";


const ProductDetails = () => {
    const productId = window.location.href.split("product/")[1];
    const [product, setProduct] = useState(null);
    const [count] = useState(500); // initial count to show initial related items
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    const [isLoading, setIsLoading] = useState(false);
    const [views, setViews] = useState(0);

    //Firebase

    const dbRef = ref(getDatabase());

    //Get Product Views
    useEffect(() => {
        get(child(dbRef, `Product-Views/${productId}/views/`)).then((snapshot) => {
            if (snapshot.exists()) {
                setViews(snapshot.val() + 1);
            } else {
                //if it doesn't exist, it didn't have views
                console.log("First View");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    const fetchData = (url) => {
        setIsLoading(true);
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setProduct(data);
            })
    }

    const checkLoading = () => {
        if (isLoading) {
            return (
                <div className="spinner-container">
                    <div className="loading-spinner">
                    </div>
                </div>
            );
        }
    }

    useEffect(() => {
        setTimeout(function () { set(child(dbRef, `Product-Views/${productId}/views/`), views)}, 4000);
    })

    const fetchAllData = (url) => {
        
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setRelatedProducts(data);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        if (productId != null)
            fetchData("http://makeup-api.herokuapp.com/api/v1/products/" + productId + ".json");
    }, [])

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    if (product != null)
        return (
            <div className="Product">
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid className="grid_image" xs={6} sx={{
                            '@media screen and (max-width: 768px)': {

                                textAlign: "center",
                                alignItems: "center",

                            }
                        }} >
                            <img className="productImage" alt="product_image" src={product.api_featured_image}></img>
                        </Grid>
                        <Grid className="especifications" xs={6} sx={{
                            '@media screen and (max-width: 768px)': {

                                margin: "7rem",
                                marginTop: "-4rem",
                                marginBottom: "4rem",
                                textAlign: "center",
                                alignItems: "center",

                            }
                        }}>
                            <h1 className="title">{product.name}</h1>
                            <Grid container direction="row">
                                <p className="brand"> Brand:&nbsp;</p>
                                <p> {product.brand} </p>
                            </Grid>
                            <Grid container direction="row">
                                <p className="price"> Price:&nbsp; </p>
                                <p> ${product.price} </p>
                            </Grid>
                            <Grid container direction="row">
                                <p className="ratingProduct"> Rating:&nbsp; </p>
                                <img className="rating_img" src={star} alt="rating"></img>&nbsp;
                                <p>{product.rating === null ? "N/A" : ((product.rating) * 100) / 5}</p>
                            </Grid>
                            <Grid container direction="row">
                                <p className="about">Description:&nbsp; </p>
                                <p className="description">{product.description}</p>
                            </Grid>
                            <Grid container direction="row">
                                <p className="colours">Colours:&nbsp;&nbsp;&nbsp;&nbsp; </p>
                                {
                                    product.product_colors.map((colour) => {
                                        if (colour != null) {
                                            return (
                                                <View style={{
                                                    width: 25,
                                                    height: 25,
                                                    margin: "0.5rem",
                                                    marginTop: "0.9rem",
                                                    borderRadius: '50%',
                                                    backgroundColor: colour.hex_value,
                                                }} />
                                            );
                                        }
                                    })
                                }
                            </Grid>
                            <br />
                            <Button sx={{ backgroundColor: "black" }} variant="contained">
                                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                    Buy
                                </Typography>
                            </Button>
                            <br />
                            <Grid container direction="row">
                                <p className="views">Views:&nbsp; </p>
                                <p>{views}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            
                <div className="related_products">
                    <h2>Related Products</h2>
                </div>
                
                <div className="carousel" style={{ padding: `4rem ${chevronWidth}px`, marginLeft: `15%`, marginRight: `15%`, height: '80' }}>
                
                    <ItemsCarousel
                        requestToChangeActive={setActiveItemIndex}
                        activeItemIndex={activeItemIndex}
                        numberOfCards={4}
                        slidesToScroll={2}
                        gutter={20}
                        leftChevron={<button>{<img className="back" src={back}></img>}</button>}
                        rightChevron={<button>{<img className="next" src={next}></img>}</button>}
                        outsideChevron
                        chevronWidth={chevronWidth}
                        alwaysShowChevrons
                        infiniteLoop
                    >
                        {checkLoading()}
                        {fetchAllData("http://makeup-api.herokuapp.com/api/v1/products.json?brand=" + product.brand)}

                        {relatedProducts.slice(0, count).map((product) => {
                            if (product.price !== "0.0") {
                                return (
                                    <Grid key={product.id}
                                        item direction="row"
                                        justifyContent="center"
                                    >
                                        <Grid item>
                                            <ButtonBase sx={{ width: 128, height: 128, marginBottom: "1rem" }}>
                                                <Img key={product.id} alt="complex" src={product.api_featured_image} />
                                            </ButtonBase>
                                        </Grid>
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
                                                    {product.rating === null ? " N/A" : ((product.rating) * 100) / 5}
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
                                    </Grid>
                                );
                            }
                        })}
                    </ItemsCarousel>
                </div>

                <div className="carousel-device" style={{ padding: `4rem ${chevronWidth}px`, marginLeft: `15%`, marginRight: `15%`, height: '80' }}>
                    <ItemsCarousel
                        requestToChangeActive={setActiveItemIndex}
                        activeItemIndex={activeItemIndex}
                        numberOfCards={1}
                        slidesToScroll={1}
                        gutter={20}
                        leftChevron={<button>{<img className="back" src={back}></img>}</button>}
                        rightChevron={<button>{<img className="next" src={next}></img>}</button>}
                        outsideChevron
                        chevronWidth={chevronWidth}
                        alwaysShowChevrons
                        infiniteLoop
                    >
                        {checkLoading()}
                        {fetchAllData("http://makeup-api.herokuapp.com/api/v1/products.json?brand=" + product.brand)}

                        {relatedProducts.slice(0, count).map((product) => {
                            if (product.price !== "0.0") {
                                return (
                                    <Grid key={product.id}
                                        item direction="row"
                                        justifyContent="center"
                                    >
                                        <Grid item>
                                            <ButtonBase sx={{ width: 128, height: 128, marginBottom: "1rem" }}>
                                                <Img key={product.id} alt="complex" src={product.api_featured_image} />
                                            </ButtonBase>
                                        </Grid>
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
                                                    {product.rating === null ? " N/A" : ((product.rating) * 100) / 5}
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
                                    </Grid>
                                );
                            }
                        })}
                    </ItemsCarousel>
                </div>
            </div >

        );


}
export default ProductDetails;