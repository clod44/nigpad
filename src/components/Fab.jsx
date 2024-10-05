import { Container as FabContainer, Button as FabButton, Link as FabLink } from 'react-floating-action-button'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function Fab({
    buttons = [{
        tooltip: "New Note",
        onClick: () => alert('FAB Rocks!'),
        className: "text-primary",
    }],
    ...props
}) {


    return (
        <>
            <FabContainer styles={{ bottom: 40, right: 20, zIndex: 9999 }}>
                {buttons?.map((button, index) => (
                    <FabButton
                        key={index}
                        tooltip={button.tooltip}
                        onClick={button.onClick}
                        styles={{ backgroundColor: '#006FEE', color: 'white' }}
                        className={button.className + " hover:animate-pulse active:scale-95 duration-200"}
                    >
                        <PlusIcon className="size-6" />
                    </FabButton>
                ))}
            </FabContainer>
        </>
    );
}