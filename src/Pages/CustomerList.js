import React, { Fragment, useEffect, useState } from 'react';
import { Button, Dropdown, Table } from 'react-bootstrap';
import { BsFilterLeft } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import './CustomerList.css';

const CustomerList = () => {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState(['All', 'Completed', 'Delivered', 'Prepared'])
    const [selectedStatus, setSelectedStatus] = useState('All');

    useEffect(() => {
        fetch('https://my-json-server.typicode.com/Ved-X/assignment/orders')
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [])


    console.log(orders.length);

    // search function
    const searchItems = (searchValue) => {
        // setSearchUser(searchValue)
        console.log(searchValue);

        //capitalize first letter
        const modifiedSearchResult = searchValue.charAt(0).toUpperCase() + searchValue.slice(1);
        console.log(modifiedSearchResult);

        const userResults = orders.filter(resultOrder => resultOrder.customer.includes(modifiedSearchResult));

        // setSearchUser(userResults);

        setOrders(userResults);

        // if empty then show all results
        if (searchValue === '') {
            fetch('https://my-json-server.typicode.com/Ved-X/assignment/orders')
                .then(res => res.json())
                .then(data => setOrders(data))
        }
    }


    // Filter By Status
    const filterIcon = <BsFilterLeft />
    const handleChange = e => {
        setSelectedStatus(e.target.value)
    }

    let filteredResults = orders;
    if (selectedStatus !== 'All') {
        filteredResults = orders.filter(singleOrder => singleOrder.status === selectedStatus);
    }



    // function for show status
    const statusView = (OrderStatus) => {
        if (OrderStatus === 'Delivered') {
            return (
                <Button disabled variant="primary" className='mx-auto px-3 rounded-pill'>{OrderStatus}</Button>
            )
        }
        else if (OrderStatus === 'Prepared') {
            return (
                <Button disabled variant="warning" className='mx-auto px-3 rounded-pill'>{OrderStatus}</Button>
            )
        }
        else if (OrderStatus === 'Completed') {
            return (
                <Button disabled variant="success" className='mx-auto px-3 rounded-pill'>{OrderStatus}</Button>
            )
        }
        else {
            return (
                <Button disabled variant="warning" className='mx-auto px-3 rounded-pill'>{OrderStatus}</Button>
            )
        }
    }


    return (
        <div className='container mt-5'>
            <hr className='m-2' />
            <div className='d-flex justify-content-between'>
                <h5 className='text-start ms-3 text-bold'>All Orders {orders.length}</h5>

                <h5 className='text-end me-3 text-bold'>Showing {orders.length} of {orders.length} results</h5>
            </div>
            <hr className='m-2' />


            <div className='container d-flex justify-content-between my-3'>
                <form className='d-flex h-75'>
                    <button type="submit" className='border-0 text-dark bg-white'><BsSearch /></button>
                    <input
                        className='form-control px-4 text-center'
                        type="search"
                        name="search user"
                        id=""
                        placeholder='search by user'
                        onChange={(e) => searchItems(e.target.value)} />
                </form>

                <select
                    className='rounded-pill px-4'
                    onChange={e => handleChange(e)}

                >
                    {/* <option value="value" selected>Filter By</option> */}
                    {status.map(selectedOrder =>
                        <option key={selectedOrder} value={selectedOrder}>{selectedOrder}</option>
                    )}
                </select>


                {/* 
                <Dropdown >
                    <Dropdown.Toggle className='rounded-pill px-4' id="dropdown-button-dark-example1" variant="outline-dark">
                        <BsFilterLeft ></BsFilterLeft> Filter By
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="" >
                        {
                            status.map(singleStatus => <Dropdown.Item key={singleStatus} value={singleStatus}>{singleStatus}</Dropdown.Item>)
                        }
                    </Dropdown.Menu>
                </Dropdown> */}

            </div>

            {/* table section */}
            <div className='mt-3'>
                <Table hover variant="">
                    <thead className='bg-info text-dark'>
                        <tr className='text-justified'>
                            <th>ORDER ID</th>
                            <th>CUSTOMER</th>
                            <th>ADDRESS</th>
                            <th>PRODUCT</th>
                            <th>Date Order</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            filteredResults.map(order => <tr>
                                <td>#{order.order_id}</td>
                                <td>{order.customer}</td>
                                <td>
                                    <div className='text-start'>
                                        <p className='fs-6 mb-0'>{order.country}</p>
                                        <p className='text-muted'>{order.address}</p>
                                    </div>
                                </td>

                                <td className='text-start'>{order.product_title}
                                    <p className='text-muted'>{order.product_description}</p>
                                </td>

                                <td>{order.date}</td>
                                <td>{statusView(order.status)}</td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </div>

        </div>
    );
};

export default CustomerList;