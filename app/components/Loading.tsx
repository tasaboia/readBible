import { View, Text } from 'react-native'
import React from 'react'
import { Heading, HStack, Spinner } from 'native-base'

const Loading = () => {
  return (
    <View>
      <HStack space={2} justifyContent="center">
        <Spinner color="purple.400"  accessibilityLabel="Buscando os Versos da Biblia" />
        <Heading color="purple.400" fontSize="md">Carregando</Heading>
    </HStack>
    </View>
  )
}

export default Loading