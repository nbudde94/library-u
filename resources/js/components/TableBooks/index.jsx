import React, { useState } from "react";
import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "../TableFooter";
import Swal from 'sweetalert2'

const TableBooks = ({ data, rowsPerPage, getData }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

  const takeBook = (event, id) => {
    event.preventDefault()
    Swal.fire({
      title: 'Are you sure you want to take this book?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        window.axios.post('/api/students/take-book/' + id).then((response) => {
          getData()
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message
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
            <th className={styles.tableHeader}>Item</th>
          </tr>
        </thead>
        <tbody>
          {slice.length > 0 ? slice.map((book, key) => (
            <tr className={styles.tableRowItems} key={key}>
              <td className={styles.tableCell}>
                <div className="row"><p>Title:</p><b>{book.title}</b></div>
                <p>Author:</p><b>{book.author}</b>
                <p>Genre:</p><b>{book.genre}</b>
                <p>Published year:</p><b>{book.published_year}</b>
                <p>Stock:</p><b>{book.stock_amount}</b>
                <div className='d-flex justify-content-end'>
                  {book.isTaken ? 'Book already taken' : <button onClick={e => takeBook(e, book.id)} className='btn btn-success'>Take book</button>}
                </div>
              </td>
            </tr>
          )) : <tr><td className="text-center p-3">No results were found</td></tr>}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default TableBooks;