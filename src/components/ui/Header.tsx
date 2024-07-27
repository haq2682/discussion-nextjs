'use client';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Spinner,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/react';
import * as actions from '@/actions';
import {signOut as nextAuthSignOut} from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import {Suspense} from 'react';

interface Props {
    children: React.ReactNode
}

const Links = ['Dashboard', 'Projects', 'Team']

const NavLink = (props: Props) => {
    const { children } = props

    return (
        <Box
            as="a"
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            href={'#'}>
            {children}
        </Box>
    )
}

export default function Header(props: any) {
    const searchParams = useSearchParams()
    const { isOpen, onOpen, onClose } = useDisclosure();
    let authContent: React.ReactNode; 
    if(props.session?.status === 'loading') {
        authContent = <Spinner className="text-purple-600"/>
    } 
    else if(props.session.data?.user) {
        authContent = <>
            <Menu>
                <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Avatar
                        size={'sm'}
                        src={
                            props.session.data?.user.image
                        }
                    />
                </MenuButton>
                <MenuList>
                    <form action={async () => {
                        await actions.signOut();
                        await nextAuthSignOut({redirect: false});
                    }
                    }>
                        <Button variant="ghost" type="submit" colorScheme="black" className="w-full"><MenuItem>Sign Out</MenuItem></Button>
                    </form>
                    <MenuDivider />
                </MenuList>
            </Menu>
        </>
    }
    else {
        authContent = <>
            <form action={actions.signIn}>
                <Button type="submit" size="md" colorScheme="purple" variant="outline" className="mx-1.5">Sign In</Button>
            </form>
            <form action={actions.signIn}>
                <Button type="submit" size="md" colorScheme="purple" variant="solid" className="mx-1.5">Sign Up</Button>
            </form>
        </>
    }
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>Logo</Box>
                        {/* <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </HStack> */}
                    </HStack>
                    <Flex>
                        <Suspense>
                            <form action={actions.search}>
                                <Input name="term" placeholder='Search' size="md" variant="filled" defaultValue={searchParams.get('term') || ""} />
                            </form>
                        </Suspense>
                    </Flex>
                    <Flex alignItems={'center'}>
                        {authContent} 
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    )
}