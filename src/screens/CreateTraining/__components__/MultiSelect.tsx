import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

const items = [
  { id: '1', name: 'Monday' },
  { id: '2', name: 'Tuesday' },
  { id: '3', name: 'Wednesday' },
  { id: '4', name: 'Thursday' },
  { id: '5', name: 'Friday' },
  { id: '6', name: 'Saturday' },
  { id: '7', name: 'Sunday' },
]

const MultiSelect = () => {
  const [selected, setSelected] = useState([])

  const toggleSelect = (item) => {
    if (selected.includes(item.id)) {
      setSelected(selected.filter((id) => id !== item.id))
    } else {
      setSelected([...selected, item.id])
    }
  }

  return (
    <View className="flex-1 p-4">
      <Text className="text-lg font-bold mb-4">Select Days</Text>
      <ScrollView>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => toggleSelect(item)}
            className={`p-4 mb-2 border rounded-lg ${
              selected.includes(item.id) ? 'bg-blue-500' : 'bg-gray-200'
            }`}>
            <Text
              className={`text-base font-medium ${
                selected.includes(item.id) ? 'text-white' : 'text-black'
              }`}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="mt-4">
        <Text className="text-lg font-bold">Selected Items:</Text>
        {selected.length > 0 ? (
          selected.map((id) => (
            <Text key={id} className="text-base mt-2">
              {items.find((i) => i.id === id)?.name}
            </Text>
          ))
        ) : (
          <Text className="text-base mt-2">No items selected</Text>
        )}
      </View>
    </View>
  )
}

export default MultiSelect
