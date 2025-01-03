import styled from 'styled-components';

const Container = styled.div`
  padding: 0;
  border: solid 1px var(--SecondaryColor);
  border-radius: var(--borderRadius);
  display: flex;
  flex-direction: column;
  align-items: center;

  .container_header {
    width: 100%;
    border-bottom: solid 1px var(--SecondaryColor);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;

    .buttons_area {
      width: fit-content;
      margin-right: 30px;
    }

    h2 {
      margin: 5px 0 0 40px;
    }

    a.btn, button {
      margin: 5px 5px;
    }
  }
`;

export default Container