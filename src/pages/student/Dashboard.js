import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, onSnapshot, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'courses'), (snapshot) => {
      const coursesData = [];
      snapshot.forEach((doc) => {
        coursesData.push({ ...doc.data(), id: doc.id });
      });
      setCourses(coursesData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const enrollmentsRef = collection(db, 'enrollments');
      const q = query(enrollmentsRef, where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const courseIds = snapshot.docs.map(doc => doc.data().courseId);
        if (courseIds.length > 0) {
          const coursesRef = collection(db, 'courses');
          const coursesQuery = query(coursesRef, where('__name__', 'in', courseIds));
          const coursesSnapshot = await getDocs(coursesQuery);
          const enrolledCoursesData = coursesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          setEnrolledCourses(enrolledCoursesData);
        } else {
          setEnrolledCourses([]);
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  const enrollInCourse = async (courseId) => {
    if (user) {
      try {
        const enrollmentDocRef = doc(db, 'enrollments', `${user.uid}_${courseId}`);
        await setDoc(enrollmentDocRef, {
          userId: user.uid,
          courseId: courseId,
        });
      } catch (error) {
        console.error('Error enrolling in course:', error);
      }
    }
  };


  return (
    <div>
      <h2>Student Dashboard</h2>
      <h3>Enrolled Courses</h3>
      <ul>
        {enrolledCourses.map((course) => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
      <h3>Available Courses</h3>
      <ul>
        {courses
          .filter(course => !enrolledCourses.some(enrolled => enrolled.id === course.id))
          .map((course) => (
          <li key={course.id}>
            {course.title}
            <button onClick={() => enrollInCourse(course.id)}>Enroll</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
