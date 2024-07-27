'use client';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Input,
    Textarea,
} from '@chakra-ui/react';
import * as actions from '@/actions';
import { useFormState } from 'react-dom';
import FormButton from '../common/form-button';

export default function TopicCreateForm() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [formState, action] = useFormState(actions.createTopic, {
        errors: {}
    });
    return <>
        <div>
            <Button colorScheme="purple" onClick={onOpen}>Create a Topic</Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a Topic</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form action={action}>
                            <div className="flex flex-col gap-4 p-3">
                                <div>
                                    <label htmlFor="title">Topic Title: </label>
                                    <Input 
                                        name="title" 
                                        variant="filled" 
                                        placeholder="Enter topic title here..." 
                                        isInvalid={!!formState.errors?.title} 
                                        />
                                        {formState.errors?.title ? (<span className="text-red-600">{formState.errors.title?.join(', ')}</span>) : (null)} 
                                </div>
                                <div>
                                    <label htmlFor="description">Topic Description: </label>
                                    <Textarea name="description" variant="filled" placeholder="Enter topic description here..." isInvalid={!!formState.errors?.description}/>
                                    {formState.errors?.description ? (<span className="text-red-600">{formState.errors.description?.join(', ')}</span>) : (null)}
                                </div>
                                <FormButton>Save</FormButton>
                                {formState.errors?._form ? <div className="text-red-600 text-center">{formState.errors._form?.join(', ')}</div> : null}
                            </div>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    </>
}