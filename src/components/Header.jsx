import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Header = ({setTime, currentTime, setCurrentTime, setIsActive}) => {

  const options = ["Pomodoro", "Short Break", "Long Break"]

  const handlePress = (index) => {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15
    setCurrentTime(index)
    setTime(newTime * 60)
    setIsActive(false)
  }

  return (
    <View style={styles.mainContainer}>
        {options.map((option, i) => (
          <TouchableOpacity 
          onPress={() => handlePress(i)} 
          style={[styles.itemStyle, currentTime !== i && {borderBlockColor: 'transparent', borderWidth: 0}]} 
          key={i}>
            <Text style={{fontWeight: 'bold'}}>{option}</Text>
          </TouchableOpacity>
        ))}
    </View>
  )
}
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row'
  },
  itemStyle: {
    padding: 5,
    borderWidth: 3,
    width: '33%',
    borderColor: 'white',
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center'
  }
})

export default Header