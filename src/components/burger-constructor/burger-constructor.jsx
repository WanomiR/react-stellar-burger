import {useMemo} from "react";

import styles from "./burger-constructor.module.css"
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/odrder-details";
import {useSelector} from "react-redux";


export default function BurgerConstructor({openModal, closeModal, modalState}) {

    const { ingredients, status, error } = useSelector(state => state.ingredients)

    const {bun, data} = useMemo(() => ({
            bun: ingredients.find(item => item.type === "bun"),
            data: ingredients.filter(item => item.type !== "bun"),
        }), [ingredients])

    let content

    if (status === "success") {
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
                    {data.map(itemData => (
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
                <Button htmlType={"button"} type={"primary"} size={"large"} onClick={openModal}>Оформить заказ</Button>
            </div>
            {
                modalState.isOpen &&
                <Modal handleModalClose={closeModal}>
                    <OrderDetails/>
                </Modal>
            }
        </section>
    )
}

BurgerConstructor.propTypes = {
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    modalState: PropTypes.object.isRequired,
};
