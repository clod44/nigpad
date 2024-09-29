import { Button } from '@nextui-org/react';
import useDarkMode from '../hooks/useDarkMode';
import GetIcon from '../icons/GetIcon';
export default function ThemeSwitcher({
    color = "primary",
    variety = "light",
    ...props
}) {
    const { isDarkMode, toggle } = useDarkMode();

    return (
        <Button onClick={toggle} isIconOnly color={color} variant={variety} {...props}>
            <GetIcon name={isDarkMode ? "Sun" : "Moon"} />
        </Button>
    );
}
