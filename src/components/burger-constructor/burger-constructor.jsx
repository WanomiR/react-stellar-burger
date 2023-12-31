import {useSelector, useDispatch} from "react-redux";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "./burger-constructor.module.css"
import Modal from "../modal/modal";
import OrderDetails from "../order-details/odrder-details";
import {orderDetailsOpened, orderDetailsClosed} from "../../services/orderDetailsSlice";


export default function BurgerConstructor() {
    const dispatch = useDispatch();

    const { bun, ingredients } = useSelector(state => state.burgerConstructor);
    const modalIsOpen = useSelector(state => state.orderDetails.isOpen);

    let content

    if (true) {
        content = (
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
        )
    }

    return (
        <section className={`${styles.section} ml-10 mt-25`}>
            {content}
            <div className={`${styles.order} mt-10 mr-4`}>
                <div className={`${styles.total} mr-10`}>
                    <p className={"text text_type_digits-medium mr-2"}>610</p>
                    <CurrencyIcon type={"primary"}/>
                </div>
                <Button htmlType={"button"} type={"primary"} size={"large"}
                        onClick={() => dispatch(orderDetailsOpened())}>
                    Оформить заказ
                </Button>
            </div>
            {
                modalIsOpen &&
                <Modal handleModalClose={() => dispatch(orderDetailsClosed())}>
                    <OrderDetails/>
                </Modal>
            }
        </section>
    )
}