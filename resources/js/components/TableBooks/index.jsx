import React, { useState } from "react";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "../TableFooter";

const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>Item</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((book, key) => (
            <tr className={styles.tableRowItems} key={key}>
              <td className={styles.tableCell}>
                  <div className="row"><p>Title:</p><b>{book.title}</b></div>
                  <p>Author:</p><b>{book.author}</b>
                  <p>Genre:</p><b>{book.genre}</b>
                  <p>Published year:</p><b>{book.published_year}</b>
                  <p>Stock:</p><b>{book.stock_amount}</b>
                  <div className='d-flex justify-content-end'>
                    <button className='btn btn-success'>Take book</button>
                  </div>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;