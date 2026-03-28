import ImageCapture from './components/ImageCapture'

function App() {
  const handleSubmit = (image: Blob, manualContext: string) => {
    // Step 1.2 will wire this to POST /api/jobs
    console.log('Image ready to submit:', image.size, 'bytes')
    console.log('Manual context:', manualContext)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <ImageCapture onSubmit={handleSubmit} />
    </div>
  )
}

export default App
