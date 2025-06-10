document.addEventListener('DOMContentLoaded', () => {
        const idInput = document.getElementById('idInput');
        const enterButton = document.getElementById('enterButton');
        const messageDisplay = document.getElementById('message');

        enterButton.addEventListener('click', async () => {
            const enteredId = idInput.value.trim();

            if (enteredId) {
                try {
                    const response = await fetch(`http://localhost:8080/api/students/${enteredId}`);
                    if (response.ok) {
                        // Redirect to UI2.html with query param
                        window.location.href = `/S_UI2/UI2.html?id=${enteredId}`;
                    } else {
                        messageDisplay.textContent = 'Student ID not found.';
                        messageDisplay.style.color = '#dc3545';
                    }
                } catch (error) {
                    console.error(error);
                    messageDisplay.textContent = 'Server error. Please try again.';
                    messageDisplay.style.color = '#dc3545';
                }
            } else {
                messageDisplay.textContent = 'Please enter an ID.';
                messageDisplay.style.color = '#dc3545';
            }
        });

        idInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                enterButton.click();
            }
        });
    });