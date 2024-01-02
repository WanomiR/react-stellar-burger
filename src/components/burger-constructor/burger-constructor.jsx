import {useCallback, useEffect, useMemo, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useDrop} from "react-dnd";
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "./burger-constructor.module.css"
import {orderDetailsOpened, orderDetailsClosed, fetchOrderDetails} from "../../services/orderDetailsSlice";
import {bunUpdated, ingredientAdded, ingredientsReordered} from "../../services/burgerConstructorSlice";
import {countIncremented} from "../../services/ingredientsSlice";
import {DraggableElement} from "../draggable-element/draggable-element";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/odrder-details";


export default function BurgerConstructor() {
    const dispatch = useDispatch();

    const {bun, ingredients} = useSelector(state => state.burgerConstructor);
    const {modalIsOpen} = useSelector(state => state.orderDetails);

    const [items, setItems] = useState(ingredients)

    useEffect(() => {
        dispatch(ingredientsReordered(items))
    }, [items]);

    useEffect(() => {
        setItems(ingredients)
    }, [ingredients]);

    const totalPrice = useMemo(() => {
        const isBun = !!bun;
        const areIngredients = ingredients.length > 0;

        return isBun ?  // is there a bun?
            areIngredients ?  // are there any ingredients ?
                ingredients.reduce((acc, item) => acc += item.price, 0) + bun.price * 2  // calculate the total if so
                : bun.price * 2  // otherwise it is just the price for two buns
            : areIngredients ?  // there is no bun, are there any ingredients ?
                ingredients.reduce((acc, item) => acc += item.price, 0)  // calculate the total if so
                : 0  // otherwise return zero
    }, [bun, ingredients])

    const handleOpenDetails = () => {
        if (!!bun && ingredients.length > 0) {
            dispatch(fetchOrderDetails(
                ingredients.map(item => item._id).concat(bun._id)
            ))
            dispatch(orderDetailsOpened())
        }
    }

    const [{isHover}, dropRef] = useDrop({
        accept: "ingredient",
        collect: monitor => ({isHoverMain: monitor.isOver()}),
        drop: item => {
            if (item.type === "bun") {
                if (!bun || (item._id !== bun._id)) {
                    dispatch(bunUpdated(item))
                    dispatch(countIncremented(item))
                }
            } else if (item.type !== "bun") {
                dispatch(ingredientAdded(item))
                dispatch(countIncremented(item))
            }
        }
    })

    const moveElement = useCallback((dragIndex, hoverIndex) => {
        setItems((prevCards) => (
            prevCards
                .toSpliced(dragIndex, 1)
                .toSpliced(hoverIndex, 0, prevCards[dragIndex])
        ))
    }, [ingredients])

    const renderElement = useCallback((item, index) => {
        return (
            <DraggableElement
                key={item.nanoId}
                itemData={item}
                index={index}
                moveElement={moveElement}
            />
        )
    }, [])



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
                {items &&
                    <div className={styles.unlockedComponents}>
                        {items.map((item, i) => renderElement(item, i))}
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