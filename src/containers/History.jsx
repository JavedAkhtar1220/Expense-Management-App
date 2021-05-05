import React, { useEffect } from 'react';
import Header from '../components/Header';
import LeftMenu from '../components/LeftMenu';


const History = () => {

    useEffect(() => {
        document.title = "Expense Management || History";
    }, [])

    return (
        <div>
            <Header />
            <div className="d-flex">
                <LeftMenu />
                <div className="content">
                    <p>History</p>
                </div>
            </div>
        </div>
    )
}

export default History;