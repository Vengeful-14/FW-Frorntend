import React, { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, doc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebase.service"; // Adjust path based on your setup
import { FaTrash, FaEdit } from "react-icons/fa"; // Use icons for delete and edit buttons
import "./ports.css";

const Ports: React.FC = () => {
  const [url, setUrl] = useState("");
  const [urlsList, setUrlsList] = useState<any[]>([]); // Store URLs along with their ID
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null); // Track which URL is being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const [urlToDelete, setUrlToDelete] = useState<string | null>(null); // Store the ID of URL to delete
  const [loading, setLoading] = useState(false); // Loading state for save operation

  // Fetch URLs from Firestore
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "PORTs"));
        const urlsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUrlsList(urlsData);
      } catch (err) {
        console.error("Error fetching Ports:", err);
      }
    };

    fetchUrls();
  }, []);

  // Handle Add or Update URL
  const handleSaveUrl = async () => {
    // Validate that the URL is numeric and within valid port range (1 to 65535)
    if (/^\d+$/.test(url.trim()) && parseInt(url) >= 1 && parseInt(url) <= 65535) {
      setLoading(true); // Start loading when saving
      try {
        if (editingId) {
          // Update the existing URL
          const urlDoc = doc(db, "PORTs", editingId);
          await updateDoc(urlDoc, {
            url_name: url,
          });
          setUrlsList((prevUrls) =>
            prevUrls.map((item) =>
              item.id === editingId ? { ...item, url_name: url } : item
            )
          );
          setEditingId(null); // Reset editing state
        } else {
          // Add a new URL
          const docRef = await addDoc(collection(db, "PORTs"), {
            url_name: url,
          });
          setUrlsList((prevUrls) => [...prevUrls, { id: docRef.id, url_name: url }]);
        }

        setUrl(""); // Clear the input field after save
      } catch (err) {
        console.error("Error saving URL:", err);
        setError("Failed to save PORT. Please try again.");
      } finally {
        setLoading(false); // Stop loading once save operation is complete
      }
    } else {
      setError("PORT must be a valid number between 1 and 65535.");
    }
  };

  // Handle Delete URL (Show confirmation modal)
  const handleDeleteUrl = (id: string) => {
    setUrlToDelete(id); // Store URL to delete
    setIsModalOpen(true); // Open confirmation modal
  };

  // Confirm Delete URL
  const confirmDeleteUrl = async () => {
    if (urlToDelete) {
      try {
        await deleteDoc(doc(db, "PORTs", urlToDelete));
        setUrlsList(urlsList.filter((url) => url.id !== urlToDelete)); // Remove from local state
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
  const handleEditUrl = (id: string, currentUrl: string) => {
    setEditingId(id); // Set the URL to be edited
    setUrl(currentUrl); // Pre-fill the input field with the current URL
  };

  return (
    <div className="urls-container">
      <h2>Manage Blocked PORTs</h2>
      {/* Add or Update URL Input and Button */}
      <div className="add-url">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value.replace(/\D/, ""))} // Only allow digits
          placeholder="Enter PORT"
        />
        <button onClick={handleSaveUrl} disabled={loading}>
          {loading ? "Saving..." : editingId ? "Update PORT" : "Add PORT"}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      
      {/* URL List with Edit and Delete */}
      <div className="urls-list">
        <h3>Blocked PORTS:</h3>
        <ul>
          {urlsList.map((urlItem) => (
            <li key={urlItem.id}>
              <div className="blocked_buttons">
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteUrl(urlItem.id)}
                >
                  <FaTrash />
                </button>
                <button
                  className="edit-btn"
                  onClick={() => handleEditUrl(urlItem.id, urlItem.url_name)}
                >
                  <FaEdit />
                </button>
              </div>
              {urlItem.url_name}
            </li>
          ))}
        </ul>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure you want to delete this PORT?</h3>
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
    </div>
  );
};

export default Ports;
