// src/components/TeacherDashboard.jsx
import React, { useState, useEffect } from 'react';
import API from '../api';

const TeacherDashboard = () => {
  const [materials, setMaterials] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingMaterial, setEditingMaterial] = useState(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await API.get('/materials');
      setMaterials(response.data);
    } catch (err) {
      console.error('Error fetching materials:', err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_cloudinary_preset');

    try {
      const cloudinaryResponse = await API.post(
        'https://api.cloudinary.com/v1_1/your_cloud_name/upload',
        formData
      );

      await API.post('/materials', {
        title,
        description,
        file_url: cloudinaryResponse.data.secure_url,
      });

      alert('Material uploaded successfully!');
      setTitle('');
      setDescription('');
      setFile(null);
      fetchMaterials();
    } catch (err) {
      console.error('Error uploading material:', err);
      alert('Failed to upload material');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/materials/${id}`);
      fetchMaterials();
    } catch (err) {
      console.error('Error deleting material:', err);
      alert('Failed to delete material');
    }
  };

  const handleEdit = (material) => {
    setEditingMaterial(material);
    setTitle(material.title);
    setDescription(material.description);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/materials/${editingMaterial.id}`, {
        title,
        description,
      });

      setEditingMaterial(null);
      setTitle('');
      setDescription('');
      fetchMaterials();
    } catch (err) {
      console.error('Error updating material:', err);
      alert('Failed to update material');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Teacher Dashboard</h2>

      <form onSubmit={editingMaterial ? handleUpdate : handleUpload} className="mb-8">
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        {!editingMaterial && (
          <div className="mb-4">
            <label className="block mb-2">File</label>
            <input
              type="file"
              className="w-full"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          {editingMaterial ? 'Update Material' : 'Upload Material'}
        </button>
      </form>

      <h3 className="text-xl font-bold mb-4">Uploaded Materials</h3>
      <ul>
        {materials.map((material) => (
          <li key={material.id} className="mb-4">
            <h4 className="font-bold">{material.title}</h4>
            <p>{material.description}</p>
            <a
              href={material.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              View File
            </a>
            <div>
              <button
                className="text-yellow-600 mr-4"
                onClick={() => handleEdit(material)}
              >
                Edit
              </button>
              <button
                className="text-red-600"
                onClick={() => handleDelete(material.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherDashboard;
