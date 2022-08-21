import React, { useState } from "react";
import { Link } from "react-router-dom";
import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "../TableFooter";
import Swal from 'sweetalert2';

const TableLibBooks = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const deleteBook = (event, id) => {
    event.preventDefault()
    Swal.fire({
      title: 'Are you sure you want to delete this book?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        window.axios.delete('/api/books/delete/' + id).then((response) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Book deleted successfully.'
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
            <th className={styles.tableHeader}>Author</th>
            <th className={styles.tableHeader}>Genre</th>
            <th className={styles.tableHeader}>Published year</th>
            <th className={styles.tableHeader}>Stock amount</th>
            <th className={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {slice.length > 0 ? slice.map((book, key) => (
            <tr className={styles.tableRowItems} key={key}>
              <td className={styles.tableCell}>{book.title}</td>
              <td className={styles.tableCell}>{book.author}</td>
              <td className={styles.tableCell}>{book.genre}</td>
              <td className={styles.tableCell}>{book.published_year}</td>
              <td className={styles.tableCell}>{book.stock_amount}</td>
              <td className={styles.tableCell}>
                <Link to={`/librarian/books/edit/${book.id}`} className="btn btn-warning">Edit</Link>&nbsp;&nbsp;
                <button className="btn btn-danger" onClick={e => deleteBook(e, book.id)}>Delete</button>
              </td>
            </tr>
          )) : <tr><td className="text-center p-3">No results were found</td></tr>}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default TableLibBooks;