// // // // // // import React, { useState } from "react";
// // // // // // import "./urls.css"; // Optional: Add styles for this component

// // // // // // const Urls: React.FC = () => {
// // // // // //   const [url, setUrl] = useState("");
// // // // // //   const [urlsList, setUrlsList] = useState<string[]>([]);

// // // // // //   const handleAddUrl = () => {
// // // // // //     if (url.trim() !== "") {
// // // // // //       setUrlsList((prevUrls) => [...prevUrls, url]);
// // // // // //       setUrl(""); // Clear the input field
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="urls-container">
// // // // // //       <h2>Manage Blocked URLs</h2>
// // // // // //       {/* Add Button */}
// // // // // //       <div className="add-url">
// // // // // //         <input
// // // // // //           type="text"
// // // // // //           value={url}
// // // // // //           onChange={(e) => setUrl(e.target.value)}
// // // // // //           placeholder="Enter URL"
// // // // // //         />
// // // // // //         <button onClick={handleAddUrl}>Add</button>
// // // // // //       </div>
// // // // // //       {/* URL List */}
// // // // // //       <div className="urls-list">
// // // // // //         <h3>Blocked URLs:</h3>
// // // // // //         <ul>
// // // // // //           {urlsList.map((urlItem, index) => (
// // // // // //             <li key={index}>{urlItem}</li>
// // // // // //           ))}
// // // // // //         </ul>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Urls;


// // // // // import React, { useState } from "react";
// // // // // import { collection, addDoc } from "firebase/firestore";
// // // // // import { db } from "../../../services/firebase.service"; // Adjust path based on your setup
// // // // // import "./urls.css";

// // // // // const Urls: React.FC = () => {
// // // // //   const [url, setUrl] = useState("");
// // // // //   const [urlsList, setUrlsList] = useState<string[]>([]);
// // // // //   const [error, setError] = useState("");

// // // // //   const handleAddUrl = async () => {
// // // // //     if (url.trim() !== "") {
// // // // //       try {
// // // // //         // Save URL to Firebase
// // // // //         const docRef = await addDoc(collection(db, "URLs"), {
// // // // //           url_name: url, // Field in the document
// // // // //         });

// // // // //         console.log("Document written with ID: ", docRef.id);

// // // // //         // Update local list
// // // // //         setUrlsList((prevUrls) => [...prevUrls, url]);
// // // // //         setUrl(""); // Clear the input field
// // // // //       } catch (err) {
// // // // //         console.error("Error adding document: ", err);
// // // // //         setError("Failed to save URL. Please try again.");
// // // // //       }
// // // // //     } else {
// // // // //       setError("URL cannot be empty.");
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="urls-container">
// // // // //       <h2>Manage Blocked URLs</h2>
// // // // //       {/* Add URL Input and Button */}
// // // // //       <div className="add-url">
// // // // //         <input
// // // // //           type="text"
// // // // //           value={url}
// // // // //           onChange={(e) => setUrl(e.target.value)}
// // // // //           placeholder="Enter URL"
// // // // //         />
// // // // //         <button onClick={handleAddUrl}>Add</button>
// // // // //       </div>
// // // // //       {error && <p className="error-message">{error}</p>}
// // // // //       {/* URL List */}
// // // // //       <div className="urls-list">
// // // // //         <h3>Blocked URLs:</h3>
// // // // //         <ul>
// // // // //           {urlsList.map((urlItem, index) => (
// // // // //             <li key={index}>{urlItem}</li>
// // // // //           ))}
// // // // //         </ul>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Urls;


// // // // import React, { useState, useEffect } from "react";
// // // // import { collection, addDoc, getDocs } from "firebase/firestore";
// // // // import { db } from "../../../services/firebase.service"; // Adjust path based on your setup
// // // // import "./urls.css";

// // // // const Urls: React.FC = () => {
// // // //   const [url, setUrl] = useState("");
// // // //   const [urlsList, setUrlsList] = useState<string[]>([]);
// // // //   const [error, setError] = useState("");

