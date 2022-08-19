import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const ModalProduct = ({ open, close, product }) => {
    return (
        <Modal
            key={product.id}
            open={open}
            onClose={close}
            aria-labelledby="modal-product-title"
            aria-describedby="modal-product-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4, '@media screen and (max-width: 768px)': {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 180,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }
            }}>
                <img className="imgModal" alt="img_modal" src={product.api_featured_image} />
                <Typography id="modal-product-title" variant="h6" component="h2">
                    {product.name}
                </Typography>
                <Typography id="modal-product-description" sx={{ mt: 2 }}>
                    {product.description}
                </Typography>
            </Box>
        </Modal >


    );


}

export default ModalProduct;