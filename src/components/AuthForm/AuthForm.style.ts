import * as Form from "@radix-ui/react-form";
import { styled } from "styled-components";
export const FormField = styled(Form.Field)`
  display: flex;
  flex-direction: column;
`;
export const FormRoot = styled(Form.Root)`
  max-width: 400px;
  width: 350px;
  margin: 30vh auto;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`;
export const Button = styled.button`
  background-color: var(--cta);
  color: var(--white);
  border-radius: 4px;
  font-weight: 400;
  padding: 4px 8px;
  margin: 0.5rem;
  width: 100%;
  margin: auto;
  border: 2px solid var(--cta);
  &:hover {
    background-color: var(--btn-hover);
    cursor: pointer;
  }
`;
export const FormInput = styled.input`
  font-size: 1rem;
  outline-color: var(--cta);
  border-radius: 0.25rem;
  padding: 0.5rem;
`;
export const FormMessage = styled(Form.Message)`
  color: red;
  font-size: 0.75rem;
  font-weight: 600;
`;
export const FormLabel = styled(Form.Label)`
  font-weight: 600;
`;
