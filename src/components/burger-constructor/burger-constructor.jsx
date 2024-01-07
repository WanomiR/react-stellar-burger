import {useMemo} from "react";
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

        let total;
        if (isBun && areIngredients) {
            total = ingredients.reduce((acc, {price}) => acc + price, 0) + bun.price * 2;
        } else if (isBun && !areIngredients) {
            total = bun.price * 2;
        } else if (!isBun && areIngredients) {
            total = ingredients.reduce((acc, {price}) => acc + price, 0)
        } else {
            total = 0;
        }

        return total
        // eslint-disable-next-line
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

    const renderElement = (item, index) => (
        <DraggableElement
            key={item.nanoId}
            itemData={item}
            index={index}
        />
    )

    const borderStyle = isHover ? styles.componentsListBorderActive : ""

    return (
        <section
            className={`${styles.section} ml-10 mt-20`}
            ref={dropRef}
        >
            <ul className={`${styles.componentsList} ${borderStyle}`}>
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
                        {ingredients.map(renderElement)}
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