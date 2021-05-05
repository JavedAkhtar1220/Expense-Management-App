import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Header from '../components/Header';
import LeftMenu from '../components/LeftMenu';
import swal from 'sweetalert';
import firebase from '../config/firebase';


const AddItems = () => {
    const [isLogin, setisLogin] = useState(false);
    const { register, handleSubmit, errors } = useForm();
    const [userUid, setUserUid] = useState("");
    const [btnDisable, setBtnDisable] = useState(false);
    const [inpItem, setInpItem] = useState("");

    useEffect(() => {
        document.title = "Expense Management || Add Item";
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // User is signed in.
                setisLogin(true);
                setUserUid(user.uid)

            } else {
                setisLogin(false);
                // No user is signed in.
            }
        });
    }, [])


    const checkItem = item => {

        var items = [];
        firebase.firestore().collection("items").doc(userUid).collection("List").get()
            .then(doc => {
                doc.forEach(element => {
                    items.push(element.data());
                })

                var itemFilter = items.filter(e => e.item === item.toUpperCase());
                if (itemFilter.length === 0) {
                    var key = firebase.firestore().collection("items").doc().id;
                    firebase.firestore().collection("items").doc(userUid).collection("List").doc(key).set({
                        item: item.toUpperCase(),
                    }).then(() => {
                        swal("Item added successfully");
                        setBtnDisable(false);
                        setInpItem("");
                    })
                    return true;
                } else {
                    swal(item + " already exists");
                    setBtnDisable(false);
                    return false;
                }
            })
    }

    const handleChange = e => {
        setInpItem(e.target.value);
    }

    const addItems = (data, e) => {
        if (isLogin) {
            setBtnDisable(true);
            checkItem(data.itemName);
        }
        else {
            swal("No user found!");
        }

    }

    return (
        <div>
            <Header />
            <div className="d-flex">
                <LeftMenu />
                <div className="content">
                    <div className="row">
                        <div className="col-10 mx-auto py-4">
                            <p className="head">Add Items</p>
                            <form onSubmit={handleSubmit(addItems)}>

                                {/* Add Item TextField */}
                                <div className="mb-3">
                                    <label for="email">Item Name</label>
                                    <input type="text"
                                        placeholder="Enter Item Name"
                                        autoComplete="off"
                                        value={inpItem}
                                        onChange={handleChange}
                                        className="inpStyle shadow-sm border mt-2"
                                        name="itemName"
                                        ref={register({
                                            required: "Item name required",
                                            pattern: {
                                                value: /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/,
                                                message: "Enter alphabets only",
                                            },
                                        })}
                                    />
                                    {errors.itemName && <span className="small text-danger">
                                        {errors.itemName.message}
                                    </span>}
                                </div>

                                {btnDisable ? <button className="disbtn_signup rounded" type="button">
                                    <span className="spinner-grow spinner-grow-sm mr-2" role="status" aria-hidden="true"></span>
                                    <span className="spinner-grow spinner-grow-sm mr-2" role="status" aria-hidden="true"></span>
                                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                </button> : <button className="btn_signup" type="submit">Add Item</button>}

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddItems;