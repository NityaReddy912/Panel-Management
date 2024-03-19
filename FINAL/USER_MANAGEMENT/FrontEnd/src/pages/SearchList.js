//import React, { useState } from "react";
import Paginator from "./Paginator.js";
import SingleList from "./SingleList";
import "./SearchList.scss";
function SearchList({ userList, onNext, onPrevious, page, userid, username, email, roles, isActive }) {
    const user_data = JSON.parse(window.sessionStorage.getItem('user_data'));

    return (
        <div className='container-wrap'>
            <h5> {userList.totalItems === 1 ? "1 User" : `${userList.totalItems} Users Fetched`}</h5>
            {userList?.user?.length ? (
                <Paginator
                    onPrevious={onPrevious}
                    onNext={onNext}
                    lastPage={userList ? Math.ceil(userList.totalItems / 3) : 1}
                    currentPage={page}>
                    <table className='searchList__lists'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User ID</th>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                {/* <th>&nbsp;</th> */}
                                {user_data.Roles === "Practice Head(PH)" ? <th>Action</th> : ''}
                            </tr>
                        </thead>
                        <tbody>
                            {userList.user?.map((user, index) => (
                                <SingleList key={user._id} hash={(page*3 - 3)+(index + 1)} user={user} page={page} />
                            ))}
                        </tbody>
                    </table>
                </Paginator>
            ) : (
                <h3 className='searchList__noResult'>
                    No Result Found For this Search
                </h3>
            )}
            <span>{userList.totalItems ? ((page*3 -2) +  " - " + (page*3 <= userList.totalItems ? page*3 : userList.totalItems) + " of " + Math.ceil(userList.totalItems) + " records") : ""}</span>
        </div>
    );
}

export default SearchList;