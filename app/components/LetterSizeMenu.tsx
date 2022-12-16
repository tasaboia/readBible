import React from "react";
import { Menu, Divider, HamburgerIcon, Box, Pressable, Center, NativeBaseProvider, Heading, Text } from "native-base";
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface IProp {
    setLetterSize: (data: string) => void
}
const LetterSizeMenu = ( {setLetterSize} : IProp ) => {
    return <Box w="15%"  justifyContent="center">
    <Menu closeOnSelect={true} w="190" mt={8} 
    trigger={triggerProps => {
        return <Pressable w={"100%"} justifyContent="center" alignItems={"center"} height={"10"} {...triggerProps}>
                <MaterialCommunityIcons  name="format-letter-case" size={24} color="black" />
            </Pressable>;
    }}>
      <Menu.OptionGroup onChange={(value) => setLetterSize(value) } defaultValue="Arial" title="Tamanho da letra" type="radio">
        <Menu.ItemOption value="sm">
            <Text fontSize="xs">Pequena</Text>
        </Menu.ItemOption>
        <Menu.ItemOption value="md">
            <Text fontSize="md">Normal</Text>
        </Menu.ItemOption>
        <Menu.ItemOption value="lg">
            <Text fontSize="lg">Média</Text>
        </Menu.ItemOption>
        <Menu.ItemOption value="xl">
            <Text fontSize="xl">Grande</Text>
        </Menu.ItemOption>
      </Menu.OptionGroup>
    </Menu>
  </Box>;
}

export default LetterSizeMenu