// Your JavaScript code
document.addEventListener('DOMContentLoaded', function () {
  // Attach event listener to delete buttons
  const deleteButtons = document.querySelectorAll('.delete-row');
  deleteButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();  // Prevent default form submission
      
      const rowId = button.dataset.rowId;
      confirmDelete(event, rowId);
    });
  });

  // Function to confirm delete action
  function confirmDelete(event, rowId) {
    event.stopPropagation();

    const confirmation = confirm('Are you sure you want to delete this row?');
    if (confirmation) {
      deleteRow(rowId);
    }
  }

  // Function to send AJAX request and delete row
  function deleteRow(rowId) {
    // Send AJAX request to Django server
    const url = '/delete-row/';  // Replace with your Django URL
    const csrftoken = getCookie('csrftoken');  // Get CSRF token

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({ rowId: rowId }),
    })
      .then(function (response) {
        if (response.ok) {
          // Row deleted successfully, remove it from the table
          const deletedRow = document.querySelector(`button[data-row-id="${rowId}"]`).parentNode.parentNode;
          deletedRow.remove();
        } else {
          // Handle error case
          console.error('Error deleting row');
        }
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  }

  // Function to get CSRF token from cookies
  function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }
});
