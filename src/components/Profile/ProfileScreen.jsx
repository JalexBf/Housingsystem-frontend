import React, { useState, useEffect } from "react";
import API from "../../services/api";

const ProfileScreen = () => {
    const [userId, setUserId] = useState(null);
    const [idFront, setIdFront] = useState(null);
    const [idBack, setIdBack] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Fetch user ID from JWT or state
        const token = localStorage.getItem("token");
        if (token) {
            const parsedToken = JSON.parse(atob(token.split(".")[1]));
            setUserId(parsedToken.id); // Assumes the JWT contains the userId
        }
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await API.get("/api/notifications");
            setNotifications(response.data);
        } catch (err) {
            console.error("Failed to fetch notifications", err);
        }
    };

    const fetchIdImages = async () => {
        try {
            const frontResponse = await API.get(`/users/${userId}/idProof/front`, {
                responseType: "blob",
            });
            const backResponse = await API.get(`/users/${userId}/idProof/back`, {
                responseType: "blob",
            });
            setIdFront(URL.createObjectURL(frontResponse.data));
            setIdBack(URL.createObjectURL(backResponse.data));
        } catch (err) {
            console.error("Failed to fetch ID images", err);
        }
    };

    const handleIdUpload = async (e) => {
        const formData = new FormData();
        formData.append("idFront", e.target.files[0]);
        formData.append("idBack", e.target.files[1]);

        try {
            await API.post(`/users/${userId}/idProof`, formData);
            alert("ID images uploaded successfully!");
        } catch (err) {
            console.error("Failed to upload ID images", err);
        }
    };

    const deleteNotification = async (id) => {
        try {
            await API.delete(`/api/notifications/${id}`);
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        } catch (err) {
            console.error("Failed to delete notification", err);
        }
    };

    return (
        <div>
            <h1>Profile Screen</h1>
            <div>
                <h2>ID Proof</h2>
                <button onClick={fetchIdImages}>Load ID Images</button>
                {idFront && <img src={idFront} alt="ID Front" />}
                {idBack && <img src={idBack} alt="ID Back" />}
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleIdUpload}
                />
            </div>
            <div>
                <h2>Notifications</h2>
                {notifications.map((notification) => (
                    <div key={notification.id}>
                        <p>{notification.message}</p>
                        <button onClick={() => deleteNotification(notification.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileScreen;
