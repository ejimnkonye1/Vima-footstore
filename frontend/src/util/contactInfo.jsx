import { FiMail, FiPhone } from "react-icons/fi";

const ContactInfo = () => {
    return(
       <div className="hidden md:flex bg-gray-50 py-6 px-4 border-t border-b border-gray-200">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
        <div className="flex items-center gap-2">
          <FiMail className="text-emerald-600 text-xl" />
          <a 
            href="mailto:order@vimafootstore.com" 
            className="text-gray-700 hover:text-emerald-600 transition-colors"
          >
            niquewear@gmail.com
          </a>
        </div>
        
        <div className="hidden sm:block h-5 w-px bg-gray-300"></div>
        
        <div className="flex items-center gap-2">
          <FiPhone className="text-emerald-600 text-xl" />
          <a 
            href="tel:07062487335" 
            className="text-gray-700 hover:text-emerald-600 transition-colors"
          >
            0706 248 7335
          </a>
        </div>
      </div>
    </div>
    )
}
export default ContactInfo;