const axios = require('axios');
axios.get('https://news.vt.edu/articles/2023/09/provost-federal-work-study-educational-opportunity.html')
.then((response) => {
  // Handle the response
  const textData = response.data; // This contains the text data from the URL
  console.log('Text Data:', textData);
})
.catch((error) => {
  // Handle any errors
  console.error('Error:', error);
});
