import { useState, useContext, useRef } from 'react';
import { Chip, Divider, Spacer, ScrollShadow, Tooltip, Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { NoteContext } from '../context/NoteContext';

function Tags({
    ...props
}) {

    const { tags, handleCreateTag, handleUpdateTag, handleDeleteTag } = useContext(NoteContext);

    const [newTagTitle, setNewTagTitle] = useState('');
    const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onOpenChange: onEditModalClose } = useDisclosure();
    const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onOpenChange: onDeleteModalClose } = useDisclosure();
    const [editingTag, setEditingTag] = useState(null);

    const inputColorRef = useRef();


    const handleAddTag = () => {
        if (newTagTitle.trim()) {
            handleCreateTag(newTagTitle.trim());
            setNewTagTitle('');
        }
    };

    const EditTagPressed = (tag) => {
        setEditingTag(tag);
        onEditModalOpen();
    };

    const SaveTagPressed = () => {
        handleUpdateTag(editingTag?.id, { ...editingTag, color: inputColorRef.current.value });
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
                                        <Chip size="sm" style={{ backgroundColor: tag?.color || '#333333' }} variant='bordered'> </Chip>
                                    </div>                                </TableCell>
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
            < Modal isOpen={isEditModalOpen} onOpenChange={onEditModalClose} >
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
                                <Input
                                    defaultValue={editingTag.color || '#000000'}
                                    ref={inputColorRef}
                                    label="Color:"
                                    labelPlacement='inside'
                                    size="lg"
                                    type='color'
                                    className='w-full'
                                />

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
                                <Button color="primary" onPress={confirmDeleteTag}>
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
