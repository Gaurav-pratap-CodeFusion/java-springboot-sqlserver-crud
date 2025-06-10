document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const studentIdParam = urlParams.get('id');

    const studentIdInput = document.getElementById('studentId');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const courseInput = document.getElementById('course');
    const emailInput = document.getElementById('email');
    const messageDisplay = document.getElementById('message');

    const addNewBtn = document.getElementById('addNewBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const saveBtn = document.getElementById('saveBtn');
    const submitBtn = document.getElementById('submitBtn');

    if (studentIdParam) {
        loadStudent(studentIdParam);
        submitBtn.style.display = 'block';
        saveBtn.style.display = 'none';
    } else {
        submitBtn.style.display = 'none';
        saveBtn.style.display = 'block';
    }

    addNewBtn.addEventListener('click', async () => {
        try {
            const response = await fetch("http://localhost:8080/api/students/generate-id");
            if (response.ok) {
                const newId = await response.text();
                studentIdInput.value = newId;
                clearFormExceptId();
                submitBtn.style.display = 'none';
                saveBtn.style.display = 'block';
                messageDisplay.textContent = '';
            } else {
                messageDisplay.textContent = 'Failed to generate ID';
            }
        } catch (error) {
            messageDisplay.textContent = 'Error generating ID';
        }
    });

    saveBtn.addEventListener('click', async () => {
        const newStudent = {
            studentid: studentIdInput.value.trim(),
            firstName: firstNameInput.value.trim(),
            lastName: lastNameInput.value.trim(),
            course: courseInput.value.trim(),
            email: emailInput.value.trim()
        };

        try {
            const response = await fetch("http://localhost:8080/api/students", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newStudent)
            });

            if (response.ok) {
                messageDisplay.textContent = 'Student added successfully!';
                messageDisplay.style.color = '#28a745';
            } else {
                messageDisplay.textContent = 'Failed to add student.';
                messageDisplay.style.color = '#dc3545';
            }
        } catch (error) {
            messageDisplay.textContent = 'Server error.';
            messageDisplay.style.color = '#dc3545';
        }
    });

    submitBtn.addEventListener('click', async () => {
        const updatedStudent = {
            studentid: studentIdInput.value.trim(),
            firstName: firstNameInput.value.trim(),
            lastName: lastNameInput.value.trim(),
            course: courseInput.value.trim(),
            email: emailInput.value.trim()
        };

        try {
            const response = await fetch(`http://localhost:8080/api/students/${updatedStudent.studentid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedStudent)
            });

            if (response.ok) {
                messageDisplay.textContent = 'Student updated successfully!';
                messageDisplay.style.color = '#28a745';
            } else {
                messageDisplay.textContent = 'Failed to update student.';
                messageDisplay.style.color = '#dc3545';
            }
        } catch (error) {
            messageDisplay.textContent = 'Server error.';
            messageDisplay.style.color = '#dc3545';
        }
    });

    deleteBtn.addEventListener('click', async () => {
        const id = studentIdInput.value.trim();
        if (!id) return;

        if (confirm(`Are you sure you want to delete student ID ${id}?`)) {
            try {
                const response = await fetch(`http://localhost:8080/api/students/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    messageDisplay.textContent = 'Student deleted successfully!';
                    messageDisplay.style.color = '#28a745';
                    clearForm();
                } else {
                    messageDisplay.textContent = 'Failed to delete student.';
                    messageDisplay.style.color = '#dc3545';
                }
            } catch (error) {
                messageDisplay.textContent = 'Error deleting student.';
                messageDisplay.style.color = '#dc3545';
            }
        }
    });

    async function loadStudent(id) {
        try {
            const response = await fetch(`http://localhost:8080/api/students/${id}`);
            if (response.ok) {
                const data = await response.json();
                studentIdInput.value = data.studentid;
                firstNameInput.value = data.firstName;
                lastNameInput.value = data.lastName;
                courseInput.value = data.course;
                emailInput.value = data.email;
            } else {
                messageDisplay.textContent = 'Student not found.';
            }
        } catch (error) {
            messageDisplay.textContent = 'Error loading student.';
        }
    }

    function clearForm() {
        studentIdInput.value = '';
        clearFormExceptId();
    }

    function clearFormExceptId() {
        firstNameInput.value = '';
        lastNameInput.value = '';
        courseInput.value = '';
        emailInput.value = '';
    }
});
