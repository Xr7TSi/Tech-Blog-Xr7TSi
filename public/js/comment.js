const commentFormHandler = async (event) => {
    event.preventDefault();
   
    const comment = document.querySelector('#comment').value.trim();
    

  // code to get comment from form
  if (comment) {
  const response = await fetch('/api/content/comment', {
    method: 'POST',
    body: JSON.stringify({comment}),
    headers: { 'Content-Type': 'application/json' },
  });
  
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to post comment.');
  }
  }
  
  }
 
    document
      .querySelector('.post-form')
      .addEventListener('submit', commentFormHandler);