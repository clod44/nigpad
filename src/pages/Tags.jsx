import { useState, useContext } from 'react';
import { Chip, Select, SelectItem, Divider, Spacer, ScrollShadow, Tooltip, Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { PencilSquareIcon, TrashIcon, SwatchIcon } from '@heroicons/react/24/outline';
import { NoteContext } from '../context/NoteContext';
import useAuth from "../hooks/useAuth";

// Define the tag colors outside the Tags component
const tagColors = [
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "default"
];

function Tags({
    ...props
}) {
    const { tags, handleCreateTag, handleUpdateTag, handleDeleteTag } = useContext(NoteContext);
    const [newTagTitle, setNewTagTitle] = useState('');
    const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onOpenChange: onEditModalClose } = useDisclosure();
    const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onOpenChange: onDeleteModalClose } = useDisclosure();
    const [editingTag, setEditingTag] = useState(null);

    const { user } = useAuth();

    const [selectedColor, setSelectedColor] = useState("default");


    const handleAddTag = () => {
        if (newTagTitle.trim()) {
            handleCreateTag(newTagTitle.trim());
            setNewTagTitle('');
        }
    };

    const EditTagPressed = (tag) => {
        setSelectedColor(tagColors.includes(tag.color) ? tag.color : 'primary'); //this must be executed before setting EditingTag for somereason idk
        setEditingTag(tag);
        onEditModalOpen();
    };

    const SaveTagPressed = () => {
        console.log(selectedColor);
        handleUpdateTag(editingTag?.id, { ...editingTag, color: selectedColor });
        onEditModalClose();
    };

    const DeleteTagPressed = (tag) => {
        setEditingTag(tag);
        onDeleteModalOpen();
    };

    const confirmDeleteTag = (tag) => {
        handleDeleteTag(tag?.id);
        onDeleteModalClose();
    };

    if (!user)
        return (
            <div className="flex flex-col items-center justify-center gap-2 text-center text-default py-5">
                <PencilSquareIcon className="size-6" />
                <p>This feature requires an <Link to="/login" className="underline text-primary">Account</Link></p>
            </div >

        );

    return (
        <div className="flex flex-col flex-grow overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 px-4 pt-4">
                <Spacer className="hidden sm:block" />
                <div className="flex items-center space-x-2">
                    <Input
                        placeholder="Add a new tag"
                        value={newTagTitle}
                        onChange={(e) => setNewTagTitle(e.target.value)}
                        size="sm"
                        className="w-full"
                    />
                    <Button size="sm" onPress={handleAddTag}>Add Tag</Button>
                </div>
                <Spacer className="hidden sm:block" />
            </div>
            <Divider className="my-4" />
            <ScrollShadow hideScrollBar className="w-full flex-grow" size={40}>
                {/* tag list */}
                <Table hideHeader removeWrapper isStriped aria-label='tags table' className='px-5'>
                    <TableHeader>
                        <TableColumn></TableColumn>
                        <TableColumn>TITLE</TableColumn>
                        <TableColumn align='end'>ACTION</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {tags?.map((tag) => (
                            <TableRow key={tag.id}>
                                <TableCell className='p-0'>
                                    <div className='flex justify-center items-center'>
                                        <Chip size="sm" className={`bg-${tagColors.includes(tag?.color) ? tag?.color : 'default'}`}> </Chip>
                                    </div>
                                </TableCell>
                                <TableCell className='items-center'>
                                    <p className='text-pretty'>{tag.title}</p>
                                </TableCell>
                                <TableCell className='pe-0'>
                                    <div className='flex justify-end flex-nowrap items-center h-full'>
                                        <Tooltip content="Edit Tag">
                                            <Button size="md" variant='light' onPress={() => EditTagPressed(tag)} isIconOnly>
                                                <PencilSquareIcon className="size-6" />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip color="danger" content="Delete Tag">
                                            <Button size="md" color="danger" variant='light' onPress={() => DeleteTagPressed(tag)} isIconOnly>
                                                <TrashIcon className="size-6" />
                                            </Button>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Spacer y={10} />
            </ScrollShadow>

            {/* Edit Tag Modal */}
            <Modal isOpen={isEditModalOpen} onOpenChange={onEditModalClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Edit Tag</ModalHeader>
                            <ModalBody>
                                <Input
                                    value={editingTag.title || 'Untitled'}
                                    onChange={(e) => setEditingTag({ ...editingTag, title: e.target.value || 'Untitled' })}
                                    placeholder="Edit tag title"
                                    label="Title:"
                                    labelPlacement='inside'
                                    size="lg"
                                    className='w-full'
                                />
                                <Select
                                    isRequired
                                    selectionMode="single"
                                    label="Color"
                                    placeholder="Primary"
                                    className={`w-full`}
                                    variant='bordered'
                                    defaultSelectedKeys={[selectedColor]}
                                    onSelectionChange={(color) => {
                                        console.log(tagColors[0])
                                        console.log(Object.values(color)[0]);
                                        setSelectedColor(Array.isArray(color) ? color[0] : Object.values(color)[0]);
                                    }}
                                >
                                    {tagColors.map((color) => (
                                        <SelectItem
                                            key={color}
                                            value={color}
                                            startContent={
                                                <SwatchIcon className={`size-6 text-${color}`} />
                                            }
                                            className={`text-${color}`}
                                        >
                                            {color}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={SaveTagPressed}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteModalOpen} onOpenChange={onDeleteModalClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Confirm Deletion</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete the tag "{editingTag.title || 'No name found'}"?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={() => confirmDeleteTag(editingTag)}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Tags;
