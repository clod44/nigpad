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
    }, [value])

    return (
        <Button
            onClick={() => setIsToggled(prev => !prev)}
            isDisabled={isDisabled}
            startContent={icon}
            isIconOnly={label ? false : true}
            color={isToggled ? "primary" : "default"}
            variant={isToggled ? "shadow" : "faded"}
        >
            {label ? label : null}
        </Button>
    );
}
