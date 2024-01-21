import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "styled-components";
interface ImageCardProps {
  url: string;
  alt: string;
  tags: Array<string>;
  link: string;
}

const Tag = styled.span`
  background-color: var(--tag-bg);
  color: var(--tag-color);
  padding: 0.25rem;
  border-radius: 4px;
  font-size: 0.75rem;
`;
const TagsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
`;
const ImageCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 350px;
  margin-bottom: 1.5rem;
`;
const Link = styled(RouterLink)`
  text-decoration: none;
`;

const Image = styled.img`
  width: 350px;
  height: 240px;
  border-radius: 4px;
`;

export const ImageCard = forwardRef<HTMLAnchorElement, ImageCardProps>(
  (props, ref) => {
    const { link, url, alt, tags } = props;
    return (
      <Link to={link} ref={ref} {...props}>
        <ImageCardWrapper>
          <Image src={url} alt={alt} />
          <TagsWrapper>
            {tags.map((tag: string) => {
              return <Tag key={tag}>{tag}</Tag>;
            })}
          </TagsWrapper>
        </ImageCardWrapper>
      </Link>
    );
  },
);
