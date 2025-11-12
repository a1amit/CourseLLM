import React, { useState } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';

const CourseForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        await addDoc(collection(db, 'courses'), {
          title,
          description,
          teacher: user.uid,
        });
        setTitle('');
        setDescription('');
      } catch (error) {
        console.error('Error creating course:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Course Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit">Create Course</button>
    </form>
  );
};

export default CourseForm;
