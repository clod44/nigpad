import { MoonIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

export default function ToggleButton({
    label,
    icon = <MoonIcon className="size-6" />,
    value = false,
    onChange = () => { },
    isDisabled = false,
    ...props
}) {
    const [isToggled, setIsToggled] = useState(value);

    useEffect(() => {
        setIsToggled(value);
    }, [value]);

    const handleToggle = () => {
        const newValue = !isToggled;
        setIsToggled(newValue);
        onChange(newValue);
    };

    return (
        <Button
            onClick={handleToggle}
            isDisabled={isDisabled}
            startContent={icon}
            isIconOnly={!label}
            color={isToggled ? "primary" : "default"}
            variant={isToggled ? "shadow" : "faded"}
        >
            {label ? label : null}
        </Button>
    );
}
