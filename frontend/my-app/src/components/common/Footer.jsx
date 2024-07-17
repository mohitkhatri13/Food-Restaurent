import React from 'react'

const Footer = () => {
  return (
    <div class=" w-full flex items-center justify-center">
        <div className='  w-10/12 flex flex-col items-center justify-center h-[200px] gap-y-4 font-bold'>
        <h3>Greedy-Guts</h3>
        <p>
          Greedy-Guts is specialized in  with Chinese, Indian & Italian 
          
        </p>
        <div class="social-links">
          <a href="https://www.facebook.com/" class="facebook"
            ><i class="bx bxl-facebook"></i
          ></a>
          <a href="https://www.instagram.com/" class="instagram"
            ><i class="bx bxl-instagram"></i
          ></a>
        </div>
        <div class="copyright">
          &copy; Copyright <strong><span>Greedy-Guts</span></strong
          >. All Rights Reserved
        </div>
        <div class="credits">
          Designed by
          <a href="https://github.com/" target="_blank"
            > Mohit Khatri</a
          >
        </div>
      </div>
      </div>
  )
}

export default Footer