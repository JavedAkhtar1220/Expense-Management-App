import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from '../components/Header';
import LeftMenu from '../components/LeftMenu';
import swal from 'sweetalert';
import firebase from '../config/firebase';

const Home = () => {

    const [items, setItems] = useState([]);
    // const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const [userUid, setUserUid] = useState("");
    const [btnDisable, setBtnDisable] = useState(false);

    useEffect(() => {
        document.title = "Expense Management || Add Expenses";

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUserUid(user.uid);
                firebase.firestore().collection("items").doc(user.uid).collection("List")
                    .onSnapshot(doc => {
                        doc.forEach(items => {
                            setItems(pre => [
                                ...pre,
                                items.data()
                            ])
                        })
                    })
            } else {
                // history.push('/login');
            }
        });
    }, [])

    const addExpense = (data, e) => {
        var date = new Date().toLocaleDateString();
        var key = firebase.firestore().collection("items").doc().id;
        var ms = new Date().getTime();
        setBtnDisable(true);

        firebase.firestore().collection("expenses").doc(userUid).collection("List").doc(key).set({
            name: data.itemName,
            amount: data.amount,
            date: date,
            key,
            order: ms,
        })
            .then(() => {
                e.target.reset();
                setBtnDisable(false);
                swal("Expense Added");
            })
            .catch(err => {
                alert(err);
                setBtnDisable(false);
            })
    }

    return (
        <div>
            <Header />
            <div className="d-flex">
                <LeftMenu />
                <div className="content">
                    <div className="row">
                        <div className="col-10 mx-auto py-4">
                            <p className="head">Add Daily Expenses</p>
                            <form onSubmit={handleSubmit(addExpense)}>

                                {/* Select */}
                                <div className="mb-3">
                                    <label>Select Item</label>
                                    <select
                                        className="form-select select_items mt-2 shadow-sm border"
                                        name="itemName"
                                        ref={register({
                                            required: "Select Item First"
                                        })}
                                        defaultValue=""
                                    >
                                        <option disabled="disabled" value="">Choose option</option>
                                        {items.map((v, i) => {
                                            return <option key={i} value={v.item}>{v.item}</option>
                                        })}
                                    </select>
                                    {errors.itemName && <span className="small text-danger">
                                        {errors.itemName.message}
                                    </span>}
                                </div>

                                {/* Amount TextField */}
                                <div className="mb-3">
                                    <label>Amount</label>
                                    <input type="number"
                                        name="amount"
                                        placeholder="Enter amount"
                                        autoComplete="off"
                                        className="inpStyle shadow-sm border mt-2"
                                        ref={register({
                                            required: "Amount required",
                                            // valueAsNumber: 
                                        })}
                                    />
                                    {errors.amount && <span className="small text-danger">
                                        {errors.amount.message}
                                    </span>}
                                </div>

                                {btnDisable ? <button className="disbtn_signup rounded" type="button">
                                    <span className="spinner-grow spinner-grow-sm mr-2" role="status" aria-hidden="true"></span>
                                    <span className="spinner-grow spinner-grow-sm mr-2" role="status" aria-hidden="true"></span>
                                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                </button> : <button className="btn_signup">Add Expense</button>}

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;