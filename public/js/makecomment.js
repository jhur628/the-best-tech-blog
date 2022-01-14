const newCommentHandler = async (event) => {
    event.preventDefault();

    const post_id = document.querySelector('#postId').innerHTML;
    const text = document.querySelector('#new-comment').value.trim();

    if (post_id && text) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ post_id, text }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create comment. Are you logged in?');
        };
    };
};

document
    .querySelector('.make-comment-form')
    .addEventListener('submit', newCommentHandler);