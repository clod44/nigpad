import { Input, Tooltip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Link, Checkbox, CheckboxGroup, ScrollShadow } from "@nextui-org/react";
import { GlobeAmericasIcon, Cog6ToothIcon, LinkIcon, SparklesIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import ToggleButton from "./ToggleButton";
import { NoteContext } from "../context/NoteContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentNoteContext } from "../context/CurrentNoteContext";


export default function NavbarNoteOptions() {
    const { tags } = useContext(NoteContext);

    const navigate = useNavigate();

    const { currentNote, setCurrentNote, UpdateCurrentNote, DeleteCurrentNote, showMarkdown, setShowMarkdown } = useContext(CurrentNoteContext);


    return (
        <div className="flex gap-2">
            <Input
                size="md"
                type="text"
                placeholder="Title"
                variant="faded"
                color="primary"
                defaultValue={currentNote?.title || ''}
                onChange={(e) => UpdateCurrentNote({ ...currentNote, title: e.target.value })}
            />

            <Dropdown
                className="max-w-60 p-0">

                <DropdownTrigger>
                    <Button
                        variant="faded"
                        isIconOnly
                        color="primary"
                    >
                        <Cog6ToothIcon className="size-6" />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem
                        key="options"
                        closeOnSelect={false}
                        variant="light"
                        showDivider
                        textValue="Options"
                    >
                        <div className="flex gap-2 w-full items-center justify-center">
                            <Tooltip
                                content="Copy Link"
                                color="primary"
                                placement="bottom"
                                showArrow={true}
                            >
                                <div>
                                    <Button
                                        variant="ghost"
                                        isIconOnly
                                        color="primary"
                                        className="border-default hover:border-primary bg-default-100"
                                    >
                                        <LinkIcon className="size-6 text-foreground" />
                                    </Button>
                                </div>
                            </Tooltip>

                            <Tooltip
                                content="Toggle Public Access"
                                color="primary"
                                placement="bottom"
                                showArrow={true}
                            >
                                <div>
                                    <ToggleButton
                                        icon={<GlobeAmericasIcon className="size-6" />}
                                        onChange={(e) => UpdateCurrentNote({ ...currentNote, public: e.target.checked })}
                                    />
                                </div>
                            </Tooltip>

                            <Tooltip
                                content="Markup View"
                                color="primary"
                                placement="bottom"
                                showArrow={true}
                            >
                                <div>
                                    <ToggleButton
                                        icon={<SparklesIcon className="size-6" />}
                                        onChange={(e) => setShowMarkdown(e.target.checked)}
                                    />
                                </div>
                            </Tooltip>
                        </div>
                    </DropdownItem>
                    <DropdownItem
                        key="tags"
                        closeOnSelect={false}
                        variant="light"
                        showDivider
                        textValue="Edit Tags"
                    >
                        <div>
                            <Button
                                size="sm"
                                className="w-full mb-2"
                                variant="faded"
                                startContent={<PaperClipIcon className="size-6" />}
                                onClick={() => { navigate("/tags") }}
                            >
                                Edit Tags
                            </Button>
                            <div className="w-full h-32 overflow-hidden">
                                <ScrollShadow hideScrollBar size={10} className="w-full h-full">
                                    <CheckboxGroup
                                        color="primary"
                                        value={currentNote?.tags || []}
                                        onValueChange={(e) => {
                                            UpdateCurrentNote({ ...currentNote, tags: e })
                                        }}
                                    >
                                        {tags.map((tag) => {
                                            return (
                                                <Checkbox key={tag.id} value={tag.id} size="sm" className="whitespace-normal w-full overflow-wrap break-word">
                                                    {tag.title}
                                                </Checkbox>
                                            );
                                        })}
                                    </CheckboxGroup>
                                </ScrollShadow>
                            </div>
                        </div>
                    </DropdownItem>
                    <DropdownItem
                        key="delete"
                        color="light"
                        closeOnSelect={false}
                        textValue="Delete Note"
                    >
                        <Button
                            color="danger"
                            size="sm"
                            className="w-full"
                            variant="ghost"
                        >
                            Delete Note
                        </Button>
                    </DropdownItem>
                </DropdownMenu>

            </Dropdown>

        </div >
    );
}
