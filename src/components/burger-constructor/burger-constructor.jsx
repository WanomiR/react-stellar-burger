import {useSelector, useDispatch} from "react-redux";
import {useMemo} from "react";
import {useDrop} from "react-dnd";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "./burger-constructor.module.css"
import Modal from "../modal/modal";
import OrderDetails from "../order-details/odrder-details";
import {orderDetailsOpened, orderDetailsClosed} from "../../services/orderDetailsSlice";
import {bunUpdated, ingredientAdded, ingredientRemoved} from "../../services/burgerConstructorSlice";
import {countDecremented, countIncremented} from "../../services/ingredientsSlice";


export default function BurgerConstructor() {
    const dispatch = useDispatch();

    const {bun, ingredients} = useSelector(state => state.burgerConstructor);
    const modalIsOpen = useSelector(state => state.orderDetails.isOpen);

    const totalPrice = useMemo(() => {
        return (!!bun || ingredients.length > 0)
            ? ingredients.reduce((acc, item) => acc += item.price, 0) + bun.price * 2
            : 0
    }, [bun, ingredients])

    const handleDelete = item => () => {
        item.type === "bun"
            ? dispatch(bunUpdated(item))
            : dispatch(ingredientRemoved(item))
        dispatch(countDecremented(item))
    }

    const [{isHover}, dropRef] = useDrop({
        accept: "default",
        collect: monitor => ({isHoverMain: monitor.isOver()}),
        drop: item => {
            item.type === "bun"
                ? dispatch(bunUpdated(item))
                : dispatch(ingredientAdded(item))
            dispatch(countIncremented(item))
        }
    })

    return (
        <section className={`${styles.section} ml-10 mt-25`}
                 ref={dropRef}
        >
            <ul className={`${styles.componentsList}`}>
                {bun &&
                    <li className={"ml-4 pl-8"}><ConstructorElement
                        text={`${bun.name} (верх)`}
                        thumbnail={bun.image_mobile}
                        price={bun.price}
                        isLocked={true}
                        type={"top"}
                    /></li>
                }
                {ingredients &&
                    <div className={styles.unlockedComponents}>
                        {ingredients.map(itemData => (
                            <li className={`${styles.component} ml-4`} key={itemData.nanoId}>
                                <DragIcon type={"primary"}/>
                                <ConstructorElement
                                    text={`${itemData.name}`}
                                    thumbnail={itemData.image_mobile}
                                    price={itemData.price}
                                    handleClose={handleDelete(itemData)}
                                /></li>
                        ))}
                    </div>
                }
                {bun &&
                    <li className={"pl-8 ml-4"}><ConstructorElement
                        text={`${bun.name} (низ)`}
                        thumbnail={bun.image_mobile}
                        price={bun.price}
                        isLocked={true}
                        type={"bottom"}
                    /></li>
                }
            </ul>
            <div className={`${styles.order} mt-10 mr-4`}>
                <div className={`${styles.total} mr-10`}>
                    <p className={"text text_type_digits-medium mr-2"}>{totalPrice}</p>
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