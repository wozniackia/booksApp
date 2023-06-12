function Error() {
  return (
    <div class="container position-absolute top-50 start-50 translate-middle">
      <h1>Oops!</h1>
      <h2>404 Not Found</h2>
      <div class="error-details">
        Sorry, an error has occured, requested page not found!
      </div>
      <div class="error-actions">
        <a href=".." class="btn btn-primary btn-lg">
          Home
        </a>
      </div>
    </div>
  );
}

export default Error;
