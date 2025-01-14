import "./TableListUser.scss";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetUsersByIdQuery,
} from "../../../redux/SliceApi/userApiSlice";
import ModalEditUser from "./ModalEditUser";

const TableListUser = () => {
  // state
  const [userId, setUserId] = useState(null);

  // logic redux
  const { data: dataAllUsers, refetch: refetchAllUsers } =
    useGetAllUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const {
    data: dataUserById,
    isFetching: isFetchingUserById,
    refetch: refetchUsersById,
  } = useGetUsersByIdQuery(userId, {
    skip: !userId,
  });
  // ------------------------------

  const handleDeleteUser = async (userId) => {
    try {
      const response = await deleteUser(userId).unwrap();
      if (response.errCode === 0) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      refetchAllUsers();
    } catch (err) {
      console.error("Error deleting user: ", err);
    }
  };

  const handleEditUser = async (userId) => {
    // find user by id
    setUserId(userId);
    const modalElement = document.getElementById("staticBackdrop");
    const bootstrapModal = new window.bootstrap.Modal(modalElement);
    bootstrapModal.show();
  };

  useEffect(() => {
    if (!isFetchingUserById && dataUserById) {
      console.log("Fetched user data: ", dataUserById);
    }
  }, [dataUserById, isFetchingUserById]);
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>NO</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataAllUsers &&
            dataAllUsers.users.length > 0 &&
            dataAllUsers.users.map((user, index) => {
              return (
                <tr key={`${index}-user`}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.address}</td>
                  <td>{user.phoneNumber}</td>
                  <td className="actions">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        handleEditUser(user.id);
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => {
                        handleDeleteUser(user.id);
                      }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalEditUser
        userId={userId}
        dataUserById={dataUserById}
        refetchUsersById={refetchUsersById}
      />
    </div>
  );
};
export default TableListUser;
