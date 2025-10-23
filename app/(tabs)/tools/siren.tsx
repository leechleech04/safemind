import Header from '@/components/Header';
import colors from '@/utils/colors';
import sounds from '@/utils/sounds';
import { BasicContainer } from '@/utils/utilComponents';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import styled from 'styled-components/native';

const Siren = () => {
  const [isSirenPlaying, setIsSirenPlaying] = useState(false);
  const [isAlertPlaying, setIsAlertPlaying] = useState(false);
  const [isSosPlaying, setIsSosPlaying] = useState(false);

  return (
    <BasicContainer>
      <Header title="사이렌" />
      <ScrollContainer>
        <SoundContainer>
          <SoundImage
            source={sounds.siren.image}
            contentFit="contain"
            tintColor={sounds.siren.imageColor}
          />
          <SoundTitle>{sounds.siren.title}</SoundTitle>
          <SoundSubTitle>{sounds.siren.subTitle}</SoundSubTitle>
          <PlayButton>
            <Ionicons
              name={isSirenPlaying ? 'pause-circle' : 'play-circle'}
              size={48}
              color={colors.white}
            />
          </PlayButton>
        </SoundContainer>
        <SoundContainer>
          <SoundImage
            source={sounds.alert.image}
            contentFit="contain"
            tintColor={sounds.alert.imageColor}
          />
          <SoundTitle>{sounds.alert.title}</SoundTitle>
          <SoundSubTitle>{sounds.alert.subTitle}</SoundSubTitle>
          <PlayButton>
            <Ionicons
              name={isSirenPlaying ? 'pause-circle' : 'play-circle'}
              size={48}
              color={colors.white}
            />
          </PlayButton>
        </SoundContainer>
        <SoundContainer>
          <SoundImage
            source={sounds.sos.image}
            contentFit="contain"
            tintColor={sounds.sos.imageColor}
          />
          <SoundTitle>{sounds.sos.title}</SoundTitle>
          <SoundSubTitle>{sounds.sos.subTitle}</SoundSubTitle>
          <PlayButton>
            <Ionicons
              name={isSirenPlaying ? 'pause-circle' : 'play-circle'}
              size={48}
              color={colors.white}
            />
          </PlayButton>
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

export default Siren;
