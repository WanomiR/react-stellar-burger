import styles from "./ingredient-details.module.css"
import {ingredientDetailsPropTypes} from "../../utils/prop-types";

export default function IngredientDetails({image_large, name, calories, proteins, fat, carbohydrates}) {
    return (
        <>
            <h2 className={`${styles.title} text text_type_main-large mt-10 pt-3 mb-3`}>
                Детали ингредиента
            </h2>
            <img src={image_large} alt={`Изображение ингридента: ${name}`} className={`${styles.image} mb-4`}/>
            <h3 className={"text text_type_main-medium mb-8"}>{name}</h3>
            <table className={"mb-15"}>
                <thead>
                <tr>
                    <th className={`${styles.tableCell} text text_type_main-default text_color_inactive pr-5 pb-1`}>Калории,ккал</th>
                    <th className={`${styles.tableCell} text text_type_main-default text_color_inactive pr-5 pb-1`}>Белки, г</th>
                    <th className={`${styles.tableCell} text text_type_main-default text_color_inactive pr-5 pb-1`}>Жиры, г</th>
                    <th className={`${styles.tableCell} text text_type_main-default text_color_inactive pb-1`}>Углеводы, г</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className={`${styles.tableCell} text text_type_digits-default text_color_inactive pr-5`}>{calories}</td>
                    <td className={`${styles.tableCell} text text_type_digits-default text_color_inactive pr-5`}>{proteins}</td>
                    <td className={`${styles.tableCell} text text_type_digits-default text_color_inactive pr-5`}>{fat}</td>
                    <td className={`${styles.tableCell} text text_type_digits-default text_color_inactive`}>{carbohydrates}</td>
                </tr>
                </tbody>
            </table>
        </>
    )
}

IngredientDetails.propTypes = ingredientDetailsPropTypes;