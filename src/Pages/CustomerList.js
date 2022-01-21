import React, { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, Table } from 'react-bootstrap';
import { BsFilterLeft } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import './CustomerList.css';

const CustomerList = () => {
    const [orders, setOrders] = useState([]);

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
        if (searchValue == '') {
            fetch('https://my-json-server.typicode.com/Ved-X/assignment/orders')
                .then(res => res.json())
                .then(data => setOrders(data))
        }
    }

    // function for show status
    const statusView = (OrderStatus) => {
        if (OrderStatus == 'Delivered') {
            return (
                <Button disabled variant="primary" className='mx-auto px-3 rounded-pill'>{OrderStatus}</Button>
            )
        }
        else if (OrderStatus == 'Prepared') {
            return (
                <Button disabled variant="warning" className='mx-auto px-3 rounded-pill'>{OrderStatus}</Button>
            )
        }
        else if (OrderStatus == 'Completed') {
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

                <h5 className='text-end me-3 text-bold'>Showing 20 of 20 results</h5>
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


                <Dropdown >
                    <Dropdown.Toggle className='rounded-pill px-4' id="dropdown-button-dark-example1" variant="outline-dark">
                        <BsFilterLeft ></BsFilterLeft> Filter By
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="">
                        <Dropdown.Item href="#/action-1" >
                            By Completed
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">By Delivered</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">By Prepared</Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>
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
                            orders.map(order => <tr>
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