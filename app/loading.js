"use client"
import FadeLoader from "react-spinners/FadeLoader";

const loading = () => {

  return (
      <div className="sweet-loading">
        <FadeLoader
          color="#FFF"
          loading={true}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <p className="loader-text">Please wait ...</p>
      </div>
  )
}

export default loading