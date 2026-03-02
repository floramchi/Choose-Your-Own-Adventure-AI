function LoadingStatus({theme}) {
    return <div className="loading-container">
        <h2>Generating your {theme} Story</h2>

        <div className="loading-animation">
            <div className="spinner"></div>
        </div>

        <p className="loading-info">
            Please wait for generating your story...
        </p>
    </div>
}

export default LoadingStatus;