// // // //   // Fetch URLs from Firebase
// // // //   useEffect(() => {
// // // //     const fetchUrls = async () => {
// // // //       try {
// // // //         const querySnapshot = await getDocs(collection(db, "URLs"));
// // // //         const fetchedUrls: string[] = [];
// // // //         querySnapshot.forEach((doc) => {
// // // //           fetchedUrls.push(doc.data().url_name); // Extract the `url_name` field
// // // //         });
// // // //         setUrlsList(fetchedUrls); // Update the state with fetched URLs
// // // //       } catch (err) {
// // // //         console.error("Error fetching URLs: ", err);
// // // //         setError("Failed to fetch URLs. Please try again.");
// // // //       }
// // // //     };

// // // //     fetchUrls();
// // // //   }, []); // Run only once on component mount

// // // //   const handleAddUrl = async () => {
// // // //     if (url.trim() !== "") {
// // // //       try {
// // // //         // Save URL to Firebase
// // // //         const docRef = await addDoc(collection(db, "URLs"), {
// // // //           url_name: url, // Field in the document
// // // //         });

// // // //         console.log("Document written with ID: ", docRef.id);

// // // //         // Update local list
// // // //         setUrlsList((prevUrls) => [...prevUrls, url]);
// // // //         setUrl(""); // Clear the input field
// // // //       } catch (err) {
// // // //         console.error("Error adding document: ", err);
// // // //         setError("Failed to save URL. Please try again.");
// // // //       }
// // // //     } else {
// // // //       setError("URL cannot be empty.");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="urls-container">
// // // //       <h2>Manage Blocked URLs</h2>
// // // //       {/* Add URL Input and Button */}
// // // //       <div className="add-url">
// // // //         <input
// // // //           type="text"
// // // //           value={url}
// // // //           onChange={(e) => setUrl(e.target.value)}
// // // //           placeholder="Enter URL"
// // // //         />
// // // //         <button onClick={handleAddUrl}>Add</button>
// // // //       </div>
// // // //       {error && <p className="error-message">{error}</p>}
// // // //       {/* URL List */}
// // // //       <div className="urls-list">
// // // //         <h3>Blocked URLs:</h3>
// // // //         <ul>
// // // //           {urlsList.map((urlItem, index) => (
// // // //             <li key={index}>{urlItem}</li>
// // // //           ))}
// // // //         </ul>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Urls;


// // // import React, { useState, useEffect } from "react";
// // // import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
// // // import { db } from "../../../services/firebase.service"; // Adjust path based on your setup
// // // import "./urls.css";

// // // const Urls: React.FC = () => {
// // //   const [url, setUrl] = useState("");
// // //   const [urlsList, setUrlsList] = useState<{ id: string; url_name: string }[]>([]);
// // //   const [error, setError] = useState("");
// // //   const [editingUrl, setEditingUrl] = useState<{ id: string; url_name: string } | null>(null);

// // //   // Fetch URLs from Firebase
// // //   useEffect(() => {
// // //     const fetchUrls = async () => {
// // //       try {
// // //         const querySnapshot = await getDocs(collection(db, "URLs"));
// // //         const fetchedUrls: { id: string; url_name: string }[] = [];
// // //         querySnapshot.forEach((doc) => {
// // //           fetchedUrls.push({ id: doc.id, url_name: doc.data().url_name }); // Extract `id` and `url_name`
// // //         });
// // //         setUrlsList(fetchedUrls); // Update the state with fetched URLs
// // //       } catch (err) {
// // //         console.error("Error fetching URLs: ", err);
// // //         setError("Failed to fetch URLs. Please try again.");
// // //       }
// // //     };

// // //     fetchUrls();
// // //   }, []); // Run only once on component mount

// // //   // Add a URL to Firebase
// // //   const handleAddUrl = async () => {
// // //     if (url.trim() !== "") {
// // //       try {
// // //         // Save URL to Firebase
// // //         const docRef = await addDoc(collection(db, "URLs"), {
// // //           url_name: url, // Field in the document
// // //         });

// // //         console.log("Document written with ID: ", docRef.id);

