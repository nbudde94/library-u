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
            <th className={styles.tableHeader}>Title</th>
            <th className={styles.tableHeader}>Status</th>
            <th className={styles.tableHeader}>Start date</th>
            <th className={styles.tableHeader}>End date</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((checkout, key) => (
            <tr className={styles.tableRowItems} key={key}>
              <td className={styles.tableCell}>{checkout.book_title}</td>
              <td className={styles.tableCell}>{checkout.status}</td>
              <td className={styles.tableCell}>{checkout.start_date}</td>
              <td className={styles.tableCell}>{checkout.end_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;