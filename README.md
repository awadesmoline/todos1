# todos

# Routes
  * POST /api/sign_up'
  * POST /api/sign_in'
  * POST /api/todos'
  * GET  /api/todos'
  * GET /api/todos/:todoId/todoItems'
  * GET /api/todos/:todoId'
  * PUT /api/todos/:todoId'
  * GET /api/todos/status/:status'
  * DELETE /api/todos/:todoId'
  * PUT /api/todos/:todoId/todoItems/:todoItemId'
  * DELETE /api/todos/:todoId/todoItems/:todoItemId'

# Tasks Performed during assessment.
 1. Added status to todos. Status is one of [In progress, done, not started]
 2. Updated the create and update todo actions to create and update with status.
 3. Updated todos update action to only update title if todo is done
 5. Added middleware to validate status of todos.
 3. Restricted the delete functionality to only delete tasks that are done.
 4. Added route to get todo items by status.
