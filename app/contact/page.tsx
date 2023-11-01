import ContactUsForm from '@/components/ContactUsFom'
import EmbedMap from '@/components/EmbedMap'
import React from 'react'

const ContactPage = () => {
  return (
    <div className='flex min-h-screen'>
      <ContactUsForm/>
      <EmbedMap/>
    </div>
  )
}

export default ContactPage