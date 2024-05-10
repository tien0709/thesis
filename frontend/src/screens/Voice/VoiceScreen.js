import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import FadeInView from '../../components/FadeInView/FadeInView';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { SpeechToText, updateItemStatusWithVoice } from "../../data/MockDataAPI"; 
import styles from "./styles";
import NavigationBar from "../../components/NaviBar/navibar";


const recordingOptions = {
    // android not currently in use. Not getting results from speech to text with .m4a
    // but parameters are required
    android: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
    },
    ios: {
        extension: '.wav',
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
};

export default function VoiceScreen (props)  {

    const { navigation, route } = props;
    const email = route?.params?.email;

    const [recording, setRecording] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [query, setQuery] = useState('');
    const [correctQuery, setCorrectQuery] = useState(false);
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const scale = useRef(new Animated.Value(1)).current;

    useLayoutEffect(() => {
        navigation.setOptions({
          headerTransparent: true,
          headerTitleStyle: { opacity: 0 },
        });
      }, [navigation]);


    function toUppercaseVietnamese(str) {
        return str.toUpperCase().replace(/Đ/g, "Đ").replace(/đ/g, "Đ").replace(/À/g, "À").replace(/à/g, "à").replace(/Á/g, "Á").replace(/á/g, "á").replace(/Ã/g, "Ã").replace(/ã/g, "ã").replace(/Ạ/g, "Ạ").replace(/ạ/g, "ạ").replace(/Ả/g, "Ả").replace(/ả/g, "ả").replace(/Ấ/g, "Ấ").replace(/ấ/g, "ấ").replace(/Ẻ/g, "Ẻ").replace(/ẻ/g, "ẻ").replace(/É/g, "É").replace(/é/g, "é").replace(/È/g, "È").replace(/è/g, "è").replace(/Ẹ/g, "Ẹ").replace(/ẹ/g, "ẹ").replace(/Ẻ/g, "Ẻ").replace(/ẻ/g, "ẻ").replace(/Ì/g, "Ì").replace(/ì/g, "ì").replace(/Í/g, "Í").replace(/í/g, "í").replace(/Ĩ/g, "Ĩ").replace(/ĩ/g, "ĩ").replace(/Ị/g, "Ị").replace(/ị/g, "ị").replace(/Ò/g, "Ò").replace(/ò/g, "ò").replace(/Ó/g, "Ó").replace(/ó/g, "ó").replace(/Õ/g, "Õ").replace(/õ/g, "õ").replace(/Ọ/g, "Ọ").replace(/ọ/g, "ọ").replace(/Ỏ/g, "Ỏ").replace(/ỏ/g, "ỏ").replace(/Ơ/g, "Ơ").replace(/ơ/g, "ơ").replace(/Ư/g, "Ư").replace(/ư/g, "ư").replace(/Ứ/g, "Ứ").replace(/ứ/g, "ứ").replace(/Ữ/g, "Ữ").replace(/ữ/g, "ữ").replace(/Ụ/g, "Ụ").replace(/ụ/g, "ụ").replace(/Ứ/g, "Ứ").replace(/ứ/g, "ứ").replace(/Ậ/g, "Ậ").replace(/ậ/g, "ậ").replace(/Ê/g, "Ê").replace(/ê/g, "ê").replace(/É/g, "É").replace(/é/g, "é").replace(/È/g, "È").replace(/è/g, "è").replace(/Ẹ/g, "Ẹ").replace(/ẹ/g, "ẹ").replace(/Ê/g, "Ê").replace(/ê/g, "ê");
    }

    useEffect(() => {
        const queryUpperCase = toUppercaseVietnamese(query);
        const queryLowerCaseNoSpace = queryUpperCase.replace(/\s/g, '');
        if(queryLowerCaseNoSpace==='BẬTĐÈNPHÒNGKHÁCH.'){
            setCorrectQuery(true);
            updateItemStatusWithVoice('LED', 'Living Room', 'On');
            setTimeout(() => {
                navigation.navigate('Devices', { deviceName: 'LED', location: 'Living Room', email })
              }, 1000);
        }

        else if(queryLowerCaseNoSpace==='BẬTĐÈNPHÒNGBỐMẸ.'){
            setCorrectQuery(true);
            updateItemStatusWithVoice('LED', 'Parents Room', 'On');
            setTimeout(() => {
                navigation.navigate('Devices', { deviceName: 'LED',location: 'Parents Room', email });
              }, 1000);
        }

        else if(queryLowerCaseNoSpace==='BẬTĐÈNPHÒNGCON1.'){
            setCorrectQuery(true);
            updateItemStatusWithVoice('LED', 'Child Room 01', 'On');
            setTimeout(() => {
                navigation.navigate('Devices', { deviceName: 'LED', location: 'Child Room 01', email })
              }, 1000);
        }

        else if(queryLowerCaseNoSpace==='BẬTĐÈNPHÒNGCON2.'){
            setCorrectQuery(true);
            updateItemStatusWithVoice('LED', 'Child Room 02', 'On');
            setTimeout(() => {
                navigation.navigate('Devices', { deviceName: 'LED', location: 'Child Room 02', email })
              }, 1000);
        }

        else if(queryLowerCaseNoSpace==='BẬTQUẠTPHÒNGKHÁCH.'){
            setCorrectQuery(true);
            updateItemStatusWithVoice('FAN', 'Living Room', 'On');
            setTimeout(() => {
                navigation.navigate('Devices', { deviceName: 'FAN', location: 'Living Room', email })
              }, 1000);
        }

        else if(queryLowerCaseNoSpace==='BẬTQUẠTPHÒNGBỐMẸ.'){
            setCorrectQuery(true);
            updateItemStatusWithVoice('FAN', 'Parents Room', 'On');
            setTimeout(() => {
                navigation.navigate('Devices', { deviceName: 'FAN', location: email })
              }, 1000);
        }

        else if(queryLowerCaseNoSpace==='BẬTQUẠTPHÒNGCON1.'){
            setCorrectQuery(true);
            updateItemStatusWithVoice('FAN', 'Child Room 01', 'On');
            setTimeout(() => {
                navigation.navigate('Devices', { deviceName: 'FAN', location :'Child Room 01', email })
              }, 1000);
        }

        else if(queryLowerCaseNoSpace==='BẬTQUẠTPHÒNGCON2.'){
            setCorrectQuery(true);
            updateItemStatusWithVoice('FAN', 'Child Room 02', 'On');
            setTimeout(() => {
                navigation.navigate('Devices', { deviceName: 'FAN', location: 'Child Room 02', email })
              }, 1000);
        }

        else if(queryLowerCaseNoSpace==='TẮTĐÈNPHÒNGKHÁCH.'){
            setCorrectQuery(true);
            updateItemStatusWithVoice('LED', 'Living Room', 'Off');
            setTimeout(() => {
                navigation.navigate('Devices', { deviceName: 'LED', location: 'Living Room', email })
              }, 1000);
        }

        else if(queryLowerCaseNoSpace==='TẮTĐÈNPHÒNGBỐMẸ.'){
            setCorrectQuery(true);
            updateItemStatusWithVoice('LED', 'Parents Room', 'Off');
            setTimeout(() => {
                navigation.navigate('Devices', { deviceName: 'LED', location: 'Parents Room', email })
              }, 1000);
        }

        else if(queryLowerCaseNoSpace==='TẮTĐÈNPHÒNGCON1.'){
            setCorrectQuery(true);
            updateItemStatusWithVoice('LED', 'Child Room 01', 'Off');
            setTimeout(() => {
                navigation.navigate('Devices', { deviceName: 'LED', location: 'Child Room 01', email })
              }, 1000);
        }

        else if(queryLowerCaseNoSpace==='TẮTĐÈNPHÒNGCON2.'){
            setCorrectQuery(true);
            updateItemStatusWithVoice('LED', 'Child Room 02', 'Off');
            setTimeout(() => {
                navigation.navigate('Devices', { deviceName: 'LED', location: 'Child Room 02', email })
              }, 1000);
        }

        else if(queryLowerCaseNoSpace==='TẮTQUẠTPHÒNGKHÁCH.'){
            setCorrectQuery(true);
            updateItemStatusWithVoice('FAN', 'Living Room', 'Off');
            setTimeout(() => {
                navigation.navigate('Devices', { deviceName: 'FAN', location: 'Living Room', email })
              }, 1000);
        }

        else if(queryLowerCaseNoSpace==='TẮTQUẠTPHÒNGBỐMẸ.'){
            setCorrectQuery(true);
            updateItemStatusWithVoice('FAN', 'Parents Room', 'Off');
            setTimeout(() => {
                navigation.navigate('Devices', { deviceName: 'FAN', location: 'Parents Room', email })
              }, 1000);
        }

        else if(queryLowerCaseNoSpace==='TẮTQUẠTPHÒNGCON1.'){
            setCorrectQuery(true);
            updateItemStatusWithVoice('FAN', 'Child Room 01', 'Off');
            setTimeout(() => {
                navigation.navigate('Devices', { deviceName: 'FAN', location: 'Child Room 01', email })
              }, 1000);
        }

        else if(queryLowerCaseNoSpace==='TẮTQUẠTPHÒNGCON2.'){
            setCorrectQuery(true);
            updateItemStatusWithVoice('FAN', 'Child Room 02', 'Off');
            setTimeout(() => {
                navigation.navigate('Devices', { deviceName: 'FAN', location : 'Child Room 02', email })
              }, 1000);
        }
        setCorrectQuery(false);
        setTimeout(() => {
            setQuery('');
          }, 10000);
        
    }, [query])

    const deleteRecordingFile = async () => {
        try {
            if(recording) {
                const info = await FileSystem.getInfoAsync(recording.getURI());
                await FileSystem.deleteAsync(info.uri);
            }
        } catch(error) {
            console.log("There was an error deleting recording file", error);
        }
    }

    const getTranscription = async () => {
        setIsFetching(true);
        try {
            if(recording) {
                const audioData = await FileSystem.readAsStringAsync(recording.getURI(), {
                    encoding: FileSystem.EncodingType.Base64,
                  });
    
                const data = await SpeechToText(audioData);
                setQuery(data.transcript);
            }
        } catch(error) {
            console.log('There was an error reading file', error);
            stopRecording();
            resetRecording();
        }
        setIsFetching(false);
    }

    const startRecording = async () => {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }

        setIsRecording(true);
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            //interruptionModeIOS: InterruptionModeIOS.DoNotMix,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
           // interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
            playThroughEarpieceAndroid: true,
        });
        const recording = new Audio.Recording();

        try {
            await recording.prepareToRecordAsync(recordingOptions);
            await recording.startAsync();
        } catch (error) {
            console.log(error);
            stopRecording();
        }

        setRecording(recording);
    }

    const stopRecording = async () => {
        setIsRecording(false);
        try {
            if(recording) {
                await recording.stopAndUnloadAsync();
           //     const { uri } = await FileSystem.getInfoAsync(recording.getURI());
            
                // Copy the recording URI to the new file path
            //   await FileSystem.copyAsync({ from: uri, to: filePath });
            //    const { sound } = await Audio.Sound.createAsync( {uri} );
           //     await  sound.playAsync();
            }

        } catch (error) {
            // Do nothing -- we are already unloaded.
            console.log( error);
        }
    }

    const resetRecording = () => {
        deleteRecordingFile();
        setRecording(null);
    };

    const handleOnPressIn = () => {
        startRecording();
        Animated.spring(scale, {
            toValue: isRecording ? 1 : 1.2, // Scale up if not recording
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const handleOnPressOut = () => {
        stopRecording();
        getTranscription();
        scale.stopAnimation();
    };

    const handleQueryChange = (query) => {
        setQuery(query);
    };

    const handlePressButton = (buttonName) => {
        if(buttonName === 'Home'){
          navigation.navigate("Home", {email});
        }
        if(buttonName === 'Discovery'){
           navigation.navigate("Discovery", {email});
         }
         else if(buttonName === 'Function'){
           navigation.navigate("Function", {email});
         }
         else if(buttonName === 'Info'){
           navigation.navigate("Info", {email});
         }
    
     };

     const textColor = correctQuery ? '#48C9B0' : 'red'; // Calculate textColor inside render

    return (
        <SafeAreaView style={styles.Viewcontainer}>
            <Text style={styles.centeredText}>Voice Search</Text>
            <View style={styles.header}>
                <Animated.View style={{ transform: [{ scale }] }}>
                    <FadeInView>
                    <FontAwesome name="microphone" size={100} color={isRecording ? 'red' : '#48C9B0'} />
                    </FadeInView>
                </Animated.View>
                <TouchableOpacity
                    style={styles.button}
                    onPressIn={handleOnPressIn}
                    onPressOut={handleOnPressOut}
                >
                    {isFetching && <ActivityIndicator color="#ffffff" />}
                    {!isFetching && <Text color="#ffffff" >Hold for Voice Search</Text>}
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                 <Text style={[styles.contentText, { color: textColor }]}>{query}</Text>
            </View>
            <NavigationBar onPressButton={handlePressButton} type='microphone'/>
        </SafeAreaView>
    );
};
