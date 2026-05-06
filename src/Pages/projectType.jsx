import React, { useEffect, useState } from "react";
import Student from "../Services/Student.model";

function ProjectTypes() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const data = await Student.getProjectTypes();
        setTypes(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Project Types</h2>

      <ul>
        {types.map((type) => (
          <li key={type.id}>
            <strong>{type.name}</strong> - {type.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectTypes;