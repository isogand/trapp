import React, { useRef, useState } from 'react';
import simpleReactValidator from "simple-react-validator";
import { registerUser } from "../../services/userService";

function Register({ history }) {


    const [fullname, setFullname] = useState("");
    const [phone_number, setPhone_number] = useState("");

    const [, forceUpdate] = useState();
    const validator = useRef(new simpleReactValidator({
        messages: {
            required: "این فیلد الزامی میباشد",
        },
        element: message => <sub className="text-danger pb-2">{message}</sub>
    }));

    const handleSubmit = async event => {
        event.preventDefault();

        const user = { fullname, phone_number }

        try {
            if (validator.current.allValid()) {
                const { status } = await registerUser(user);
                if (status === 200 && data.status==2) {

                    // Phone number have to save in local storage for use it, in the next step
                    localStorage.setItem("phone_number",phone_number);
                    alert('پیامک اعتبارسنجی ارسال شد');
                    history.replace("/verifySms");

                }else{
                    alert('شماره نامعتبر است')
                }
            } else {
                validator.current.showMessages();
                forceUpdate(1);
            }
        } catch (ex) {
            console.log(ex);
        }

    };

    return (
        <div className="App">


            <div className="card">
                <article className="card-body">
                    <h4 className="card-title mb-4 mt-1">ثبت نام</h4>
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>نام و نام خانوادگی</label>
                            <input
                                onChange={e => {
                                    setFullname(e.target.value);
                                    validator.current.showMessageFor("fullname");
                                }}
                                name="fullname" value={fullname} className="form-control"
                                 placeholder="نام و نام خانوادگی" />
                            {validator.current.message("fullname", fullname, "required")}
                        </div>

                        <div className="form-group">
                            <label>شماره موبایل </label>
                            <input
                                onChange={e => {
                                    setPhone_number(e.target.value);
                                    validator.current.showMessageFor("phone_number");
                                }}
                                name="phone_number" value={phone_number} className="form-control" 
                                placeholder="شماره تلفن"/>
                            {validator.current.message("phone_number", phone_number, "required")}
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block"> ثبت نام</button>
                        </div>
                    </form>
                </article>
            </div>

        </div>
    );
}

export default Register;