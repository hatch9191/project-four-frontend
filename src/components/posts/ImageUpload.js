import React from 'react'
import axios from 'axios'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

function ImageUpload({ onChange, name, value }) {
  
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
      <label>Image Upload</label>
      <div className="image-upload">
        {isUploading &&
          <p>Uploading image....</p>
        }
        {value && (
          <div style={{ width: '200px' }}>
            <img
              src={value}
              alt="selected"
              style={{ width: '100%', height: 'auto' }}
            />
            {!isUploading &&
            <p>Image Uploaded!</p>
            }
          </div>
        )}
        {!isUploading && (
          <div className="file-select"
            style={{ marginTop: 10 }}>
            <label>
              <input
                
                type="file"
                name={name}
                onChange={handleUpload}
              />
            </label>
          </div>
        )}
      </div>
    </>
  )
}

export default ImageUpload
