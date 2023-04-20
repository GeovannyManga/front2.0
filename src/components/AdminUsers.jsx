import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeValueType, getAllUsers } from "../redux/actions";
import "../styles/DashboardAdmin.scss";
import { Sweet } from "./Sweet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faUserPlus, faUser } from "@fortawesome/free-solid-svg-icons";

const AdminUsers = (props) => {
  const [messages, setMessages] = useState({});
  const dispatch = useDispatch();

  const allUsers = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const typeAdmin = (id) => {
    Sweet().then((confirmed) => {
      if (confirmed) {
        const ids = id;
        const type = "admin";
        dispatch(changeValueType(ids, type)).then((res) => {
          setMessages((prevMessages) => ({ ...prevMessages, [id]: res }));
          setTimeout(() => {
            setMessages((prevMessages) => ({ ...prevMessages, [id]: null }));
          }, 5000); // remove message after 10 seconds
        });
      }
    });
  };

  const typeUser = (id) => {
    Sweet().then((confirmed) => {
      if (confirmed) {
        const ids = id;
        const type = "user";
        dispatch(changeValueType(ids, type)).then((res) => {
          setMessages((prevMessages) => ({ ...prevMessages, [id]: res }));
          setTimeout(() => {
            setMessages((prevMessages) => ({ ...prevMessages, [id]: null }));
          }, 5000); // remove message after 10 seconds
        });
      }
    });
  };

  const blockUser = (id) => {
    Sweet().then((confirmed) => {
      if (confirmed) {
        const type = "block";
        dispatch(changeValueType(id, type)).then((res) => {
          setMessages((prevMessages) => ({ ...prevMessages, [id]: res }));
          setTimeout(() => {
            setMessages((prevMessages) => ({ ...prevMessages, [id]: null }));
          }, 5000); // remove message after 10 seconds
        });
      }
    });
  };

  return (
    <div className="view-users view-table">
      <div>
        <h2>Users</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Full Name</th>
            <th>Rol</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user) => {
            return (
              <>
                {/* <div>{messages[user._id]}</div> */}

                <tr key={user._id}>
                  <td>
                    <img src={user.image} />
                  </td>
                  <td>{user.fullName}</td>
                  <td>{user.type}</td>
                  <td>
                    <button
                      className="icons-buttons"
                      onClick={() => typeAdmin(user._id)}
                    >
                      <FontAwesomeIcon icon={faUserPlus} />
                    </button>
                    <button
                      className="icons-buttons"
                      onClick={() => typeUser(user._id)}
                    >
                      <FontAwesomeIcon icon={faUser} />
                    </button>
                    <button
                      className="icons-buttons"
                      onClick={() => blockUser(user._id)}
                    >
                      <FontAwesomeIcon icon={faBan} />
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
