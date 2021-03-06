// const postFormHandler = async (event) => {
//     event.preventDefault();
//     // const user_name = document.querySelector('#user_name').value.trim();
//     // const user_name = session.username;
//     const title = document.querySelector('#title').value.trim();
//     const content = document.querySelector('#content').value.trim();
   
  
// // code to post blog to database
// if (user_name && title && content) {
//   const response = await fetch('/api/content', {
//     method: 'POST',
//     body: JSON.stringify({ user_name, title, content }),
//     headers: { 'Content-Type': 'application/json' },
//   });

//   if (response.ok) {
//     document.location.replace('/');
//   } else {
//     alert('Failed to post.');
//   }
// }
  
// }

const postFormHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();
 

// code to get blog from form
if (title && content) {
const response = await fetch('/api/content', {
  method: 'POST',
  body: JSON.stringify({title, content }),
  headers: { 'Content-Type': 'application/json' },
});

if (response.ok) {
  document.location.replace('/');
} else {
  alert('Failed to post.');
}
}

}
  
  document
    .querySelector('.post-form')
    .addEventListener('submit', postFormHandler);
    


   
    
    