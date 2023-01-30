import {
  Check,
  CoverTitle,
  ImageWrapper,
  SectionImage,
} from '../../../styles/components/Desktop/UI/SelectableImage';

import CheckIcon from '/public/icons/check.png';

export default function SelectableImage({
  url,
  selected,
  onClick,
  text,
}: {
  url: string;
  selected: boolean;
  onClick?: () => void;
  text?: string;
}) {
  return (
    <ImageWrapper onClick={onClick}>
      <Check selected={selected}>
        <img id="preview" src={CheckIcon.src} alt="" />
      </Check>
      {text && <CoverTitle>{text}</CoverTitle>}
      {url && <SectionImage src={url} />}
    </ImageWrapper>
  );
}
