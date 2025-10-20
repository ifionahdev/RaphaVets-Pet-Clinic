import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasLength = password.length >= 8;
  const hasSpecial = /[*\-@\$]/.test(password);
  const matches = password !== "" && password === confirm;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ firstName, lastName, email, password });
  };

  const itemClass = (ok) =>
    `flex items-start gap-2 text-xs ${ok ? "text-green-600" : "text-gray-400"}`;

  return (
    <div className="relative h-screen overflow-hidden">
      {/* left */}
      <div
        className="absolute top-0 left-0 w-[200px] h-[450px] bg-[#5EE6FE] rounded-br-[125px] rounded-bl-[125px] transform -rotate-[41.73deg] -translate-x-[30px] -translate-y-[-250px] z-0"
        style={{ background: "linear-gradient(5deg, #5EE6FE, #6aa5afff)" }}
      ></div>

      {/* center */}
      <div className="absolute top-0 left-0 w-[250px] h-[550px] bg-[#404A4C] border-[15px] border-[#5EE6FE] rounded-br-[125px] rounded-bl-[125px] transform -rotate-[41.73deg] -translate-x-1/4 -translate-y-1/3 z-0"></div>

      {/* Paw */}
      <img
        src="/images/white-paws.png"
        alt="Paws"
        className="absolute top-0 left-0 w-80 h-80 object-cover -translate-x-[25px] -translate-y-[-5px] z-0"
      />

      {/* right */}
      <div
        className="absolute top-0 left-[300px] w-[200px] h-[350px] bg-[#5EE6FE] rounded-br-[125px] rounded-bl-[125px] transform -rotate-[41.73deg] translate-x-[0px] -translate-y-[120px] z-0"
        style={{ background: "linear-gradient(5deg, #5EE6FE, #6aa5afff)" }}
      ></div>

      {/* bottom - put above the form so it overlaps slightly */}
      <div
        className="absolute bottom-0 left-[18%] w-[260px] h-[480px] bg-[#5EE6FE] rounded-tl-[125px] rounded-tr-[125px] transform -rotate-[41.73deg] -translate-x-[-10px] translate-y-[150px] z-30 pointer-events-none"
        style={{ background: "linear-gradient(5deg, #6aa5afff, #5EE6FE)" }}
      ></div>

      {/* logo */}
      <img src="/images/logo.png" alt="Logo" className="absolute top-5 right-5 w-24 h-24 object-contain z-40" />

      {/* wrapper
          - On large screens stay absolutely centered at right.
          - On small screens placed in normal flow below decorations.
      */}
      <div
        className="relative z-20 w-full flex flex-col items-center
                  mt-40 md:mt-0
                  md:absolute md:top-1/2 md:left-48 md:-translate-y-1/2"
      >
        {/* cat image - higher z so it peeks above form */}
        <div className="flex justify-center -mb-4 sm:-mb-5 md:-mb-7 z-40 pointer-events-none">
          <img
            src="/images/cat_peeking.png"
            alt="Cat"
            className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[140px] object-contain drop-shadow-lg z-40"
            style={{ position: "relative", top: "-12px" }}
          />
        </div>

        {/* signup form
            - Large: fixed to 783x739 (responsive below).
            - Provide extra safe padding so decorative overlay doesn't hide content.
        */}
        <div
          className="bg-[#F3F3F3] border-[1.5px] border-[#5EE6FE] shadow-2xl rounded-3xl 
                    w-[90%] sm:w-[85%] md:w-[70%] lg:w-[600px]
                    max-h-[90vh] overflow-y-auto
                    flex flex-col items-center justify-start relative z-10
                    p-4 sm:p-6 md:p-8 lg:p-10"
          style={{
            boxSizing: "border-box",
            scrollBehavior: "smooth",
          }}
        >

          {/* welcome txt */}
          <div className="w-full flex items-center mb-2">
            <div className="flex-1 h-[3px] bg-[#5EE6FE]" />
            <h1
              className="mx-6 text-[22px] sm:text-[20px] md:text-[25px] font-bold text-gray-800"
              style={{ fontFamily: "'Baloo Chettan 2'" }}
            >
              Create an account
            </h1>
            <div className="flex-1 h-[3px] bg-[#5EE6FE]" />
          </div>

          <div className="text-gray-600 text-center mb-6 text-sm sm:text-base">Sign up with google account</div>

          <form className="flex flex-col gap-3 sm:gap-4 w-full px-2 sm:px-6" onSubmit={handleSubmit}>
            {/* First name */}
            <div>
              <div className="flex items-center bg-[#EAEAEA] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#5EE6FE]">
                <div className="flex items-center px-3 text-gray-500">
                  <i className="fa-solid fa-user text-[#626262]"></i>
                  <div className="w-[1px] h-6 bg-gray-300 mx-2"></div>
                </div>
                <input
                  aria-label="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="First name"
                  className="flex-1 py-2 sm:py-3 pr-3 outline-none bg-[#EAEAEA] text-gray-700 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Last name */}
            <div>
              <div className="flex items-center bg-[#EAEAEA] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#5EE6FE]">
                <div className="flex items-center px-3 text-gray-500">
                  <i className="fa-solid fa-user text-[#626262]"></i>
                  <div className="w-[1px] h-6 bg-gray-300 mx-2"></div>
                </div>
                <input
                  aria-label="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Last name"
                  className="flex-1 py-2 sm:py-3 pr-3 outline-none bg-[#EAEAEA] text-gray-700 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* email */}
            <div>
              <div className="flex items-center bg-[#EAEAEA] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#5EE6FE]">
                <div className="flex items-center px-3 text-gray-500">
                  <i className="fa-solid fa-envelope text-[#626262]"></i>
                  <div className="w-[1px] h-6 bg-gray-300 mx-2"></div>
                </div>
                <input
                  aria-label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="abcd@gmail.com"
                  className="flex-1 py-2 sm:py-3 pr-3 outline-none bg-[#EAEAEA] text-gray-700 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* password */}
            <div>
              <div className="flex items-center bg-[#EAEAEA] border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#5EE6FE]">
                <div className="flex items-center px-3 text-gray-500">
                  <i className="fa-solid fa-lock text-[#626262]"></i>
                  <div className="w-[1px] h-6 bg-gray-300 mx-2"></div>
                </div>
                <input
                  aria-label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPwd ? "text" : "password"}
                  placeholder="Password"
                  className="flex-1 py-2 sm:py-3 pr-3 outline-none bg-[#EAEAEA] text-[#404A4C] text-sm sm:text-base"
                />
                <button
                  type="button"
                  className="px-3 text-[#626262] hover:text-[#5EE6FE] focus:outline-none"
                  onClick={() => setShowPwd((s) => !s)}
                >
                  <i className={`fa-solid ${showPwd ? "fa-eye" : "fa-eye-slash"}`}></i>
                </button>
              </div>

              {/* password requirements */}
              <div className="mt-3">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-gray-400">
                  <div className={itemClass(hasUpper)}>
                    <i className={`fa-solid ${hasUpper ? "fa-check" : "fa-circle"} mt-1 text-[10px]`}></i>
                    <span>Password must have an uppercase letter</span>
                  </div>
                  <div className={itemClass(hasLength)}>
                    <i className={`fa-solid ${hasLength ? "fa-check" : "fa-circle"} mt-1 text-[10px]`}></i>
                    <span>Password must be at least 8 characters long</span>
                  </div>

                  <div className={itemClass(hasLower)}>
                    <i className={`fa-solid ${hasLower ? "fa-check" : "fa-circle"} mt-1 text-[10px]`}></i>
                    <span>Password must have a lowercase letter</span>
                  </div>
                  <div className={itemClass(hasSpecial)}>
                    <i className={`fa-solid ${hasSpecial ? "fa-check" : "fa-circle"} mt-1 text-[10px]`}></i>
                    <span>Password must have at least one special character (*, -, @, $)</span>
                  </div>

                  <div className={itemClass(matches)}>
                    <i className={`fa-solid ${matches ? "fa-check" : "fa-circle"} mt-1 text-[10px]`}></i>
                    <span>Password must match the retype password</span>
                  </div>
                </div>
              </div>
            </div>

            {/* retype password */}
            <div>
              <div className="flex items-center bg-[#EAEAEA] border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#5EE6FE]">
                <div className="flex items-center px-3 text-gray-500">
                  <i className="fa-solid fa-lock text-[#626262]"></i>
                  <div className="w-[1px] h-6 bg-gray-300 mx-2"></div>
                </div>
                <input
                  aria-label="Retype password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm password"
                  className="flex-1 py-2 sm:py-3 pr-3 outline-none bg-[#EAEAEA] text-[#404A4C] text-sm sm:text-base"
                />
                <button
                  type="button"
                  className="px-3 text-[#626262] hover:text-[#5EE6FE] focus:outline-none"
                  onClick={() => setShowConfirm((s) => !s)}
                >
                  <i className={`fa-solid ${showConfirm ? "fa-eye" : "fa-eye-slash"}`}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#5EE6FE] text-white font-semibold py-2 sm:py-3 rounded-xl mt-1 hover:bg-[#388A98] transition-colors"
            >
              Sign up
            </button>

            {/* divider */}
            <div className="flex items-center my-1">
              <div className="flex-grow h-[1px] bg-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">or</span>
              <div className="flex-grow h-[1px] bg-gray-300"></div>
            </div>

            {/* google */}
            <div className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2 sm:py-3 cursor-pointer hover:bg-gray-100 transition-colors font-sansation">
              <i className="fa-brands fa-google text-[#DB4437]"></i>
              <span className="text-[#404A4C] text-sm sm:text-base">Sign up with Google account</span>
            </div>
          </form>

          <p className="text-xs sm:text-sm text-gray-500 mt-4">
            Already have an account? <Link to="/" className="text-[#5EE6FE] font-semibold">Login</Link>
          </p>

          <a href="#" className="text-xs sm:text-sm text-gray-500 mt-4 hover:underline">
            Continue as a guest.
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;