// // //         // Update local list
// // //         setUrlsList((prevUrls) => [...prevUrls, { id: docRef.id, url_name: url }]);
// // //         setUrl(""); // Clear the input field
// // //       } catch (err) {
// // //         console.error("Error adding document: ", err);
// // //         setError("Failed to save URL. Please try again.");
// // //       }
// // //     } else {
// // //       setError("URL cannot be empty.");
// // //     }
// // //   };

// // //   // Delete a URL from Firebase
// // //   const handleDeleteUrl = async (id: string) => {
// // //     const confirmDelete = window.confirm("Are you sure you want to delete this URL?");
// // //     if (confirmDelete) {
// // //       try {
// // //         await deleteDoc(doc(db, "URLs", id));
// // //         console.log("Document deleted with ID: ", id);
// // //         // Update local list
// // //         setUrlsList((prevUrls) => prevUrls.filter((urlItem) => urlItem.id !== id));
// // //       } catch (err) {
// // //         console.error("Error deleting document: ", err);
// // //         setError("Failed to delete URL. Please try again.");
// // //       }
// // //     }
// // //   };

// // //   // Update a URL in Firebase
// // //   const handleUpdateUrl = async () => {
// // //     if (editingUrl && editingUrl.url_name.trim() !== "") {
// // //       try {
// // //         await updateDoc(doc(db, "URLs", editingUrl.id), {
// // //           url_name: editingUrl.url_name,
// // //         });
// // //         console.log("Document updated with ID: ", editingUrl.id);
// // //         // Update local list
// // //         setUrlsList((prevUrls) =>
// // //           prevUrls.map((urlItem) =>
// // //             urlItem.id === editingUrl.id ? { ...urlItem, url_name: editingUrl.url_name } : urlItem
// // //           )
// // //         );
// // //         setEditingUrl(null); // Clear editing mode
// // //       } catch (err) {
// // //         console.error("Error updating document: ", err);
// // //         setError("Failed to update URL. Please try again.");
// // //       }
// // //     } else {
// // //       setError("URL cannot be empty.");
// // //     }
// // //   };

// // //   return (
// // //     <div className="urls-container">
// // //       <h2>Manage Blocked URLs</h2>

// // //       {/* Add or Update URL */}
// // //       <div className="add-url">
// // //         <input
// // //           type="text"
// // //           value={editingUrl ? editingUrl.url_name : url}
// // //           onChange={(e) =>
// // //             editingUrl
// // //               ? setEditingUrl({ ...editingUrl, url_name: e.target.value })
// // //               : setUrl(e.target.value)
// // //           }
// // //           placeholder="Enter URL"
// // //         />
// // //         {editingUrl ? (
// // //           <button onClick={handleUpdateUrl}>Update</button>
// // //         ) : (
// // //           <button onClick={handleAddUrl}>Add</button>
// // //         )}
// // //       </div>

// // //       {error && <p className="error-message">{error}</p>}

// // //       {/* URL List */}
// // //       <div className="urls-list">
// // //         <h3>Blocked URLs:</h3>
// // //         <ul>
// // //           {urlsList.map((urlItem) => (
// // //             <li key={urlItem.id}>
// // //               {urlItem.url_name}
// // //               <button
// // //                 onClick={() =>
// // //                   setEditingUrl({ id: urlItem.id, url_name: urlItem.url_name })
// // //                 }
// // //               >
// // //                 Edit
// // //               </button>
// // //               <button onClick={() => handleDeleteUrl(urlItem.id)}>Delete</button>
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Urls;


// // import React, { useState, useEffect } from "react";
// // import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
// // import { db } from "../../../services/firebase.service"; // Adjust path based on your setup
// // import { FaTrash, FaEdit } from "react-icons/fa"; // Using React icons for trash and edit
// // import "./urls.css";

// // const Urls: React.FC = () => {
// //   const [url, setUrl] = useState("");
// //   const [urlsList, setUrlsList] = useState<{ id: string, url_name: string }[]>([]);
// //   const [error, setError] = useState("");
// //   const [selectedUrl, setSelectedUrl] = useState<{ id: string, url_name: string } | null>(null);

