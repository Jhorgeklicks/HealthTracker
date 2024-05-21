import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({text}) => {
  const loading = true;
    return (
      <div className="sweet-loading">
        <ClipLoader
          color="#FFF"
          loading={loading}
          // cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <p className="loader-text">{text}</p>
      </div>
  )
}

export default Loader