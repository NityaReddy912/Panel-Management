import React, { useEffect, useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from 'react-router-dom';
import "./SingleList.scss";

function SingleList({ hash, user, page }) {
    const user_data = JSON.parse(window.sessionStorage.getItem('user_data'));
    const [userid, setUserId] = useState();
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [roles, setRoles] = useState();
    const [isActive, setIsActive] = useState(user?.Action);
    const handleUpdateToggle = async (e) => {
        const responseToggle = await fetch(
            `http://localhost:8080/updateIsActive/${userid}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        if (responseToggle.status === 200) {
            setIsActive(!isActive);
        }

        if (responseToggle.status === 500) {
            alert("Error");
        }
        const toggle = await responseToggle.json();
        console.log(toggle);
    };

    useEffect(() => {
        setUserId(user?.User_ID);
        setUserName(user?.User_Name);
        setEmail(user?.Email);
        setRoles(user?.Roles);
        setIsActive(user?.Action);
        console.log(user);
    }, [user]);
    return (
        <tr className="singleList">
            <td>{hash}</td>
            <td>{userid}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>{roles}</td>
            {(user_data.Roles === "Practice Head(PH)") ? <td>
                <Link to={`/edit/${userid}`}><PencilIcon className="singleList__pencilIcon"/></Link>
                <span className='bar'>|</span>
                <span
                    className='form-check form-switch form-switch-sm'
                    style={{ display: "inline-block" }}>
                    <input
                        className='form-check-input'
                        type='checkbox'
                        data-testid="searchCheck"
                        id='flexSwitchCheckDefault'
                        onChange={handleUpdateToggle}
                        value={isActive}
                        checked={isActive}
                    />
                </span>
            </td> : ''}
            
        </tr>
    );
}

export default SingleList;