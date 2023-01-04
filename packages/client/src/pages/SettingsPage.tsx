import React from 'react'
import UploadImage from '../components/UploadImage'

export default function SettingsPage() {
  return (
    <div className='flex flex-col items-center w-screen h-screen bg-gray-200'>
        <section>
            <span>Genereal settings</span>
            <UploadImage/>
        </section>
    </div>
  )
}
