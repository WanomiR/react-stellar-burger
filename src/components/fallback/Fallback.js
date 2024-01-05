import React from "react";
import PropTypes from "prop-types";

const Loading = () => (
    <p className={"text text_type_main-default pt-15 pb-30"}>Подождите, идет загрузка...</p>
)

const Error = ({error}) => (
    <>
        <p className={"text text_type_main-default pt-15 pb-2"}>Произошла ошибка :(</p>
        <p className={"text text_type_main-default text_color_inactive pb-30"}>{error}</p>
    </>
)


export const Fallback = ({isLoading, isSuccess, error, children}) => {
    return (
        <>
            {isLoading ?
                <Loading/>
                : isSuccess ?
                    children
                    : <Error error={error}/>
            }
        </>
    )
}


Error.propTypes = {
    error: PropTypes.string
}


Fallback.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isSuccess: PropTypes.bool.isRequired,
    error: PropTypes.string,
    children: PropTypes.any
}