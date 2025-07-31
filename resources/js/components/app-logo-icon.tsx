import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            width="112"
            height="145"
            viewBox="0 0 112 145"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <rect y="1.6355" width="100" height="100" rx="2" fill="#2B2B2B" />
            <rect x="6.49637" y="21.2994" width="40.4412" height="50.7006" fill="url(#pattern0_2_50)" />
            <rect y="3.29372" width="112" height="135.043" rx="5" fill="#2B2B2B" />
            <rect x="13.229" y="42.8946" width="82.3529" height="102.105" fill="url(#pattern0_2_58)" />
            <rect
                width="98.8235"
                height="69.1682"
                transform="matrix(0.999764 -0.0217426 0.0217478 0.999763 3.29411 21.911)"
                fill="url(#pattern1_2_58)"
            />
            <rect
                width="98.8235"
                height="69.1682"
                transform="matrix(0.999764 -0.0217426 0.0217478 0.999763 3.29411 2.14868)"
                fill="url(#pattern2_2_58)"
            />

            <defs>
                <pattern id="pattern0_2_58" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_2_58" transform="matrix(0.01 0 0 0.00806548 0 0.0967259)" />
                </pattern>
                <pattern id="pattern1_2_58" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image1_2_58" transform="translate(0.0238095) scale(0.01)" />
                </pattern>
                <pattern id="pattern2_2_58" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image1_2_58" transform="translate(0.0238095) scale(0.01)" />
                </pattern>
                <image
                    id="image0_2_58"
                    width="100"
                    height="100"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,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"
                />
                <image
                    id="image1_2_58"
                    width="100"
                    height="100"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB60lEQVR4nO3bv4rVQBiG8ajoBXgLllbLir2V/VrZaG/tIuJlCHYKssXiJfintRMvQoutZOe87wTZRRwRHNhiVRI95MvM84OQJvmY5CFwDiTDAAAAAAAAAAAAAAAAAAAAYkspXZP0yvaxpFHS65TSzaXX1aVxHG/Y/mK7nN0knUjaW3p9Xck575wX40yUb7bvLr3OLuS/xCBKwBgmSrwYJkq8GCZKvBgmSrwYJkq8GCbKP//pO55wk19KejLh+FNJd5a+zlZ/2h6WUi79OvchT0qQGBVRAsWoiBIoRkWUQDEqogSKURElUIyKKIFiVEQJFKMiSqAYFVECxai6jxIpxtB7lIgxuo0SOUZ3UdYQo5soa4rRfJQ1xmg2yppjNBelhRjNRGkpxuqjtBhjtVFajrG6KD3EWE2UnmKEj9JjjLBReo4RLgoxAkUhRqAoxAgUZRzH3alvoZdSLg4dkfR44lv38z7ZTildlXREjP8e5avt68OWH8duY8yJYvv5MJWkA2JsJ4qkD3OGPyXGdqJIejd5sO1bxNhOFEkPZg22/ew3Q18Q488kPZL0/ZwYb0spl4c5SikXcs73bb+X9OnnPud8b9awDuWcb0t6I+mzpI+bzWa/lHJl6XUBAAAAAAAAAAAAAAAAAABgiOQH2jJozNu06AoAAAAASUVORK5CYII="
                />
            </defs>
        </svg>
    );
}
