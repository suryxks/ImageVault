import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, ElementRef, useCallback, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { styled } from "styled-components";
import { ImageCard } from "../components";
import { useGetSearchResults } from "../hooks";
import { Image as ImageType } from "../types";

const Input = styled.input`
  /* font-size: 1rem; */
  outline-color: none;
  border: none;
  outline: none;
  border-radius: 0.25rem;
  width: 100%;
  /* padding: 0.5rem; */
`;
const InputWrapper = styled.div`
  padding: 0.5rem;
  width: 80%;
  border: 4px solid var(--cta);
  display: flex;
  gap: 0.5rem;
  margin: auto;
  align-items: center;
  border-radius: 0.5rem;
  justify-content: space-between;
`;
const Icon = styled(MagnifyingGlassIcon)`
  color: var(--cta);
  font-weight: 600;
  height: 1.5rem;
  /* width: 1rem;
  height: 1rem; */
`;
const Button = styled.button`
  background-color: var(--cta);
  color: white;
  border-radius: 4px;
  font-weight: 400;
  padding: 4px 8px;
  margin: 0.5rem;
  width: fit-content;
  margin: 0 0.5rem;
  border: 2px solid var(--cta);
  &:hover {
    background-color: var(--btn-hover);
    cursor: pointer;
  }
`;
const Hero = styled.div`
  display: flex;
  align-items: center;
  grid-area: hero;
`;
const DisplayWrapper = styled.div`
  width: 100%;
  margin: auto;
  grid-area: search;
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  overflow-y: scroll;
`;
const PageWrapper = styled.div`
  display: grid;
  grid-template-rows: 3fr 5fr;
  grid-template-areas:
    "hero"
    "search";
  height: 100%;
`;
export const Search = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const inputRef = useRef<ElementRef<"input">>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const modal = searchParams.get("modal") == "true" ? true : false;
  const { data, isError, isLoading, isFetching } =
    useGetSearchResults(searchParams);
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  }, []);
  const handleClick = useCallback(() => {
    setSearchParams({ q: searchInput });
  }, [searchInput, setSearchParams]);
  const handleInputFoucs = useCallback(() => {
    inputRef.current?.focus();
  }, []);
  if (isError) {
    return <div>Oops something went wring</div>;
  }
  if (isLoading) {
    return <div>...Loading</div>;
  }
  if (isFetching) {
    return <div>...Fetching</div>;
  }
  if (!data) {
    return <div>Somthing went wrong</div>;
  }
  const { hits: images } = data;
  return (
    <PageWrapper>
      <Hero>
        <InputWrapper onClick={handleInputFoucs}>
          <Icon />
          <Input value={searchInput} onChange={handleChange} ref={inputRef} />
          <Button onClick={handleClick}>Go</Button>
        </InputWrapper>
      </Hero>
      <DisplayWrapper>
        <>
          {images.map((image) => {
            const { webformatURL, id, tags }: ImageType = image;
            console.log(modal, "mid", id);
            return (
              <ImageCard
                url={webformatURL}
                alt={searchInput}
                key={id}
                tags={tags.split(",")}
                link={`/search?modal=${true}&imageId=${id}&q=${searchInput.replaceAll(" ", "+")}`}
              />
            );
          })}
        </>
      </DisplayWrapper>
    </PageWrapper>
  );
};
