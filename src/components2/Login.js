import React, { useRef, useState } from 'react';
import simpleReactValidator from "simple-react-validator";
import { sendPhoneNumber } from "../services/userService";

function Login({ history }) {

alert(1)
    const [phone_number, setPhone_number] = useState("");

    const [, forceUpdate] = useState();
    const validator = useRef(new simpleReactValidator({
        messages: {
            required: "این فیلد الزامی میباشد",
            min: "حداقل طول کلمه عبور 11 کاراکتر میباشد"
        },
        element: message => <sub className="text-danger pb-2">{message}</sub>
    }));

    const handleSubmit = async event => {
        event.preventDefault();

        const user = { phone_number }

        try {
            if (validator.current.allValid()) {
                const { status, data } = await sendPhoneNumber(user);
                if (status === 200 && data.status===2) {
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
            // eslint-disable-next-line no-undef
            toast.error("مشکلی پیش آمده است،مجددا تلاش فرمایید.", {
                position: "top-right",
                closeOnClick: true
            });
            console.log(ex);
        }

    };

    return (
        <div className="App">
            <div className="card">

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>شماره تلفن</label>
                        <input
                            onChange={e => {
                                setPhone_number(e.target.value);
                                validator.current.showMessageFor("email");
                            }}
                            name="phone_number" value={phone_number} className="form-control" 
                            placeholder="شماره تلفن" />
                        {validator.current.message("phone_number", phone_number, "required")}
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block"> ارسال پیامک</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Login;