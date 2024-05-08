import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './src/components/Header';
import Timer from './src/components/Timer';

const colors = ["#F7DC6F", "#A2D9CE", "lightgray"]

export default function App() {
  const [isWorking, setIsWorking] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [time, setTime] = useState(25 * 60)
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK")

  useEffect(() => {
    let interval = null

    if(isActive) {
      interval = setInterval(() => {
        setTime(time - 1)
      }, 1000)
    }else {
      clearInterval(interval)
    }

    if(time === 0){
      playFinishBellSound()
      setIsActive(false)
      setIsWorking(prev => !prev)
      setTime(isWorking ? 300 : 1500)
    }

    return () => clearInterval(interval)
  },[isActive, time])

  const handleStartStop = () => {
    playClickSound()
    setIsActive(!isActive)
  }

  const playClickSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/pick-92276.mp3")
    )
    await sound.playAsync()
  }

  const playFinishBellSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/bell.mp3")
    )
    await sound.playAsync()
  }

  return (
      <SafeAreaView style={[styles.container, {backgroundColor: colors[currentTime], paddingTop: Platform.OS === 'android' && 30}]}>
        <View style={styles.mainView}>
          <Header currentTime={currentTime} setCurrentTime={setCurrentTime} setTime={setTime} setIsActive={setIsActive} />
          <Timer time={time} />
          <TouchableOpacity style={styles.button} onPress={handleStartStop}>
            <Text style={styles.buttonText}>
              {isActive ? "STOP" : "START"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  mainView: {
    paddingHorizontal: 15,
    flex: 1,
  },
  button: {
    backgroundColor: '#333333',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white', 
    fontWeight: 'bold'
  } 
});
