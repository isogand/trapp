import React, { useRef, useState } from 'react';
import simpleReactValidator from "simple-react-validator";
import { verifySmsCode } from "./../services/userService";

function verifySms({ history }) {


    // Phone number will recieve from local storage (Was saved in previous step)
    // const [phone_number, setPhone_number] = useState("");
    const [sms_code, setSms_code] = useState("");


    // Validation 
    const [, forceUpdate] = useState();
    const validator = useRef(new simpleReactValidator({
        messages: {
            required: "این فیلد الزامی میباشد",
            min: "حداقل طول کلمه عبور 6 کاراکتر میباشد"
        },
        element: message => <sub className="text-danger pb-2">{message}</sub>
    }));

    const handleSubmit = async event => {
        event.preventDefault();

        // Phone number will recieve from local storage (Was saved in previous step)
        const phone_number = localStorage.getItem("phone_number");
        const user = { phone_number , sms_code}

        try {
            if (validator.current.allValid()) {
                const { status, data } = await verifySmsCode(user);
                if (status === 200 && data.data.user) {

                    // Redirect User
                    history.replace("/");

                    // Save api token in local storage
                    localStorage.setItem("token",data.data.token);

                    // Save user data in State
                    // ...

                }else{
                    // If code was invalid
                    alert('کد نامعتبر میباشد.لطفا مجددا لاگین کنید')
                }
            } else {
                // If validation was invalid
                validator.current.showMessages();
                forceUpdate(1);
            }
        } catch (ex) {
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
                        <label>کد دریافت شده از طریق پیامک</label>
                        <input
                            onChange={e => {
                                setSms_code(e.target.value);
                                validator.current.showMessageFor("sms_code");
                            }}
                            name="sms_code" value={sms_code} className="form-control" 
                            placeholder="کد پیامک" />
                        {validator.current.message("sms_code", sms_code, "required")}
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block"> ورود</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default verifySms;