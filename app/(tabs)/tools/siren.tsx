import Header from '@/components/Header';
import colors from '@/utils/colors';
import sounds from '@/utils/sounds';
import { BasicContainer } from '@/utils/utilComponents';
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Image } from 'expo-image';
import styled from 'styled-components/native';

const Siren = () => {
  const sirenPlayer = useAudioPlayer(sounds.siren.sirenSound);
  const alertPlayer = useAudioPlayer(sounds.alert.sirenSound);
  const sosPlayer = useAudioPlayer(sounds.sos.sirenSound);

  const sirenStatus = useAudioPlayerStatus(sirenPlayer);
  const alertStatus = useAudioPlayerStatus(alertPlayer);
  const sosStatus = useAudioPlayerStatus(sosPlayer);

  const toggleSiren = () => {
    if (!sirenStatus.playing) {
      sirenPlayer.loop = true;
      sirenPlayer.seekTo(0);
      sirenPlayer.play();
    } else {
      sirenPlayer.pause();
    }
  };

  const toggleAlert = () => {
    if (!alertStatus.playing) {
      alertPlayer.loop = true;
      alertPlayer.seekTo(0);
      alertPlayer.play();
    } else {
      alertPlayer.pause();
    }
  };

  const toggleSos = () => {
    if (!sosStatus.playing) {
      sosPlayer.loop = true;
      sosPlayer.seekTo(0);
      sosPlayer.play();
    } else {
      sosPlayer.pause();
    }
  };

  return (
    <BasicContainer>
      <Header title="사이렌" />
      <ScrollContainer
        contentContainerStyle={{
          paddingBottom: 16,
        }}
      >
        <SoundContainer>
          <SoundImage
            source={sounds.siren.image}
            contentFit="contain"
            tintColor={sounds.siren.imageColor}
          />
          <SoundTitle>{sounds.siren.title}</SoundTitle>
          <SoundSubTitle>{sounds.siren.subTitle}</SoundSubTitle>
          {sirenPlayer.isBuffering || !sirenPlayer.isLoaded ? (
            <SoundIndicator size="large" color={colors.white} />
          ) : (
            <PlayButton onPress={toggleSiren}>
              <Ionicons
                name={sirenStatus.playing ? 'pause-circle' : 'play-circle'}
                size={48}
                color={colors.white}
              />
            </PlayButton>
          )}
        </SoundContainer>
        <SoundContainer>
          <SoundImage
            source={sounds.alert.image}
            contentFit="contain"
            tintColor={sounds.alert.imageColor}
          />
          <SoundTitle>{sounds.alert.title}</SoundTitle>
          <SoundSubTitle>{sounds.alert.subTitle}</SoundSubTitle>
          {alertPlayer.isBuffering || !alertPlayer.isLoaded ? (
            <SoundIndicator size="large" color={colors.white} />
          ) : (
            <PlayButton onPress={toggleAlert}>
              <Ionicons
                name={alertStatus.playing ? 'pause-circle' : 'play-circle'}
                size={48}
                color={colors.white}
              />
            </PlayButton>
          )}
        </SoundContainer>
        <SoundContainer>
          <SoundImage
            source={sounds.sos.image}
            contentFit="contain"
            tintColor={sounds.sos.imageColor}
          />
          <SoundTitle>{sounds.sos.title}</SoundTitle>
          <SoundSubTitle>{sounds.sos.subTitle}</SoundSubTitle>
          {sosPlayer.isBuffering || !sosPlayer.isLoaded ? (
            <SoundIndicator size="large" color={colors.white} />
          ) : (
            <PlayButton onPress={toggleSos}>
              <Ionicons
                name={sosStatus.playing ? 'pause-circle' : 'play-circle'}
                size={48}
                color={colors.white}
              />
            </PlayButton>
          )}
        </SoundContainer>
      </ScrollContainer>
    </BasicContainer>
  );
};

const ScrollContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const SoundContainer = styled.View`
  width: 100%;
  margin-top: 20px;
  background-color: ${colors.darkGray};
  border-radius: 8px;
  padding: 16px;
`;

const SoundImage = styled(Image)`
  width: 60px;
  height: 60px;
`;

const SoundTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.white};
  margin-top: 8px;
`;

const SoundSubTitle = styled.Text`
  font-size: 14px;
  color: ${colors.lightGray};
  margin-top: 4px;
`;

const PlayButton = styled.Pressable`
  position: absolute;
  right: 16px;
  top: 16px;
`;

const SoundIndicator = styled.ActivityIndicator`
  position: absolute;
  right: 16px;
  top: 16px;
`;

export default Siren;
