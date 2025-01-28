
const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
  <div className="bg-orange-500 text-white shadow-lg rounded-lg p-10 max-w-lg text-center">
    <h1 className="text-4xl font-bold mb-4">Welcome to</h1>
    <h2 className="text-5xl font-extrabold mb-6">Order Management App</h2>
    <p className="text-lg">
      Streamline your orders efficiently and effectively.
    </p>
    <button onClick={() => window.location.href = '/customers'} 
    className="mt-6 px-6 py-3 bg-white text-orange-500 font-semibold rounded-lg shadow-md hover:bg-orange-600 hover:text-white transition duration-300">
      Get Started
    </button>
  </div>
</div>

  )
}

export default HomePage