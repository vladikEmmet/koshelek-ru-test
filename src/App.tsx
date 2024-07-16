import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import useStore from './store/currencyStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 50px;
  }
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 200px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input<{ hasError: boolean }>`
  padding: 8px;
  font-size: 16px;
  border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#ccc')};
  border-radius: 4px;
  width: 100%;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
  width: 100%;
`;

const App: React.FC = () => {
    const { eur, usd, errorEur, errorUsd, setEur, setUsd, clearErrors } = useStore();

    const handleEurChange = (e: ChangeEvent<HTMLInputElement>) => {
        clearErrors();
        const value = e.target.value;
        setEur(value);
    };

    const handleUsdChange = (e: ChangeEvent<HTMLInputElement>) => {
        clearErrors();
        const value = e.target.value;
        setUsd(value);
    };

    return (
        <Container>
            <FieldContainer>
                <Label htmlFor="eur">EUR:</Label>
                <div>
                    <Input
                        id="eur"
                        type="text"
                        value={eur}
                        onChange={handleEurChange}
                        hasError={errorEur !== ''}
                    />
                    {errorEur && <ErrorMessage>{errorEur}</ErrorMessage>}
                </div>
            </FieldContainer>
            <FieldContainer>
                <Label htmlFor="usd">USD:</Label>
                <div>
                    <Input
                        id="usd"
                        type="text"
                        value={usd}
                        onChange={handleUsdChange}
                        hasError={errorUsd !== ''}
                    />
                    {errorUsd && <ErrorMessage>{errorUsd}</ErrorMessage>}
                </div>
            </FieldContainer>
        </Container>
    );
};

export default App;

