import PropTypes from "prop-types";

export const ingredientPropType = PropTypes.shape({
  //укажите здесь prop-types для ингридиента
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
});
