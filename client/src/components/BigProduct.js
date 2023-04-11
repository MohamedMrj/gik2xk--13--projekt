import React from 'react';
import {Grid, Box, Button, Typography, Fab} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {addToCart} from '../models/ProductModel';
import Image from 'mui-image';
import AddAmount from './AddAmount';
import AddUserId from './AddUserId';
import RatingItem from './RatingItem';
import RatingItemList from './RatingItemList';
import AddRating from './AddRating';

function BigProduct(props) {
  const {product} = props;
  const [ratings, setRatings] = React.useState(product.hasOwnProperty('id') ? product.ratings : []);
  if (product.hasOwnProperty('id') && ratings.length === 0 && product.ratings.length > 0) {
    setRatings(product.ratings);
  }

  const [userId, setUserId] = React.useState(1);
  const [amount, setAmount] = React.useState(1);

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return props.product.hasOwnProperty('id') ? (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Image
          src={
            product.imageUrl ||
            'https://media.istockphoto.com/id/1271880340/sv/vektor/radvektorikonen-f%C3%B6rlorade-objekt-oidentifierade-objekt-kontur-isolerade-ikonen.jpg?s=612x612&w=0&k=20&c=GSYC11NZj79jd6TXzVK9EdURagWRS3xlgpaQobpDmRQ='
          }
            sx={{ maxHeight: '500px'}}
        />
      </Grid>
      <Grid item xs={12} sm={6} sx={{textAlign: 'left'}}>
        <Typography variant="h3" component="h3">
          {product.title}
        </Typography>
        <RatingItem product={product} />
        <Typography variant="body1" component="p">
          {product.description}
        </Typography>
        <Typography variant="h6" component="h4">
          {product.price} kr
        </Typography>
        <Box sx={{display: 'flex', alignItems: 'left'}}>
          <AddUserId value={userId} onChange={handleUserIdChange} />
          <AddAmount value={amount} onChange={handleAmountChange} />
          <Button variant="text" onClick={() => addToCart(product.id, userId, amount)}>
            Add to cart
          </Button>
        </Box>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h6" component="h4" style={{marginTop: '20px'}}>
            Add rating
          </Typography>
          <AddRating productId={product.id} />
          <Typography variant="h6" component="h4" style={{marginTop: '20px'}}>
            Ratings
          </Typography>
          {ratings.map((rating) => (
            <Grid item key={rating.id} style={{paddingTop: '10px'}}>
              <RatingItemList rating={rating} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Fab
        href={`/products/${product.id}/edit`}
        size="large"
        color="primary"
        aria-label="edit"
        style={{position: 'fixed', bottom: '50px', right: '50px'}}>
        <EditIcon />
      </Fab>
    </Grid>
  ) : (
    <Typography>Product saknas</Typography>
  );
}

export default BigProduct;