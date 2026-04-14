interface StoreIconProps {
  className?: string;
}

export default function GooglePlayIcon({ className }: StoreIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g clipPath="url(#platform-android-_r_5a_)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M70 55.0788C70 63.3194 63.4852 70.0053 55.4499 70.0053H14.5501C6.51482 70.0053 0 63.3247 0 55.0788V14.9265C0 6.68056 6.51482 0 14.5501 0H55.4446C63.4799 0 69.9947 6.68056 69.9947 14.9265V55.0788H70Z"
          fill="#FFFFFF"
        ></path>
        <path
          d="M19.4072 16.7305C19.2277 17.1178 19.1116 17.6272 19.1116 18.2268V51.7835C19.1116 52.3513 19.2013 52.8289 19.4072 53.2481L37.4101 35.0052L19.4072 16.7305Z"
          fill="#0B0B0B"
        ></path>
        <path
          d="M44.1942 28.1284L22.9444 15.9824C21.9941 15.4465 21.1019 15.3562 20.4473 15.6534L38.4501 33.9281L44.1942 28.1284Z"
          fill="#0B0B0B"
        ></path>
        <path
          d="M52.4036 32.8243L45.4981 28.8765L39.4849 35.0052L45.5245 41.1074L52.3984 37.1914C54.5101 35.9974 54.5101 34.0235 52.3984 32.8243H52.4036Z"
          fill="#0B0B0B"
        ></path>
        <path
          d="M20.4157 54.3252C21.102 54.6542 21.9942 54.564 22.9445 53.9963L44.189 41.8821L38.4449 36.0505L20.4104 54.3252H20.4157Z"
          fill="#0B0B0B"
        ></path>
      </g>
      <defs>
        <clipPath id="platform-android-_r_5a_">
          <rect width="70" height="70" fill="white"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}
