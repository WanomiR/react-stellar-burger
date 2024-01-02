import {useCallback, useEffect, useState} from "react";
import update from "immutability-helper";

import styles from "./dnd-mockup.module.css"
import {DraggableElement} from "../draggable-element/draggable-element";
import {useDispatch, useSelector} from "react-redux";
import {ingredientsReordered} from "../../services/burgerConstructorSlice";


export const DndMockup = () => {

    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.burgerConstructor.ingredients);

    const [items, setItems] = useState(ingredients)

    const moveElement = useCallback((dragIndex, hoverIndex) => {
        setItems((prevCards) => (
            prevCards
                .toSpliced(dragIndex, 1)
                .toSpliced(hoverIndex, 0, prevCards[dragIndex])
            ))
    }, [])

    const renderCard = useCallback((item, index) => {
        return (
            <DraggableElement
                key={item._id}
                itemData={item}
                index={index}
                moveElement={moveElement}
            />
        )
    }, [])


    return (
        <>
            <section className={`${styles.section} ml-10 mt-25`}>
                <ul className={`${styles.componentsList}`}>
                    {items.map((item, i) => renderCard(item, i))}
                </ul>
            </section>
        </>
    )
}