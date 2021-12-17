import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const corsHeaders = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Origin': '*'
}

const getImages = async request => {
  //The Client_ID constant is presently in the wrangler secret list
  const { query } = await request.json()
  const resp = await fetch(`https://api.unsplash.com/search/photos/?query=${query}`, {
    headers:{
      Authorization: `Client-ID ${Client_ID}`
    }
  })
  const data = await resp.json()
  const images = data.results.map(image => ({
    id: image.id,
    image: image.urls.small,
    linnk: image.links.html
  }))
  return new Response(JSON.stringify(images),{
    headers: {
      'Content-type': 'application/json',
      ...corsHeaders
    }
  })
}

async function handleRequest(request) {
  if(request.method === "OPTIONS") {
    return new Response("OK", {headers: corsHeaders})
  }

  if(request.method === "POST"){
    return getImages(request)
  }
}

reportWebVitals();
