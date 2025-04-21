import React, { useRef } from "react";
import axios from "axios"
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const Add = (props) => {
    const userRef = useRef("")
    const usernameRef = useRef("")
    const phoneRef = useRef("")
    const addressRef = useRef("")
    const emailRef = useRef("")
    const addUser = async () => {
        const newUser = {
            name: nameRef.current.value,
            username: usernameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            address: addressRef.current.value
        }
        try {
            const res = await axios.post('http://localhost:8000/users', newUser)
            if (res.status === 201) {
                await props.getUsers()
            }
        }
        catch (e) {
            console.error(e)
        }
    }
    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={props.visible}
                modal
                onHide={() => { if (!props.visible) return; props.setVisible(false); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>

                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="name" className="text-primary-50 font-semibold">
                                Name
                            </label>
                            <InputText id="name" label="name" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={nameRef} ></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                Username
                            </label>
                            <InputText id="username" label="username" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={usernameRef} ></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="email" className="text-primary-50 font-semibold">
                                Email
                            </label>
                            <InputText id="email" label="email" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={emailRef}  ></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="address" className="text-primary-50 font-semibold">
                                Address
                            </label>
                            <InputText id="address" label="address" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={addressRef} ></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="phone" className="text-primary-50 font-semibold">
                                Phone
                            </label>
                            <InputText id="phone" label="phone" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={phoneRef} ></InputText>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="Save" onClick={(e) => {
                                hide(e);
                                addUser()
                            }
                            } text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    )
}

export default Add