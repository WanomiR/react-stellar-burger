import styles from "./burger-constructor.module.css"
import {data} from "../../utils/data"
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components"

const bun = data.filter(item => item.type === "bun")[0]

const BurgerComponents = () => {
    return (
        <ul className={`${styles.componentsList}`}>
            <li className={"ml-4 pl-8"}><ConstructorElement
                text={`${bun.name} (верх)`}
                thumbnail={bun.image}
                price={bun.price}
                isLocked={true}
                type={"top"}
            /></li>
            <div className={styles.unlockedComponents}>
                {data.filter(item => item.type !== "bun").map(itemData => (
                    <li className={`${styles.component} ml-4`} key={itemData._id}>
                        <DragIcon type={"primary"}/>
                        <ConstructorElement
                            text={`${itemData.name} (низ)`}
                            thumbnail={itemData.image}
                            price={itemData.price}
                        /></li>
                ))}
            </div>
            <li className={"pl-8 ml-4"}><ConstructorElement
                text={`${bun.name} (низ)`}
                thumbnail={bun.image}
                price={bun.price}
                isLocked={true}
                type={"bottom"}
            /></li>
        </ul>
    )
}

export default function BurgerConstructor() {
    return (
        <section className={`${styles.section} ml-10 mt-25`}>
            <BurgerComponents />
            <div className={`${styles.order} mt-10 mr-4`}>
                <div className={`${styles.total} mr-10`}>
                    <p className={"text text_type_digits-medium mr-2"}>610</p>
                    <CurrencyIcon type={"primary"}/>
                </div>
                <Button htmlType={"button"} type={"primary"} size={"large"}>Оформить заказ</Button>
            </div>
        </section>
    )
}
