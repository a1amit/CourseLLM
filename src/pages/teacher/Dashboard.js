import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';
import CourseForm from '../../components/teacher/CourseForm';

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'courses'), where('teacher', '==', user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const coursesData = [];
        snapshot.forEach((doc) => {
          coursesData.push({ ...doc.data(), id: doc.id });
        });
        setCourses(coursesData);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const viewStudents = async (courseId) => {
    setSelectedCourse(courseId);
    const enrollmentsRef = collection(db, 'enrollments');
    const q = query(enrollmentsRef, where('courseId', '==', courseId));
    const querySnapshot = await getDocs(q);
    const studentIds = querySnapshot.docs.map(doc => doc.data().userId);

    if (studentIds.length > 0) {
      const usersRef = collection(db, 'users');
      const usersQuery = query(usersRef, where('__name__', 'in', studentIds));
      const usersSnapshot = await getDocs(usersQuery);
      const students = usersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setEnrolledStudents(students);
    } else {
      setEnrolledStudents([]);
    }
  };

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <CourseForm />
      <h3>Your Courses</h3>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.title}
            <button onClick={() => viewStudents(course.id)}>View Students</button>
          </li>
        ))}
      </ul>

      {selectedCourse && (
        <div>
          <h3>Enrolled Students for {courses.find(c => c.id === selectedCourse)?.title}</h3>
          <ul>
            {enrolledStudents.map((student) => (
              <li key={student.id}>{student.email}</li>
            ))}
          </ul>
          <button onClick={() => setSelectedCourse(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
