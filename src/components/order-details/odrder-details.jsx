import {useSelector} from "react-redux";
import styles from "./order-details.module.css"
import doneIcon from "../../assets/images/done.svg"

export default function OrderDetails() {
    const {orderId, status, message} = useSelector(state => state.orderDetails);

    return (
        <>
            <h2 className={`${styles.orderNumber} text text_type_digits-large pt-15 pb-8`}>{orderId}</h2>
            <p className={"text text_type_main-medium pb-15"}>индентификатор заказа</p>
            <img src={doneIcon} alt={"Иконка с гаолчкой"} className={"pb-15"}/>
            <p className={"text text_type_main-default pb-2"}>{status}</p>
            <p className={"text text_type_main-default text_color_inactive pb-30"}>{message}</p>
        </>
    )
}

