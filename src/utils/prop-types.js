import PropTypes from "prop-types";

export const appPropTypes = {
    dataUrl: PropTypes.string.isRequired
}

export const ingredientPropType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
});

export const burgerConstructorPropTypes = {
    data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
    openModal: PropTypes.func.isRequired
}

export const burgerIngredientsPropTypes = {
    data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
    openDetails: PropTypes.func.isRequired
}

export const cardPropTypes = {
    data: ingredientPropType.isRequired,
    openDetails: PropTypes.func.isRequired
}

export const ingredientDetailsPropTypes = {
    image_large: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired
}

export const ingredientsCategoryPropTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
    categoryName: PropTypes.string.isRequired,
    className: PropTypes.string,
    openDetails: PropTypes.func.isRequired
}

export const modalOverlayPropTypes = {
    children: PropTypes.elementType.isRequired,
    handleClose: PropTypes.func.isRequired,
}

export const navigationItemPropTypes = {
    Icon: PropTypes.elementType.isRequired,
    itemName: PropTypes.string.isRequired,
    className: PropTypes.string
}