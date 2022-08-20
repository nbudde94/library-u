import React, { useState } from "react";
import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "../TableFooter";

const TableUsers = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

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
                <button className="btn btn-warning">Edit</button>&nbsp;&nbsp;
                <button className="btn btn-danger">Delete</button>
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