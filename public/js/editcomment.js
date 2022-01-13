const editCommentHandler = async (event) => {
    event.preventDefault();

    const text = document.querySelector('#edit-comment').value.trim();
    const id = document.querySelector('#commentId').innerHTML;
   
    if (text && id) {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update comment');
      }
    }
};

document
  .querySelector('.edit-comment-form')
  .addEventListener('submit', editCommentHandler);