import React from 'react'

const EmbedMap = () => {
    const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ_XOaT-hFnEARUjkI4oOvVq0&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
  return (
    <div>
        <iframe           width="600" 
          height="450" 
          style={{border:0}} 
          allowFullScreen={true} 
          loading="lazy"
        src={googleMapsEmbedUrl}/>
    </div>
  )
}

export default EmbedMap