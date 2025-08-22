import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../../../services/firebase.service";
import "./logs.css";

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalLogs, setTotalLogs] = useState(0);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  // Fetch logs from Firestore with pagination
  const fetchLogs = async (page: number = 1, size: number = pageSize, startAfterDoc?: any) => {
    try {
      setLoading(true);
      setError("");
      
      let logsQuery = query(
        collection(db, "logs"),
        orderBy("timestamp", "desc"),
        limit(size + 1) // Get one extra to check if there's a next page
      );

      if (startAfterDoc) {
        logsQuery = query(logsQuery, startAfter(startAfterDoc));
      }

      const querySnapshot = await getDocs(logsQuery);
      const docs = querySnapshot.docs;
      
      // Check if there's a next page
      const hasMore = docs.length > size;
      const logsData = docs.slice(0, size).map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLogs(logsData);
      setHasNextPage(hasMore);
      setLastDoc(docs[docs.length - 2] || null); // Set the last doc for next page
      
      // Update total logs count (this is approximate for large datasets)
      if (page === 1) {
        setTotalLogs(logsData.length + (hasMore ? 1 : 0));
      }
    } catch (err) {
      console.error("Error fetching logs:", err);
      setError("Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchLogs(1, pageSize);
  }, [pageSize]);

  // Handle page size change
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
    setLastDoc(null);
  };

  // Handle page navigation
  const handlePageChange = (newPage: number) => {
    if (newPage < currentPage) {
      // Going backwards - we need to refetch from the beginning
      setCurrentPage(1);
      setLastDoc(null);
      fetchLogs(1, pageSize);
    } else if (newPage > currentPage && hasNextPage) {
      // Going forwards
      setCurrentPage(newPage);
      fetchLogs(newPage, pageSize, lastDoc);
    }
  };


  const formatTimestamp = (timestamp: any) => {
    if (timestamp?.toDate) {
      return timestamp.toDate().toLocaleString();
    }
    return new Date(timestamp).toLocaleString();
  };



  if (loading) {
    return (
      <div className="logs-container">
        <div className="loading">Loading logs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="logs-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="logs-container">
      <div className="logs-header">
        <h2>Firewall Logs</h2>
        <div className="logs-controls">
          <div className="page-size-selector">
            <label htmlFor="pageSize">Rows per page:</label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="logs-table-container">
        <table className="logs-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Domain</th>
              <th>Source IP</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="loading-cell">
                  <div className="loading">Loading logs...</div>
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={3} className="no-logs-cell">
                  <div className="no-logs">No logs found</div>
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="log-row">
                  <td className="timestamp-cell">
                    {formatTimestamp(log.timestamp)}
                  </td>
                  <td className="domain-cell">
                    {log.domain || 'N/A'}
                  </td>
                  <td className="source-ip-cell">
                    {log.source_ip || log.sourceIP || 'N/A'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <div className="pagination-info">
          <span>
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalLogs)} of {totalLogs} logs
          </span>
        </div>
        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="page-number">Page {currentPage}</span>
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logs;
