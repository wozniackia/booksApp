function SignedInOnly() {
  return (
    <div
      id="signedonly"
      className="position-absolute top-50 start-50 translate-middle bg-light"
    >
      <div className="position-absolute top-50 start-50 translate-middle">
        <a className="" style={{color: "#000"}} href="./signin">
          Content available only for logged in users. Sign in
        </a>
      </div>
    </div>
  );
}

export default SignedInOnly;
