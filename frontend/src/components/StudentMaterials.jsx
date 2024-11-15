// src/components/StudentMaterials.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentMaterials = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get('/api/materials');
      setMaterials(response.data);
    } catch (err) {
      console.error('Error fetching materials:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Available Materials</h2>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentMaterials;
