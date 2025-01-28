import "./TableListUser.scss";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetUsersByIdQuery,
} from "../../../redux/SliceApi/userApiSlice";
import ModalEditUser from "./ModalEditUser";
import ReactPaginate from "react-paginate";

const TableListUser = () => {
  // state
  const [userId, setUserId] = useState(null);
  // use paginate
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8; // Số lượng mục trên mỗi trang

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
  // handle
  const handleEditUser = async (userId) => {
    // find user by id
    setUserId(userId);
    const modalElement = document.getElementById("staticBackdrop");
    const bootstrapModal = new window.bootstrap.Modal(modalElement);
    bootstrapModal.show();
  };

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % dataAllUsers?.users.length;
    setItemOffset(newOffset); // Cập nhật vị trí dữ liệu
  };
  // useEffect
  useEffect(() => {
    if (!isFetchingUserById && dataUserById) {
      console.log("Fetched user data: ", dataUserById);
    }
  }, [dataUserById, isFetchingUserById]);

  useEffect(() => {
    if (dataAllUsers?.users) {
      console.log("Dữ liệu người dùng: ", dataAllUsers.users);
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(dataAllUsers.users.slice(itemOffset, endOffset)); // Lấy dữ liệu cho trang hiện tại
      setPageCount(Math.ceil(dataAllUsers.users.length / itemsPerPage)); // Tính tổng số trang
    }
  }, [itemOffset, itemsPerPage, dataAllUsers]);
  console.log("check ", currentItems);

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
          {currentItems && currentItems.length > 0 ? (
            currentItems.map((user, index) => (
              <tr key={user.id}>
                <td>{itemOffset + index + 1}</td>{" "}
                {/* Số thứ tự dựa trên trang */}
                <td>{user.email || "N/A"}</td> {/* Hiển thị email */}
                <td>{user.firstName || "N/A"}</td> {/* Hiển thị First Name */}
                <td>{user.lastName || "N/A"}</td> {/* Hiển thị Last Name */}
                <td>{user.address || "N/A"}</td> {/* Hiển thị Address */}
                <td>{user.phoneNumber || "N/A"}</td> {/* Hiển thị Phone */}
                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditUser(user.id)}
                  >
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
      />

      <ModalEditUser
        userId={userId}
        dataUserById={dataUserById}
        refetchUsersById={refetchUsersById}
      />
    </div>
  );
};
export default TableListUser;
