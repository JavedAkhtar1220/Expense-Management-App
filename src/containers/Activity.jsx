import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import LeftMenu from '../components/LeftMenu';
import firebase from '../config/firebase';
import swal from 'sweetalert';

const Activity = () => {

    const [expenses, setExpenses] = useState([]);
    const [total, setTotal] = useState(0);
    const [userUid, setUserUid] = useState("");

    useEffect(() => {
        document.title = "Expense Management || Activity";

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                var totalAmount = 0;
                setUserUid(user.uid);
                firebase.firestore().collection("expenses").doc(user.uid).collection("List").orderBy("order", "desc")
                    .onSnapshot(doc => {
                        setExpenses([]);
                        setTotal(0);
                        totalAmount = 0;
                        doc.forEach(element => {
                            setExpenses(pre => [
                                ...pre,
                                element.data(),
                            ])
                            setTotal(totalAmount + parseInt(element.data().amount));
                            totalAmount += parseInt(element.data().amount);
                        })
                    })

            } else {

            }
        });
    }, []);

    const deleteTodo = i => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    firebase.firestore().collection("expenses").doc(userUid).collection("List").doc(expenses[i].key).delete();
                    setExpenses(pre => {
                        return pre.filter((arrElement, index) => {
                            return index !== i;
                        })
                    })
                    swal("Your expense has been deleted!", {
                        icon: "success",
                    });
                }
            });
    }

    return (
        <div>
            <Header />
            <div className="d-flex">
                <LeftMenu />
                <div className="content">
                    <div className="row">
                        <div className="col-10 mx-auto py-4">
                            <p className="head">Your Monthly Activity</p>
                            <div className="table-responsive table_content">
                                <table className="table border">
                                    <thead>
                                        <tr>
                                            <th>S#</th>
                                            <th>Date</th>
                                            <th>Item</th>
                                            <th>Amount</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {expenses.map((v, i) => {
                                            return <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{v.date}</td>
                                                <td>{v.name}</td>
                                                <td>{v.amount}</td>
                                                <td>
                                                    <button className="btn_changes border bg-danger text-white rounded" onClick={() => deleteTodo(i)}>Delete</button>
                                                </td>
                                            </tr>
                                        })}
                                        <tr>
                                            <td colSpan="5" className="text-center">Total: Rs.{total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Activity;