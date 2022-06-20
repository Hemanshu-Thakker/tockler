import React from 'react';
import { Flex, Box, Center, Link } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { TocklerLogo } from './TocklerLogo';
import { TocklerLogoText } from './TocklerLogoText';

export const Header = ({ children, brandLinkProps }) => (
    <Flex
        bg={useColorModeValue('gray.100', 'gray.900')}
        w="100%"
        h={50}
        alignItems="center"
        zIndex={100}
        borderBottomWidth={1}
        borderBottomColor={useColorModeValue('gray.300', 'gray.700')}
        position="sticky"
        top={0}
    >
        <Box pl={4} pr={3}>
            <Link {...brandLinkProps} _hover={{ textDecoration: 'none' }}>
                <Flex>
                    <Center pr={3}>
                        {/* <TocklerLogo boxSize="28px" /> */}
                        <img src="https://www.ajackus.com/images/logo-icon-blue.svg" alt="logo"></img>
                    </Center>
                    <Box pt="3px">
                        {/* <TocklerLogoText /> */}
                    </Box>
                </Flex>
            </Link>
        </Box>
        {children}
    </Flex>
);
