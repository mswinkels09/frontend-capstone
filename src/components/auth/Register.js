import React, { useRef } from "react"
import { Link } from "react-router-dom"
import "./Register.css"

export const Register = (props) => {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(_ => _.json())
            .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            existingUserCheck()
                .then(() => {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            password: password.current.value,
                            username: `${username.current.value}`
                        })
                    })
                        .then(_ => _.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("user", createdUser.id)
                                props.history.push("/new_item")
                            }
                        })
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main className="main">

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>
            <section>

                <div className="register_form--home">
                    <button className="register__btn_close" onClick={() => {
                        props.history.push(`/home`)
                    }}><div className="btn__close">X</div></button>
                    <form className="form--register" onSubmit={handleRegister}>
                        <section className="register__inputs">
                            <fieldset>
                                <input ref={username} type="text"
                                    name="username"
                                    className="form-control register__form"
                                    placeholder="Username"
                                    required autoFocus />
                            </fieldset>
                            <fieldset>
                                <input ref={email} type="email"
                                    name="email"
                                    className="form-control register__form"
                                    placeholder="Email address"
                                    required />
                            </fieldset>
                            <fieldset>
                                <input ref={password} type="password"
                                    name="password"
                                    className="form-control register__form"
                                    placeholder="Password"
                                    required />
                            </fieldset>
                            <fieldset>
                                <input ref={verifyPassword} type="password"
                                    name="verifyPassword"
                                    className="form-control register__form"
                                    placeholder="Verify password"
                                    required />
                            </fieldset>
                        </section>
                        <fieldset>
                            <button type="submit" className="btn btn__register">
                                LETS DO THIS
                            </button>
                        </fieldset>
                    </form>
                </div>
            </section>
            <section className="link--register">
            <button className="btn__login_register btn" onClick={() => props.history.push("/login")}>
                    ALREADY A USER?
                </button>
            </section>
        </main>
    )
}

