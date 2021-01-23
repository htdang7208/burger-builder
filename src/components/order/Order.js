import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
  const ingredients = [];

  for (const key in props.ingredients) {
    ingredients.push({ name: key, amount: props.ingredients[key] });
  }

  const ingredientOutput = ingredients.map((ig) => (
    <span
      key={ig.name}
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        padding: '5px',
        border: '1px solid #ccc',
      }}
    >
      {ig.name} ({ig.amount})
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
