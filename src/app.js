
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const view = urlParams.get('view');

    const studentView = document.getElementById('student-view');
    const teacherView = document.getElementById('teacher-view');

    if (view === 'student') {
        studentView.classList.remove('hidden');
        teacherView.classList.add('hidden');
    } else if (view === 'teacher') {
        teacherView.classList.remove('hidden');
        studentView.classList.add('hidden');
    }
});
