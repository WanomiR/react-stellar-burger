import styles from "../dnd-mockup/dnd-mockup.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import {bunUpdated, ingredientRemoved} from "../../services/burgerConstructorSlice";
import {countDecremented} from "../../services/ingredientsSlice";
import {useDispatch} from "react-redux";


export const DraggableElement = ({itemData, index, moveElement}) => {

    const dispatch = useDispatch();
    const ref = useRef(null)

    const [{handlerId}, drop] = useDrop({
        accept: "any",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveElement(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{isDragging}, drag] = useDrag({
        type: "any",
        item: () => {
            return {id: itemData._id, index}
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1

    drag(drop(ref))

    const handleDelete = item => () => {
        dispatch(ingredientRemoved(item))
        dispatch(countDecremented(item))
    }

    return (
        <li className={`${styles.component} ml-4`} style={{opacity}}
            data-handler-id={handlerId} ref={ref}>
            <DragIcon type={"primary"}/>
            <ConstructorElement
                text={`${itemData.name}`}
                thumbnail={itemData.image_mobile}
                price={itemData.price}
                handleClose={handleDelete(itemData)}
            /></li>
    )
}

