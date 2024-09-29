import { useState } from 'react';
import { Chip, Divider, Spacer, ScrollShadow, Tooltip, Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import GetIcon from '../icons/GetIcon';

function Tags({
    notes,
    tags,
    addTag,
    updateTag,
    deleteTag,
    ...props
}) {
    const [newTag, setNewTag] = useState('');
    const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onOpenChange: onEditModalClose } = useDisclosure();
    const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onOpenChange: onDeleteModalClose } = useDisclosure();
    const [editTagId, setEditTagId] = useState(null);
    const [editedTag, setEditedTag] = useState('');
    const [deleteTagId, setDeleteTagId] = useState(null);
    const [deleteTagTitle, setDeleteTagTitle] = useState('');

    const handleAddTag = () => {
        if (newTag.trim()) {
            addTag(newTag.trim());
            setNewTag('');
        }
    };

    const handleEditTag = (id, title) => {
        setEditTagId(id);
        setEditedTag(title);
        onEditModalOpen();
    };

    const handleSaveTag = () => {
        updateTag(editTagId, editedTag.trim());
        onEditModalClose();
    };

    const handleDeleteTag = (id, title) => {
        setDeleteTagId(id);
        setDeleteTagTitle(title);
        onDeleteModalOpen();
    };

    const confirmDeleteTag = () => {
        deleteTag(deleteTagId);
        onDeleteModalClose();
    };

    const getTagUseAmount = (tagId) => {
        const amount = notes.filter(note => note.tags && note.tags.includes(tagId)).length;
        return amount;
    };


    return (
        <div className="flex flex-col flex-grow overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 px-4 pt-4">
                <Spacer className="hidden sm:block" />
                <div className="flex items-center space-x-2">
                    <Input
                        placeholder="Add a new tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
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
                        <TableColumn>TITLE</TableColumn>
                        <TableColumn align='end'>ACTION</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {tags.map((tag) => (
                            <TableRow key={tag.id}>
                                <TableCell className='text-nowrap'>
                                    <Chip size='sm' className='font-mono me-2'>
                                        {getTagUseAmount(tag.id)}
                                    </Chip>
                                    {tag.title}
                                </TableCell>
                                <TableCell className='flex justify-end'>
                                    <div className='flex flex-nowrap'>
                                        <Tooltip content="Edit Tag">
                                            <Button size="md" variant='light' onPress={() => handleEditTag(tag.id, tag.title)} isIconOnly>
                                                <GetIcon name="Edit" />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip color="danger" content="Delete Tag">
                                            <Button size="md" color="danger" variant='light' onPress={() => handleDeleteTag(tag.id, tag.title)} isIconOnly>
                                                <GetIcon name="Delete" />
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
                                    value={editedTag}
                                    onChange={(e) => setEditedTag(e.target.value)}
                                    placeholder="Edit tag title"
                                    size="lg"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={handleSaveTag}>
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
                                <p>Are you sure you want to delete the tag "{deleteTagTitle}"?</p>
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
