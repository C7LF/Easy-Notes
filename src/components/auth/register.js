import React, {useState} from 'react'


export const RegisterForm = () => {

    const defaultUserData = {
        name: "",
        email: "",
        password: "",
        password2: "",
        errors: {}
    }

    const [newUserData, setNewUserData] = useState(defaultUserData)

    const onChange = e => {
        setNewUserData({ [e.target.id]: e.target.value });
        console.log(newUserData)
    }

    const onSubmit = e => e.preventDefault();

    return (
        <>
            <form noValidate onSubmit={() => onSubmit}>
                <div className="input-field col s12">
                    <input
                        onChange={onChange}
                        value={newUserData.name}
                        error=""
                        id="name"
                        type="text"
                    />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="input-field col s12">
                    <input
                        onChange={onChange}
                        value={newUserData.email}
                        error=""
                        id="email"
                        type="email"
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-field col s12">
                    <input
                        onChange={onChange}
                        value={newUserData.password}
                        error=""
                        id="password"
                        type="password"
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="input-field col s12">
                    <input
                        onChange={onChange}
                        value={newUserData.password2}
                        error=""
                        id="password2"
                        type="password"
                    />
                    <label htmlFor="password2">Confirm Password</label>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                        style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                        }}
                        type="submit"
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                        Sign up
                </button>
                </div>
            </form>
        </>
    )
}