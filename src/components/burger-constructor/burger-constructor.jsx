import {useMemo} from "react";
import PropTypes from "prop-types";

import styles from "./burger-constructor.module.css"
import {ingredientPropType} from "../../utils/prop-types";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components"


export default function BurgerConstructor({data, openModal}) {

    const {bun, ingredients} = useMemo(() => ({
            bun: data.find(item => item.type === "bun"),
            ingredients: data.filter(item => item.type !== "bun"),
        }), [data])

    return (
        <section className={`${styles.section} ml-10 mt-25`}>
            <ul className={`${styles.componentsList}`}>
                <li className={"ml-4 pl-8"}><ConstructorElement
                    text={`${bun.name} (верх)`}
                    thumbnail={bun.image_mobile}
                    price={bun.price}
                    isLocked={true}
                    type={"top"}
                /></li>
                <div className={styles.unlockedComponents}>
                    {ingredients.map(itemData => (
                        <li className={`${styles.component} ml-4`} key={itemData._id}>
                            <DragIcon type={"primary"}/>
                            <ConstructorElement
                                text={`${itemData.name} (низ)`}
                                thumbnail={itemData.image_mobile}
                                price={itemData.price}
                            /></li>
                    ))}
                </div>
                <li className={"pl-8 ml-4"}><ConstructorElement
                    text={`${bun.name} (низ)`}
                    thumbnail={bun.image_mobile}
                    price={bun.price}
                    isLocked={true}
                    type={"bottom"}
                /></li>
            </ul>
            <div className={`${styles.order} mt-10 mr-4`}>
                <div className={`${styles.total} mr-10`}>
                    <p className={"text text_type_digits-medium mr-2"}>610</p>
                    <CurrencyIcon type={"primary"}/>
                </div>
                <Button htmlType={"button"} type={"primary"} size={"large"} onClick={openModal}>Оформить заказ</Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}
