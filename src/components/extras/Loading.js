import { Spinner } from 'react-bootstrap'

function Loading() {
  return (
    <div className="flex-row-center mt-4 pt-4">
      <Spinner animation="grow" />
    </div>
  )
}

export default Loading