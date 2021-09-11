import React from 'react'
import axios from 'axios'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET


function ProfileImageUpload({ onChange, labelText, name, value }) {
  const [isUploading, setIsUploading] = React.useState(false)

  const handleUpload = async e => {
    setIsUploading(true)
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    onChange(res.data.url, name)
    setIsUploading(false)
  }

  return (
    <>
      <label>{labelText}</label>
      {isUploading &&
        <p>Uploading image...</p>
      }
      {value && (
        <div style={{ width: '200px', margin: '10px 0' }}>
          <img
            src={value}
            alt="selected"
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          />
        </div>
      )}
      {!isUploading && (
        <>
          <div style={{ marginTop: 10 }}>
            <input
              type="file"
              id="files"
              className="hidden"
              name={name}
              onChange={handleUpload}
            />
            <label className="upload-btn" htmlFor="files">Change Profile Photo</label>
          </div>
        </>
      )}
    </>
  )

}

export default ProfileImageUpload