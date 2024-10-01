import { Card, CardBody, CardFooter, CardHeader, Divider, Input, Button, Tooltip } from "@nextui-org/react";
import GetIcon from "../icons/GetIcon";
import { useState } from "react";



export default function Login() {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
    const [isPasswordRepeatVisible, setIsPasswordRepeatVisible] = useState(false);
    const togglePasswordRepeatVisibility = () => setIsPasswordRepeatVisible(!isPasswordRepeatVisible);

    const [isRegistering, setIsRegistering] = useState(false);



    return (
        <div className="flex flex-col flex-grow overflow-y-auto items-center justify-center p-2">
            <Card className="max-w-[400px] bg-background">
                <CardHeader className="flex gap-3">
                    <p className="text-3xl w-full text-center">{isRegistering ? "Register" : "Login"}</p>
                </CardHeader>
                <Divider />
                <CardBody className="pb-0">
                    <div className="w-full flex flex-col items-center justify-center">
                        <div className="w-full">
                            <p className="text-center">Access <span className="font-bold metallic-text">Free</span> Features</p>
                            <p className="text-sm text-foreground-400 text-center">Cloud-sync, Public Notes, Crossplatform and more</p>
                        </div>

                        <div className="w-full flex flex-col gap-3">
                            <Input type="email" label="Email" variant="underlined" />
                            <Input
                                label="Password"
                                variant="underlined"
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={togglePasswordVisibility}>
                                        {isPasswordVisible ? (
                                            <GetIcon name="EyeSlash" className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <GetIcon name="Eye" className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isPasswordVisible ? "text" : "password"}
                                className="max-w-xs"
                            />
                            {isRegistering && (
                                <Input
                                    label="Password Repeat"
                                    variant="underlined"
                                    endContent={
                                        <button className="focus:outline-none" type="button" onClick={togglePasswordRepeatVisibility}>
                                            {isPasswordRepeatVisible ? (
                                                <GetIcon name="EyeSlash" className="text-2xl text-default-400 pointer-events-none" />
                                            ) : (
                                                <GetIcon name="Eye" className="text-2xl text-default-400 pointer-events-none" />
                                            )}
                                        </button>
                                    }
                                    type={isPasswordRepeatVisible ? "text" : "password"}
                                    className="max-w-xs"
                                />
                            )}
                            <Button color="primary" className="w-full font-bold text-xl mt-2" size="lg" variant="shadow">Continue</Button>
                        </div>

                        <Button size="sm" className="text-primary underline" variant="light" onClick={() => setIsRegistering(!isRegistering)}>{isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}</Button>
                    </div>
                </CardBody>
                <Divider />
                <CardFooter>

                    <div className="w-full flex flex-col gap-1 items-center justify-center">
                        <div className="w-full">
                            <p className="text-center text-foreground-400 text-xs">Login with</p>
                        </div>
                        <div className="flex gap-2">

                            <Tooltip
                                className="text-xs"
                                showArrow={true}
                                content="Google"
                                placement="Bottom"
                            >
                                <Button color="primary" size="lg" variant="ghost" isIconOnly><GetIcon name="Google" /></Button>
                            </Tooltip>
                            <Tooltip
                                className="text-xs"
                                showArrow={true}
                                content="Anonymous"
                                placement="Bottom"
                            >
                                <Button color="primary" size="lg" variant="ghost" isIconOnly><GetIcon name="User" /></Button>
                            </Tooltip>
                        </div>
                    </div>
                </CardFooter>
            </Card>

        </div>
    );
}

