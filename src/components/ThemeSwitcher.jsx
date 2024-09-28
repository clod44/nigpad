import { Button } from '@nextui-org/react';
import useDarkMode from '../hooks/useDarkMode';
import GetIcon from '../icons/GetIcon';
export default function ThemeSwitcher() {
    const { isDarkMode, toggle } = useDarkMode();

    return (
        <Button onClick={toggle} isIconOnly color='primary' variant='faded'>
            <GetIcon name={isDarkMode ? "Sun" : "Moon"} />
        </Button>
    );
}
