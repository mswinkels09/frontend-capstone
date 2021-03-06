import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const ItemContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const ItemProvider = (props) => {
    const [items, setItems] = useState([])
    const [userItems, setUserItems] = useState([])

    const getItems = () => {
        return fetch("http://localhost:8088/items")
            .then(res => res.json())
            .then(setItems)
    }

    const addItem = item => {
        return fetch("http://localhost:8088/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
            .then(getItems)
    }

    const getItemById = (id) => {
        return fetch(`http://localhost:8088/items/${ id }`)
            .then(res => res.json())
    }

    const getUserItems = (userId) => {
        return fetch(`http://localhost:8088/items?userId=${userId}`)
            .then(res => res.json())
            .then(setUserItems)
    }
    
    const deleteItem = itemId => {
        return fetch(`http://localhost:8088/items/${itemId}`, {
            method: "DELETE"
        })
            .then(getItems)
    }

    const updateItem = item => {
        return fetch(`http://localhost:8088/items/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
            .then(getItems)
    }

    /*
        You return a context provider which has the
        `locations` state, the `addLocation` function,
        and the `getLocation` function as keys. This
        allows any child elements to access them.
    */
    return (
        <ItemContext.Provider value={{
            items, addItem, getItems, getItemById, deleteItem, updateItem, setItems,
            userItems, getUserItems
        }}>
            {props.children}
        </ItemContext.Provider>
    )
}