// //   // Fetch the URLs from Firebase on component mount
// //   useEffect(() => {
// //     const fetchUrls = async () => {
// //       try {
// //         const querySnapshot = await getDocs(collection(db, "URLs"));
// //         const urls: { id: string, url_name: string }[] = [];
// //         querySnapshot.forEach((doc) => {
// //           urls.push({ id: doc.id, url_name: doc.data().url_name });
// //         });
// //         setUrlsList(urls);
// //       } catch (err) {
// //         console.error("Error fetching URLs: ", err);
// //       }
// //     };

// //     fetchUrls();
// //   }, []);

// //   const handleAddUrl = async () => {
// //     if (url.trim() !== "") {
// //       try {
// //         // Save URL to Firebase
// //         const docRef = await addDoc(collection(db, "URLs"), {
// //           url_name: url, // Field in the document
// //         });

// //         console.log("Document written with ID: ", docRef.id);

// //         // Update local list
// //         setUrlsList((prevUrls) => [...prevUrls, { id: docRef.id, url_name: url }]);
// //         setUrl(""); // Clear the input field
// //       } catch (err) {
// //         console.error("Error adding document: ", err);
// //         setError("Failed to save URL. Please try again.");
// //       }
// //     } else {
// //       setError("URL cannot be empty.");
// //     }
// //   };

// //   const handleDeleteUrl = async (id: string) => {
// //     if (window.confirm("Are you sure you want to delete this URL?")) {
// //       try {
// //         await deleteDoc(doc(db, "URLs", id));
// //         setUrlsList(urlsList.filter((url) => url.id !== id)); // Remove from local list
// //       } catch (err) {
// //         console.error("Error deleting document: ", err);
// //         setError("Failed to delete URL. Please try again.");
// //       }
// //     }
// //   };

// //   const handleUpdateUrl = async () => {
// //     if (selectedUrl && selectedUrl.url_name.trim() !== "") {
// //       try {
// //         const urlRef = doc(db, "URLs", selectedUrl.id);
// //         await updateDoc(urlRef, {
// //           url_name: selectedUrl.url_name,
// //         });

// //         setUrlsList(urlsList.map((url) => (url.id === selectedUrl.id ? selectedUrl : url)));
// //         setSelectedUrl(null); // Deselect after update
// //       } catch (err) {
// //         console.error("Error updating document: ", err);
// //         setError("Failed to update URL. Please try again.");
// //       }
// //     }
// //   };

// //   const handleUrlClick = (url: { id: string, url_name: string }) => {
// //     setSelectedUrl(url); // Set the selected URL for editing
// //     setUrl(url.url_name); // Pre-fill the input with the selected URL
// //   };

// //   return (
// //     <div className="urls-container">
// //       <h2>Manage Blocked URLs</h2>
// //       {/* Add URL Input and Button */}
// //       <div className="add-url">
// //         <input
// //           type="text"
// //           value={url}
// //           onChange={(e) => setUrl(e.target.value)}
// //           placeholder="Enter URL"
// //         />
// //         <button onClick={handleAddUrl}>Add</button>
// //       </div>
// //       {error && <p className="error-message">{error}</p>}

// //       {/* URL List */}
// //       <div className="urls-list">
// //         <h3>Blocked URLs:</h3>
// //         <ul>
// //           {urlsList.map((urlItem) => (
// //             <li key={urlItem.id}>
// //               <div className="blocked_buttons">
// //               <button
// //                   className="delete-btn"
// //                   onClick={() => handleDeleteUrl(urlItem.id)}
// //                 >
// //                   <FaTrash />
// //                 </button>
// //                 <button className="edit-btn" onClick={() => handleUrlClick(urlItem)}>
// //                   <FaEdit />
// //                 </button>
// //               </div>
// //               <span onClick={() => handleUrlClick(urlItem)}>{urlItem.url_name}</span>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>

// //       {selectedUrl && (
// //         <div className="update-url">
// //           <button onClick={handleUpdateUrl}>Update URL</button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Urls;


// import React, { useState, useEffect } from "react";
// import { collection, addDoc, updateDoc, doc, deleteDoc, getDocs } from "firebase/firestore";
// import { db } from "../../../services/firebase.service"; // Adjust path based on your setup
// import { FaTrash, FaEdit } from "react-icons/fa"; // Use icons for delete and edit buttons
// import "./urls.css";

