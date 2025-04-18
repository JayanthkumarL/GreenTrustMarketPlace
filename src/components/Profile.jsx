import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ bio: '', profilePic: null });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setFormData({ bio: res.data.bio || '', profilePic: null });
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'profilePic') {
      setFormData({ ...formData, profilePic: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const data = new FormData();
    data.append('bio', formData.bio);
    if (formData.profilePic) data.append('profilePic', formData.profilePic);
    await axios.put('http://localhost:5000/api/users/me', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Profile updated!');
    window.location.reload();
  };

  if (!user) return <p className="loading">Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>{user.username}'s Profile</h2>
        {user.profilePicUrl && <img src={user.profilePicUrl} alt="Profile" />}
        <p className="bio">Bio: {user.bio || 'No bio yet'}</p>
        <p className="listings">Listings: {user.Products?.length || 0}</p>
        <form onSubmit={handleSubmit}>
          <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Update your bio" />
          <input type="file" name="profilePic" accept="image/*" onChange={handleChange} />
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
