// import { Spinner } from 'react-bootstrap'

function Loading() {
  return (
    // <div className="flex-row-center mt-4 pt-4">
    //   <Spinner animation="grow" />
    // </div>
    <div className="d-flex justify-content-center py-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Loading