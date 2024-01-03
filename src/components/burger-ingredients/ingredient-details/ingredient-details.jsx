import styles from "./ingredient-details.module.css"
import {useSelector, useDispatch} from "react-redux";
import {modalOpacitySet} from "../../../services/ingredient-details-slice";

export default function IngredientDetails() {
    const dispatch = useDispatch();

    const {
        image_large, name, calories, proteins, fat, carbohydrates
    } = useSelector(state => state.ingredientDetails.ingredientData)

    const onImageLoad = () => {
        dispatch(modalOpacitySet(1))
    }

    return (
        <>
            <img
                src={image_large}
                alt={`Изображение ингридента: ${name}`}
                className={`${styles.image} mb-4`}
                onLoad={onImageLoad}
            />
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


