Open sidebar
Django Delete Confirmation Model


User
In django table if we have delete column and when we click on delete button for that row it should give delete confirmation in bootstrap model with row name

ChatGPT
To implement a delete confirmation using Bootstrap modal in Django, you can follow these steps:

Add the necessary Bootstrap and jQuery libraries to your Django project. You can either download the files and include them in your project or use a CDN.

Create a template for your delete confirmation modal. Let's call it delete_confirmation.html. Here's an example:

html
Copy code
<!-- delete_confirmation.html -->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Are you sure you want to delete "{{ row_name }}"?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-danger" id="confirmDelete">Delete</button>
      </div>
    </div>
  </div>
</div>
In your Django template where the table is displayed, include the delete confirmation modal template and add a button for each row that triggers the modal:
html
Copy code
<!-- Your Django template -->
<!-- Include the necessary CSS and JS files -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

<!-- Include the delete_confirmation.html template -->
{% include 'delete_confirmation.html' %}

<table>
  <thead>
    <tr>
      <th>Row Name</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {% for row in rows %}
    <tr>
      <td>{{ row.name }}</td>
      <td>
        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal" data-row-name="{{ row.name }}">Delete</button>
      </td>
    </tr>
    {% endfor %}
  </tbody>
</table>

<script>
  // Capture the row name when the delete button is clicked
  $('#deleteModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var rowName = button.data('row-name');
    var modal = $(this);
    modal.find('.modal-body').text('Are you sure you want to delete "' + rowName + '"?');
    modal.find('#confirmDelete').data('row-name', rowName);
  });

  // Handle the delete button inside the modal
  $('#confirmDelete').click(function () {
    var rowName = $(this).data('row-name');
    // Perform the delete operation using AJAX or redirect to a delete view
    // You can pass the rowName as a parameter to your delete endpoint
    // Example: $.post('/delete-row/', { row_name: rowName })
    // or: window.location.href = '/delete-row/' + rowName;
 



Send a message



Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT May 24 Version
