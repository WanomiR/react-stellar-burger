import {NORMA_API} from "./constants";

const checkResponse = res => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

export const getIngredients = async () => {
    const res = await fetch(`${NORMA_API}/ingredients`)
    return checkResponse(res)
}