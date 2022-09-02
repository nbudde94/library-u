import React, { useState } from "react";
import { Link } from "react-router-dom";
import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "../TableFooter";
import Swal from 'sweetalert2';

const TableUsers = ({ data, rowsPerPage, getData }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const deleteUser = (event, id) => {
    event.preventDefault()
    Swal.fire({
      title: 'Are you sure you want to delete this user?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        window.axios.delete('/api/users/delete/' + id).then((response) => {
          getData()
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'User deleted successfully.'
          })
        })
      }
    })
  }
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>First name</th>
            <th className={styles.tableHeader}>Last name</th>
            <th className={styles.tableHeader}>Email</th>
            <th className={styles.tableHeader}>Role</th>
            <th className={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {slice.length > 0 ? slice.map((user, key) => (
            <tr className={styles.tableRowItems} key={key}>
              <td className={styles.tableCell}>{user.first_name}</td>
              <td className={styles.tableCell}>{user.last_name}</td>
              <td className={styles.tableCell}>{user.email}</td>
              <td className={styles.tableCell}>{user.role}</td>
              <td className={styles.tableCell}>
                <Link to={`/librarian/users/edit/${user.id}`} className="btn btn-warning">Edit</Link>&nbsp;&nbsp;
                <button className="btn btn-danger" onClick={e => deleteUser(e, user.id)}>Delete</button>
              </td>
            </tr>
          )) : <tr><td className="text-center p-3">No results were found</td></tr>}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default TableUsers;