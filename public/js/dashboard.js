const delButtonHandler = async (event) => {

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    };
  };
};

const delCommentHandler = async (event) => {
  
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
  
    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete comment');
    };
  };
}

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);

document
  .querySelector('.comment-list')
  .addEventListener('click', delCommentHandler);