'use client';

import { Button } from "@chakra-ui/react";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
    children: React.ReactNode
}

export default function FormButton( { children }: FormButtonProps ) {
    const {pending} = useFormStatus();
    return <Button type="submit" isLoading={pending} colorScheme="purple">
        {children}
    </Button>
}