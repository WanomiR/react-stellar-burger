import React from "react";
import {useSelector} from "react-redux";
import doneIcon from "../../../assets/images/done.svg"

import styles from "./order-details.module.css"
import {Fallback} from "../../fallback/Fallback";

export default function OrderDetails() {

    const {status, success, error, order} = useSelector(state => state.orderDetails)

    return (
        <Fallback
            isLoading={status === "loading"}
            isSuccess={(status === "success") && success}
            error={error}
        >
            <h2 className={`${styles.orderNumber} text text_type_digits-large pt-15 pb-8`}>
                {order.number}
            </h2>
            <p className={"text text_type_main-medium pb-15"}>индентификатор заказа</p>
            <img src={doneIcon} alt={"Иконка с гаолчкой"} className={"pb-15"}/>
            <p className={"text text_type_main-default pb-2"}>Ваш заказ начали готовить</p>
            <p className={
                `text text_type_main-default text_color_inactive pb-30 ${styles.additionalText}`
            }>Дождитесь готовности на орбитальной станции</p>
        </Fallback>
    )
}

