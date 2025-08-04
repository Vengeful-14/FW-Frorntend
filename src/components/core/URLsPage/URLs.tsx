import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../services/firebase.service"; // Adjust path based on your setup
import { FaTrash, FaEdit } from "react-icons/fa"; // Use icons for delete and edit buttons
import "./urls.css";

const Urls: React.FC = () => {
  const [url, setUrl] = useState("");
  const [ipaddress, setIPaddress] = useState("");
  const [domain, setDomain] = useState("");
  const [urlsList, setUrlsList] = useState<any[]>([]); // Store URLs along with their ID
  const [ipaddress_list, setipaddress_list] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null); // Track which URL is being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const [urlToDelete, setUrlToDelete] = useState<string | null>(null); // Store the ID of URL to delete
  const [loading, setLoading] = useState(false); // Loading state for save operation

  // Fetch URLs from Firestore
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ipaddress"));
        const urlsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(urlsData);
        setipaddress_list(urlsData);
      } catch (err) {
        console.error("Error fetching URLs:", err);
      }
    };

    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "ipaddress"));
      const urlsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(urlsData);
      setipaddress_list(urlsData);
    } catch (err) {
      console.error("Error fetching URLs:", err);
    }
  };

  // Handle Add or Update URL
  const handleSaveUrl = async () => {
    if (ipaddress.trim() !== "" || domain.trim() !== "") {
      setLoading(true); // Start loading when saving
      try {
        if (editingId) {
          // Update the existing URL
          const urlDoc = doc(db, "ipaddress", editingId);
          await updateDoc(urlDoc, {
            ipaddress: ipaddress,
            domain: domain,
          });
          setipaddress_list((prevUrls) =>
            prevUrls.map((item) =>
              item.id === editingId
                ? {
                    ...item,
                    ipaddress: ipaddress,
                    domain: domain,
                  }
                : item
            )
          );
          setEditingId(null); // Reset editing state
          setIPaddress(""); // Clear the input field
          setDomain("");
        } else {
          // Add a new URL
          const docRef = await addDoc(collection(db, "ipaddress"), {
            ipaddress: ipaddress,
            domain: domain,
            status: "blocked",
          });
          setipaddress_list((prevUrls) => [
            ...prevUrls,
            {
              id: docRef.id,
              ipaddress: ipaddress,
              domain: domain,
              status: "blocked",
            },
          ]);
          setIPaddress(""); // Clear the input field
          setDomain("");
        }

        setIPaddress(""); // Clear the input field
        setDomain("");
      } catch (err) {
        console.error("Error saving IP address:", err);
        setError("Failed to save IP address. Please try again.");
      } finally {
        setLoading(false); // Stop loading once save operation is complete
      }
    } else {
      setError("IP address or domain cannot be empty.");
    }
  };

  // Handle Delete URL (Show confirmation modal)
  const handleDeleteUrl = (id: string) => {
    setUrlToDelete(id); // Store URL to delete
    setIsModalOpen(true); // Open confirmation modal
  };

  const allowIP = async (id: string) => {
    const urlDoc = doc(db, "ipaddress", id);
    await updateDoc(urlDoc, {
      status: "allowed",
    });
    fetchUrls();
  };

  const blockIP = async (id: string) => {
    const urlDoc = doc(db, "ipaddress", id);
    await updateDoc(urlDoc, {
      status: "blocked",
    });
    fetchUrls();
  };

  // Confirm Delete URL
  const confirmDeleteUrl = async () => {
    if (urlToDelete) {
      try {
        await deleteDoc(doc(db, "ipaddress", urlToDelete));
        setipaddress_list(
          ipaddress_list.filter((url) => url.id !== urlToDelete)
        ); // Remove from local state
        setIsModalOpen(false); // Close modal after delete
        setUrlToDelete(null); // Reset URL to delete
      } catch (err) {
        console.error("Error deleting URL:", err);
        setError("Failed to delete URL. Please try again.");
      }
    }
  };

  // Cancel Delete URL
  const cancelDelete = () => {
    setIsModalOpen(false); // Close the modal without deleting
    setUrlToDelete(null); // Reset URL to delete
  };

  // Handle Edit URL (Set URL for editing)
  const handleEditUrl = (id: string, ipaddress: string, domain: string) => {
    setEditingId(id); // Set the URL to be edited
    setIPaddress(ipaddress); // Pre-fill the input field with the current URL
    setDomain(domain);
  };

  return (
    <div className="urls-container">
      <h2>Manage Blocked URLs</h2>
      {/* Add or Update URL Input and Button */}
      <div className="add-url">
        <input
          type="text"
          value={ipaddress}
          onChange={(e) => setIPaddress(e.target.value)}
          placeholder="Enter IP Address"
        />

        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter Domain"
        />
        <button onClick={handleSaveUrl} disabled={loading}>
          {loading
            ? "Saving..."
            : editingId
            ? "Update IP Address"
            : "Add IP Address"}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}

      {/* URL List with Edit and Delete */}

      <div className="mybody">
        <div className="urls-list">
          <h3>Blocked URLs:</h3>
          <ul>
            {ipaddress_list
              .filter((urlItem) => urlItem.status === "blocked")
              .map((urlItem) => (
                <li key={urlItem.id}>
                  <div className="blocked_buttons">
                    <button
                      className="delete-btn"
                      onClick={() => allowIP(urlItem.id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEditUrl(
                          urlItem.id,
                          urlItem.ipaddress,
                          urlItem.domain
                        )
                      }
                    >
                      <FaEdit />
                    </button>
                  </div>
                  {urlItem.ipaddress} / {urlItem.domain}
                </li>
              ))}
          </ul>
        </div>

        {/* Confirmation Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Are you sure you want to delete this URL?</h3>
              <div className="modal-buttons">
                <button onClick={confirmDeleteUrl} className="confirm-btn">
                  Confirm
                </button>
                <button onClick={cancelDelete} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="urls-list">
          <h3>Allowed URLs:</h3>
          <ul>
            {ipaddress_list
              .filter((urlItem) => urlItem.status === "allowed")
              .map((urlItem) => (
                <li key={urlItem.id}>
                  <div className="blocked_buttons">
                    <button
                      className="delete-btn"
                      onClick={() => blockIP(urlItem.id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEditUrl(
                          urlItem.id,
                          urlItem.ipaddress,
                          urlItem.domain
                        )
                      }
                    >
                      <FaEdit />
                    </button>
                  </div>
                  {urlItem.ipaddress} / {urlItem.domain}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Urls;
