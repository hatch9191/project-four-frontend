import { Spinner } from 'react-bootstrap'

function Loading() {
  return (
    <div className="flex-row-center">
      <Spinner animation="grow" />
    </div>
  )
}

export default Loading