// const Urls: React.FC = () => {
//   const [url, setUrl] = useState("");
//   const [urlsList, setUrlsList] = useState<any[]>([]); // Store URLs along with their ID
//   const [error, setError] = useState("");
//   const [editingId, setEditingId] = useState<string | null>(null); // Track which URL is being edited

//   // Fetch URLs from Firestore
//   useEffect(() => {
//     const fetchUrls = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "URLs"));
//         const urlsData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setUrlsList(urlsData);
//       } catch (err) {
//         console.error("Error fetching URLs:", err);
//       }
//     };

//     fetchUrls();
//   }, []);

//   // Handle Add or Update URL
//   const handleSaveUrl = async () => {
//     if (url.trim() !== "") {
//       try {
//         if (editingId) {
//           // Update the existing URL
//           const urlDoc = doc(db, "URLs", editingId);
//           await updateDoc(urlDoc, {
//             url_name: url,
//           });
//           setUrlsList((prevUrls) =>
//             prevUrls.map((item) =>
//               item.id === editingId ? { ...item, url_name: url } : item
//             )
//           );
//           setEditingId(null); // Reset editing state
//         } else {
//           // Add a new URL
//           const docRef = await addDoc(collection(db, "URLs"), {
//             url_name: url,
//           });
//           setUrlsList((prevUrls) => [...prevUrls, { id: docRef.id, url_name: url }]);
//         }

//         setUrl(""); // Clear the input field
//       } catch (err) {
//         console.error("Error saving URL:", err);
//         setError("Failed to save URL. Please try again.");
//       }
//     } else {
//       setError("URL cannot be empty.");
//     }
//   };

//   // Handle Delete URL
//   const handleDeleteUrl = async (id: string) => {
//     if (window.confirm("Are you sure you want to delete this URL?")) {
//       try {
//         await deleteDoc(doc(db, "URLs", id));
//         setUrlsList(urlsList.filter((url) => url.id !== id)); // Remove from local state
//       } catch (err) {
//         console.error("Error deleting URL:", err);
//         setError("Failed to delete URL. Please try again.");
//       }
//     }
//   };

//   // Handle Edit URL (Set URL for editing)
//   const handleEditUrl = (id: string, currentUrl: string) => {
//     setEditingId(id); // Set the URL to be edited
//     setUrl(currentUrl); // Pre-fill the input field with the current URL
//   };

//   return (
//     <div className="urls-container">
//       <h2>Manage Blocked URLs</h2>
//       {/* Add or Update URL Input and Button */}
//       <div className="add-url">
//         <input
//           type="text"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           placeholder="Enter URL"
//         />
//         <button onClick={handleSaveUrl}>
//           {editingId ? "Update URL" : "Add URL"}
//         </button>
//       </div>
//       {error && <p className="error-message">{error}</p>}
      
//       {/* URL List with Edit and Delete */}
//       <div className="urls-list">
//         <h3>Blocked URLs:</h3>
//         <ul>
//           {urlsList.map((urlItem) => (
//             <li key={urlItem.id}>
//               <div className="blocked_buttons">
//               <button
//                 className="delete-btn"
//                 onClick={() => handleDeleteUrl(urlItem.id)}
//               >
//                 <FaTrash />
//               </button>
//               <button
//                 className="edit-btn"
//                 onClick={() => handleEditUrl(urlItem.id, urlItem.url_name)}
//               >
//                 <FaEdit />
//               </button>
//               </div>
              
//               {urlItem.url_name}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Urls;


// import React, { useState, useEffect } from "react";
// import { collection, addDoc, updateDoc, doc, deleteDoc, getDocs } from "firebase/firestore";
// import { db } from "../../../services/firebase.service"; // Adjust path based on your setup
// import { FaTrash, FaEdit } from "react-icons/fa"; // Use icons for delete and edit buttons
// import "./ports.css";

// const Ports: React.FC = () => {
//   const [url, setUrl] = useState("");
//   const [urlsList, setUrlsList] = useState<any[]>([]); // Store URLs along with their ID
//   const [error, setError] = useState("");
//   const [editingId, setEditingId] = useState<string | null>(null); // Track which URL is being edited
//   const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
//   const [urlToDelete, setUrlToDelete] = useState<string | null>(null); // Store the ID of URL to delete

