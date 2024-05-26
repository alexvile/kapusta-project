import { FaPencil, FaChevronDown } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { AiOutlineClose, AiOutlineStop, AiFillBank } from "react-icons/ai";

export const NewSvg = ({ name }: { name: string }) => {
  switch (name) {
    case "bank":
      return <AiFillBank />;
    case "edit":
      return <FaPencil />;
    case "chevron-down":
      return <FaChevronDown />;
    case "delete":
      return <MdDeleteForever />;
    case "plus":
      return <FaPlus />;
    case "beauty":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          width="800px"
          height="800px"
          viewBox="0 0 50 50"
          version="1.2"
          baseProfile="tiny"
          overflow="inherit"
        >
          <path d="M34.781 6.664h-6.951c-1.256.004-1.209 1.876 0 1.865h6.951v.957h-6.951c-1.249-.011-1.203 1.86 0 1.865h6.951v.978h-6.951c-1.249 0-1.203 1.87 0 1.865h6.951v.932h-6.951c-1.223.009-1.203 1.881 0 1.887h6.951v.934h-6.951c-1.223-.004-1.228 1.865 0 1.865h6.951v.932h-6.951c-1.223.004-1.228 1.875 0 1.866h6.951v.955h-6.951c-1.223-.011-1.228 1.858 0 1.865h6.951v.93h-6.951c-1.223-.001-1.203 1.872 0 1.866h6.951v18.159c.004 2.767 4.207 2.717 4.219 0v-42.495c-.012-1.264-1.05-2.862-2.758-2.867h-8.412c-1.256.001-1.209 1.873 0 1.865l6.951.023v.93h-6.951c-1.254-.006-1.207 1.865 0 1.866h6.951v.957zm-7.429 32.194c-.004-3.23-3.352-6.704-7.352-4.454v-12.354l-2.587-20.375c-.054-.539-.511-.666-.818-.675-.317.009-.952.136-1.021.675l-2.574 20.375v12.354c-4-2.25-7.24 1.246-7.241 4.429.001 2.832 2.181 5.158 5.131 5.151 2.972.007 5.11-2.6 5.11-5.151v-12.833h1v12.833c0 2.856 2.212 4.97 4.67 5.104-.041 1.566.47 3.8 1.432 4.686 1.128 1.04 2.471-.29 1.92-1.373-.532-1.008-1.054-1.605-.63-3.806 1.772-.82 2.956-2.546 2.96-4.586zm-16.348 2.541c-1.396-.009-2.524-1.141-2.526-2.541.002-1.399 1.13-2.536 2.526-2.544 1.386.008 2.515 1.145 2.525 2.544-.01 1.401-1.139 2.533-2.525 2.541zm8.571-2.541c.009-1.399 1.136-2.536 2.526-2.544 1.392.008 2.521 1.145 2.525 2.544-.004 1.4-1.132 2.532-2.525 2.541-1.39-.008-2.518-1.14-2.526-2.541z" />
        </svg>
      );
    case "close":
      return <AiOutlineClose />;

    default:
      return <AiOutlineStop />;
  }
};
