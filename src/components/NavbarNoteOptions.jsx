import { Input, Tooltip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Badge, Checkbox, CheckboxGroup, ScrollShadow } from "@nextui-org/react";
import { GlobeAmericasIcon, Cog6ToothIcon, LinkIcon, SparklesIcon, PaperClipIcon, TrashIcon } from "@heroicons/react/24/outline";
import ToggleButton from "./ToggleButton";
import { NoteContext } from "../context/NoteContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentNoteContext } from "../context/CurrentNoteContext";
import { notify } from "../context/ToastContext";


export default function NavbarNoteOptions() {
    const { tags } = useContext(NoteContext);

    const navigate = useNavigate();

    const {
        currentNote,
        UpdateCurrentNote,
        DeleteCurrentNote,
        showMarkdown,
        setShowMarkdown,
        OwnerIsUser,
    } = useContext(CurrentNoteContext);


    return (
        <div className="flex gap-2">
            <Input
                size="md"
                type="text"
                placeholder="Title"
                variant="faded"
                color="primary"
                value={currentNote?.title || ''}
                onChange={(e) => UpdateCurrentNote({ ...currentNote, title: e.target.value })}
                isReadOnly={showMarkdown || !OwnerIsUser}
            />
            {OwnerIsUser && (

                <Dropdown
                    className="max-w-60 p-0">
                    <Badge
                        isOneChar
                        content={"!"}
                        color="primary"
                        shape="circle"
                        placement="top-right"
                        showOutline={false}
                        size="sm"
                        variant="shadow"
                        isInvisible={!showMarkdown}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DropdownTrigger>
                            <Button
                                variant="faded"
                                isIconOnly
                                color="primary"
                            >
                                <Cog6ToothIcon className="size-6" />
                            </Button>
                        </DropdownTrigger>
                    </Badge>
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
                                            onClick={() => {
                                                try {
                                                    navigator.clipboard.writeText(window.location.href)
                                                    notify("Link copied")
                                                } catch (e) {
                                                    console.log(e)
                                                    notify("Failed to copy link", { type: "error" })
                                                }
                                            }}
                                        >
                                            <LinkIcon className="size-6 text-foreground" />
                                        </Button>
                                    </div>
                                </Tooltip>

                                <Tooltip
                                    content={currentNote?.public ? "Available to everyone with link" : "Private note"}
                                    color={currentNote?.public ? "primary" : "default"}
                                    placement="bottom"
                                    showArrow={true}
                                >
                                    <div>
                                        <ToggleButton
                                            icon={<GlobeAmericasIcon className="size-6" />}
                                            value={currentNote?.public}
                                            onChange={(val) => UpdateCurrentNote({ ...currentNote, public: val })}
                                        />
                                    </div>
                                </Tooltip>

                                <Tooltip
                                    content={showMarkdown ? "Hide Markdown" : "Show Markdown"}
                                    color={showMarkdown ? "primary" : "default"}
                                    placement="bottom"
                                    showArrow={true}
                                >
                                    <div>
                                        <Badge
                                            isOneChar
                                            content={"!"}
                                            color="primary"
                                            shape="circle"
                                            placement="top-right"
                                            showOutline={false}
                                            size="sm"
                                            variant="shadow"
                                            isInvisible={!showMarkdown}
                                        >
                                            <ToggleButton
                                                icon={<SparklesIcon className="size-6" />}
                                                value={showMarkdown}
                                                onChange={(val) => setShowMarkdown(val)}
                                            />
                                        </Badge>
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
                                    <ScrollShadow hideScrollBar size={10} className="w-full h-full px-1">
                                        <CheckboxGroup
                                            color="primary"
                                            value={currentNote?.tags || []}
                                            onValueChange={(e) => {
                                                UpdateCurrentNote({ ...currentNote, tags: e })
                                            }}
                                        >
                                            {tags.map((tag) => {
                                                return (
                                                    <Checkbox color={tag.color || "default"} key={tag.id} value={tag.id} size="sm" className="whitespace-normal w-full overflow-wrap break-word">
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
                                variant="light"
                                startContent={<TrashIcon className="size-6" />}
                                onClick={() => {
                                    DeleteCurrentNote();
                                    navigate("/");
                                }}
                            >
                                Delete Note
                            </Button>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            )}
        </div >
    );
}