//   // Fetch URLs from Firestore
//   useEffect(() => {
//     const fetchUrls = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "PORTs"));
//         const urlsData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setUrlsList(urlsData);
//       } catch (err) {
//         console.error("Error fetching URLs:", err);
//       }
//     };

//     fetchUrls();
//   }, []);

//   // Handle Add or Update URL
//   const handleSaveUrl = async () => {
//     if (url.trim() !== "") {
//       try {
//         if (editingId) {
//           // Update the existing URL
//           const urlDoc = doc(db, "PORTs", editingId);
//           await updateDoc(urlDoc, {
//             url_name: url,
//           });
//           setUrlsList((prevUrls) =>
//             prevUrls.map((item) =>
//               item.id === editingId ? { ...item, url_name: url } : item
//             )
//           );
//           setEditingId(null); // Reset editing state
//         } else {
//           // Add a new URL
//           const docRef = await addDoc(collection(db, "PORTs"), {
//             url_name: url,
//           });
//           setUrlsList((prevUrls) => [...prevUrls, { id: docRef.id, url_name: url }]);
//         }

//         setUrl(""); // Clear the input field
//       } catch (err) {
//         console.error("Error saving URL:", err);
//         setError("Failed to save URL. Please try again.");
//       }
//     } else {
//       setError("URL cannot be empty.");
//     }
//   };

//   // Handle Delete URL (Show confirmation modal)
//   const handleDeleteUrl = (id: string) => {
//     setUrlToDelete(id); // Store URL to delete
//     setIsModalOpen(true); // Open confirmation modal
//   };

//   // Confirm Delete URL
//   const confirmDeleteUrl = async () => {
//     if (urlToDelete) {
//       try {
//         await deleteDoc(doc(db, "PORTs", urlToDelete));
//         setUrlsList(urlsList.filter((url) => url.id !== urlToDelete)); // Remove from local state
//         setIsModalOpen(false); // Close modal after delete
//         setUrlToDelete(null); // Reset URL to delete
//       } catch (err) {
//         console.error("Error deleting URL:", err);
//         setError("Failed to delete URL. Please try again.");
//       }
//     }
//   };

//   // Cancel Delete URL
//   const cancelDelete = () => {
//     setIsModalOpen(false); // Close the modal without deleting
//     setUrlToDelete(null); // Reset URL to delete
//   };

//   // Handle Edit URL (Set URL for editing)
//   const handleEditUrl = (id: string, currentUrl: string) => {
//     setEditingId(id); // Set the URL to be edited
//     setUrl(currentUrl); // Pre-fill the input field with the current URL
//   };

//   return (
//     <div className="urls-container">
//       <h2>Manage Blocked PORTS</h2>
//       {/* Add or Update URL Input and Button */}
//       <div className="add-url">
//         <input
//           type="text"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           placeholder="Enter Port"
//         />
//         <button onClick={handleSaveUrl}>
//           {editingId ? "Update Port" : "Add Port"}
//         </button>
//       </div>
//       {error && <p className="error-message">{error}</p>}
      
//       {/* URL List with Edit and Delete */}
//       <div className="urls-list">
//         <h3>Blocked PORTS:</h3>
//         <ul>
//           {urlsList.map((urlItem) => (
//             <li key={urlItem.id}>
//               <div className="blocked_buttons">
//               <button
//                 className="delete-btn"
//                 onClick={() => handleDeleteUrl(urlItem.id)}
//               >
//                 <FaTrash />
//               </button>
//               <button
//                 className="edit-btn"
//                 onClick={() => handleEditUrl(urlItem.id, urlItem.url_name)}
//               >
//                 <FaEdit />
//               </button>
//               </div>
              
//               {urlItem.url_name}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Confirmation Modal */}
//       {isModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>Are you sure you want to delete this PORT?</h3>
//             <div className="modal-buttons">
//               <button onClick={confirmDeleteUrl} className="confirm-btn">
//                 Confirm
//               </button>
//               <button onClick={cancelDelete} className="cancel-btn">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Ports;



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
