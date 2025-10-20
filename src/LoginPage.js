import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* left */}
      <div className="absolute top-0 left-0 w-[200px] h-[450px] bg-[#5EE6FE] rounded-br-[125px] rounded-bl-[125px] transform -rotate-[41.73deg] -translate-x-[30px] -translate-y-[-250px] -z-10"
          style={{ background: 'linear-gradient(5deg, #5EE6FE, #6aa5afff)' }}></div>

      {/* center */}
      <div className="absolute top-0 left-0 w-[250px] h-[550px] bg-[#404A4C] border-[15px] border-[#5EE6FE] rounded-br-[125px] rounded-bl-[125px] transform -rotate-[41.73deg] -translate-x-1/4 -translate-y-1/3"></div>

      {/* Paw */}
      <img 
        src="/images/white-paws.png" 
        alt="Paws" 
        className="absolute top-0 left-0 w-80 h-80 object-cover -translate-x-[25px] -translate-y-[-5px]"
      />

      {/* right */}
      <div className="absolute top-0 left-[300px] w-[200px] h-[350px] bg-[#5EE6FE] rounded-br-[125px] rounded-bl-[125px] transform -rotate-[41.73deg] translate-x-[0px] -translate-y-[120px] -z-10"
        style={{background: 'linear-gradient(5deg, #5EE6FE, #6aa5afff)'}}></div>
      
      {/* bottom */}
      <div className="absolute bottom-0 left-[25%] w-[200px] h-[500px] bg-[#5EE6FE] rounded-tl-[125px] rounded-tr-[125px] transform -rotate-[41.73deg] -translate-x-[-10px] translate-y-[150px] -z-10"
          style={{ background: 'linear-gradient(5deg, #6aa5afff, #5EE6FE)' }}></div>

      {/* logo */}
      <img
        src="/images/logo.png" 
        alt="Logo"
        className="absolute top-5 right-5 w-24 h-24 object-contain z-50"
      />
      
      
      {/* wrapper */}
      <div className="absolute top-1/2 right-[10%] transform -translate-y-1/2 z-50 
                      flex flex-col items-center bg-transparent">

        {/* cat image */}
        <div className="flex justify-center -mb-1 sm:-mb-2 md:-mb-4 z-40">
          <img
            src="/images/cat_peeking.png"
            alt="Cat"
            className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[140px] object-contain drop-shadow-lg"
          />
        </div>

        {/* login form */}
        <div className="bg-[#F3F3F3] border-[1.5px] border-[#5EE6FE] shadow-2xl rounded-3xl 
                        p-6 sm:p-8 md:p-10 lg:p-12 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[500px] 
                        min-h-[400px] sm:min-h-[420px] md:min-h-[460px] flex flex-col items-center justify-center">

          {/* welcome txt */}
          <div className="w-full flex items-center mb-2">
            <div className="flex-1 h-[3px] bg-[#5EE6FE]" />
              <h1 className="mx-6 text-[22px] sm:text-[20px] md:text-[25px] font-bold text-gray-800"
                style={{ fontFamily: "'Baloo Chettan 2'" }}>
                Welcome
              </h1>
            <div className="flex-1 h-[3px] bg-[#5EE6FE]" />
          </div> 

          <div className="text-gray-600 text-center mb-6 text-sm sm:text-base">
            Login to your account to continue
          </div>       

          <form className="flex flex-col gap-3 sm:gap-4 w-full">

            {/* email */}
            <div className="flex items-center bg-[#EAEAEA] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#5EE6FE]">
              <div className="flex items-center px-3 text-gray-500">
                <i className="fa-solid fa-user text-[#626262]"></i>
                <div className="w-[1px] h-6 bg-gray-300 mx-2"></div>
              </div>
              <input type="email" placeholder="abcd@xyz.com" className="flex-1 py-2 sm:py-3 pr-3 outline-none bg-[#EAEAEA] text-gray-700 text-sm sm:text-base"/>
            </div>

            {/* password */}
            <div className="flex items-center bg-[#EAEAEA] border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#5EE6FE] font-sansation">
              <div className="flex items-center px-3 text-gray-500">
                <i className="fa-solid fa-lock text-[#626262]"></i>
                <div className="w-[1px] h-6 bg-gray-300 mx-2"></div>
              </div>

              <input type="password" placeholder="Password" className="flex-1 py-2 sm:py-3 pr-3 outline-none bg-[#EAEAEA] text-[#404A4C] text-sm sm:text-base"/>

              <button
                type="button"
                className="px-3 text-[#626262] hover:text-[#5EE6FE] focus:outline-none"
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling;
                  input.type = input.type === "password" ? "text" : "password";
                  e.currentTarget.firstChild.classList.toggle("fa-eye");
                  e.currentTarget.firstChild.classList.toggle("fa-eye-slash");
                }}
              >
                <i className="fa-solid fa-eye-slash"></i>
              </button>
            </div>

            {/* forgot password */}
            <div className="text-right">
              <a href="" className="text-xs sm:text-sm text-[#4E4E4E] hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="bg-[#5EE6FE] text-white font-semibold py-2 sm:py-3 rounded-xl mt-1 hover:bg-[#388A98] transition-colors"
            >
              Login
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
              <span className="text-[#404A4C] text-sm sm:text-base">Continue with Google account</span>
            </div>
          </form>

          <p className="text-xs sm:text-sm text-gray-500 mt-4">
            Don't have an account? <Link to="/signup" className="text-[#5EE6FE] font-semibold">Sign up</Link>
          </p>

          <a href="" className="text-xs sm:text-sm text-gray-500 mt-4 hover:underline">
            Continue as a guest.
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
