import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase Authentication
import { auth, db } from "../../../services/firebase.service"; // Firebase Auth import
import { doc, setDoc } from "firebase/firestore"; // Firestore methods
import {
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material"; // MUI components
import Visibility from "@mui/icons-material/Visibility"; // Eye Icon
import VisibilityOff from "@mui/icons-material/VisibilityOff"; // Eye Off Icon

const Users: React.FC = () => {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm Password
  const [name, setName] = useState(""); // Name to be saved in Firestore
  const [error, setError] = useState(""); // Error handling
  const [loading, setLoading] = useState(false); // Loading state for the form
  const [showConfirmDialog, setShowConfirmDialog] = useState(false); // Confirm dialog state

  // State for password visibility toggle
  const [passwordVisible, setPasswordVisible] = useState(false); // Toggle for password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // Toggle for confirm password visibility

  // Validate form inputs
  const validateForm = () => {
    if (!email || !password || !confirmPassword || !name) {
      setError("All fields are required.");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    setError(""); // Clear any errors if validation passes
    return true;
  };

  // Handle adding a new user (authentication and Firestore)
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before proceeding
    if (!validateForm()) {
      return;
    }

    // Show confirmation dialog
    setShowConfirmDialog(true);
  };

  // Confirm the user creation process after dialog
  const handleConfirmCreation = async () => {
    setShowConfirmDialog(false); // Close dialog
    setLoading(true); // Start loading state

    try {
      // Create the user with email and password using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get user UID after successful creation
      const uid = userCredential.user.uid;

      // Optionally, save additional user data to Firestore (like name)
      await setDoc(doc(db, "users", uid), {
        name,
        email,
        uid,
      });

      // Clear form after successful user creation
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
      setLoading(false); // Stop loading state
      alert("User created successfully!");
    } catch (err) {
      setError("Error creating user.");
      setLoading(false); // Stop loading state
    }
  };

  // Cancel user creation
  const handleCancelCreation = () => {
    setShowConfirmDialog(false); // Close dialog without creating user
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="form-container">
      <h1>User Management</h1>
      <form onSubmit={handleAddUser}>
        <div className="field">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
        </div>
        <div className="field">
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
        </div>
        <div className="field">
          <TextField
            label="Password"
            variant="outlined"
            type={passwordVisible ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="field">
          <TextField
            label="Confirm Password"
            variant="outlined"
            type={confirmPasswordVisible ? "text" : "password"}
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility}>
                    {confirmPasswordVisible ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="submitBtn" type="submit" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Add User"}
        </button>
      </form>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div
          className="confirm-dialog-overlay"
          style={{
            position: "absolute",
            background: "#f9f9f9",
            zIndex: "1",
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="confirm-dialog">
            <p>Are you sure you want to create this user?</p>
            <button onClick={handleConfirmCreation}>Yes</button>
            <button onClick={handleCancelCreation}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
