import {useSelector} from "react-redux";
import styles from "./order-details.module.css"
import doneIcon from "../../assets/images/done.svg"
import React from "react";

export default function OrderDetails() {

    const {status, error, success, name, order} = useSelector(state => state.orderDetails)

    let content
    if (status === "loading") {
        content = <p className={"text text_type_main-default pt-15 pb-30"}>Подождите, идет загрузка...</p>
    } else if (status === "failed") {
        content = (<>
            <p className={"text text_type_main-default pt-15 pb-2"}>Произошла ошибка:</p>
            <p className={"text text_type_main-default text_color_inactive pb-30"}>{error}</p>
        </>)
    } else if ((status === "success") && success) {
        content = (<>
            <h2 className={`${styles.orderNumber} text text_type_digits-large pt-15 pb-8`}>{order.number}</h2>
            <p className={"text text_type_main-medium pb-15"}>индентификатор заказа</p>
            <img src={doneIcon} alt={"Иконка с гаолчкой"} className={"pb-15"}/>
            <p className={"text text_type_main-default pb-2"}>Ваш заказ начали готовить</p>
            <p className={"text text_type_main-default text_color_inactive pb-30"}>{name}</p>
        </>)
    }

    return (<>{content}</>)
}

