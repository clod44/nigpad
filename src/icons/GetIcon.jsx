import { icons } from './IconsData.js';

function GetIcon({
    name = "More",
    fill,
    size,
    height,
    width,
    label,
    strokeWidth,
    opacity,
    clipRule,
    fillRule,
    ...props
}) {
    // Check if the icon exists in the icons data
    const iconData = icons[name];
    if (!iconData) {
        console.warn(`Icon "${name}" not found`);
        return null; // Optionally return a default SVG or null
    }

    return (
        <svg
            width={size || width || 24}
            height={size || height || 24}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            {iconData.map((p, index) => (
                <path
                    key={index}
                    d={p.d}
                    opacity={opacity || p.opacity || 1.0}
                    clipRule={clipRule || p.clipRule || 'evenodd'}
                    fillRule={fillRule || p.fillRule || 'evenodd'}
                    fill={fill || p.fill || 'none'}
                    stroke={fill || p.fill || 'currentColor'}
                    strokeWidth={strokeWidth || p.strokeWidth || 2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            ))}
        </svg>
    );
}

export default GetIcon;
