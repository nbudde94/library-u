import React, { useState } from "react";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "../TableFooter";
import Swal from 'sweetalert2';

const TableLibrarianCheckout = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const takeReturn = (event, id) => {
    event.preventDefault()
    Swal.fire({
      title: 'Are you sure you want to return this book?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        window.axios.post('/api/librarian/return-book/' + id).then((response) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Book returned successfully.'
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
            <th className={styles.tableHeader}>Title</th>
            <th className={styles.tableHeader}>Status</th>
            <th className={styles.tableHeader}>Start date</th>
            <th className={styles.tableHeader}>End date</th>
            <th className={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {slice.length > 0 ? slice.map((checkout, key) => (
            <tr className={styles.tableRowItems} key={key}>
              <td className={styles.tableCell}>{checkout.book_title}</td>
              <td className={styles.tableCell}>{checkout.status}</td>
              <td className={styles.tableCell}>{checkout.start_date}</td>
              <td className={styles.tableCell}>{checkout.end_date}</td>
              <td className={styles.tableCell}>
                {checkout.status == 'returned' ? '' : <button onClick={e => takeReturn(e, checkout.id)} className="btn btn-warning">Mark as returned</button>}
              </td>
            </tr>
          )) : <tr><td className="text-center p-3">No results were found</td></tr>}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default TableLibrarianCheckout;