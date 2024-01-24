import { SVGProps } from "react";

interface SVGRProps {
  name: string;
  title?: string;
  titleId?: string;
}
export const Svg = ({
  name,
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => {
  switch (name) {
    case "logout":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-labelledby={titleId}
          {...props}
        >
          {title ? <title id={titleId}>{title}</title> : null}
          <g clipPath="url(#clip0_19406_1192)">
            <path
              d="M9.99998 14H1.99998V1.99998H9.99998V2.99998H12V0H0V16H12V13H10V14H9.99998Z"
              fill="#CBCCD0"
            />
            <path
              d="M12.293 4.29297L10.8789 5.70702L12.1719 6.99998H7V8.99999H12.1719L10.8789 10.293L12.293 11.707L16 7.99997L12.293 4.29297Z"
              fill="#CBCCD0"
            />
          </g>
          <defs>
            <clipPath id="clip0_19406_1192">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case "logo":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={90}
          height={31}
          fill="none"
          aria-labelledby={titleId}
          {...props}
        >
          {title ? <title id={titleId}>{title}</title> : null}
          <rect width={33} height={26} x={6} y={5} fill="#FB7C2F" rx={8} />
          <rect
            width={33}
            height={26}
            fill="#FB7C2F"
            fillOpacity={0.2}
            rx={8}
          />
          <path
            fill="#000"
            fillRule="evenodd"
            d="m23.134 20.57 1.285-1.41 2.767 4.838H30.9l-4.392-7.249L30.9 11h-3.874l-2.803 4.08-1.09 1.651V11H20v12.998h3.134V20.57Zm14.578 2.562c.083.381.179.67.286.866h3.008v-.152c-.262-.47-.398-1.148-.41-2.035v-4.276c-.018-1.048-.384-1.872-1.098-2.473-.715-.601-1.688-.902-2.92-.902s-2.247.292-3.044.875c-.791.583-1.187 1.342-1.187 2.277h3.008c0-.703.357-1.054 1.072-1.054.767 0 1.151.444 1.151 1.33v.51h-.928c-1.476 0-2.601.267-3.375.803-.774.535-1.16 1.327-1.16 2.374 0 .834.318 1.527.955 2.08.637.548 1.41.822 2.32.822.995 0 1.768-.348 2.322-1.045Zm-.67-1.339c-.244.16-.553.241-.928.241-.286 0-.52-.083-.705-.25a.875.875 0 0 1-.277-.67c0-.94.524-1.41 1.571-1.41h.875v1.545c-.107.202-.286.384-.536.544Zm14.195-2.553c0 1.5-.34 2.699-1.018 3.598-.672.892-1.583 1.339-2.732 1.339-.886 0-1.615-.325-2.187-.973v4.508h-3.008V14.339h2.812l.09.893c.576-.715 1.335-1.072 2.276-1.072 1.19 0 2.115.44 2.776 1.322.66.874.991 2.08.991 3.615v.143Zm-3.009-.188c0-1.714-.5-2.57-1.5-2.57-.714 0-1.19.255-1.428.767v3.803c.262.536.744.804 1.447.804.958 0 1.452-.828 1.481-2.482v-.322Zm8.517 5.125c1.084 0 1.944-.408 2.58-1.223l.09 1.044h2.82v-9.66H59.21v6.777c-.291.494-.782.74-1.473.74-.803 0-1.205-.413-1.205-1.24v-6.276h-3.008v6.258c0 1.154.27 2.041.812 2.66.547.613 1.35.92 2.41.92Zm12.204-2.893c0-.256-.134-.46-.402-.616-.268-.154-.776-.315-1.526-.482-.75-.166-1.37-.384-1.857-.651-.488-.274-.86-.605-1.116-.991a2.356 2.356 0 0 1-.384-1.33c0-.887.366-1.616 1.098-2.188.615-.485 1.389-.766 2.323-.844V11.99h1.434v2.222c.873.106 1.602.378 2.189.815.773.578 1.16 1.336 1.16 2.277h-3.017c0-.774-.408-1.16-1.223-1.16a1.2 1.2 0 0 0-.795.267.803.803 0 0 0-.321.652c0 .267.13.485.393.651.261.167.678.304 1.25.411a10.81 10.81 0 0 1 1.517.384c1.452.5 2.178 1.396 2.178 2.687 0 .88-.392 1.598-1.178 2.151-.587.417-1.304.677-2.153.78v2.202h-1.434v-2.174a4.983 4.983 0 0 1-1.662-.424c-.649-.297-1.155-.702-1.518-1.214-.363-.511-.544-1.05-.544-1.616h2.812c.011.447.16.774.446.983.286.202.652.303 1.098.303.41 0 .717-.083.92-.25a.795.795 0 0 0 .312-.652Zm8.82-6.945v-2.402h-3.008v2.402h-1.232v2.089h1.232v4.794c0 .994.247 1.735.74 2.223.495.488 1.26.732 2.295.732.59 0 1.155-.087 1.696-.26v-2.15a4.415 4.415 0 0 1-.75.053c-.386 0-.645-.072-.776-.214-.131-.143-.197-.396-.197-.76v-4.418h1.59v-2.09h-1.59Zm9.222 9.66c-.107-.197-.202-.486-.285-.867-.554.697-1.327 1.045-2.321 1.045-.91 0-1.685-.274-2.321-.822-.637-.553-.956-1.246-.956-2.08 0-1.047.387-1.839 1.16-2.374.775-.536 1.9-.804 3.375-.804h.929v-.509c0-.886-.384-1.33-1.152-1.33-.714 0-1.071.351-1.071 1.054h-3.008c0-.935.395-1.694 1.187-2.277.797-.583 1.812-.875 3.044-.875s2.205.3 2.92.902c.713.601 1.08 1.425 1.097 2.473v4.276c.012.887.15 1.565.411 2.035v.152h-3.008Zm-1.883-1.965c.375 0 .684-.08.928-.24.25-.162.429-.343.536-.545v-1.545h-.875c-1.047 0-1.571.47-1.571 1.41 0 .274.092.498.276.67.185.167.42.25.706.25Z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "chart":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clipPath="url(#clip0_19406_1650)">
            <path
              d="M5 9.2H8V19H5V9.2ZM10.6 5H13.4V19H10.6V5ZM16.2 13H19V19H16.2V13Z"
              fill="#52555F"
            />
          </g>
          <defs>
            <clipPath id="clip0_19406_1650">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case "calendar":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
        >
          <g clipPath="url(#clip0_19406_1558)">
            <path
              d="M17.7647 2.0669H16.431V1.74585C16.431 1.42226 16.1644 1.15991 15.8354 1.15991C15.5065 1.15991 15.2398 1.42226 15.2398 1.74585V2.0669H13.5961V1.74585C13.5961 1.42226 13.3294 1.15991 13.0005 1.15991C12.6715 1.15991 12.4048 1.42226 12.4048 1.74585V2.0669H10.7612V1.74585C10.7612 1.42226 10.4945 1.15991 10.1656 1.15991C9.83661 1.15991 9.56993 1.42226 9.56993 1.74585V2.0669H7.92628V1.74585C7.92628 1.42226 7.65959 1.15991 7.33064 1.15991C7.00169 1.15991 6.735 1.42226 6.735 1.74585V2.0669H5.09136V1.74585C5.09136 1.42226 4.82467 1.15991 4.49572 1.15991C4.16677 1.15991 3.90008 1.42226 3.90008 1.74585V2.0669H2.56641C1.15129 2.0669 0 3.19944 0 4.59147V16.3155C0 17.7076 1.15129 18.8401 2.56641 18.8401H17.7647C19.1798 18.8401 20.3311 17.7075 20.3311 16.3155V4.59147C20.3311 3.19944 19.1798 2.0669 17.7647 2.0669ZM19.1399 16.3155C19.1399 17.0614 18.523 17.6682 17.7647 17.6682H2.56641C1.80816 17.6682 1.19128 17.0614 1.19128 16.3155V6.73233H19.1399V16.3155ZM19.1399 5.56046H1.19128V4.59147C1.19128 3.84562 1.80816 3.23878 2.56641 3.23878H3.90008V3.4653C3.90008 3.7889 4.16677 4.05124 4.49572 4.05124C4.82467 4.05124 5.09136 3.7889 5.09136 3.4653V3.23878H6.735V3.4653C6.735 3.7889 7.00169 4.05124 7.33064 4.05124C7.65959 4.05124 7.92628 3.7889 7.92628 3.4653V3.23878H9.56993V3.4653C9.56993 3.7889 9.83661 4.05124 10.1656 4.05124C10.4945 4.05124 10.7612 3.7889 10.7612 3.4653V3.23878H12.4048V3.4653C12.4048 3.7889 12.6715 4.05124 13.0005 4.05124C13.3294 4.05124 13.5961 3.7889 13.5961 3.4653V3.23878H15.2398V3.4653C15.2398 3.7889 15.5065 4.05124 15.8354 4.05124C16.1644 4.05124 16.431 3.7889 16.431 3.4653V3.23878H17.7647C18.523 3.23878 19.1399 3.84562 19.1399 4.59147V5.56046Z"
              fill="#52555F"
            />
            <path
              d="M6.63996 7.98169H4.28961C3.96066 7.98169 3.69397 8.24403 3.69397 8.56762V10.9598C3.69397 11.2834 3.96066 11.5457 4.28961 11.5457H6.63996C6.96891 11.5457 7.2356 11.2834 7.2356 10.9598V8.56762C7.2356 8.24403 6.96895 7.98169 6.63996 7.98169ZM6.04432 10.3738H4.88525V9.15356H6.04432V10.3738Z"
              fill="#52555F"
            />
            <path
              d="M11.3408 7.98169H8.99041C8.66146 7.98169 8.39478 8.24403 8.39478 8.56762V10.9598C8.39478 11.2834 8.66146 11.5457 8.99041 11.5457H11.3408C11.6697 11.5457 11.9364 11.2834 11.9364 10.9598V8.56762C11.9364 8.24403 11.6697 7.98169 11.3408 7.98169ZM10.7451 10.3738H9.58605V9.15356H10.7451V10.3738Z"
              fill="#52555F"
            />
            <path
              d="M16.0414 7.98169H13.6911C13.3621 7.98169 13.0955 8.24403 13.0955 8.56762V10.9598C13.0955 11.2834 13.3621 11.5457 13.6911 11.5457H16.0414C16.3704 11.5457 16.6371 11.2834 16.6371 10.9598V8.56762C16.6371 8.24403 16.3704 7.98169 16.0414 7.98169ZM15.4458 10.3738H14.2867V9.15356H15.4458V10.3738Z"
              fill="#52555F"
            />
            <path
              d="M6.63996 12.5256H4.28961C3.96066 12.5256 3.69397 12.788 3.69397 13.1116V15.5037C3.69397 15.8273 3.96066 16.0897 4.28961 16.0897H6.63996C6.96891 16.0897 7.2356 15.8273 7.2356 15.5037V13.1116C7.2356 12.788 6.96895 12.5256 6.63996 12.5256ZM6.04432 14.9178H4.88525V13.6975H6.04432V14.9178Z"
              fill="#52555F"
            />
            <path
              d="M11.3408 12.5256H8.99041C8.66146 12.5256 8.39478 12.788 8.39478 13.1116V15.5037C8.39478 15.8273 8.66146 16.0897 8.99041 16.0897H11.3408C11.6697 16.0897 11.9364 15.8273 11.9364 15.5037V13.1116C11.9364 12.788 11.6697 12.5256 11.3408 12.5256ZM10.7451 14.9178H9.58605V13.6975H10.7451V14.9178Z"
              fill="#52555F"
            />
            <path
              d="M16.0414 12.5256H13.6911C13.3621 12.5256 13.0955 12.788 13.0955 13.1116V15.5037C13.0955 15.8273 13.3621 16.0897 13.6911 16.0897H16.0414C16.3704 16.0897 16.6371 15.8273 16.6371 15.5037V13.1116C16.6371 12.788 16.3704 12.5256 16.0414 12.5256ZM15.4458 14.9178H14.2867V13.6975H15.4458V14.9178Z"
              fill="#52555F"
            />
          </g>
          <defs>
            <clipPath id="clip0_19406_1558">
              <rect width="20.3311" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case "descending":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          fill="#52555f"
          height="16px"
          width="16px"
          version="1.1"
          id="Capa_1"
          viewBox="0 0 301.219 301.219"
          xmlSpace="preserve"
          transform="rotate(180 0 0)"
        >
          <g>
            <path d="M149.365,262.736H10c-5.523,0-10,4.477-10,10v10c0,5.523,4.477,10,10,10h139.365c5.522,0,10-4.477,10-10v-10   C159.365,267.213,154.888,262.736,149.365,262.736z" />
            <path d="M10,229.736h120.586c5.522,0,10-4.477,10-10v-10c0-5.523-4.478-10-10-10H10c-5.523,0-10,4.477-10,10v10   C0,225.259,4.477,229.736,10,229.736z" />
            <path d="M10,166.736h101.805c5.522,0,10-4.477,10-10v-10c0-5.523-4.478-10-10-10H10c-5.523,0-10,4.477-10,10v10   C0,162.259,4.477,166.736,10,166.736z" />
            <path d="M10,96.736h83.025c5.522,0,10-4.477,10-10v-10c0-5.523-4.478-10-10-10H10c-5.523,0-10,4.477-10,10v10   C0,92.259,4.477,96.736,10,96.736z" />
            <path d="M10,33.736h64.244c5.522,0,10-4.477,10-10v-10c0-5.523-4.478-10-10-10H10c-5.523,0-10,4.477-10,10v10   C0,29.259,4.477,33.736,10,33.736z" />
            <path d="M298.29,216.877l-7.07-7.071c-1.875-1.875-4.419-2.929-7.071-2.929c-2.652,0-5.195,1.054-7.071,2.929l-34.394,34.393   V18.736c0-5.523-4.477-10-10-10h-10c-5.522,0-10,4.477-10,10v225.462l-34.394-34.393c-1.876-1.876-4.419-2.929-7.071-2.929   c-2.652,0-5.196,1.054-7.071,2.929l-7.07,7.071c-3.905,3.905-3.905,10.237,0,14.142l63.535,63.536   c1.876,1.875,4.419,2.929,7.071,2.929c2.652,0,5.195-1.054,7.071-2.929l63.535-63.536   C302.195,227.113,302.195,220.782,298.29,216.877z" />
          </g>
        </svg>
      );
    case "ascending":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          fill="#52555f"
          height="16px"
          width="16px"
          version="1.1"
          id="Capa_1"
          viewBox="0 0 301.219 301.219"
          xmlSpace="preserve"
        >
          <g>
            <path d="M159.365,23.736v-10c0-5.523-4.477-10-10-10H10c-5.523,0-10,4.477-10,10v10c0,5.523,4.477,10,10,10h139.365   C154.888,33.736,159.365,29.259,159.365,23.736z" />
            <path d="M130.586,66.736H10c-5.523,0-10,4.477-10,10v10c0,5.523,4.477,10,10,10h120.586c5.523,0,10-4.477,10-10v-10   C140.586,71.213,136.109,66.736,130.586,66.736z" />
            <path d="M111.805,129.736H10c-5.523,0-10,4.477-10,10v10c0,5.523,4.477,10,10,10h101.805c5.523,0,10-4.477,10-10v-10   C121.805,134.213,117.328,129.736,111.805,129.736z" />
            <path d="M93.025,199.736H10c-5.523,0-10,4.477-10,10v10c0,5.523,4.477,10,10,10h83.025c5.522,0,10-4.477,10-10v-10   C103.025,204.213,98.548,199.736,93.025,199.736z" />
            <path d="M74.244,262.736H10c-5.523,0-10,4.477-10,10v10c0,5.523,4.477,10,10,10h64.244c5.522,0,10-4.477,10-10v-10   C84.244,267.213,79.767,262.736,74.244,262.736z" />
            <path d="M298.29,216.877l-7.071-7.071c-1.875-1.875-4.419-2.929-7.071-2.929c-2.652,0-5.196,1.054-7.072,2.929l-34.393,34.393   V18.736c0-5.523-4.477-10-10-10h-10c-5.523,0-10,4.477-10,10v225.462l-34.393-34.393c-1.876-1.875-4.419-2.929-7.071-2.929   c-2.652,0-5.196,1.054-7.071,2.929l-7.072,7.071c-3.904,3.905-3.904,10.237,0,14.142l63.536,63.536   c1.953,1.953,4.512,2.929,7.071,2.929c2.559,0,5.119-0.976,7.071-2.929l63.536-63.536   C302.195,227.113,302.195,220.781,298.29,216.877z" />
          </g>
        </svg>
      );
    case "delete":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <g clipPath="url(#clip0_20004_408)">
            <path
              d="M16.3081 4.02333L15.9106 2.832C15.7593 2.37827 15.3362 2.07339 14.858 2.07339H11.5177V0.985886C11.5177 0.442337 11.0758 0 10.5324 0H7.47355C6.93027 0 6.48821 0.442337 6.48821 0.985886V2.07339H3.14809C2.66977 2.07339 2.24666 2.37827 2.09533 2.832L1.6979 4.02333C1.6074 4.29456 1.65326 4.59489 1.82039 4.82684C1.98752 5.05879 2.25792 5.19736 2.54384 5.19736H2.95926L3.8736 16.5038C3.94158 17.3427 4.65349 18 5.49463 18H12.6969C13.5379 18 14.2499 17.3427 14.3178 16.5037L15.2321 5.19736H15.4621C15.748 5.19736 16.0184 5.05879 16.1856 4.82698C16.3527 4.59503 16.3986 4.29456 16.3081 4.02333ZM7.5429 1.05469H10.4631V2.07339H7.5429V1.05469ZM13.2665 16.4187C13.2426 16.7141 12.9924 16.9453 12.6969 16.9453H5.49463C5.1991 16.9453 4.94889 16.7141 4.92499 16.4187L4.01738 5.19736H14.174L13.2665 16.4187ZM2.77002 4.14267L3.09591 3.16571C3.10332 3.14319 3.12433 3.12808 3.14809 3.12808H14.858C14.8818 3.12808 14.9026 3.14319 14.9102 3.16571L15.2361 4.14267H2.77002Z"
              fill="#52555F"
            />
            <path
              d="M11.5846 16.3811C11.5939 16.3816 11.6031 16.3818 11.6125 16.3818C11.8911 16.3818 12.124 16.1634 12.1386 15.8819L12.6338 6.37568C12.6489 6.08482 12.4253 5.83667 12.1346 5.82156C11.843 5.80604 11.5957 6.02989 11.5805 6.32075L11.0854 15.827C11.0703 16.1178 11.2937 16.366 11.5846 16.3811Z"
              fill="#52555F"
            />
            <path
              d="M5.89099 15.8835C5.90637 16.1646 6.139 16.3821 6.41709 16.3821C6.4267 16.3821 6.43659 16.3819 6.44634 16.3813C6.73707 16.3655 6.95995 16.117 6.94416 15.8261L6.42547 6.31991C6.40968 6.02905 6.16111 5.80616 5.87025 5.82209C5.57952 5.83789 5.35664 6.08645 5.37243 6.37731L5.89099 15.8835Z"
              fill="#52555F"
            />
            <path
              d="M9.00891 16.3822C9.30019 16.3822 9.53625 16.1461 9.53625 15.8548V6.34863C9.53625 6.05736 9.30019 5.82129 9.00891 5.82129C8.71764 5.82129 8.48157 6.05736 8.48157 6.34863V15.8548C8.48157 16.1461 8.71764 16.3822 9.00891 16.3822Z"
              fill="#52555F"
            />
          </g>
          <defs>
            <clipPath id="clip0_20004_408">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    default:
      return null;
  }
};
