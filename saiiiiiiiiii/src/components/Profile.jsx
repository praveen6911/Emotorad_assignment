import React, { useEffect, useState } from "react";
import { getProfile, deleteProfile, updateProfile } from "../api"; 
import styles from "../styles/Profile.module.css"; // Import module CSS
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Profile = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    email: "",
    phone: "",
    youtube: "",
    instagram: "",
  });

  const fetchProfiles = async () => {
    try {
      const data = await getProfile();
      console.log("Fetched profiles:", data); 
      console.log("edo")
      if (Array.isArray(data)) {
        setProfiles(data);
      } else {
        setProfiles([]);
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setProfiles([]); 
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (email) => {
    try {
      await deleteProfile(email);
      setProfiles(profiles.filter((profile) => profile.email !== email));
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile._id);
    console.log("Editing profile data:", profile);
    setEditedData({
      name: profile.name || "",
      email: profile.email || "",
      phone: profile.phone || "",
      youtube_link: profile.youtube_link || "",
      insta_link: profile.insta_link || "",
    });
  };

  const handleUpdate = async (id) => {
    try {
      const updatedEmail = editedData.email;
      console.log(editedData);
      const result = await updateProfile(updatedEmail, editedData);

      if (!result.error) {
        setProfiles((prevProfiles) =>
          prevProfiles.map((profile) =>
            profile._id === id ? { ...profile, ...editedData } : profile
          )
        );
        alert("Profile Updated!");
        setEditingProfile(null);
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert("Update failed! Check the console for details.");
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  if (loading) return <p>Loading profiles...</p>;

  return (
    <div className={styles.profileContainer}>
      {!Array.isArray(profiles) || profiles.length === 0 ? (
        <p>No profiles found.</p>
      ) : (
        profiles.map((profile) => (
          <div key={profile._id} className={styles.profileCard}>
            {editingProfile === profile._id ? (
              <div className="space-y-2">
                <input
                  className={styles.inputField}
                  type="text"
                  value={editedData.name}
                  onChange={(e) =>
                    setEditedData({ ...editedData, name: e.target.value })
                  }
                  placeholder="Name"
                />
                <input
                  className={styles.inputField}
                  type="email"
                  value={editedData.email}
                  disabled
                  placeholder="Email"
                />
                <input
                  className={styles.inputField}
                  type="text"
                  value={editedData.phone}
                  onChange={(e) =>
                    setEditedData({ ...editedData, phone: e.target.value })
                  }
                  placeholder="Phone Number"
                />
                <input
                  className={styles.inputField}
                  type="text"
                  value={editedData.youtube_link}
                  onChange={(e) =>
                    setEditedData({ ...editedData, youtube_link: e.target.value })
                  }
                  placeholder="YouTube Link"
                />
                <input
                  className={styles.inputField}
                  type="text"
                  value={editedData.insta_link}
                  onChange={(e) =>
                    setEditedData({ ...editedData, insta_link: e.target.value })
                  }
                  placeholder="Instagram Link"
                />
                <div className={styles.profileActions}>
                  <button
                    className={styles.saveButton}
                    onClick={() => handleUpdate(profile._id)}
                  >
                    Save
                  </button>
                  <button
                    className={styles.cancelButton}
                    onClick={() => setEditingProfile(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className={styles.profileHeader}>{profile.name}</h2>
                <div className={styles.profileDetails}>
                  <p>Email: {profile.email}</p>
                  <p>Phone Number: {profile.phone}</p>
                  {profile.youtube_link && (

                      <a
                        href={profile.youtube_link}
                        className="text-blue-500"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                       <FaYoutube size={30} /> 
                      </a>
                   
                  )}
                  {profile.insta_link && (
                  
                      
                      <a
                        href={profile.insta_link}
                        className="text-pink-500"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram size={30} />
                      </a>
                    
                  )}
                </div>
                <div className={styles.profileActions}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(profile)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(profile.email)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;
