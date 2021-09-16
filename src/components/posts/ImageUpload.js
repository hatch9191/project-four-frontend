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
      {/* <label>Image Upload</label> */}
      <div className="image-upload">
        {isUploading &&
          <p>Uploading image....</p>
        }
        {value && (
          <div>
            <img
              src={value}
              alt="selected"
              style={{ width: '190px', height: 'auto', borderRadius: '25px' }}
            />
            {/* {!isUploading &&
            <p>Image Uploaded!</p>
            } */}
          </div>
        )}
        {!isUploading && (
          <div style={{ marginTop: '10px', width: '100%', display: 'flex' }}>
            <input
              type="file"
              id="files"
              className="hidden"
              name={name}
              onChange={handleUpload}
            />
            <label className="upload-btn" htmlFor="files">Upload Image</label>
          </div>
        )}
      </div>
    </>
  )
}

export default ImageUpload
