function Register() {
  return (
    <form>
      <div>
        <label>username</label>
        <input type="text" />
      </div>
      <div>
        <label>password</label>
        <input type="password" />
      </div>
      <div>
        <label>repeat password</label>
        <input type="password" />
      </div>
      <button>submit</button>
    </form>
  );
}

export default Register;
