import {useCallback, useMemo} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useDrop} from "react-dnd";
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "./burger-constructor.module.css"
import Modal from "../modal/modal";
import OrderDetails from "./order-details/odrder-details";
import {
    orderDetailsOpened, orderDetailsClosed, fetchOrderDetails
} from "../../services/order-details-slice";
import {bunUpdated, ingredientAdded,} from "../../services/burger-constructor-slice";
import {countIncremented} from "../../services/burger-ingredients-slice";
import {DraggableElement} from "./draggable-element/draggable-element";


export default function BurgerConstructor() {
    const dispatch = useDispatch();

    const {bun, ingredients} = useSelector(state => state.burgerConstructor);
    const {modalIsOpen} = useSelector(state => state.orderDetails);

    const isBun = !!bun;
    const areIngredients = ingredients.length > 0;

    const totalPrice = useMemo(() => {

        return isBun ?  // is there a bun?
            areIngredients ?  // are there any ingredients ?
                ingredients.reduce((acc, item) => acc += item.price, 0) + bun.price * 2  // calculate the total if so
                : bun.price * 2  // otherwise it is just the price for two buns
            : areIngredients ?  // there is no bun, are there any ingredients ?
                ingredients.reduce((acc, item) => acc += item.price, 0)  // calculate the total if so
                : 0  // otherwise return zero
    }, [bun, ingredients])

    const handleOpenDetails = () => {
        if (isBun && areIngredients) {
            dispatch(fetchOrderDetails(
                // stack all ingredients between two buns
                Array(bun._id).concat(ingredients.map(item => item._id)).concat(bun._id)
            ))
            dispatch(orderDetailsOpened())
        }
    }

    const [{isHover}, dropRef] = useDrop({
        accept: "ingredient",
        collect: monitor => ({isHover: monitor.isOver()}),
        drop: item => {
            if ((item.type === "bun")
                && (!isBun || (item._id !== bun._id))) {
                dispatch(bunUpdated(item))
                dispatch(countIncremented(item))
            } else if (item.type !== "bun") {
                dispatch(ingredientAdded(item))
                dispatch(countIncremented(item))
            }
        }
    })

    const renderElement = useCallback((item, index) => {
        return (
            <DraggableElement
                key={item.nanoId}
                itemData={item}
                index={index}
            />
        )
    }, [])

    let borderStyle
    isHover
        ? borderStyle = {
            borderRadius: "2rem",
            boxShadow: "0px 4px 32px 0px rgba(101, 101, 255, 0.25), 0px 0px 8px 8px rgba(101, 101, 255, 0.125), 0px 0px 16px 8px rgba(101, 101, 255, 0.125)"
        }
        : borderStyle = { border: "none" }

    return (
        <section className={`${styles.section} ml-10 mt-20`} ref={dropRef}
        >
            <ul className={`${styles.componentsList}`} style={{...borderStyle}}>
                {isBun &&
                    <li className={"ml-4 pl-8"}><ConstructorElement
                        text={`${bun.name} (верх)`}
                        thumbnail={bun.image_mobile}
                        price={bun.price}
                        isLocked={true}
                        type={"top"}
                    /></li>
                }
                {areIngredients &&
                    <div className={styles.unlockedComponents}>
                        {ingredients.map((item, i) => renderElement(item, i))}
                    </div>
                }
                {isBun &&
                    <li className={"pl-8 ml-4 mb-5"}><ConstructorElement
                        text={`${bun.name} (низ)`}
                        thumbnail={bun.image_mobile}
                        price={bun.price}
                        isLocked={true}
                        type={"bottom"}
                    /></li>
                }
            </ul>
            <div className={`${styles.order} mt-5 mr-4`}>
                <div className={`${styles.total} mr-10`}>
                    <p className={"text text_type_digits-medium mr-2"}>{totalPrice}</p>
                    <CurrencyIcon type={"primary"}/>
                </div>
                <Button
                    htmlType={"button"}
                    type={"primary"}
                    size={"large"}
                    onClick={handleOpenDetails}
                >
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